namespace Sienar.Configuration.Mvc;

/// <summary>
/// Configures ASP.NET MVC to include an <see cref="AutoValidateAntiforgeryTokenAttribute"/>
/// </summary>
public class ServiceConfigurer : IConfigurer<MvcOptions>
{
	/// <inheritdoc />
	public void Configure(MvcOptions target)
	{
		target.Filters.Add(
			new AutoValidateAntiforgeryTokenAttribute());
	}
}