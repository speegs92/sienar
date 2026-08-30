using Microsoft.AspNetCore.Authorization;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET authorization services and middleware
/// </summary>
public class SienarAuthorizationPlugin : IPlugin
{
	/// <inheritdoc />
	public void ConfigureSienar(SienarApplicationBuilder builder)
	{
		// Authorization doesn't work without authentication
		builder.AddPlugin<SienarAuthenticationPlugin>();
	}

	/// <inheritdoc />
	public void ConfigureBuilder(
		IBuilderAdapter adapter,
		IServiceProvider sp)
	{
		adapter.Services.AddAuthorization(o =>
		{
			var configurers = sp.GetServices<IConfigurer<AuthorizationOptions>>();

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
			throw new InvalidOperationException($"The {nameof(SienarAuthorizationPlugin)} only works with ASP.NET web applications.");
		}

		var middlewareProvider = adapter.Services.GetRequiredService<MiddlewareProvider>();

		middlewareProvider.AddWithPriority(
			MvcMiddlewarePriorities.WithAuthorization,
			() => webapp.UseAuthorization());
	}
}
