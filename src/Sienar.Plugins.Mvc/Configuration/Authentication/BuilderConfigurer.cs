using Microsoft.AspNetCore.Authentication;

namespace Sienar.Configuration.Authentication;

/// <summary>
/// Configures the application builder to use ASP.NET authentication
/// </summary>
public class BuilderConfigurer : IConfigurer<IBuilderAdapter>
{
	private readonly IEnumerable<IConfigurer<AuthenticationOptions>> _authOptionsConfigurers;
	private readonly IEnumerable<IConfigurer<AuthenticationBuilder>> _authBuilderConfigurers;

	/// <summary>
	/// Creates a new instance of <c>BuilderConfigurer</c>
	/// </summary>
	/// <param name="authOptionsConfigurers">The authentication options configurers</param>
	/// <param name="authBuilderConfigurers">The authentication builder configurers</param>
	public BuilderConfigurer(
		IEnumerable<IConfigurer<AuthenticationOptions>> authOptionsConfigurers,
		IEnumerable<IConfigurer<AuthenticationBuilder>> authBuilderConfigurers)
	{
		_authOptionsConfigurers = authOptionsConfigurers;
		_authBuilderConfigurers = authBuilderConfigurers;
	}

	/// <inheritdoc />
	public void Configure(IBuilderAdapter adapter)
	{
		var authBuilder = adapter.Services.AddAuthentication(o =>
		{
			foreach (var configurer in _authOptionsConfigurers)
			{
				configurer.Configure(o);
			}
		});

		foreach (var configurer in _authBuilderConfigurers)
		{
			configurer.Configure(authBuilder);
		}
	}
}
