using System.Reflection;
using System.Reflection.Metadata;

namespace Sienar.Ui;

/// <summary>
/// The Sienar client-side routing entrypoint
/// </summary>
public partial class SienarRoutes
{
	private Assembly _rootAssembly = null!;
	private List<Assembly> _routableAssemblies = null!;
		
	/// <summary>
	/// The name of the Blazor app to render
	/// </summary>
	[Parameter]
	[EditorRequired]
	public string App { get; set; }

	/// <inheritdoc />
	protected override void OnInitialized()
	{
		_routableAssemblies = [..AppProvider[App].RoutableAssemblies];
		_rootAssembly = _routableAssemblies[0];
		_routableAssemblies.RemoveAt(0);
	}
}
