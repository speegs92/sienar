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
	/// <param name="builder">The host application builder</param>
	void ConfigureBuilder(IHostApplicationBuilder builder);

	/// <summary>
	/// Configures the application builder after the startup service provider has been built
	/// </summary>
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
