namespace Sienar.Configuration;

/// <summary>
/// Configures the MVC builder to use Sienar controllers
/// </summary>
/// <typeparam name="T"></typeparam>
public class SienarIdentityMvcConfigurer<T> : IConfigurer<IMvcBuilder>
	where T : class, ISienarIdentityUser<T>, new()
{
	public void Configure(IMvcBuilder target)
	{
		target.ConfigureApplicationPartManager(o =>
		{
			o.FeatureProviders.Add(new SienarIdentityControllerFeatureProvider<T>());
		});
	}
}
