namespace Sienar.Data;

/// <summary>
/// An implementation of <see cref="IEntityUpdateActor{T}"/> which updates entities in an EntityFramework <see cref="DbContext"/>
/// </summary>
/// <typeparam name="TEntity">The type of the entity to update</typeparam>
/// <typeparam name="TContext">The type of the database context</typeparam>
public class EfEntityUpdateActor<TEntity, TContext> : IEntityUpdateActor<TEntity>
	where TEntity : class, IEntity
	where TContext : DbContext
{
	private readonly TContext _context;
	private readonly ILogger<EfEntityUpdateActor<TEntity, TContext>> _logger;
	private readonly IAccessValidationRunner<TEntity> _accessValidationRunner;
	private readonly IStateValidationRunner<TEntity> _stateValidationRunner;
	private readonly IBeforeActionRunner<IBeforeUpdateAction<TEntity>, TEntity> _beforeActionRunner;
	private readonly IAfterActionRunner<IAfterUpdateAction<TEntity>, TEntity> _afterActionRunner;
	private readonly IOperationResultNotifier _notifier;

	/// <summary>
	/// Creates a new instance of <c>EfEntityUpdateActor</c>
	/// </summary>
	/// <param name="context">The database context</param>
	/// <param name="logger">The logger</param>
	/// <param name="accessValidationRunner">The access validation runner</param>
	/// <param name="stateValidationRunner">The state validation runner</param>
	/// <param name="beforeActionRunner">The before-hook action runner</param>
	/// <param name="afterActionRunner">The after-hook action runner</param>
	/// <param name="notifier">The operation result notifier</param>
	public EfEntityUpdateActor(
		TContext context,
		ILogger<EfEntityUpdateActor<TEntity, TContext>> logger,
		IAccessValidationRunner<TEntity> accessValidationRunner,
		IStateValidationRunner<TEntity> stateValidationRunner,
		IBeforeActionRunner<IBeforeUpdateAction<TEntity>, TEntity> beforeActionRunner,
		IAfterActionRunner<IAfterUpdateAction<TEntity>, TEntity> afterActionRunner,
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
	public async Task<OperationResult<bool>> Update(TEntity model)
	{
		// Run access validation
		var accessValidationResult = await _accessValidationRunner.Validate(
			model,
			ActionType.Update);
		if (!accessValidationResult.Result)
		{
			return _notifier.HandleOperationResult(new OperationResult<bool>(
				OperationStatus.Unauthorized,
				false,
				StatusMessages.Crud<TEntity>.NoPermission()));
		}

		// Run state validation
		var stateValidationResult = await _stateValidationRunner.Validate(
			model,
			ActionType.Update);
		if (!stateValidationResult.Result)
		{
			return _notifier.HandleOperationResult(new OperationResult<bool>(
				OperationStatus.Unprocessable,
				false,
				stateValidationResult.Message ?? StatusMessages.Crud<TEntity>.UpdateFailed()));
		}

		// Run before hooks
		var beforeHooksResult = await _beforeActionRunner.Run(model);
		if (!beforeHooksResult.Result)
		{
			return _notifier.HandleOperationResult(new OperationResult<bool>(
				OperationStatus.Unknown,
				false,
				beforeHooksResult.Message ?? StatusMessages.Crud<TEntity>.UpdateFailed()));
		}

		try
		{
			_context
				.Set<TEntity>()
				.Update(model);
			await _context.SaveChangesAsync();
		}
		catch (Exception e)
		{
			_logger.LogError(e, StatusMessages.Database.QueryFailed);
			return _notifier.HandleOperationResult(new OperationResult<bool>(
				OperationStatus.Unknown,
				false,
				StatusMessages.Crud<TEntity>.UpdateFailed()));
		}

		// Run after hooks
		await _afterActionRunner.Run(model);

		return _notifier.HandleOperationResult(new OperationResult<bool>(
			OperationStatus.Success,
			true,
			StatusMessages.Crud<TEntity>.UpdateSuccessful()));
	}
}