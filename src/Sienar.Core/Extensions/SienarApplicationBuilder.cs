using System.Reflection;
using Microsoft.Extensions.Hosting;

namespace Sienar.Extensions;

/// <summary>
/// Contains <see cref="IHostApplicationBuilder"/>  and <see cref="IHost"/> extension methods used by <c>Sienar.Core</c>
/// </summary>
public static class SienarApplicationBuilder
{
	private static readonly HashSet<Type> _pluginTypes = [];
	private static readonly List<IPlugin> _plugins = [];
	private static readonly PrioritizedDictionaryOfLists<IPlugin> _prioritizedPlugins = new();
	private static readonly IServiceCollection _startupServices = new ServiceCollection();
	private static IServiceScope _serviceScope = null!;

	/// <param name="builder">The host application builder</param>
	extension(IHostApplicationBuilder builder)
	{
		/// <summary>
		/// Adds services to the startup DI container
		/// </summary>
		/// <param name="action">The action used to add services</param>
		/// <returns>the host application builder</returns>
		public IHostApplicationBuilder AddStartupServices(Action<IServiceCollection> action)
		{
			action(_startupServices);
			return builder;
		}

		/// <summary>
		/// Adds a plugin to the Sienar app by its type
		/// </summary>
		/// <typeparam name="T">The type of the plugin</typeparam>
		/// <returns></returns>
		public IHostApplicationBuilder AddPlugin<T>()
			where T : IPlugin, new()
			=> builder.AddPlugin(new T());

		/// <summary>
		/// Adds a new plugin instance to the Sienar app
		/// </summary>
		/// <param name="plugin">The plugin to add</param>
		/// <returns>the host application builder</returns>
		public IHostApplicationBuilder AddPlugin(IPlugin plugin)
		{
			var pluginType = plugin.GetType();

			if (_pluginTypes.Add(pluginType))
			{
				plugin.ConfigureBuilder(builder);
				var pluginPriority = pluginType
					.GetCustomAttribute<PriorityAttribute>()
					?.Priority ?? 0;
				_plugins.Add(plugin);
				_prioritizedPlugins.AddWithPriority(pluginPriority, plugin);
			}

			return builder;
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
		/// Configures the Sienar application
		/// </summary>
		/// <returns></returns>
		public IHostApplicationBuilder ConfigureSienar()
		{
			var container = _startupServices.BuildServiceProvider();
			_serviceScope = container.CreateScope();

			foreach (var plugin in _plugins)
			{
				plugin.ConfigureBuilder(
					builder,
					_serviceScope.ServiceProvider);
			}

			return builder;
		}
	}

	/// <param name="app">The host application</param>
	extension(IHost app)
	{
		/// <summary>
		/// Organizes and executes Sienar plugins against the host application
		/// </summary>
		/// <returns>the host application</returns>
		public IHost UseSienar()
		{
			foreach (var plugin in _prioritizedPlugins.AggregatePrioritized())
			{
				plugin.ConfigureApplication(
					app,
					_serviceScope.ServiceProvider);
			}

			return app;
		}
	}
}
