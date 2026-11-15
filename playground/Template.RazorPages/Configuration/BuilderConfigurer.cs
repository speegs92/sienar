using Microsoft.AspNetCore.Builder;
using Sienar.Configuration;
using Sienar.Extensions;
using Template.Data;

namespace Template.RazorPages.Configuration;

public class BuilderConfigurer : IConfigurer<WebApplicationBuilder>
{
	/// <inheritdoc />
	public void Configure(WebApplicationBuilder builder)
	{
		builder.Services.AddSienarDbContext<AppDbContext>(o => o.UseAppDb());
	}
}
