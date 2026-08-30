namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use ASP.NET static asset mapping middleware
/// </summary>
public class SienarStaticAssetsPlugin : IPlugin
{
	/// <inheritdoc />
	public void ConfigureSienar(SienarApplicationBuilder builder) {}

	/// <inheritdoc />
	public void ConfigureBuilder (
		IBuilderAdapter adapter,
		IServiceProvider sp) {}

	/// <inheritdoc />
	public void ConfigureApplication(
		HostAdapter adapter,
		IServiceProvider sp)
	{
		if (adapter.Host is not WebApplication webapp)
		{
			throw new InvalidOperationException($"The {nameof(SienarStaticAssetsPlugin)} only works with ASP.NET web applications.");
		}

		var middlewareProvider = adapter.Services.GetRequiredService<MiddlewareProvider>();

		middlewareProvider.AddWithPriority(
			MvcMiddlewarePriorities.WithStaticAssets,
			() => webapp.MapStaticAssets());
	}
}
