using Sienar.Extensions;

namespace Template;

public class TemplateServerPlugin : IPlugin
{
	/// <inheritdoc />
	public void Configure(SienarApplicationBuilder builder)
	{
		builder.AddPlugin<SienarBlazorWasmPlugin>();

		builder.StartupServices.AddBuilderConfigurer<BuilderConfigurer>();
	}
}
