using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Sienar.Configuration.Authentication;

/// <summary>
/// Configures the authentication options to use cookie authentication
/// </summary>
public class ServiceConfigurer : IConfigurer<AuthenticationOptions>
{
	/// <inheritdoc />
	public void Configure(AuthenticationOptions target)
	{
		target.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
		target.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
		target.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
	}
}
