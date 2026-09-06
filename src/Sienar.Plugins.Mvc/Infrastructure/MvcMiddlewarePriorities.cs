namespace Sienar.Infrastructure;

/// <summary>
/// The priorities used by the MVC plugin
/// </summary>
public static class MvcMiddlewarePriorities
{
	/// <summary>
	/// The middleware position immediately before routing middleware
	/// </summary>
	public const int BeforeRouting = -21;

	/// <summary>
	/// The routing middleware position
	/// </summary>
	public const int WithRouting = -20;

	/// <summary>
	/// The middleware position immediately after routing middleware
	/// </summary>
	public const int AfterRouting = -19;

	/// <summary>
	/// The middleware position immediately before authentication middleware
	/// </summary>
	public const int BeforeAuthentication = -11;

	/// <summary>
	/// The authentication middleware position
	/// </summary>
	public const int WithAuthentication = -10;

	/// <summary>
	/// The middleware position immediately after authentication middleware
	/// </summary>
	public const int AfterAuthentication = -9;

	/// <summary>
	/// The middleware position immediately before authorization middleware
	/// </summary>
	public const int BeforeAuthorization = -1;

	/// <summary>
	/// The authorization middleware position
	/// </summary>
	public const int WithAuthorization = 0;

	/// <summary>
	/// The middleware position immediately after authorization middleware
	/// </summary>
	public const int AfterAuthorization = 1;

	/// <summary>
	/// The middleware position immediately before static assets middleware
	/// </summary>
	public const int BeforeStaticAssets = 9;

	/// <summary>
	/// The static assets middleware position
	/// </summary>
	public const int WithStaticAssets = 10;

	/// <summary>
	/// The middleware position immediately after static assets middleware
	/// </summary>
	public const int AfterStaticAssets = 11;

	/// <summary>
	/// The middleware position immediately before controller/Razor Pages middleware
	/// </summary>
	public const int BeforeControllers = 19;

	/// <summary>
	/// The controller/Razor Pages middleware position
	/// </summary>
	public const int WithControllers = 20;

	/// <summary>
	/// The middleware position immediately after controller/Razor Pages middleware
	/// </summary>
	public const int AfterControllers = 21;
}
