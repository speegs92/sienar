using Microsoft.AspNetCore.Authentication;
using Sienar.Configuration.Authentication;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET authentication services and middleware
/// </summary>
public class SienarAuthenticationPlugin : IPlugin
{
	/// <inheritdoc />
	public void Configure(SienarApplicationBuilder builder)
	{
		builder.StartupServices
			.AddBuilderConfigurer<BuilderConfigurer>()
			.AddHostConfigurer<HostConfigurer>()
			.AddConfigurer<AspNetAuthenticationBuilderConfigurer, AuthenticationBuilder>()
			.AddConfigurer<ServiceConfigurer, AuthenticationOptions>();
	}
}
