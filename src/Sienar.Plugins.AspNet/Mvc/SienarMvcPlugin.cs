using Sienar.Plugins.AspNet.Mvc;

// ReSharper disable once CheckNamespace
namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use MVC services and middleware
/// </summary>
public class SienarMvcPlugin : IPlugin
{
	/// <inheritdoc />
	public void Configure(SienarApplicationBuilder builder)
	{
		builder
			.AddPlugin<SienarAuthorizationPlugin>()
			.AddPlugin<SienarRoutingPlugin>()
			.AddPlugin<SienarStaticAssetsPlugin>()
			.AddPlugin<SienarAntiforgeryPlugin>();

		builder.StartupServices
			.AddWebBuilderConfigurer<BuilderConfigurer>()
			.AddWebApplicationConfigurer<AppConfigurer>()
			.AddConfigurer<MvcBuilderConfigurer, IMvcBuilder>()
			.AddConfigurer<MvcOptionsConfigurer, MvcOptions>();
	}
}
