using System.Reflection;

namespace Sienar.Extensions;

/// <summary>
/// Contains extension methods for the <c>Sienar.Core</c> assembly
/// </summary>
public static class SienarCoreExtensions
{
	/// <param name="sc">The service collection</param>
	extension(IServiceCollection sc)
	{
		/// <summary>
		/// Adds universal Sienar utilities to the DI container
		/// </summary>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddSienarCore()
		{
			return sc
				.AddScoped<INotifier, DefaultNotifier>()
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
		}

		/// <summary>
		/// Adds a configurer to the service collection
		/// </summary>
		/// <typeparam name="TConfigurer">The type of the configurer to add</typeparam>
		/// <typeparam name="TOptions">The type of the options the configurer configures</typeparam>
		/// <returns>the service collection</returns>
		public IServiceCollection AddConfigurer<TConfigurer, TOptions>()
			where TConfigurer : class, IConfigurer<TOptions>
			where TOptions : class
			=> sc.AddScoped<IConfigurer<TOptions>, TConfigurer>();

		/// <summary>
		/// Adds an access validator for the given <c>TRequest</c>
		/// </summary>
		/// <typeparam name="TValidator">the validator implementation</typeparam>
		/// <typeparam name="TRequest">the data type of the request</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddAccessValidator<TValidator, TRequest>()
			where TValidator : class, IAccessValidator<TRequest>
			=> sc.AddScoped<IAccessValidator<TRequest>, TValidator>();

		/// <summary>
		/// Adds a state validator for the given <c>TRequest</c>
		/// </summary>
		/// <typeparam name="TValidator">the validator implementation</typeparam>
		/// <typeparam name="TRequest">the data type of the request</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddStateValidator<TValidator, TRequest>()
			where TValidator : class, IStateValidator<TRequest>
			=> sc.AddScoped<IStateValidator<TRequest>, TValidator>();

		/// <summary>
		/// Adds an before-create hook for the given <c>TEntity</c>
		/// </summary>
		/// <typeparam name="THook">The hook implementation</typeparam>
		/// <typeparam name="TEntity">The entity type</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddBeforeCreateActionHook<THook, TEntity>()
			where THook : class, IBeforeCreateAction<TEntity>
			where TEntity : IEntity
			=> sc.AddScoped<IBeforeCreateAction<TEntity>, THook>();

		/// <summary>
		/// Adds an before-update hook for the given <c>TEntity</c>
		/// </summary>
		/// <typeparam name="THook">The hook implementation</typeparam>
		/// <typeparam name="TEntity">The entity type</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddBeforeUpdateActionHook<THook, TEntity>()
			where THook : class, IBeforeUpdateAction<TEntity>
			where TEntity : IEntity
			=> sc.AddScoped<IBeforeUpdateAction<TEntity>, THook>();

		/// <summary>
		/// Adds an before-delete hook for the given <c>TEntity</c>
		/// </summary>
		/// <typeparam name="THook">The hook implementation</typeparam>
		/// <typeparam name="TEntity">The entity type</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddBeforeDeleteActionHook<THook, TEntity>()
			where THook : class, IBeforeDeleteAction<TEntity>
			where TEntity : IEntity
			=> sc.AddScoped<IBeforeDeleteAction<TEntity>, THook>();

		/// <summary>
		/// Adds an before general action hook for the given <c>TRequest</c>
		/// </summary>
		/// <typeparam name="THook">The hook implementation</typeparam>
		/// <typeparam name="TRequest">The request type</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddBeforeGeneralActionHook<THook, TRequest>()
			where THook : class, IBeforeGeneralAction<TRequest>
			where TRequest : IRequest
			=> sc.AddScoped<IBeforeGeneralAction<TRequest>, THook>();

		/// <summary>
		/// Adds an before status action hook for the given <c>TRequest</c>
		/// </summary>
		/// <typeparam name="THook">The hook implementation</typeparam>
		/// <typeparam name="TRequest">The request type</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddBeforeStatusActionHook<THook, TRequest>()
			where THook : class, IBeforeStatusAction<TRequest>
			where TRequest : IRequest
			=> sc.AddScoped<IBeforeStatusAction<TRequest>, THook>();

		/// <summary>
		/// Adds an after-read hook for the given <c>TEntity</c>
		/// </summary>
		/// <typeparam name="THook">The hook implementation</typeparam>
		/// <typeparam name="TEntity">The entity type</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddAfterReadActionHook<THook, TEntity>()
			where THook : class, IAfterReadAction<TEntity>
			where TEntity : IEntity
			=> sc.AddScoped<IAfterReadAction<TEntity>, THook>();

		/// <summary>
		/// Adds an after-read-all hook for the given <c>TEntity</c>
		/// </summary>
		/// <typeparam name="THook">The hook implementation</typeparam>
		/// <typeparam name="TEntity">The entity type</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddAfterReadAllActionHook<THook, TEntity>()
			where THook : class, IAfterReadAllAction<TEntity>
			where TEntity : IEntity
			=> sc.AddScoped<IAfterReadAllAction<TEntity>, THook>();

		/// <summary>
		/// Adds an after-create hook for the given <c>TEntity</c>
		/// </summary>
		/// <typeparam name="THook">The hook implementation</typeparam>
		/// <typeparam name="TEntity">The entity type</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddAfterCreateActionHook<THook, TEntity>()
			where THook : class, IAfterCreateAction<TEntity>
			where TEntity : IEntity
			=> sc.AddScoped<IAfterCreateAction<TEntity>, THook>();

		/// <summary>
		/// Adds an after-update hook for the given <c>TEntity</c>
		/// </summary>
		/// <typeparam name="THook">The hook implementation</typeparam>
		/// <typeparam name="TEntity">The entity type</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddAfterUpdateActionHook<THook, TEntity>()
			where THook : class, IAfterUpdateAction<TEntity>
			where TEntity : IEntity
			=> sc.AddScoped<IAfterUpdateAction<TEntity>, THook>();

		/// <summary>
		/// Adds an after-delete hook for the given <c>TEntity</c>
		/// </summary>
		/// <typeparam name="THook">The hook implementation</typeparam>
		/// <typeparam name="TEntity">The entity type</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddAfterDeleteActionHook<THook, TEntity>()
			where THook : class, IAfterDeleteAction<TEntity>
			where TEntity : IEntity
			=> sc.AddScoped<IAfterDeleteAction<TEntity>, THook>();

		/// <summary>
		/// Adds an after general action hook for the given <c>TRequest</c>
		/// </summary>
		/// <typeparam name="THook">The hook implementation</typeparam>
		/// <typeparam name="TRequest">The request type</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddAfterGeneralActionHook<THook, TRequest>()
			where THook : class, IAfterGeneralAction<TRequest>
			where TRequest : IRequest
			=> sc.AddScoped<IAfterGeneralAction<TRequest>, THook>();

		/// <summary>
		/// Adds an after status action hook for the given <c>TRequest</c>
		/// </summary>
		/// <typeparam name="THook">The hook implementation</typeparam>
		/// <typeparam name="TRequest">The request type</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddAfterStatusActionHook<THook, TRequest>()
			where THook : class, IAfterStatusAction<TRequest>
			where TRequest : IRequest
			=> sc.AddScoped<IAfterStatusAction<TRequest>, THook>();

		/// <summary>
		/// Adds an after result action hook for the given <c>TResult</c>
		/// </summary>
		/// <typeparam name="THook">The hook implementation</typeparam>
		/// <typeparam name="TResult">The result type</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddAfterResultActionHook<THook, TResult>()
			where THook : class, IAfterResultAction<TResult>
			where TResult : IResult
			=> sc.AddScoped<IAfterResultAction<TResult>, THook>();

		/// <summary>
		/// Adds a general processor
		/// </summary>
		/// <typeparam name="TProcessor">the processor implementation</typeparam>
		/// <typeparam name="TRequest">the data type of the request</typeparam>
		/// <typeparam name="TResult">the data type of the result</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddGeneralProcessor<TProcessor, TRequest, TResult>()
			where TProcessor : class, IGeneralProcessor<TRequest, TResult>
			where TRequest : IRequest
			where TResult : IResult
			=> sc.AddScoped<IGeneralProcessor<TRequest, TResult>, TProcessor>();

		/// <summary>
		/// Adds a status processor (<c>IProcessor&lt;TRequest, bool&gt;</c>
		/// </summary>
		/// <typeparam name="TProcessor">the processor implementation</typeparam>
		/// <typeparam name="TRequest">the data type of the request</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddStatusProcessor<TProcessor, TRequest>()
			where TProcessor : class, IStatusProcessor<TRequest>
			where TRequest : IRequest
			=> sc.AddScoped<IStatusProcessor<TRequest>, TProcessor>();

		/// <summary>
		/// Adds a result processor (<c>IProcessor&lt;TRequest&gt;</c>)
		/// </summary>
		/// <typeparam name="TProcessor">the processor implementation</typeparam>
		/// <typeparam name="TResult">the data type of the result</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddResultProcessor<TProcessor, TResult>()
			where TProcessor : class, IResultProcessor<TResult>
			where TResult : IResult
			=> sc.AddScoped<IResultProcessor<TResult>, TProcessor>();

		/// <summary>
		/// Adds the necessary services to use an entity with default API-layter entity-to-DTO and DTO-to-entity mapping
		/// </summary>
		/// <remarks>
		/// This overload adds the default, reflection-based mapper to map between entities and DTOs. This mapper will map properties with the same name between the entity and DTO, so if there is a type mismatch between properties, you must supply your own mapping implementations using one of the other overloads.
		/// </remarks>
		/// <typeparam name="TDto">The type of the DTO</typeparam>
		/// <typeparam name="TEntity">The type of the entity</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddEntityApiMapping<TDto, TEntity>()
			where TDto : class, new()
			where TEntity : class, IEntity, new()
			=> sc.AddEntityApiMapping<TDto, DefaultMapper<TDto, TEntity>, DefaultMapper<TEntity, TDto>, TEntity>();

		/// <summary>
		/// Adds the necessary services to use an entity with API-layter entity-to-DTO and DTO-to-entity mapping
		/// </summary>
		/// <remarks>
		/// This overload adds mapping for DTOs which are the same for viewing, adding, and editing.
		/// </remarks>
		/// <typeparam name="TDto">The type of the DTO</typeparam>
		/// <typeparam name="TDtoToEntityMapper">The type of the DTO-to-entity mapper</typeparam>
		/// <typeparam name="TEntityToDtoMapper">The type of the entity-to-DTO mapper</typeparam>
		/// <typeparam name="TEntity">The type of the entity</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddEntityApiMapping<
			TDto,
			TDtoToEntityMapper,
			TEntityToDtoMapper,
			TEntity>()
			where TDto : class, new()
			where TDtoToEntityMapper : class, IMapper<TDto, TEntity>
			where TEntityToDtoMapper : class, IMapper<TEntity, TDto>
			where TEntity : class, IEntity, new()
			=> sc.AddEntityApiMapping<TDto, TEntityToDtoMapper, TDto, TDtoToEntityMapper, TDto, TDtoToEntityMapper, TEntity>();

		/// <summary>
		/// Adds the necessary services to use an entity with API-layter entity-to-DTO and DTO-to-entity mapping
		/// </summary>
		/// <typeparam name="TViewDto">The type of the view DTO</typeparam>
		/// <typeparam name="TEntityToViewDtoMapper">The type of the entity-to-view-DTO mapper</typeparam>
		/// <typeparam name="TUpsertDto">The type of the upsert DTO</typeparam>
		/// <typeparam name="TUpsertDtoToEntityMapper">The type of the upsert-DTO-to-entity mapper</typeparam>
		/// <typeparam name="TEntity">The type of the entity</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddEntityApiMapping<
			TViewDto,
			TEntityToViewDtoMapper,
			TUpsertDto,
			TUpsertDtoToEntityMapper,
			TEntity>()
			where TViewDto : class, new()
			where TEntityToViewDtoMapper : class, IMapper<TEntity, TViewDto>
			where TUpsertDto : class, new()
			where TUpsertDtoToEntityMapper : class, IMapper<TUpsertDto, TEntity>
			where TEntity : class, IEntity, new()
			=> sc.AddEntityApiMapping<TViewDto, TEntityToViewDtoMapper, TUpsertDto, TUpsertDtoToEntityMapper, TUpsertDto, TUpsertDtoToEntityMapper, TEntity>();

		/// <summary>
		/// Adds the necessary services to use an entity with API-layter entity-to-DTO and DTO-to-entity mapping
		/// </summary>
		/// <typeparam name="TViewDto">The type of the view DTO</typeparam>
		/// <typeparam name="TEntityToViewDtoMapper">The type of the entity-to-view-DTO mapper</typeparam>
		/// <typeparam name="TAddDto">The type of the add DTO</typeparam>
		/// <typeparam name="TAddDtoToEntityMapper">The type of the add-DTO-to-entity mapper</typeparam>
		/// <typeparam name="TEditDto">The type of the edit DTO</typeparam>
		/// <typeparam name="TEditDtoToEntityMapper">The type of the edit-DTO-to-entity mapper</typeparam>
		/// <typeparam name="TEntity">The type of the entity</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddEntityApiMapping<
			TViewDto,
			TEntityToViewDtoMapper,
			TAddDto,
			TAddDtoToEntityMapper,
			TEditDto,
			TEditDtoToEntityMapper,
			TEntity>()
			where TViewDto : class, new()
			where TEntityToViewDtoMapper : class, IMapper<TEntity, TViewDto>
			where TAddDto : class, new()
			where TAddDtoToEntityMapper : class, IMapper<TAddDto, TEntity>
			where TEditDto : class, new()
			where TEditDtoToEntityMapper : class, IMapper<TEditDto, TEntity>
		{
			sc
				.AddScoped<IMapper<TEntity, TViewDto>, TEntityToViewDtoMapper>()
				.AddScoped<IMapper<TAddDto, TEntity>, TAddDtoToEntityMapper>();

			if (typeof(TEditDtoToEntityMapper) != typeof(TAddDtoToEntityMapper))
			{
				sc.AddScoped<IMapper<TEditDto, TEntity>, TEditDtoToEntityMapper>();
			}
				
			return sc;
		}
	}

	/// <param name="entity">The entity</param>
	extension(IEntity entity)
	{
		/// <summary>
		/// Returns the human-friendly singular name of the entity
		/// </summary>
		/// <returns>the entity's name</returns>
		public string GetEntityName()
			=> GetEntityName(entity.GetType());

		/// <summary>
		/// Returns the human-friendly plural name of the entity
		/// </summary>
		/// <returns>the entity's plural name</returns>
		public string GetEntityPluralName()
			=> GetEntityPluralName(entity.GetType());
	}

	/// <param name="type">The type</param>
	extension(Type type)
	{
		/// <summary>
		/// Returns the human-friendly singular name of the entity
		/// </summary>
		/// <returns>the entity's name</returns>
		/// <remarks>
		/// If the specified <see cref="Type"/> does not have an <see cref="EntityNameAttribute"/> defined, then this method will return <c>Type.Name</c>. This behavior may be acceptable in some circumstances, but if it is not, be sure to only use entities with a defined <see cref="EntityNameAttribute"/>.
		/// </remarks>
		public string GetEntityName()
		{
			var attribute = type.GetCustomAttribute<EntityNameAttribute>();
			return attribute?.Singular ?? type.Name;
		}

		/// <summary>
		/// Returns the human-friendly plural name of the entity
		/// </summary>
		/// <returns>the entity's plural name</returns>
		/// <exception cref="InvalidOperationException">if no <see cref="EntityNameAttribute"/> is defined, or if no <c>EntityNameAttribute.Plural</c> value is provided</exception>
		public string GetEntityPluralName()
		{
			var attribute = type.GetCustomAttribute<EntityNameAttribute>();
			return attribute?.Plural
				?? throw new InvalidOperationException(
					$"Unable to determine plural entity name {type.Name}. "
					+ $"Please ensure you set the entity name with {nameof(EntityNameAttribute)}.");
		}
	}

	/// <param name="input">The string</param>
	extension(string input)
	{
		/// <summary>
		/// Converts a string to all caps. For use in searching and filtering
		/// </summary>
		/// <param name="input">The string to normalize</param>
		/// <returns>The normalized string</returns>
		public string ToNormalized()
			=> input.ToUpperInvariant();
	}
}
