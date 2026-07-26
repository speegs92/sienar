using Microsoft.Extensions.Hosting;

namespace Sienar.Extensions;

/// <summary>
/// Contains <see cref="IHostApplicationBuilder"/> extension methods used by <c>Sienar.Core</c>
/// </summary>
public static class SienarCorePlugin
{
	private static bool _initialized;

	/// <param name="self">The host application builder</param>
	extension(IHostApplicationBuilder self)
	{
		/// <summary>
		/// Configures the <see cref="IHostApplicationBuilder">host application builder</see> to work with Sienar
		/// </summary>
		/// <returns>the host application builder</returns>
		public IHostApplicationBuilder AddSienar()
		{
			if (_initialized)
			{
				return self;
			}

			self.Properties[SienarUtilsConstants.ServiceCollection] = new ServiceCollection();

			self.Services
				.AddScoped(typeof(IStatusActor<>), typeof(DefaultStatusActor<>))
				.AddScoped(typeof(IGeneralActor<,>), typeof(DefaultGeneralActor<,>))
				.AddScoped(typeof(IResultActor<>), typeof(DefaultResultActor<>))
				.AddScoped(typeof(IAccessValidationRunner<>), typeof(DefaultAccessValidationRunner<>))
				.AddScoped(typeof(IStateValidationRunner<>), typeof(DefaultStateValidationRunner<>))
				.AddScoped(typeof(IBeforeActionRunner<,>), typeof(DefaultBeforeActionRunner<,>))
				.AddScoped(typeof(IAfterActionRunner<,>), typeof(DefaultAfterActionRunner<,>))
				.AddScoped<IBotDetector, DefaultBotDetector>()
				.AddScoped(typeof(IMapper<,>), typeof(DefaultMapper<,>))
				.AddScoped<IOperationResultNotifier, DefaultOperationResultNotifier>();

			_initialized = true;

			return self;
		}

		/// <summary>
		/// Adds services to the startup service collection
		/// </summary>
		/// <param name="configurer">The action which adds services</param>
		/// <returns>the host application builder</returns>
		public IHostApplicationBuilder AddStartupServices(Action<IServiceCollection> configurer)
		{
			configurer((self.Properties[SienarUtilsConstants.ServiceCollection] as IServiceCollection)!);
			return self;
		}
	}
}
