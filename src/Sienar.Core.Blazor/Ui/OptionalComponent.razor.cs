namespace Sienar.Ui;

/// <summary>
/// Optionally renders a component by type if that type exists
/// </summary>
public partial class OptionalComponent : ComponentBase
{
	/// <summary>
	/// The type of the optional component
	/// </summary>
	[Parameter]
	public Type? Type { get; set; }
}

