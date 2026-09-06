using Microsoft.AspNetCore.Antiforgery;

namespace Sienar.Configuration.Antiforgery;

/// <summary>
/// Configures the application builder to use ASP.NET antiforgery
/// </summary>
public class BuilderConfigurer : IConfigurer<IBuilderAdapter>
{
	private readonly IEnumerable<IConfigurer<AntiforgeryOptions>> _configurers;

	/// <summary>
	/// Creates a new instance of <c>AntiforgeryPluginBuilderConfigurer</c>
	/// </summary>
	/// <param name="configurers">The registered antiforgery options configurers</param>
	public BuilderConfigurer(
		IEnumerable<IConfigurer<AntiforgeryOptions>> configurers)
		=> _configurers = configurers;

	/// <inheritdoc />
	public void Configure(IBuilderAdapter target)
	{
		target.Services
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
