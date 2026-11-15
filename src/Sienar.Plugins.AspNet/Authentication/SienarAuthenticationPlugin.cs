using Microsoft.AspNetCore.Authentication;
using Sienar.Plugins.AspNet.Authentication;

// ReSharper disable once CheckNamespace
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
			.AddWebBuilderConfigurer<WebBuilderConfigurer>()
			.AddWebApplicationConfigurer<AppConfigurer>()
			.AddConfigurer<AspNetAuthenticationBuilderConfigurer, AuthenticationBuilder>()
			.AddConfigurer<ServiceConfigurer, AuthenticationOptions>();
	}
}
