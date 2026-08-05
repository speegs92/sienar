using Microsoft.Extensions.DependencyInjection;

namespace Sienar.Extensions;

/// <summary>
/// Contains <see cref="IServiceCollection"/> extension methods used by Sienar applications
/// </summary>
public static class SienarEntityFrameworkServiceCollectionExtensions
{
	/// <param name="self">The service collection</param>
	extension(IServiceCollection self)
	{
		/// <summary>
		/// Adds the services necessary to use EntityFramework in Sienar apps
		/// </summary>
		/// <returns>the service collection</returns>
		public IServiceCollection AddSienarEf()
		{
			return self
				.AddScoped(typeof(IEntityReadActor<>), typeof(EfEntityReadActor<>))
				.AddScoped(typeof(IEntityReadAllActor<>), typeof(EfEntityReadAllActor<>))
				.AddScoped(typeof(IEntityCreateActor<>), typeof(EfEntityCreateActor<>))
				.AddScoped(typeof(IEntityUpdateActor<>), typeof(EfEntityUpdateActor<>))
				.AddScoped(typeof(IEntityDeleteActor<>), typeof(EfEntityDeleteActor<>));
		}

		/// <summary>
		/// Registers a <see cref="DbContext"/> as an <see cref="IDbContext"/>
		/// </summary>
		/// <param name="optionsAction">The options configuration, if any</param>
		/// <typeparam name="TContext">The type of the context</typeparam>
		/// <returns>The service collection</returns>
		public IServiceCollection AddSienarDbContext<TContext>(
			Action<DbContextOptionsBuilder>? optionsAction = null)
			where TContext : DbContext, IDbContext
			=> self.AddSienarDbContext<IDbContext, TContext>(optionsAction);

		/// <summary>
		/// Registers a <see cref="DbContext"/> as an <see cref="IDbContext"/> and as a <c>TContext</c>
		/// </summary>
		/// <param name="optionsAction">The options configuration, if any</param>
		/// <typeparam name="TContext">The type of the context</typeparam>
		/// <typeparam name="TContextImplementation">The implementation type of the context</typeparam>
		/// <returns>The service collection</returns>
		public IServiceCollection AddSienarDbContext<TContext, TContextImplementation>(
			Action<DbContextOptionsBuilder>? optionsAction = null)
			where TContext : IDbContext
			where TContextImplementation : DbContext, TContext
		{
			self.AddDbContext<TContext, TContextImplementation>(optionsAction);

			if (typeof(TContext) != typeof(IDbContext))
			{
				self.AddScoped<IDbContext>(sp => sp.GetRequiredService<TContext>());
			}

			// Add the TContextImplementation to DI as all its interfaces
			// but skip any Microsoft-provided interfaces
			// Because IDbContext is in the Microsoft.EntityFrameworkCore namespace,
			// it will also be skipped here
			var interfaces = typeof(TContextImplementation)
				.GetInterfaces()
				.Where(
					i => i.Namespace is not null &&
						!i.Namespace.StartsWith("Microsoft") &&
						!i.Namespace.StartsWith("System"));

			foreach (var i in interfaces)
			{
				self.AddScoped(i, sp => sp.GetRequiredService<TContext>());
			}

			return self;
		}

		/// <summary>
		/// Adds the necessary services to use an entity via Entity Framework
		/// </summary>
		/// <typeparam name="TEntity">The type of the entity</typeparam>
		/// <typeparam name="TFilterProcessor">The type of the filter processor</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddEfEntity<TEntity, TFilterProcessor>()
			where TEntity : class, IEntity, new()
			where TFilterProcessor : class, IEfFilterProcessor<TEntity>
		{
			self
				.AddBeforeCreateActionHook<ConcurrencyStampUpdater<TEntity>, TEntity>()
				.AddBeforeUpdateActionHook<ConcurrencyStampUpdater<TEntity>, TEntity>()
				.AddScoped<IStateValidator<TEntity>, ConcurrencyStampValidator<TEntity>>()
				.AddScoped<IEfFilterProcessor<TEntity>, TFilterProcessor>();

			return self;
		}
	}
}
