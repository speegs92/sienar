using Sienar.Configuration.Blazor;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use Blazor services and middleware
/// </summary>
public class SienarBlazorPlugin : IPlugin
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
			.AddBuilderConfigurer<BuilderConfigurer>();
	}
}
