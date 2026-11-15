namespace Sienar.Plugins.AspNet.Antiforgery;

/// <summary>
/// Configures the host to use ASP.NET antiforgery middleware
/// </summary>
[Order(StartupSequence.SlightlyLate)]
public class AppAntiforgeryMiddlewareConfigurer : IConfigurer<WebApplication>
{
	/// <inheritdoc />
	public void Configure(WebApplication app)
		=> app.UseAntiforgery();
}
