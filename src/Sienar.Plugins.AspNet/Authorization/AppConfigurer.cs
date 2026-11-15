namespace Sienar.Plugins.AspNet.Authorization;

/// <summary>
/// Configures the host to use ASP.NET authorization middleware
/// </summary>
[Order(StartupSequence.Normal)]
public class AppConfigurer : IConfigurer<WebApplication>
{
	/// <inheritdoc />
	public void Configure(WebApplication app)
		=> app.UseAuthorization();
}
