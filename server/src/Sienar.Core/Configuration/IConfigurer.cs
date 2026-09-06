namespace Sienar.Configuration;

/// <summary>
/// Used by Sienar to configure a service or middleware
/// </summary>
/// <typeparam name="T">the type of the class to configure</typeparam>
// ReSharper disable once TypeParameterCanBeVariant
public interface IConfigurer<T> where T : class
{
	/// <summary>
	/// Configures an instance of <c>T</c>
	/// </summary>
	/// <param name="target">the instance of <c>TOptions</c> to configure</param>
	void Configure(T target);
}