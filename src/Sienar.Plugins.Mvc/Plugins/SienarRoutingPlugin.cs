using Sienar.Configuration.Routing;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET routing middleware
/// </summary>
public class SienarRoutingPlugin : IPlugin
{
	/// <inheritdoc />
	public void Configure(SienarApplicationBuilder builder)
	{
		builder.StartupServices.AddHostConfigurer<HostConfigurer>();
	}
}
