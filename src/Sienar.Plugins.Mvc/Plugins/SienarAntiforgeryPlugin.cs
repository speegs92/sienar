using Microsoft.AspNetCore.Antiforgery;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET antiforgery services and middleware
/// </summary>
[Priority(10)]
public class SienarAntiforgeryPlugin : IPlugin
{
	/// <inheritdoc />
	public void ConfigureBuilder(IHostApplicationBuilder builder)
	{
		builder.Services.AddConfigurer<AntiforgeryConfigurer, AntiforgeryOptions>();
	}

	/// <inheritdoc />
	public void ConfigureBuilder(
		IHostApplicationBuilder builder,
		IServiceProvider sp)
	{
		builder.Services.AddAntiforgery(o =>
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
		IHost app,
		IServiceProvider sp)
	{
		if (app is not WebApplication webapp)
		{
			throw new InvalidOperationException($"The {nameof(SienarAntiforgeryPlugin)} only works with ASP.NET web applications.");
		}

		webapp.UseAntiforgery();
	}
}
