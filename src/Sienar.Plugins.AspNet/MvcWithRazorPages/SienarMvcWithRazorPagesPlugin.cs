using Sienar.Plugins.AspNet.MvcWithRazorPages;

// ReSharper disable once CheckNamespace
namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use MVC and Razor Pages services and middleware
/// </summary>
public class SienarMvcWithRazorPagesPlugin : IPlugin
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
			.AddWebApplicationConfigurer<AspNet.RazorPages.AppConfigurer>()
			.AddWebApplicationConfigurer<AspNet.Mvc.AppConfigurer>()
			.AddConfigurer<AspNet.Mvc.MvcBuilderConfigurer, IMvcBuilder>()
			.AddConfigurer<AspNet.Mvc.MvcOptionsConfigurer, MvcOptions>();
	}
}
