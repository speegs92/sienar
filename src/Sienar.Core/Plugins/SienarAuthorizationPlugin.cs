using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET authorization services and middleware
/// </summary>
[Priority(0)]
public class SienarAuthorizationPlugin : IPlugin
{
	/// <inheritdoc />
	public void ConfigureBuilder(IHostApplicationBuilder builder)
	{
		// Authorization doesn't work without authentication
		builder.AddPlugin<SienarAuthenticationPlugin>();
	}

	/// <inheritdoc />
	public void ConfigureBuilder(
		IHostApplicationBuilder builder,
		IServiceProvider sp)
	{
		builder.Services.AddAuthorization(o =>
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
		IHost app,
		IServiceProvider sp)
	{
		if (app is not WebApplication webapp)
		{
			throw new InvalidOperationException($"The {nameof(SienarAuthorizationPlugin)} only works with ASP.NET web applications.");
		}

		webapp.UseAuthorization();
	}
}
