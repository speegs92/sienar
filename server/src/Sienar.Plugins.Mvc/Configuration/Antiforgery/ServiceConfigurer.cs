using Microsoft.AspNetCore.Antiforgery;

namespace Sienar.Configuration.Antiforgery;

/// <summary>
/// Configures ASP.NET Antiforgery to expect a header named <c>X-XSRF-TOKEN</c>
/// </summary>
public class ServiceConfigurer : IConfigurer<AntiforgeryOptions>
{
	/// <inheritdoc />
	public void Configure(AntiforgeryOptions target)
	{
		target.HeaderName = "X-XSRF-TOKEN";
	}
}