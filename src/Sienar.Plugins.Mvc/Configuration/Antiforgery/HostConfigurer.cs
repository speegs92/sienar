namespace Sienar.Configuration.Antiforgery;

/// <summary>
/// Configures the host to use ASP.NET antiforgery middleware
/// </summary>
public class HostConfigurer : IConfigurer<HostAdapter>
{
	private readonly MiddlewareProvider _middlewareProvider;

	/// <summary>
	/// Creates a new instance of <c>HostConfigurer</c>
	/// </summary>
	/// <param name="middlewareProvider">The middleware provider</param>
	public HostConfigurer(
		MiddlewareProvider middlewareProvider)
		=> _middlewareProvider = middlewareProvider;

	/// <inheritdoc />
	public void Configure(HostAdapter adapter)
	{
		if (adapter.Host is not WebApplication webapp)
		{
			throw new InvalidOperationException($"The {nameof(SienarAntiforgeryPlugin)} only works with ASP.NET web applications.");
		}

		_middlewareProvider.AddWithPriority(
			MvcMiddlewarePriorities.BeforeRouting,
			() => webapp.UseMiddleware<AntiforgeryCookieMiddleware>());

		_middlewareProvider.AddWithPriority(
			MvcMiddlewarePriorities.WithStaticAssets,
			() => webapp.UseAntiforgery());
	}
}
