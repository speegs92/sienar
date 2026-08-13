using Microsoft.Extensions.Hosting;

namespace Sienar.Plugins;

/// <summary>
/// Represents a distributable plugin for Sienar applications
/// </summary>
public interface IPlugin
{
	/// <summary>
	/// Configures the application builder
	/// </summary>
	/// <remarks>
	/// This is the correct place to add dependent plugins and startup services, as the startup DI container hasn't been built yet. By the time the <see cref="ConfigureBuilder(IHostApplicationBuilder, IServiceProvider)"/> method is called, the startup DI container has been built and plugins are being actively enumerated, so further changes to the startup services or plugin hierarchy are no longer possible.
	/// </remarks>
	/// <param name="builder">The host application builder</param>
	void ConfigureBuilder(IHostApplicationBuilder builder);

	/// <summary>
	/// Configures the application builder after the startup service provider has been built
	/// </summary>
	/// <remarks>
	/// This is the correct place to configure runtime services which rely on <see cref="IConfigurer{TOptions}"/> implementations registered in the startup DI container. At this point, it is too late to add dependent plugins or configure startup services because the startup DI container has been built and plugins are being actively enumerated.
	/// </remarks>
	/// <param name="builder">The host application builder</param>
	/// <param name="sp">The startup service provider</param>
	void ConfigureBuilder(
		IHostApplicationBuilder builder,
		IServiceProvider sp);

	/// <summary>
	/// Configures the application
	/// </summary>
	/// <param name="app">The host application</param>
	/// <param name="sp">The startup service provider</param>
	void ConfigureApplication(
		IHost app,
		IServiceProvider sp);
}
