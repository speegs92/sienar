using Microsoft.AspNetCore.Components.Endpoints;

namespace Sienar.Configuration.Blazor;

/// <summary>
/// Configures the application builder to use ASP.NET Blazor
/// </summary>
public class BuilderConfigurer : IConfigurer<IBuilderAdapter>
{
	private readonly IEnumerable<IConfigurer<RazorComponentsServiceOptions>> _razorComponentsServiceOptionsConfigurers;
	private readonly IEnumerable<IConfigurer<IRazorComponentsBuilder>> _razorComponentsBuilderConfigurers;

	/// <summary>
	/// Creates a new instance of <c>Builderconfigurer</c>
	/// </summary>
	/// <param name="razorComponentsServiceOptionsConfigurers">The razor components service options configurers</param>
	/// <param name="razorComponentsBuilderConfigurers">The razor components builder configurers</param>
	public BuilderConfigurer(
		IEnumerable<IConfigurer<RazorComponentsServiceOptions>> razorComponentsServiceOptionsConfigurers,
		IEnumerable<IConfigurer<IRazorComponentsBuilder>> razorComponentsBuilderConfigurers)
	{
		_razorComponentsServiceOptionsConfigurers = razorComponentsServiceOptionsConfigurers;
		_razorComponentsBuilderConfigurers = razorComponentsBuilderConfigurers;
	}

	/// <inheritdoc />
	public void Configure(IBuilderAdapter adapter)
	{
		var blazorBuilder = adapter.Services
			.AddRazorComponents(o =>
			{
				foreach (var configurer in _razorComponentsServiceOptionsConfigurers)
				{
					configurer.Configure(o);
				}
			});

		foreach (var configurer in _razorComponentsBuilderConfigurers)
		{
			configurer.Configure(blazorBuilder);
		}
	}
}
