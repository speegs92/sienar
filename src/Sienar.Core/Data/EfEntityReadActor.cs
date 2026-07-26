namespace Sienar.Data;

/// <summary>
/// An implementation of <see cref="IEntityReadActor{T}"/> which reads entities from an EntityFramework <see cref="DbContext"/>
/// </summary>
/// <typeparam name="TEntity">The type of the entity to read</typeparam>
/// <typeparam name="TContext">The type of the database context</typeparam>
public class EfEntityReadActor<TEntity, TContext> : IEntityReadActor<TEntity>
	where TEntity : class, IEntity
	where TContext : DbContext
{
	private readonly TContext _context;
	private readonly IEfFilterProcessor<TEntity> _filterProcessor;
	private readonly ILogger<EfEntityReadActor<TEntity, TContext>> _logger;
	private readonly IAccessValidationRunner<TEntity> _accessValidationRunner;
	private readonly IAfterActionRunner<IAfterReadAction<TEntity>, TEntity> _afterActionRunner;
	private readonly IOperationResultNotifier _notifier;

	/// <summary>
	/// Creates a new instance of <c>EfEntityReadActor</c>
	/// </summary>
	/// <param name="context">The database context</param>
	/// <param name="filterProcessor">The EF filter processor</param>
	/// <param name="logger">The logger</param>
	/// <param name="accessValidationRunner">The access validation runner</param>
	/// <param name="afterActionRunner">The after-hook action runner</param>
	/// <param name="notifier">The operation result notifier</param>
	public EfEntityReadActor(
		TContext context,
		IEfFilterProcessor<TEntity> filterProcessor,
		ILogger<EfEntityReadActor<TEntity, TContext>> logger,
		IAccessValidationRunner<TEntity> accessValidationRunner,
		IAfterActionRunner<IAfterReadAction<TEntity>, TEntity> afterActionRunner,
		IOperationResultNotifier notifier)
	{
		_context = context;
		_filterProcessor = filterProcessor;
		_logger = logger;
		_accessValidationRunner = accessValidationRunner;
		_afterActionRunner = afterActionRunner;
		_notifier = notifier;
	}
	
	/// <inheritdoc />
	public async Task<OperationResult<TEntity>> Read(
		int id,
		Filter? filter = null)
	{
		TEntity? entity;
		var entitySet = _context.Set<TEntity>();
		filter = _filterProcessor.ModifyFilter(filter, ActionType.Read);

		try
		{
			entity = filter is null
				? await entitySet.FindAsync(id)
				: await _filterProcessor
					.ProcessIncludes(entitySet, filter)
					.FirstOrDefaultAsync(e => e.Id == id);
		}
		catch (Exception e)
		{
			_logger.LogError(e, StatusMessages.Database.QueryFailed);
			return _notifier.HandleOperationResult(new OperationResult<TEntity>(
				OperationStatus.Unknown,
				null,
				StatusMessages.Crud<TEntity>.ReadSingleFailed()));
		}

		if (entity is null)
		{
			return _notifier.HandleOperationResult(new OperationResult<TEntity>(
				OperationStatus.NotFound,
				null,
				StatusMessages.Crud<TEntity>.NotFound(id)));
		}

		// Run access validation
		var accessValidationResult = await _accessValidationRunner.Validate(entity, ActionType.Read);
		if (!accessValidationResult.Result)
		{
			return _notifier.HandleOperationResult(new OperationResult<TEntity>(
				OperationStatus.Unauthorized,
				null,
				StatusMessages.Crud<TEntity>.NoPermission()));
		}

		await _afterActionRunner.Run(entity);

		return _notifier.HandleOperationResult(new OperationResult<TEntity>(result: entity));
	}
}