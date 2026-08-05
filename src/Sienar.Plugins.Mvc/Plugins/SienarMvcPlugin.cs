using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use MVC services and middleware
/// </summary>
[Priority(20)]
public class SienarMvcPlugin : IPlugin
{
	/// <inheritdoc />
	public void ConfigureBuilder(IHostApplicationBuilder builder)
	{
		builder
			.AddPlugin<SienarAuthorizationPlugin>()
			.AddPlugin<SienarRoutingPlugin>()
			.AddPlugin<SienarStaticAssetsPlugin>()
			.AddPlugin<SienarAntiforgeryPlugin>();

		builder.Services
			.AddSienarCore()
			.AddSienarMvc();
	}

	/// <inheritdoc />
	public void ConfigureBuilder(
		IHostApplicationBuilder builder,
		IServiceProvider sp)
	{
		var mvcBuilder = builder.Services.AddMvc(o =>
		{
			var configurers = sp.GetServices<IConfigurer<MvcOptions>>();

			foreach (var configurer in configurers)
			{
				configurer.Configure(o);
			}
		});

		builder.Services.Configure<RazorPagesOptions>(o =>
		{
			var configurers = sp.GetServices<IConfigurer<RazorPagesOptions>>();

			foreach (var configurer in configurers)
			{
				configurer.Configure(o);
			}
		});

		var configurers = sp.GetServices<IConfigurer<IMvcBuilder>>();

		foreach (var configurer in configurers)
		{
			configurer.Configure(mvcBuilder);
		}
	}

	/// <inheritdoc />
	public void ConfigureApplication(
		IHost app,
		IServiceProvider sp)
	{
		if (app is not WebApplication webapp)
		{
			throw new InvalidOperationException($"The {nameof(SienarMvcPlugin)} only works with ASP.NET web applications.");
		}

		ConfigureMvc(webapp, sp);
		ConfigureRazorPages(webapp, sp);
	}

	private static void ConfigureMvc(
		WebApplication app,
		IServiceProvider sp)
	{
		var configurers = sp.GetServices<IConfigurer<ControllerActionEndpointConventionBuilder>>();

		var builder = app
			.MapControllers()
			.WithStaticAssets();

		foreach (var configurer in configurers)
		{
			configurer.Configure(builder);
		}
	}

	private static void ConfigureRazorPages(
		WebApplication app,
		IServiceProvider sp)
	{
		var configurers = sp.GetServices<IConfigurer<PageActionEndpointConventionBuilder>>();

		var builder = app
			.MapRazorPages()
			.WithStaticAssets();

		foreach (var configurer in configurers)
		{
			configurer.Configure(builder);
		}
	}
}
