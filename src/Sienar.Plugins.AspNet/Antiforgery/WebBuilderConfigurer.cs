using Microsoft.AspNetCore.Antiforgery;

namespace Sienar.Plugins.AspNet.Antiforgery;

/// <summary>
/// Configures the application builder to use ASP.NET antiforgery
/// </summary>
public class WebBuilderConfigurer : IConfigurer<WebApplicationBuilder>
{
	private readonly IEnumerable<IConfigurer<AntiforgeryOptions>> _configurers;

	/// <summary>
	/// Creates a new instance of <c>AntiforgeryPluginBuilderConfigurer</c>
	/// </summary>
	/// <param name="configurers">The registered antiforgery options configurers</param>
	public WebBuilderConfigurer(
		IEnumerable<IConfigurer<AntiforgeryOptions>> configurers)
		=> _configurers = configurers;

	/// <inheritdoc />
	public void Configure(WebApplicationBuilder builder)
	{
		builder.Services
			.AddScoped<ICsrfTokenRefresher, CsrfTokenRefresher>()
			.AddAntiforgery(o =>
			{
				foreach (var configurer in _configurers)
				{
					configurer.Configure(o);
				}
			});
	}
}
