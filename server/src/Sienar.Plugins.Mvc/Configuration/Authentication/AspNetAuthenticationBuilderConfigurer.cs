using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Sienar.Configuration.Authentication;

/// <summary>
/// Configures the authentication cookie
/// </summary>
public class AspNetAuthenticationBuilderConfigurer
	: IConfigurer<AuthenticationBuilder>
{
	private readonly IEnumerable<IConfigurer<CookieAuthenticationOptions>> _configurers;

	/// <summary>
	/// Creates a new instance of <c>AuthenticationBuilderConfigurer</c>
	/// </summary>
	/// <param name="configurers">The cookie authentication options configurers</param>
	public AspNetAuthenticationBuilderConfigurer(
		IEnumerable<IConfigurer<CookieAuthenticationOptions>> configurers)
		=> _configurers = configurers;

	/// <inheritdoc />
	public void Configure(AuthenticationBuilder target)
	{
		target.AddCookie(
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
