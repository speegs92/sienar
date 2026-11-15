namespace Sienar.Plugins.AspNet.Authentication;

/// <summary>
/// Configures the host to use ASP.NET authentication middleware
/// </summary>
[Order(StartupSequence.SlightlyEarly)]
public class AppConfigurer : IConfigurer<WebApplication>
{
	/// <inheritdoc />
	public void Configure(WebApplication app)
		=> app.UseAuthentication();
}
