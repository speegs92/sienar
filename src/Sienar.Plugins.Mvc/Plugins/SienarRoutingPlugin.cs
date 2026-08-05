namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET routing middleware
/// </summary>
[Priority(-20)]
public class SienarRoutingPlugin : IPlugin
{
	/// <inheritdoc />
	public void ConfigureBuilder(IHostApplicationBuilder builder) {}

	/// <inheritdoc />
	public void ConfigureBuilder(
		IHostApplicationBuilder builder,
		IServiceProvider sp) {}

	/// <inheritdoc />
	public void ConfigureApplication(
		IHost app,
		IServiceProvider sp)
	{
		if (app is not WebApplication webapp)
		{
			throw new InvalidOperationException($"The {nameof(SienarRoutingPlugin)} only works with ASP.NET web applications.");
		}

		webapp.UseRouting();
	}
}
