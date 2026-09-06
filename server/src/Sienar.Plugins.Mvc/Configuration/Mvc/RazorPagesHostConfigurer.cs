namespace Sienar.Configuration.Mvc;

/// <summary>
/// Configures the host to use ASP.NET Razor Pages
/// </summary>
public class RazorPagesHostConfigurer : IConfigurer<HostAdapter>
{
	private readonly MiddlewareProvider _middlewareProvider;
	private readonly IEnumerable<IConfigurer<PageActionEndpointConventionBuilder>> _razorPagesConfigurers;

	/// <summary>
	/// Creates a new instance of <c>RazorPagesHostConfigurer</c>
	/// </summary>
	/// <param name="middlewareProvider">The middleware provider</param>
	/// <param name="razorPagesConfigurers">The page action endpoint convention builder configurers</param>
	public RazorPagesHostConfigurer(
		MiddlewareProvider middlewareProvider, 
		IEnumerable<IConfigurer<PageActionEndpointConventionBuilder>> razorPagesConfigurers)
	{
		_middlewareProvider = middlewareProvider;
		_razorPagesConfigurers = razorPagesConfigurers;
	}

	/// <inheritdoc />
	public void Configure(HostAdapter adapter)
	{
		if (adapter.Host is not WebApplication webapp)
		{
			throw new InvalidOperationException($"The {nameof(SienarMvcPlugin)} only works with ASP.NET web applications.");
		}

		_middlewareProvider.AddWithPriority(
			MvcMiddlewarePriorities.WithControllers,
			() => ConfigureRazorPages(webapp));
	}

	private void ConfigureRazorPages(WebApplication app)
	{
		var builder = app
			.MapRazorPages()
			.WithStaticAssets();

		foreach (var configurer in _razorPagesConfigurers)
		{
			configurer.Configure(builder);
		}
	}
}
