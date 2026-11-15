namespace Sienar.Plugins.AspNet.Routing;

/// <summary>
/// Configures the host to use ASP.NET routing middleware
/// </summary>
[Order(StartupSequence.Early)]
public class AppConfigurer : IConfigurer<WebApplication>
{
	/// <inheritdoc />
	public void Configure(WebApplication app)
		=> app.UseRouting();
}
