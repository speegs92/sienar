namespace Sienar.Plugins.AspNet.Mvc;

/// <summary>
/// Configures the host to use ASP.NET MVC middleware
/// </summary>
[Order(StartupSequence.Latest)]
public class AppConfigurer : IConfigurer<WebApplication>
{
	private readonly IEnumerable<IConfigurer<ControllerActionEndpointConventionBuilder>> _controllerConfigurers;

	/// <summary>
	/// Creates a new instance of <c>MvcHostConfigurer</c>
	/// </summary>
	/// <param name="controllerConfigurers">The controller action endpoint convention builder configurers</param>
	public AppConfigurer(
		IEnumerable<IConfigurer<ControllerActionEndpointConventionBuilder>> controllerConfigurers)
	{
		_controllerConfigurers = controllerConfigurers;
	}

	/// <inheritdoc />
	public void Configure(WebApplication app)
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
