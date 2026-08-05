using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use Razor Pages services and middleware
/// </summary>
[Priority(20)]
public class SienarRazorPagesPlugin : IPlugin
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
		Action<RazorPagesOptions> optionsConfigurer = o =>
		{
			var configurers = sp.GetServices<IConfigurer<RazorPagesOptions>>();

			foreach (var configurer in configurers)
			{
				configurer.Configure(o);
			}
		};

		// If the MVC plugin is already registered, it called .AddMvc() - which also calls .AddRazorPages(), so it would be redundant to do it again.
		// All we need to do is configure the RazorPagesOptions, which .AddMvc() does not do.
		// We can also safely skip configuring the IMvcBuilder, as this is just a simple wrapper around the service collection and application part manager, both of which are functionally singleton - so if the MVC plugin is already registered, the IMvcBuilder configurers will all be called, even the ones which are intended to configure Razor Pages.
		if (builder.PluginIsRegistered<SienarMvcPlugin>())
		{
			builder.Services.Configure(optionsConfigurer);
			return;
		}

		var mvcBuilder = builder.Services.AddRazorPages(optionsConfigurer);

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
			throw new InvalidOperationException($"The {nameof(SienarRazorPagesPlugin)} only works with ASP.NET web applications.");
		}

		var configurers = sp.GetServices<IConfigurer<PageActionEndpointConventionBuilder>>();

		var builder = webapp
			.MapRazorPages()
			.WithStaticAssets();

		foreach (var configurer in configurers)
		{
			configurer.Configure(builder);
		}
	}
}
