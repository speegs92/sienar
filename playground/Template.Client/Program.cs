using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

await SienarApplicationBuilder
	.Create(args)
	.AddPlugin<TemplateClientPlugin>()
	.Build<WebAssemblyHost>()
	.RunAsync();
	