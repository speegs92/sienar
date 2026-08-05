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
			.AddPlugin<SienarStaticAssetsPlugin>();

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

		var configurers = sp.GetServices<IConfigurer<ControllerActionEndpointConventionBuilder>>();

		var builder = webapp
			.MapControllers()
			.WithStaticAssets();

		foreach (var configurer in configurers)
		{
			configurer.Configure(builder);
		}
	}
}
