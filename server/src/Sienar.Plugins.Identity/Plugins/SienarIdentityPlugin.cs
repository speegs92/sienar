namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application with user login and account management features
/// </summary>
/// <typeparam name="TUser">The type of the user entity</typeparam>
public class SienarIdentityPlugin<TUser> : IPlugin
	where TUser : class, ISienarIdentityUser<TUser>, new()
{
	/// <inheritdoc />
	public void ConfigureSienar(SienarApplicationBuilder builder)
	{
		builder.AddPlugin<SienarMvcPlugin>();

		builder.StartupServices
			.AddConfigurer<SienarIdentityMvcConfigurer<TUser>, IMvcBuilder>();
	}

	/// <inheritdoc />
	public void ConfigureBuilder(
		IBuilderAdapter adapter,
		IServiceProvider sp)
	{
		adapter.Services
			.AddSienarEf()
			.AddSienarIdentity<TUser>(adapter.Configuration);
	}

	/// <inheritdoc />
	public void ConfigureApplication(
		HostAdapter adapter,
		IServiceProvider sp) {}
}
