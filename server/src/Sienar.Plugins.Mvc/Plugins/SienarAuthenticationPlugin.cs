using Microsoft.AspNetCore.Authentication;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET authentication services and middleware
/// </summary>
public class SienarAuthenticationPlugin : IPlugin
{
	/// <inheritdoc />
	public void ConfigureSienar(SienarApplicationBuilder builder)
	{
		builder.StartupServices
			.AddConfigurer<AuthenticationBuilderConfigurer, AuthenticationBuilder>()
			.AddConfigurer<AuthenticationConfigurer, AuthenticationOptions>();
	}

	/// <inheritdoc />
	public void ConfigureBuilder(
		IBuilderAdapter adapter,
		IServiceProvider sp)
	{
		var authBuilder = adapter.Services.AddAuthentication(o =>
		{
			var configurers = sp.GetServices<IConfigurer<AuthenticationOptions>>();

			foreach (var configurer in configurers)
			{
				configurer.Configure(o);
			}
		});

		var configurers = sp.GetServices<IConfigurer<AuthenticationBuilder>>();

		foreach (var configurer in configurers)
		{
			configurer.Configure(authBuilder);
		}
	}

	/// <inheritdoc />
	public void ConfigureApplication(
		HostAdapter adapter,
		IServiceProvider sp)
	{
		if (adapter.Host is not WebApplication webapp)
		{
			throw new InvalidOperationException($"The {nameof(SienarAuthenticationPlugin)} only works with ASP.NET web applications.");
		}

		var middlewareProvider = adapter.Services.GetRequiredService<MiddlewareProvider>();

		middlewareProvider.AddWithPriority(
			MvcMiddlewarePriorities.WithAuthentication,
			() => webapp.UseAuthentication());
	}
}
