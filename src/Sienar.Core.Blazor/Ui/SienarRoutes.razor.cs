using System.Reflection;

namespace Sienar.Ui;

/// <summary>
/// The Sienar client-side routing entrypoint
/// </summary>
public partial class SienarRoutes<T>
{
	private Assembly _rootAssembly = null!;
	private List<Assembly> _routableAssemblies = null!;

	/// <inheritdoc />
	protected override void OnInitialized()
	{
		_routableAssemblies = [..App.RoutableAssemblies];
		_rootAssembly = _routableAssemblies[0];
		_routableAssemblies.RemoveAt(0);
	}
}
