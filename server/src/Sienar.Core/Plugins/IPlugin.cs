namespace Sienar.Plugins;

/// <summary>
/// Represents a distributable plugin for Sienar applications
/// </summary>
public interface IPlugin
{
	/// <summary>
	/// Configures the Sienar application
	/// </summary>
	/// <param name="builder">The Sienar application builder</param>
	void ConfigureSienar(SienarApplicationBuilder builder);

	/// <summary>
	/// Configures the underlying application builder
	/// </summary>
	/// <param name="adapter">The host application builder</param>
	/// <param name="sp">The startup service provider</param>
	void ConfigureBuilder(
		IBuilderAdapter adapter,
		IServiceProvider sp);

	/// <summary>
	/// Configures the application
	/// </summary>
	/// <param name="adapter">The host application adapter</param>
	/// <param name="sp">The startup service provider</param>
	void ConfigureApplication(
		HostAdapter adapter,
		IServiceProvider sp);
}
