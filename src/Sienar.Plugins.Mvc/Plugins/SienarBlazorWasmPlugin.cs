using Sienar.Configuration.Blazor;

namespace Sienar.Plugins;

/// <summary>
/// Configures the Sienar application to use Blazor WASM components
/// </summary>
public class SienarBlazorWasmPlugin : IPlugin
{
	/// <inheritdoc />
	public void Configure(SienarApplicationBuilder builder)
	{
		builder.AddPlugin<SienarBlazorPlugin>();

		builder.StartupServices.AddConfigurer<WasmBuilderConfigurer, IRazorComponentsBuilder>();
	}
}
