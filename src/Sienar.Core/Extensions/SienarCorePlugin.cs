using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

namespace Sienar.Extensions;

/// <summary>
/// Contains <see cref="IHostApplicationBuilder"/> extension methods used by <c>Sienar.Core</c>
/// </summary>
public static class SienarCorePlugin
{
	private static readonly IServiceCollection _startupServices = new ServiceCollection();
	private static bool _initialized;

	/// <param name="self">The host application builder</param>
	extension(WebApplicationBuilder self)
	{
		/// <summary>
		/// Configures the <see cref="IHostApplicationBuilder">host application builder</see> to work with Sienar
		/// </summary>
		/// <returns>the host application builder</returns>
		public WebApplicationBuilder AddSienar()
		{
			if (_initialized)
			{
				return self;
			}

			self.Services.AddSienarCore();

			_initialized = true;

			return self;
		}

		/// <summary>
		/// Adds services to the startup service collection
		/// </summary>
		/// <param name="configurer">The action which adds services</param>
		/// <returns>the host application builder</returns>
		public WebApplicationBuilder AddStartupServices(Action<IServiceCollection> configurer)
		{
			configurer(_startupServices);
			return self;
		}
	}
}
