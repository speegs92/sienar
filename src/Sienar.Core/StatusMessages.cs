#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member

namespace Sienar;

/// <exclude />
public static class StatusMessages
{
	public static class Processes
	{
		public const string InvalidState = "Your request state is not valid. Please check your data and try again";
		public const string BeforeHookFailure = "One or more plugins failed to execute. Your operation could not be completed";
	}

	public static class Crud<TEntity> where TEntity : IEntity
	{
		public static string CreateFailed() => $"Unable to create new {typeof(TEntity).GetEntityName()}";
		public static string CreateSuccessful() => $"{typeof(TEntity).GetEntityName()} created successfully";
		public static string ReadSingleFailed() => $"Unable to read {typeof(TEntity).GetEntityName()}";
		public static string ReadMultipleFailed() => $"Unable to read {typeof(TEntity).GetEntityPluralName()}";
		public static string UpdateFailed() => $"Unable to update {typeof(TEntity).GetEntityName()}";
		public static string UpdateSuccessful() => $"{typeof(TEntity).GetEntityName()} updated successfully";
		public static string DeleteFailed() => $"Unable to delete {typeof(TEntity).GetEntityName()}";
		public static string DeleteSuccessful() => $"{typeof(TEntity).GetEntityName()} deleted successfully";
		public static string NotFound(int id) => $"{typeof(TEntity).GetEntityName()} with ID {id} not found";
		public static string NoPermission() => $"You do not have permission to access this {typeof(TEntity).GetEntityName()}";
	}

	public static class Database
	{
		public const string QueryFailed = "Failed to query database";
	}

	public static class Rest
	{
		public const string NetworkFailed = "A network error occurred. Are you connected to the internet?";
		public const string NetworkTimeout = "Network request timed out";
		public const string BadRequest = "The request was malformed";
	}
}