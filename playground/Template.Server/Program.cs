using Microsoft.AspNetCore.Builder;

await SienarApplicationBuilder
	.Create(args)
	.AddPlugin<TemplateServerPlugin>()
	.AddPlugin<SienarIdentityPlugin<AppUser>>()
	.Build<WebApplication>()
	.RunAsync();
