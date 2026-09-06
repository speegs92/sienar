namespace Sienar.Infrastructure;

/// <summary>
/// Provides ordered middleware actions during application startup
/// </summary>
public class MiddlewareProvider : PrioritizedDictionaryOfLists<Action>;
