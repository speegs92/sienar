using Sienar.Configuration;
using Sienar.Extensions;
using Template.Data;

namespace Template.RazorPages.Configuration;

public class BuilderConfigurer : IConfigurer<IBuilderAdapter>
{
	/// <inheritdoc />
	public void Configure(IBuilderAdapter adapter)
	{
		adapter.Services.AddSienarDbContext<AppDbContext>(o => o.UseAppDb());
	}
}
