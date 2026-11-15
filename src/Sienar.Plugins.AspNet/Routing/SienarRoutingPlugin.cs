using Sienar.Plugins.AspNet.Routing;

// ReSharper disable once CheckNamespace
namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET routing middleware
/// </summary>
public class SienarRoutingPlugin : IPlugin
{
	/// <inheritdoc />
	public void Configure(SienarApplicationBuilder builder)
	{
		builder.StartupServices.AddWebApplicationConfigurer<AppConfigurer>();
	}
}
