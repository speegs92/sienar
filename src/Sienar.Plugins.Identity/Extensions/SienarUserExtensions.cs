namespace Sienar.Extensions;

public static class SienarUserExtensions
{
	/// <summary>
	/// Determines whether the given user is locked out
	/// </summary>
	/// <param name="user">The user</param>
	/// <returns>Whether the user is locked out</returns>
	public static bool IsLockedOut<T>(this ISienarIdentityUser<T> user)
		where T : class, ISienarIdentityUser<T>
		=> user.LockoutEnd.HasValue &&
			user.LockoutEnd.Value > DateTime.UtcNow;
}