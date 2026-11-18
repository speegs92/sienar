using Sienar.Plugins;
using Template.RazorPages.Configuration;

namespace Template.RazorPages;

public class TemplatePlugin : IPlugin
{
	/// <inheritdoc />
	public void Configure(SienarApplicationBuilder builder)
	{
		builder.AddPlugin<SienarMvcWithRazorPagesPlugin>();
		builder.StartupServices.AddWebBuilderConfigurer<BuilderConfigurer>();
	}
}
