namespace Sienar.Infrastructure;

/// <summary>
/// Abstracts various .NET host applications
/// </summary>
public class HostAdapter
{
	/// <summary>
	/// The host application's services
	/// </summary>
	public required IServiceProvider Services { get; init; }

	/// <summary>
	/// The host application
	/// </summary>
	public required object Host { get; init; }
}
