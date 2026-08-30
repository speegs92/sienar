namespace Sienar.Infrastructure;

/// <summary>
/// The Sienar app builder, which is used to create Sienar applications
/// </summary>
public class SienarApplicationBuilder
{
	private IBuilderAdapter? _adapter;
	private readonly string[] _startupArgs;
	private readonly HashSet<Type> _pluginTypes = [];
	private readonly List<IPlugin> _plugins = [];

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
		StartupServices = new ServiceCollection();
		_startupArgs = args ?? [];

		StartupServices
			.AddSingleton<MiddlewareProvider>();
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
			plugin.ConfigureSienar(this);
			_plugins.Add(plugin);
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

	/// <summary>
	/// Sets the application adapter
	/// </summary>
	/// <param name="adapter">The application adapter</param>
	/// <returns>The Sienar app builder</returns>
	public SienarApplicationBuilder SetApplicationAdapter(IBuilderAdapter adapter)
	{
		_adapter = adapter;
		return this;
	}

	/// <summary>
	/// Builds the final application and returns it
	/// </summary>
	/// <remarks>
	/// This method is generic because different types of applications have different CLR types representing those applications. The CLR type of the final application should be provided as the generic argument.
	/// </remarks>
	/// <returns>the new application</returns>
	/// <typeparam name="T">The type of the final application</typeparam>
	public T Build<T>()
		where T : class
	{
		if (_adapter is null)
		{
			throw new InvalidOperationException($"You must register an {nameof(IBuilderAdapter)} before calling {nameof(Build)}");
		}

		_adapter.Create(_startupArgs, StartupServices);

		var container = StartupServices.BuildServiceProvider();
		var scope = container.CreateScope();
		var sp = scope.ServiceProvider;

		_adapter.Services
			.AddSingleton(sp.GetRequiredService<MiddlewareProvider>());

		foreach (var plugin in _plugins)
		{
			plugin.ConfigureBuilder(_adapter, sp);
		}

		var appAdapter = _adapter.Build(sp);

		foreach (var plugin in _plugins)
		{
			plugin.ConfigureApplication(appAdapter, sp);
		}

		var middlewares = appAdapter.Services.GetRequiredService<MiddlewareProvider>();

		foreach (var middleware in middlewares.AggregatePrioritized())
		{
			middleware();
		}

		return (T)appAdapter.Host;
	}
}
