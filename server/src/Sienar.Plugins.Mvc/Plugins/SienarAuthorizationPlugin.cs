using Sienar.Configuration.Authorization;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET authorization services and middleware
/// </summary>
public class SienarAuthorizationPlugin : IPlugin
{
	/// <inheritdoc />
	public void Configure(SienarApplicationBuilder builder)
	{
		// Authorization doesn't work without authentication
		builder.AddPlugin<SienarAuthenticationPlugin>();

		builder.StartupServices
			.AddBuilderConfigurer<BuilderConfigurer>()
			.AddHostConfigurer<HostConfigurer>();
	}
}
