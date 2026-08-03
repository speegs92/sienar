namespace Sienar.Infrastructure;

/// <summary>
/// Allows marking code with a priority
/// </summary>
public class PriorityAttribute : Attribute
{
	/// <summary>
	/// The priority
	/// </summary>
	public int Priority { get; }

	/// <summary>
	/// Creates a new instance of <c>PriorityAttribute</c>
	/// </summary>
	/// <param name="priority">The priority</param>
	public PriorityAttribute(int priority)
		=> Priority = priority;
}
