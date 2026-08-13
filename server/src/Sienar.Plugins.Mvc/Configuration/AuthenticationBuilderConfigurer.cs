using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Sienar.Configuration;

/// <summary>
/// Configures the authentication cookie
/// </summary>
public class AuthenticationBuilderConfigurer
	: IConfigurer<AuthenticationBuilder>
{
	private readonly IEnumerable<IConfigurer<CookieAuthenticationOptions>> _configurers;

	/// <summary>
	/// Creates a new instance of <c>AuthenticationBuilderConfigurer</c>
	/// </summary>
	/// <param name="configurers">The cookie authentication options configurers</param>
	public AuthenticationBuilderConfigurer(
		IEnumerable<IConfigurer<CookieAuthenticationOptions>> configurers)
		=> _configurers = configurers;

	/// <inheritdoc />
	public void Configure(AuthenticationBuilder options)
	{
		options.AddCookie(
			CookieAuthenticationDefaults.AuthenticationScheme,
			o =>
			{
				foreach (var configurer in _configurers)
				{
					configurer.Configure(o);
				}
			});
	}
}
