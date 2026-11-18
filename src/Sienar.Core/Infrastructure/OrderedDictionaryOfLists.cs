namespace Sienar.Infrastructure;

/// <summary>
/// Arranges multiple lists by a numeric priority
/// </summary>
/// <typeparam name="T">the type of the item to be contained in a <see cref="List{T}"/></typeparam>
public class OrderedDictionaryOfLists<T>
{
	private readonly Dictionary<int, List<T>> _store = new();

	/// <summary>
	/// Adds items at the specified order
	/// </summary>
	/// <param name="priority">The order at which to add items</param>
	/// <param name="prioritizedItems">The items to add</param>
	/// <returns>self</returns>
	public OrderedDictionaryOfLists<T> Add(
		int priority,
		params T[] prioritizedItems)
	{
		if (!_store.TryGetValue(priority, out var items))
		{
			items = [];
			_store[priority] = items;
		}

		items.AddRange(prioritizedItems);

		return this;
	}

	/// <summary>
	/// Adds items with the default order
	/// </summary>
	/// <param name="prioritizedItems">The items to add</param>
	/// <returns>self</returns>
	public OrderedDictionaryOfLists<T> Add(
		params T[] prioritizedItems)
		=> Add(0, prioritizedItems);

	/// <summary>
	/// Aggregates the prioritized items into a single ordered list arranged by priority
	/// </summary>
	/// <returns>The prioritized items in an ordered list</returns>
	public List<T> AggregateOrdered()
	{
		var ordered = new List<T>();

		foreach (var i in _store.Keys.Order())
		{
			ordered.AddRange(_store[i]);
		}

		return ordered;
	}
}
