namespace Sienar.Configuration;

/// <summary>
/// Configures the application builder to use Sienar Identity
/// </summary>
/// <typeparam name="TUser">The type of the identity user</typeparam>
public class SienarIdentityBuilderConfigurer<TUser> : IConfigurer<IBuilderAdapter>
	where TUser : class, ISienarIdentityUser<TUser>, new()
{
	/// <inheritdoc />
	public void Configure(IBuilderAdapter adapter)
	{
		adapter.Services.AddSienarIdentity<TUser>(adapter.Configuration);
	}
}
