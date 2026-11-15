using Sienar.Plugins;
using Template.Data;
using Template.RazorPages;

await SienarApplicationBuilder
	.Create(args)
	.AddPlugin<TemplatePlugin>()
	.AddPlugin<SienarIdentityPlugin<AppUser>>()
	.BuildWebApplication()
	.RunAsync();
