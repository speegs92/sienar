using Microsoft.AspNetCore.Authorization;

namespace Sienar.Plugins.AspNet.Authorization;

/// <summary>
/// Configures the application builder to use ASP.NET authorization
/// </summary>
public class WebBuilderConfigurer : IConfigurer<WebApplicationBuilder>
{
	private readonly IEnumerable<IConfigurer<AuthorizationOptions>> _optionsConfigurers;

	/// <summary>
	/// Creates a new instance of <c>BuilderConfigurer</c>
	/// </summary>
	/// <param name="optionsConfigurers">The authorization options configurers</param>
	public WebBuilderConfigurer(
		IEnumerable<IConfigurer<AuthorizationOptions>> optionsConfigurers)
		=> _optionsConfigurers = optionsConfigurers;

	/// <inheritdoc />
	public void Configure(WebApplicationBuilder builder)
	{
		builder.Services.AddAuthorization(o =>
		{
			foreach (var configurer in _optionsConfigurers)
			{
				configurer.Configure(o);
			}
		});
	}
}
