using Sienar.Configuration;
using Sienar.Extensions;

namespace Template.Configuration;

public class BuilderConfigurer : IConfigurer<IBuilderAdapter>
{
	/// <inheritdoc />
	public void Configure(IBuilderAdapter adapter)
	{
		adapter.Services.AddSienarDbContext<AppDbContext>(o => o.UseAppDb());
	}
}
