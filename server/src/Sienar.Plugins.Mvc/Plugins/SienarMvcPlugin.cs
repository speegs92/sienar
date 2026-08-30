using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use MVC services and middleware
/// </summary>
public class SienarMvcPlugin : IPlugin
{
	/// <inheritdoc />
	public void ConfigureSienar(SienarApplicationBuilder builder)
	{
		builder
			.SetApplicationAdapter(new WebAdapter())
			.AddPlugin<SienarAuthorizationPlugin>()
			.AddPlugin<SienarRoutingPlugin>()
			.AddPlugin<SienarStaticAssetsPlugin>()
			.AddPlugin<SienarAntiforgeryPlugin>();

		builder.StartupServices
			.AddConfigurer<MvcBuilderConfigurer, IMvcBuilder>()
			.AddConfigurer<MvcConfigurer, MvcOptions>();
	}

	/// <inheritdoc />
	public void ConfigureBuilder(
		IBuilderAdapter adapter,
		IServiceProvider sp)
	{
		adapter.Services
			.AddSienarCore()
			.AddSienarMvc();

		var mvcBuilder = adapter.Services.AddMvc(o =>
		{
			var configurers = sp.GetServices<IConfigurer<MvcOptions>>();

			foreach (var configurer in configurers)
			{
				configurer.Configure(o);
			}
		});

		adapter.Services.Configure<RazorPagesOptions>(o =>
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
		HostAdapter adapter,
		IServiceProvider sp)
	{
		if (adapter.Host is not WebApplication webapp)
		{
			throw new InvalidOperationException($"The {nameof(SienarMvcPlugin)} only works with ASP.NET web applications.");
		}

		var middlewareProvider = adapter.Services.GetRequiredService<MiddlewareProvider>();

		middlewareProvider.AddWithPriority(
			MvcMiddlewarePriorities.WithControllers,
			() =>
			{
				ConfigureMvc(webapp, sp);
				ConfigureRazorPages(webapp, sp);
			});
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
