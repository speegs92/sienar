using Microsoft.AspNetCore.Antiforgery;
using Sienar.Configuration.Antiforgery;

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
			.AddBuilderConfigurer<BuilderConfigurer>()
			.AddHostConfigurer<HostConfigurer>()
			.AddConfigurer<ServiceConfigurer, AntiforgeryOptions>();
	}
}
