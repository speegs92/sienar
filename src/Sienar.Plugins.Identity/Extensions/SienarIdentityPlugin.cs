using Microsoft.Extensions.Hosting;

namespace Sienar.Extensions;

/// <summary>
/// Contains <see cref="IHostApplicationBuilder"/> extension methods used by <c>Sienar.Plugins.Identity</c>
/// </summary>
public static class SienarIdentityPlugin
{
	/// <summary>
	/// Adds the Sienar Identity plugin to a Sienar application
	/// </summary>
	/// <param name="self">The host application builder</param>
	/// <typeparam name="TUser">The type of the user entity</typeparam>
	/// <returns>the host application builder</returns>
	public static IHostApplicationBuilder AddSienarIdentity<TUser>(
		this IHostApplicationBuilder self)
		where TUser : class, ISienarIdentityUser<TUser>, new()
	{
		self.Services.AddSienarIdentity<TUser>(self.Configuration);

		return self;
	}
}
