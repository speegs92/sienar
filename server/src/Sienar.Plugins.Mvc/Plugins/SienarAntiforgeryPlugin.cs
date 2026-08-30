using Microsoft.AspNetCore.Antiforgery;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET antiforgery services and middleware
/// </summary>
public class SienarAntiforgeryPlugin : IPlugin
{
	/// <inheritdoc />
	public void ConfigureSienar(SienarApplicationBuilder builder)
	{
		builder.StartupServices.AddConfigurer<AntiforgeryConfigurer, AntiforgeryOptions>();
	}

	/// <inheritdoc />
	public void ConfigureBuilder(
		IBuilderAdapter adapter,
		IServiceProvider sp)
	{
		adapter.Services
			.AddScoped<ICsrfTokenRefresher, CsrfTokenRefresher>()
			.AddAntiforgery(o =>
			{
				var configurers = sp.GetServices<IConfigurer<AntiforgeryOptions>>();

				foreach (var configurer in configurers)
				{
					configurer.Configure(o);
				}
			});
	}

	/// <inheritdoc />
	public void ConfigureApplication(
		HostAdapter adapter,
		IServiceProvider sp)
	{
		if (adapter.Host is not WebApplication webapp)
		{
			throw new InvalidOperationException($"The {nameof(SienarAntiforgeryPlugin)} only works with ASP.NET web applications.");
		}

		var middlewareProvider = adapter.Services.GetRequiredService<MiddlewareProvider>();

		middlewareProvider.AddWithPriority(
			MvcMiddlewarePriorities.BeforeRouting,
			() => webapp.UseMiddleware<AntiforgeryCookieMiddleware>());

		middlewareProvider.AddWithPriority(
			MvcMiddlewarePriorities.WithStaticAssets,
			() => webapp.UseAntiforgery());
	}
}
