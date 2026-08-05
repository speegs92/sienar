using Microsoft.Extensions.DependencyInjection;

namespace Sienar.Extensions;

public static class SienarPluginsMvcServiceCollectionExtensions
{
	extension(IServiceCollection self)
	{
		public IServiceCollection AddSienarMvc()
		{
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
