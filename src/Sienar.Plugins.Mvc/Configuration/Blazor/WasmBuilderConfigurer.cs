namespace Sienar.Configuration.Blazor;

/// <summary>
/// Configures the <see cref="IRazorComponentsBuilder"/> to use 
/// </summary>
public class WasmBuilderConfigurer : IConfigurer<IRazorComponentsBuilder>
{
	/// <inheritdoc />
	public void Configure(IRazorComponentsBuilder builder)
	{
		builder.AddInteractiveWebAssemblyComponents();
	}
}
