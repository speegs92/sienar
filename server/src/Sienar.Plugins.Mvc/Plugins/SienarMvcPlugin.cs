using Sienar.Configuration.Mvc;

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
			.SetApplicationAdapter(new WebAdapter())
			.AddPlugin<SienarAuthorizationPlugin>()
			.AddPlugin<SienarRoutingPlugin>()
			.AddPlugin<SienarStaticAssetsPlugin>()
			.AddPlugin<SienarAntiforgeryPlugin>();

		builder.StartupServices
			.AddBuilderConfigurer<BuilderConfigurer>()
			.AddHostConfigurer<MvcHostConfigurer>()
			.AddHostConfigurer<RazorPagesHostConfigurer>()
			.AddConfigurer<AspNetMvcBuilderConfigurer, IMvcBuilder>()
			.AddConfigurer<ServiceConfigurer, MvcOptions>();
	}
}
