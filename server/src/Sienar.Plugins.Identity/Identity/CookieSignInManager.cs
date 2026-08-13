using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Sienar.Identity;

public class CookieSignInManager<T> : ISignInManager<T>
	where T : class, ISienarIdentityUser<T>
{
	private readonly IHttpContextAccessor _contextAccessor;
	private readonly ICsrfTokenRefresher _csrfTokenRefresher;
	private readonly LoginOptions _loginOptions;
	private readonly IUserClaimsPrincipalFactory<T> _principalFactory;

	public CookieSignInManager(
		IHttpContextAccessor contextAccessor,
		ICsrfTokenRefresher csrfTokenRefresher,
		IOptions<LoginOptions> loginOptions,
		IUserClaimsPrincipalFactory<T> principalFactory)
	{
		_contextAccessor = contextAccessor;
		_csrfTokenRefresher = csrfTokenRefresher;
		_loginOptions = loginOptions.Value;
		_principalFactory = principalFactory;
	}

	/// <inheritdoc />
	public async Task SignIn(T user, bool isPersistent)
	{
		var authProperties = new AuthenticationProperties
		{
			IsPersistent = isPersistent,
			AllowRefresh = true,
			IssuedUtc = DateTimeOffset.UtcNow,
			ExpiresUtc = GetExpiration(isPersistent)
		};

		var claimsPrincipal = await _principalFactory.CreateAsync(user);
		await _contextAccessor.HttpContext!.SignInAsync(
			CookieAuthenticationDefaults.AuthenticationScheme,
			claimsPrincipal,
			authProperties);

		_contextAccessor.HttpContext!.User = claimsPrincipal;
		_csrfTokenRefresher.RefreshToken();
	}

	public async Task SignOut()
	{
		await _contextAccessor.HttpContext!.SignOutAsync(
			CookieAuthenticationDefaults.AuthenticationScheme);
		_contextAccessor.HttpContext!.User = new ClaimsPrincipal();
		_csrfTokenRefresher.RefreshToken();
	}

	private DateTimeOffset GetExpiration(bool isPersistent)
	{
		var duration = isPersistent
			? TimeSpan.FromDays(_loginOptions.PersistentLoginDuration)
			: TimeSpan.FromHours(_loginOptions.TransientLoginDuration);

		return DateTimeOffset.UtcNow + duration;
	}
}