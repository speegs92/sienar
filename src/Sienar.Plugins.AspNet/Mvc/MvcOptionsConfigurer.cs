namespace Sienar.Plugins.AspNet.Mvc;

/// <summary>
/// Configures ASP.NET MVC to include an <see cref="AutoValidateAntiforgeryTokenAttribute"/>
/// </summary>
public class MvcOptionsConfigurer : IConfigurer<MvcOptions>
{
	/// <inheritdoc />
	public void Configure(MvcOptions target)
	{
		target.Filters.Add(
			new AutoValidateAntiforgeryTokenAttribute());
	}
}
