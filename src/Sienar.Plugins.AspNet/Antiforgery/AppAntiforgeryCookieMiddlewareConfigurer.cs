namespace Sienar.Plugins.AspNet.Antiforgery;

/// <summary>
/// Configures the app to use Sienar antiforgery cookie middleware
/// </summary>
[Order(StartupSequence.Early - 1)]
public class AppAntiforgeryCookieMiddlewareConfigurer : IConfigurer<WebApplication>
{
	/// <inheritdoc />
	public void Configure(WebApplication app)
		=> app.UseMiddleware<AntiforgeryCookieMiddleware>();
}
