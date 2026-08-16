namespace Sienar.Configuration;

public class SienarIdentityMvcConfigurer<T> : IConfigurer<IMvcBuilder>
	where T : class, ISienarIdentityUser<T>, new()
{
	public void Configure(IMvcBuilder builder)
	{
		builder.ConfigureApplicationPartManager(o =>
		{
			o.FeatureProviders.Add(new SienarIdentityControllerFeatureProvider<T>());
		});
	}
}
