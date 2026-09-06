using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Sienar.Configuration.Mvc;

/// <summary>
/// Configures the application builder to use ASP.NET MVC
/// </summary>
public class BuilderConfigurer : IConfigurer<IBuilderAdapter>
{
	private readonly IEnumerable<IConfigurer<MvcOptions>> _mvcOptionsConfigurers;
	private readonly IEnumerable<IConfigurer<RazorPagesOptions>> _razorPagesOptionsConfigurers;
	private readonly IEnumerable<IConfigurer<IMvcBuilder>> _mvcBuilderConfigurers;

	/// <summary>
	/// Creates a new instance of <c>BuilderConfigurer</c>
	/// </summary>
	/// <param name="mvcOptionsConfigurers">The MVC options configurers</param>
	/// <param name="razorPagesOptionsConfigurers">The Razor Pages options configurers</param>
	/// <param name="mvcBuilderConfigurers">The MVC builder configurers</param>
	public BuilderConfigurer(
		IEnumerable<IConfigurer<MvcOptions>> mvcOptionsConfigurers, 
		IEnumerable<IConfigurer<RazorPagesOptions>> razorPagesOptionsConfigurers,
		IEnumerable<IConfigurer<IMvcBuilder>> mvcBuilderConfigurers)
	{
		_mvcOptionsConfigurers = mvcOptionsConfigurers;
		_razorPagesOptionsConfigurers = razorPagesOptionsConfigurers;
		_mvcBuilderConfigurers = mvcBuilderConfigurers;
	}

	/// <inheritdoc />
	public void Configure(IBuilderAdapter adapter)
	{
		adapter.Services
			.AddSienarCore()
			.AddSienarMvc();

		var mvcBuilder = adapter.Services.AddMvc(o =>
		{
			foreach (var configurer in _mvcOptionsConfigurers)
			{
				configurer.Configure(o);
			}
		});

		adapter.Services.Configure<RazorPagesOptions>(o =>
		{
			foreach (var configurer in _razorPagesOptionsConfigurers)
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
