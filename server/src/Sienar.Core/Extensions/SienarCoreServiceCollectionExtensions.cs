namespace Sienar.Extensions;

/// <summary>
/// Contains <see cref="IServiceCollection"/> exftension methods used by Sienar applications
/// </summary>
public static class SienarCoreServiceCollectionExtensions
{
	private static bool _initialized;

	/// <param name="self">The service collection</param>
	extension(IServiceCollection self)
	{
		/// <summary>
		/// Adds universal Sienar utilities to the DI container
		/// </summary>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddSienarCore()
		{
			if (_initialized)
			{
				return self;
			}

			_initialized = true;

			return self
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
			=> self.AddScoped<IConfigurer<TOptions>, TConfigurer>();

		/// <summary>
		/// Adds an access validator for the given <c>TRequest</c>
		/// </summary>
		/// <typeparam name="TValidator">the validator implementation</typeparam>
		/// <typeparam name="TRequest">the data type of the request</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddAccessValidator<TValidator, TRequest>()
			where TValidator : class, IAccessValidator<TRequest>
			=> self.AddScoped<IAccessValidator<TRequest>, TValidator>();

		/// <summary>
		/// Adds a state validator for the given <c>TRequest</c>
		/// </summary>
		/// <typeparam name="TValidator">the validator implementation</typeparam>
		/// <typeparam name="TRequest">the data type of the request</typeparam>
		/// <returns>the service collection</returns>
		[ExcludeFromCodeCoverage]
		public IServiceCollection AddStateValidator<TValidator, TRequest>()
			where TValidator : class, IStateValidator<TRequest>
			=> self.AddScoped<IStateValidator<TRequest>, TValidator>();

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
			=> self.AddScoped<IBeforeCreateAction<TEntity>, THook>();

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
			=> self.AddScoped<IBeforeUpdateAction<TEntity>, THook>();

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
			=> self.AddScoped<IBeforeDeleteAction<TEntity>, THook>();

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
			=> self.AddScoped<IBeforeGeneralAction<TRequest>, THook>();

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
			=> self.AddScoped<IBeforeStatusAction<TRequest>, THook>();

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
			=> self.AddScoped<IAfterReadAction<TEntity>, THook>();

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
			=> self.AddScoped<IAfterReadAllAction<TEntity>, THook>();

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
			=> self.AddScoped<IAfterCreateAction<TEntity>, THook>();

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
			=> self.AddScoped<IAfterUpdateAction<TEntity>, THook>();

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
			=> self.AddScoped<IAfterDeleteAction<TEntity>, THook>();

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
			=> self.AddScoped<IAfterGeneralAction<TRequest>, THook>();

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
			=> self.AddScoped<IAfterStatusAction<TRequest>, THook>();

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
			=> self.AddScoped<IAfterResultAction<TResult>, THook>();

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
			=> self.AddScoped<IGeneralProcessor<TRequest, TResult>, TProcessor>();

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
			=> self.AddScoped<IStatusProcessor<TRequest>, TProcessor>();

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
			=> self.AddScoped<IResultProcessor<TResult>, TProcessor>();

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
			=> self.AddEntityApiMapping<TDto, DefaultMapper<TDto, TEntity>, DefaultMapper<TEntity, TDto>, TEntity>();

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
			=> self.AddEntityApiMapping<TDto, TEntityToDtoMapper, TDto, TDtoToEntityMapper, TDto, TDtoToEntityMapper, TEntity>();

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
			=> self.AddEntityApiMapping<TViewDto, TEntityToViewDtoMapper, TUpsertDto, TUpsertDtoToEntityMapper, TUpsertDto, TUpsertDtoToEntityMapper, TEntity>();

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
			self
				.AddScoped<IMapper<TEntity, TViewDto>, TEntityToViewDtoMapper>()
				.AddScoped<IMapper<TAddDto, TEntity>, TAddDtoToEntityMapper>();

			if (typeof(TEditDtoToEntityMapper) != typeof(TAddDtoToEntityMapper))
			{
				self.AddScoped<IMapper<TEditDto, TEntity>, TEditDtoToEntityMapper>();
			}
				
			return self;
		}
	}
}
