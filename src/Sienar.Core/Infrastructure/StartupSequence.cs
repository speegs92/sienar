namespace Sienar.Infrastructure;

/// <summary>
/// A preconfigured set of startup sequences in Sienar
/// </summary>
public static class StartupSequence
{
	/// <summary>
	/// The earliest possible priority
	/// </summary>
	public const int Earliest = int.MinValue;

	/// <summary>
	/// A very early priority
	/// </summary>
	public const int VeryEarly = -300;

	/// <summary>
	/// A standard early priority
	/// </summary>
	public const int Early = -200;

	/// <summary>
	/// A slightly early priority
	/// </summary>
	public const int SlightlyEarly = -100;

	/// <summary>
	/// A normal priority
	/// </summary>
	public const int Normal = 0;

	/// <summary>
	/// A slightly late priority
	/// </summary>
	public const int SlightlyLate = 100;

	/// <summary>
	/// A standard late priority
	/// </summary>
	public const int Late = 200;

	/// <summary>
	/// A very late priority
	/// </summary>
	public const int VeryLate = 300;

	/// <summary>
	/// the latest possible priority
	/// </summary>
	public const int Latest = int.MaxValue;
}
