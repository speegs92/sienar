using Sienar.Plugins.AspNet.RazorPages;

// ReSharper disable once CheckNamespace
namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use Razor Pages services and middleware
/// </summary>
public class SienarRazorPagesPlugin : IPlugin
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
			.AddWebApplicationConfigurer<AppConfigurer>();
	}
}
