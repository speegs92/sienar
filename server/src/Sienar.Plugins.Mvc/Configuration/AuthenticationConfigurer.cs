using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Sienar.Configuration;

/// <summary>
/// Configures the authentication options to use cookie authentication
/// </summary>
public class AuthenticationConfigurer : IConfigurer<AuthenticationOptions>
{
	/// <inheritdoc />
	public void Configure(AuthenticationOptions options)
	{
		options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
		options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
		options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
	}
}
