using Microsoft.AspNetCore.Authentication;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET authentication services and middleware
/// </summary>
[Priority(-10)]
public class SienarAuthenticationPlugin : IPlugin
{
	/// <inheritdoc />
	public void ConfigureBuilder(IHostApplicationBuilder builder) {}

	/// <inheritdoc />
	public void ConfigureBuilder(
		IHostApplicationBuilder builder,
		IServiceProvider sp)
	{
		var authBuilder = builder.Services.AddAuthentication(o =>
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
		IHost app,
		IServiceProvider sp)
	{
		if (app is not WebApplication webapp)
		{
			throw new InvalidOperationException($"The {nameof(SienarAuthenticationPlugin)} only works with ASP.NET web applications.");
		}

		webapp.UseAuthentication();
	}
}
