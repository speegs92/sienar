using Microsoft.AspNetCore.Http;

namespace Sienar.Security;

/// <summary>
/// Sets an antiforgery cookie for the SPA client if one does not exist
/// </summary>
public class AntiforgeryCookieMiddleware
{
	private readonly RequestDelegate _next;

	/// <summary>
	/// Creates a new instance of <c>AntiforgeryCookieMiddleware</c>
	/// </summary>
	/// <param name="next">The next middleware</param>
	public AntiforgeryCookieMiddleware(
		RequestDelegate next)
		=> _next = next;

	/// <summary>
	/// Initializes the CSRF token for the client if one hasn't been initialized
	/// </summary>
	/// <param name="context">The HTTP context</param>
	/// <param name="tokenRefresher">The CSRF token refresher</param>
	public Task InvokeAsync(
		HttpContext context,
		ICsrfTokenRefresher tokenRefresher)
	{
		if (!context.Request.Cookies.ContainsKey(ICsrfTokenRefresher.CsrfTokenCookieName))
		{
			tokenRefresher.RefreshToken();
		}

		return _next(context);
	}
}
