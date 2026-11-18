using System.Reflection;

namespace Sienar.Extensions;

/// <summary>
/// Contains extension methods for the <c>Sienar.Core.Server</c> assembly
/// </summary>
public static class SienarCoreServerExtensions
{
	extension(SienarApplicationBuilder builder)
	{
		/// <summary>
		/// Builds the final application and returns it
		/// </summary>
		/// <returns></returns>
		public WebApplication BuildWebApplication()
		{
			var container = builder.StartupServices.BuildServiceProvider();
			var scope = container.CreateScope();
			var sp = scope.ServiceProvider;

			var webAppBuilder = WebApplication.CreateBuilder(builder.StartupArgs);

			var builderConfigurers = sp.GetServices<IConfigurer<WebApplicationBuilder>>();
			foreach (var configurer in builderConfigurers)
			{
				configurer.Configure(webAppBuilder);
			}

			var app = webAppBuilder.Build();

			var hostConfigurers = sp.GetServices<IConfigurer<WebApplication>>();
			foreach (var configurer in hostConfigurers)
			{
				configurer.Configure(app);
			}

			var prioritizedMiddlewares = new OrderedDictionaryOfLists<IConfigurer<WebApplication>>();
			var appConfigurers = app.Services.GetRequiredService<IEnumerable<IConfigurer<WebApplication>>>();

			foreach (var configurer in appConfigurers)
			{
				var priority = configurer
					.GetType()
					.GetCustomAttribute<OrderAttribute>()?
					.Order ?? 0;
				prioritizedMiddlewares.Add(
					priority,
					configurer);
			}

			foreach (var middleware in prioritizedMiddlewares.AggregateOrdered())
			{
				middleware.Configure(app);
			}

			return app;
		}
	}

	extension(IServiceCollection sc)
	{
		/// <summary>
		/// Adds a <see cref="WebApplicationBuilder"/> configurer to the service collection
		/// </summary>
		/// <typeparam name="T">The type of the web application builder configurer</typeparam>
		/// <returns></returns>
		public IServiceCollection AddWebBuilderConfigurer<T>()
			where T : class, IConfigurer<WebApplicationBuilder>
			=> sc.AddConfigurer<T, WebApplicationBuilder>();

		/// <summary>
		/// Adds a <see cref="WebApplication"/> configurer to the service collection
		/// </summary>
		/// <typeparam name="T">The type of the web application configurer</typeparam>
		/// <returns></returns>
		public IServiceCollection AddWebApplicationConfigurer<T>()
			where T : class, IConfigurer<WebApplication>
			=> sc.AddConfigurer<T, WebApplication>();

		/// <summary>
		/// Adds services necessary to use Sienar with MVC apps
		/// </summary>
		/// <returns></returns>
		public IServiceCollection AddSienarAspNet()
		{
			return sc
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
