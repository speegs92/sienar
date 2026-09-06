namespace Sienar.Configuration.Mvc;

/// <summary>
/// Configures the host to use ASP.NET MVC middleware
/// </summary>
public class MvcHostConfigurer : IConfigurer<HostAdapter>
{
	private readonly MiddlewareProvider _middlewareProvider;
	private readonly IEnumerable<IConfigurer<ControllerActionEndpointConventionBuilder>> _controllerConfigurers;

	/// <summary>
	/// Creates a new instance of <c>MvcHostConfigurer</c>
	/// </summary>
	/// <param name="middlewareProvider">The middleware provider</param>
	/// <param name="controllerConfigurers">The controller action endpoint convention builder configurers</param>
	public MvcHostConfigurer(
		MiddlewareProvider middlewareProvider,
		IEnumerable<IConfigurer<ControllerActionEndpointConventionBuilder>> controllerConfigurers)
	{
		_middlewareProvider = middlewareProvider;
		_controllerConfigurers = controllerConfigurers;
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
			() => ConfigureMvc(webapp));
	}

	private void ConfigureMvc(WebApplication app)
	{
		var builder = app
			.MapControllers()
			.WithStaticAssets();

		foreach (var configurer in _controllerConfigurers)
		{
			configurer.Configure(builder);
		}
	}
}
