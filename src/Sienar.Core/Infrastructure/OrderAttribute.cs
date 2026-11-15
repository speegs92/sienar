namespace Sienar.Infrastructure;

/// <summary>
/// Represents the order of a prioritized item or action
/// </summary>
[AttributeUsage(AttributeTargets.Class)]
public class OrderAttribute : Attribute
{
	/// <summary>
	/// The order
	/// </summary>
	public int Order { get; }

	/// <summary>
	/// Creates a new instance of <c>OrderAttribute</c>
	/// </summary>
	/// <param name="order">The order</param>
	public OrderAttribute(int order)
		=> Order = order;
}
