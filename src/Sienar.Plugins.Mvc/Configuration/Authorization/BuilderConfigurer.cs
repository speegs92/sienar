using Microsoft.AspNetCore.Authorization;

namespace Sienar.Configuration.Authorization;

/// <summary>
/// Configures the application builder to use ASP.NET authorization
/// </summary>
public class BuilderConfigurer : IConfigurer<IBuilderAdapter>
{
	private readonly IEnumerable<IConfigurer<AuthorizationOptions>> _optionsConfigurers;

	/// <summary>
	/// Creates a new instance of <c>BuilderConfigurer</c>
	/// </summary>
	/// <param name="optionsConfigurers">The authorization options configurers</param>
	public BuilderConfigurer(
		IEnumerable<IConfigurer<AuthorizationOptions>> optionsConfigurers)
		=> _optionsConfigurers = optionsConfigurers;

	/// <inheritdoc />
	public void Configure(IBuilderAdapter adapter)
	{
		adapter.Services.AddAuthorization(o =>
		{
			foreach (var configurer in _optionsConfigurers)
			{
				configurer.Configure(o);
			}
		});
	}
}
