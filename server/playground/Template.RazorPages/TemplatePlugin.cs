using Sienar.Extensions;
using Sienar.Plugins;
using Template.Data;

namespace Template.RazorPages;

public class TemplatePlugin : IPlugin
{
	/// <inheritdoc />
	public void ConfigureSienar(SienarApplicationBuilder builder) {}

	/// <inheritdoc />
	public void ConfigureBuilder(
		IBuilderAdapter adapter,
		IServiceProvider sp)
	{
		adapter.Services.AddSienarDbContext<AppDbContext>(o => o.UseAppDb());
	}

	/// <inheritdoc />
	public void ConfigureApplication(
		HostAdapter adapter,
		IServiceProvider sp) {}
}
