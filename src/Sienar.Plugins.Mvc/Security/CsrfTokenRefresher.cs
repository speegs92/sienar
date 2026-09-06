using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;

namespace Sienar.Security;

/// <summary>
/// The default implementation of <see cref="ICsrfTokenRefresher"/>
/// </summary>
public class CsrfTokenRefresher : ICsrfTokenRefresher
{
	private readonly IAntiforgery _antiforgery;
	private readonly IHttpContextAccessor _httpContextAccessor;

	/// <summary>
	/// Creates a new instance of <c>CsrfTokenRefresher</c>
	/// </summary>
	/// <param name="antiforgery">The ASP.NET antiforgery system</param>
	/// <param name="httpContextAccessor">The context accessor</param>
	public CsrfTokenRefresher(
		IAntiforgery antiforgery,
		IHttpContextAccessor httpContextAccessor)
	{
		_antiforgery = antiforgery;
		_httpContextAccessor = httpContextAccessor;
	}

	/// <inheritdoc />
	public void RefreshToken()
	{
		var tokens = _antiforgery.GetAndStoreTokens(
			_httpContextAccessor.HttpContext!);

		_httpContextAccessor.HttpContext!.Response.Cookies
			.Append(
				ICsrfTokenRefresher.CsrfTokenCookieName,
				tokens.RequestToken!,
				new CookieOptions { HttpOnly = false});
	}
}