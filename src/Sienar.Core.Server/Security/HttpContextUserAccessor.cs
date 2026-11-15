using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Sienar.Security;

/// <summary>
/// Accesses user information from the <see cref="_context"/>
/// </summary>
public class HttpContextUserAccessor : IUserAccessor
{
	private readonly HttpContext _context;

	/// <summary>
	/// Creates a new instance of <c>HttpContextUserAccessor</c>
	/// </summary>
	/// <param name="httpContextAccessor">The HTTP context accessor</param>
	public HttpContextUserAccessor(
		IHttpContextAccessor httpContextAccessor)
	{
		_context = httpContextAccessor.HttpContext!;
	}

	/// <inheritdoc />
	public Task<bool> IsSignedIn() => Task.FromResult(
		_context.User.Identity?.IsAuthenticated ?? false);

	/// <inheritdoc />
	public virtual Task<int?> GetUserId()
	{
		var claim = _context.User.Claims
			.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
		int? id = claim is null
			? null
			: int.Parse(claim.Value);
		return Task.FromResult(id);
	}

	/// <inheritdoc />
	public virtual Task<string?> GetUsername()
	{
		var claim = _context.User.Claims
			.FirstOrDefault(c => c.Type == ClaimTypes.Name);
		return Task.FromResult(claim?.Value);
	}

	/// <inheritdoc />
	public virtual Task<ClaimsPrincipal> GetUserClaimsPrincipal()
		=> Task.FromResult(_context.User);

	/// <inheritdoc />
	public Task<bool> UserInRole(string roleName)
		=> Task.FromResult(_context.User.IsInRole(roleName));
}