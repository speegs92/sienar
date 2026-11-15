using Microsoft.AspNetCore.Antiforgery;
using Sienar.Plugins.AspNet.Antiforgery;

// ReSharper disable once CheckNamespace
namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET antiforgery services and middleware
/// </summary>
public class SienarAntiforgeryPlugin : IPlugin
{
	/// <inheritdoc />
	public void Configure(SienarApplicationBuilder builder)
	{
		builder.StartupServices
			.AddWebBuilderConfigurer<WebBuilderConfigurer>()
			.AddWebApplicationConfigurer<AppAntiforgeryMiddlewareConfigurer>()
			.AddWebApplicationConfigurer<AppAntiforgeryCookieMiddlewareConfigurer>()
			.AddConfigurer<ServiceConfigurer, AntiforgeryOptions>();
	}
}
