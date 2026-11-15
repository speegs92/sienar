using Microsoft.AspNetCore.Builder;

namespace Sienar.Configuration;

/// <summary>
/// Configures the application builder to use Sienar Identity
/// </summary>
/// <typeparam name="TUser">The type of the identity user</typeparam>
public class SienarIdentityBuilderConfigurer<TUser> : IConfigurer<WebApplicationBuilder>
	where TUser : class, ISienarIdentityUser<TUser>, new()
{
	/// <inheritdoc />
	public void Configure(WebApplicationBuilder builder)
	{
		builder.Services.AddSienarIdentity<TUser>(builder.Configuration);
	}
}
