namespace Sienar.Plugins.AspNet.Mvc;

/// <summary>
/// Configures the application builder to use ASP.NET MVC services
/// </summary>
public class BuilderConfigurer : IConfigurer<WebApplicationBuilder>
{
	private readonly IEnumerable<IConfigurer<MvcOptions>> _mvcOptionsConfigurers;
	private readonly IEnumerable<IConfigurer<IMvcBuilder>> _mvcBuilderConfigurers;

	/// <summary>
	/// Creates a new instance of <c>BuilderConfigurer</c>
	/// </summary>
	/// <param name="mvcOptionsConfigurers">The MVC options configurers</param>
	/// <param name="mvcBuilderConfigurers">The MVC builder configurers</param>
	public BuilderConfigurer(
		IEnumerable<IConfigurer<MvcOptions>> mvcOptionsConfigurers,
		IEnumerable<IConfigurer<IMvcBuilder>> mvcBuilderConfigurers)
	{
		_mvcOptionsConfigurers = mvcOptionsConfigurers;
		_mvcBuilderConfigurers = mvcBuilderConfigurers;
	}

	/// <inheritdoc />
	public void Configure(WebApplicationBuilder builder)
	{
		var mvcBuilder = builder.Services.AddMvc(o =>
		{
			foreach (var configurer in _mvcOptionsConfigurers)
			{
				configurer.Configure(o);
			}
		});

		foreach (var configurer in _mvcBuilderConfigurers)
		{
			configurer.Configure(mvcBuilder);
		}
	}
}
