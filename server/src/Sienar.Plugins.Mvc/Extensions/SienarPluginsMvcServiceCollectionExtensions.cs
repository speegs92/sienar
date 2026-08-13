namespace Sienar.Extensions;

/// <summary>
/// Contains <see cref="IServiceCollection"/> extension methods used by Sienar applications
/// </summary>
public static class SienarPluginsMvcServiceCollectionExtensions
{
	private static bool _initialized;

	/// <param name="self">The service collection</param>
	extension(IServiceCollection self)
	{
		/// <summary>
		/// Adds services necessary to use Sienar with MVC apps
		/// </summary>
		/// <returns></returns>
		public IServiceCollection AddSienarMvc()
		{
			if (_initialized)
			{
				return self;
			}

			_initialized = true;

			return self
				.AddHttpContextAccessor()
				.AddScoped<IUserAccessor, HttpContextUserAccessor>()
				.AddScoped<IEmailSender, DefaultEmailSender>()
				.AddScoped<IOperationResultMapper, DefaultOperationResultMapper>()
				.AddScoped(typeof(IReadActionOrchestrator<,>), typeof(DefaultReadActionOrchestrator<,>))
				.AddScoped(typeof(IReadAllActionOrchestrator<,>), typeof(DefaultReadAllActionOrchestrator<,>))
				.AddScoped(typeof(ICreateActionOrchestrator<,>), typeof(DefaultCreateActionOrchestrator<,>))
				.AddScoped(typeof(IUpdateActionOrchestrator<,>), typeof(DefaultUpdateActionOrchestrator<,>))
				.AddScoped(typeof(IDeleteActionOrchestrator<>), typeof(DefaultDeleteActionOrchestrator<>))
				.AddScoped(typeof(IGeneralActionOrchestrator<,>), typeof(DefaultGeneralActionOrchestrator<,>))
				.AddScoped(typeof(IStatusActionOrchestrator<>), typeof(DefaultStatusActionOrchestrator<>))
				.AddScoped(typeof(IResultActionOrchestrator<>), typeof(DefaultResultActionOrchestrator<>));
		}
	}
}
