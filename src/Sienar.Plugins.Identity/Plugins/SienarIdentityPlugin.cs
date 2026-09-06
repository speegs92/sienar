namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application with user login and account management features
/// </summary>
/// <typeparam name="TUser">The type of the user entity</typeparam>
public class SienarIdentityPlugin<TUser> : IPlugin
	where TUser : class, ISienarIdentityUser<TUser>, new()
{
	/// <inheritdoc />
	public void Configure(SienarApplicationBuilder builder)
	{
		builder.AddPlugin<SienarMvcPlugin>();

		builder.StartupServices
			.AddBuilderConfigurer<SienarIdentityBuilderConfigurer<TUser>>()
			.AddConfigurer<SienarIdentityMvcConfigurer<TUser>, IMvcBuilder>();
	}
}
