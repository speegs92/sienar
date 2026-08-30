using Microsoft.Extensions.Hosting;

namespace Sienar.Infrastructure;

/// <summary>
/// Abstracts various .NET application builders
/// </summary>
public interface IBuilderAdapter : IHostApplicationBuilder
{
	/// <summary>
	/// Calls the underlying app builder's <c>Create()</c> method
	/// </summary>
	/// <param name="args">The application startup CLI arguments</param>
	/// <param name="startupServices">The application startup services</param>
	void Create(string[] args, IServiceCollection startupServices);

	/// <summary>
	/// Calls the underlying app builder's <c>Build()</c> method
	/// </summary>
	/// <param name="startupServiceProvider">The application startup service container</param>
	/// <returns>The built application</returns>
	HostAdapter Build(IServiceProvider startupServiceProvider);
}
