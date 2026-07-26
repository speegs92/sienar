using Microsoft.Extensions.Hosting;

namespace Sienar;

/// <summary>
/// Contains constants used by <c>Sienar.Core</c>
/// </summary>
public static class SienarUtilsConstants
{
	/// <summary>
	/// The key used to identify the startup service collection container stored in <see cref="IHostApplicationBuilder.Properties"/>
	/// </summary>
	public const string ServiceCollection = nameof(ServiceCollection);
}
