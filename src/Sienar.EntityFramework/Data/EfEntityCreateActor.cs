namespace Sienar.Data;

/// <summary>
/// An implementation of <see cref="IEntityCreateActor{T}"/> which creates entities in an EntityFramework <see cref="DbContext"/>
/// </summary>
/// <typeparam name="TEntity">The type of the entity to create</typeparam>
public class EfEntityCreateActor<TEntity> : IEntityCreateActor<TEntity>
	where TEntity : class, IEntity
{
	private readonly IDbContext _context;
	private readonly ILogger<EfEntityCreateActor<TEntity>> _logger;
	private readonly IAccessValidationRunner<TEntity> _accessValidationRunner;
	private readonly IStateValidationRunner<TEntity> _stateValidationRunner;
	private readonly IBeforeActionRunner<IBeforeCreateAction<TEntity>, TEntity> _beforeActionRunner;
	private readonly IAfterActionRunner<IAfterCreateAction<TEntity>, TEntity> _afterActionRunner;
	private readonly IOperationResultNotifier _notifier;

	/// <summary>
	/// Creates a new instance of <c>EfEntityCreateActor</c>
	/// </summary>
	/// <param name="context">The database context</param>
	/// <param name="logger">The logger</param>
	/// <param name="accessValidationRunner">The access validation runner</param>
	/// <param name="stateValidationRunner">The state validation runner</param>
	/// <param name="beforeActionRunner">The before-hook action runner</param>
	/// <param name="afterActionRunner">The after-hook action runner</param>
	/// <param name="notifier">The operation result notifier</param>
	public EfEntityCreateActor(
		IDbContext context,
		ILogger<EfEntityCreateActor<TEntity>> logger,
		IAccessValidationRunner<TEntity> accessValidationRunner,
		IStateValidationRunner<TEntity> stateValidationRunner,
		IBeforeActionRunner<IBeforeCreateAction<TEntity>, TEntity> beforeActionRunner,
		IAfterActionRunner<IAfterCreateAction<TEntity>, TEntity> afterActionRunner,
		IOperationResultNotifier notifier)
	{
		_context = context;
		_logger = logger;
		_accessValidationRunner = accessValidationRunner;
		_stateValidationRunner = stateValidationRunner;
		_beforeActionRunner = beforeActionRunner;
		_afterActionRunner = afterActionRunner;
		_notifier = notifier;
	}

	/// <inheritdoc />
	public async Task<OperationResult<int>> Create(TEntity model)
	{
		// Run access validation
		var accessValidationResult = await _accessValidationRunner.Validate(
			model,
			ActionType.Create);
		if (!accessValidationResult.Result)
		{
			return _notifier.HandleOperationResult(new OperationResult<int>(
				OperationStatus.Unauthorized,
				0,
				StatusMessages.Crud<TEntity>.NoPermission()));
		}

		// Run state validation
		var stateValidationResult = await _stateValidationRunner.Validate(
			model,
			ActionType.Create);
		if (!stateValidationResult.Result)
		{
			return _notifier.HandleOperationResult(new OperationResult<int>(
				OperationStatus.Unprocessable,
				0,
				stateValidationResult.Message ?? StatusMessages.Crud<TEntity>.CreateFailed()));
		}

		// Run before hooks
		var beforeHooksResult = await _beforeActionRunner.Run(model);
		if (!beforeHooksResult.Result)
		{
			return _notifier.HandleOperationResult(new OperationResult<int>(
				OperationStatus.Unknown,
				0,
				beforeHooksResult.Message ?? StatusMessages.Crud<TEntity>.CreateFailed()));
		}

		try
		{
			await _context
				.Set<TEntity>()
				.AddAsync(model);
			await _context.SaveChangesAsync();
		}
		catch (Exception e)
		{
			_logger.LogError(e, StatusMessages.Database.QueryFailed);
			return _notifier.HandleOperationResult(new OperationResult<int>(
				OperationStatus.Unknown,
				0,
				StatusMessages.Crud<TEntity>.CreateFailed()));
		}

		// Run after hooks
		await _afterActionRunner.Run(model);

		return _notifier.HandleOperationResult(new OperationResult<int>(
			OperationStatus.Success,
			model.Id,
			StatusMessages.Crud<TEntity>.CreateSuccessful()));
	}
}