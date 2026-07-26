namespace Sienar.Data;

/// <summary>
/// An implementation of <see cref="IEntityReadAllActor{T}"/> which reads entities from an EntityFramework <see cref="DbContext"/>
/// </summary>
/// <typeparam name="TEntity">The type of the entity to read</typeparam>
/// <typeparam name="TContext">The type of the database context</typeparam>
public class EfEntityReadAllActor<TEntity, TContext> : IEntityReadAllActor<TEntity>
	where TEntity : class, IEntity
	where TContext : DbContext
{
	private readonly TContext _context;
	private readonly IEfFilterProcessor<TEntity> _filterProcessor;
	private readonly ILogger<EfEntityReadAllActor<TEntity, TContext>> _logger;
	private readonly IAfterActionRunner<IAfterReadAllAction<TEntity>, TEntity> _afterActionRunner;
	private readonly IOperationResultNotifier _notifier;

	/// <summary>
	/// Creates a new instance of <c>EfEntityReadActor</c>
	/// </summary>
	/// <param name="context">The database context</param>
	/// <param name="filterProcessor">The EF filter processor</param>
	/// <param name="logger">The logger</param>
	/// <param name="afterActionRunner">The after-hook action runner</param>
	/// <param name="notifier">The operation result notifier</param>
	public EfEntityReadAllActor(
		TContext context,
		IEfFilterProcessor<TEntity> filterProcessor,
		ILogger<EfEntityReadAllActor<TEntity, TContext>> logger,
		IAfterActionRunner<IAfterReadAllAction<TEntity>, TEntity> afterActionRunner,
		IOperationResultNotifier notifier)
	{
		_context = context;
		_filterProcessor = filterProcessor;
		_logger = logger;
		_afterActionRunner = afterActionRunner;
		_notifier = notifier;
	}

	/// <inheritdoc />
	public async Task<OperationResult<PagedQueryResult<TEntity>>> Read(Filter? filter = null)
	{
		PagedQueryResult<TEntity> queryResult;

		try
		{
			filter = _filterProcessor.ModifyFilter(filter, ActionType.ReadAll);
			var entitySet = _context.Set<TEntity>();
			IQueryable<TEntity> entries;
			IQueryable<TEntity> countEntries;

			if (filter is not null)
			{
				entries = ProcessFilter(filter);
				countEntries = _filterProcessor.Search(entitySet, filter);
			}
			else
			{
				entries = entitySet;
				countEntries = entitySet;
			}

			queryResult = new PagedQueryResult<TEntity>(
				await entries.ToListAsync(),
				await countEntries.CountAsync());
		}
		catch (Exception e)
		{
			_logger.LogError(e, StatusMessages.Database.QueryFailed);
			return _notifier.HandleOperationResult(new OperationResult<PagedQueryResult<TEntity>>(
				OperationStatus.Unknown,
				new PagedQueryResult<TEntity>(),
				StatusMessages.Crud<TEntity>.ReadMultipleFailed()));
		}

		foreach (var entity in queryResult.Items)
		{
			await _afterActionRunner.Run(entity);
		}

		return _notifier.HandleOperationResult(new OperationResult<PagedQueryResult<TEntity>>(result: queryResult));
	}

	private IQueryable<TEntity> ProcessFilter(
		Filter filter,
		Expression<Func<TEntity, bool>>? predicate = null)
	{
		var result = (IQueryable<TEntity>) _context.Set<TEntity>();
		if (predicate is not null)
		{
			result = result.Where(predicate);
		}

		result = _filterProcessor.Search(result, filter);
		result = _filterProcessor.ProcessIncludes(result, filter);
		var sortPredicate = _filterProcessor.GetSortPredicate(filter.SortName);
		result = filter.SortDescending ?? false
			? result.OrderByDescending(sortPredicate)
			: result.OrderBy(sortPredicate);

		if (filter.Page > 1)
		{
			result = result.Skip((filter.Page - 1) * filter.PageSize);
		}

		// If filter.PageSize == 0, return all results
		if (filter.PageSize > 0)
		{
			result = result.Take(filter.PageSize);
		}

		return result;
	}
}