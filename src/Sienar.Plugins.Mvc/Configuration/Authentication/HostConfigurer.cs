namespace Sienar.Configuration.Authentication;

/// <summary>
/// Configures the host to use ASP.NET authentication middleware
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
			throw new InvalidOperationException($"The {nameof(SienarAuthenticationPlugin)} only works with ASP.NET web applications.");
		}

		_middlewareProvider.AddWithPriority(
			MvcMiddlewarePriorities.WithAuthentication,
			() => webapp.UseAuthentication());
	}
}
