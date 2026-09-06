using Sienar.Extensions;
using Sienar.Plugins;
using Template.RazorPages.Configuration;

namespace Template.RazorPages;

public class TemplatePlugin : IPlugin
{
	/// <inheritdoc />
	public void Configure(SienarApplicationBuilder builder)
	{
		builder.StartupServices.AddBuilderConfigurer<BuilderConfigurer>();
	}
}
