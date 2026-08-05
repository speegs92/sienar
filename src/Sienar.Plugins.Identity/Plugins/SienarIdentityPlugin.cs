using Microsoft.Extensions.Hosting;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application with user login and account management features
/// </summary>
/// <typeparam name="TUser">The type of the user entity</typeparam>
public class SienarIdentityPlugin<TUser> : IPlugin
	where TUser : class, ISienarIdentityUser<TUser>, new()
{
	/// <inheritdoc />
	public void ConfigureBuilder(IHostApplicationBuilder builder)
	{
		if (!builder.PluginIsRegistered<SienarMvcPlugin>() && !builder.PluginIsRegistered<SienarRazorPagesPlugin>())
		{
			throw new InvalidOperationException($"The {nameof(SienarIdentityPlugin<>)} requires you to register either the {nameof(SienarMvcPlugin)} or the {nameof(SienarRazorPagesPlugin)} prior to registering the {nameof(SienarIdentityPlugin<>)}.");
		}

		builder.Services.AddSienarIdentity<TUser>(builder.Configuration);
	}

	/// <inheritdoc />
	public void ConfigureBuilder(
		IHostApplicationBuilder builder,
		IServiceProvider sp) {}

	/// <inheritdoc />
	public void ConfigureApplication(
		IHost app,
		IServiceProvider sp) {}
}
