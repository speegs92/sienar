using Sienar.Plugins.AspNet.StaticAssets;

// ReSharper disable once CheckNamespace
namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET static asset mapping middleware
/// </summary>
public class SienarStaticAssetsPlugin : IPlugin
{
	/// <inheritdoc />
	public void Configure(SienarApplicationBuilder builder)
	{
		builder.StartupServices.AddWebApplicationConfigurer<HostConfigurer>();
	}
}
