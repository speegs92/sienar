namespace Sienar.Plugins.AspNet.StaticAssets;

/// <summary>
/// Configures the host to use ASP.NET static asset middleware
/// </summary>
[Order(StartupSequence.SlightlyLate)]
public class HostConfigurer : IConfigurer<WebApplication>
{
	/// <inheritdoc />
	public void Configure(WebApplication app)
		=> app.MapStaticAssets();
}
