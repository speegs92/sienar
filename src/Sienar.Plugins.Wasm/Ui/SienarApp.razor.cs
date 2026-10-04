namespace Sienar.Ui;

/// <summary>
/// A rendered Sienar client application
/// </summary>
public partial class SienarApp
{
	/// <summary>
	/// The name of the Blazor app to render
	/// </summary>
	[Parameter]
	[EditorRequired]
	public string App { get; set; }
}
