using System.Reflection;

namespace Sienar.Infrastructure;

/// <summary>
/// The Sienar app builder, which is used to create Sienar applications
/// </summary>
public class SienarApplicationBuilder
{
	public readonly string[] StartupArgs;
	private readonly HashSet<Type> _pluginTypes = [];

	/// <summary>
	/// The Sienar application's startup services
	/// </summary>
	public IServiceCollection StartupServices { get; }

	/// <summary>
	/// Creates a new <c>SienarApplicationBuilder</c> and registers core Sienar services on its startup service collection
	/// </summary>
	/// <param name="args">The runtime arguments supplied to <c>Program.Main()</c></param>
	private SienarApplicationBuilder(string[]? args)
	{
		StartupArgs = args ?? [];
		StartupServices = new ServiceCollection();
	}

	/// <summary>
	/// Creates a new <c>SienarAppBuilder</c>
	/// </summary>
	/// <param name="args">The runtime arguments supplied to <c>Program.Main()</c></param>
	/// <returns>The Sienar app builder</returns>
	public static SienarApplicationBuilder Create(string[]? args = null)
	{
		return new SienarApplicationBuilder(args);
	}

	/// <summary>
	/// Adds a plugin to the Sienar app by its type
	/// </summary>
	/// <typeparam name="T">The type of the plugin</typeparam>
	/// <returns>the Sienar application builder</returns>
	public SienarApplicationBuilder AddPlugin<T>()
		where T : IPlugin, new()
		=> AddPlugin(new T());

	/// <summary>
	/// Adds a new plugin instance to the Sienar app
	/// </summary>
	/// <param name="plugin">The plugin to add</param>
	/// <returns>the Sienar application builder</returns>
	public SienarApplicationBuilder AddPlugin(IPlugin plugin)
	{
		var pluginType = plugin.GetType();

		if (_pluginTypes.Add(pluginType))
		{
			plugin.Configure(this);
		}

		return this;
	}

	/// <summary>
	/// Determines whether the given plugin is already registered
	/// </summary>
	/// <typeparam name="T">The type of the plugin to check</typeparam>
	/// <returns>whether the plugin is registered</returns>
	public bool PluginIsRegistered<T>()
		where T : IPlugin
		=> _pluginTypes.Contains(typeof(T));
}
