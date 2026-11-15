namespace Sienar.Plugins.AspNet.RazorPages;

/// <summary>
/// Configures the host to use ASP.NET Razor Pages
/// </summary>
[Order(StartupSequence.Latest)]
public class AppConfigurer : IConfigurer<WebApplication>
{
	private readonly IEnumerable<IConfigurer<PageActionEndpointConventionBuilder>> _razorPagesConfigurers;

	/// <summary>
	/// Creates a new instance of <c>RazorPagesHostConfigurer</c>
	/// </summary>
	/// <param name="razorPagesConfigurers">The page action endpoint convention builder configurers</param>
	public AppConfigurer(
		IEnumerable<IConfigurer<PageActionEndpointConventionBuilder>> razorPagesConfigurers)
	{
		_razorPagesConfigurers = razorPagesConfigurers;
	}

	/// <inheritdoc />
	public void Configure(WebApplication app)
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
