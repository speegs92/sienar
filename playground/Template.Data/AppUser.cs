using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Sienar.Identity;

namespace Template.Data;

/// <summary>
/// The test project's user entity
/// </summary>
public class AppUser : ISienarIdentityUser<AppUser>
{
	/// <inheritdoc />
	public int Id { get; set; }

	/// <inheritdoc />
	public Guid ConcurrencyStamp { get; set; }

	/// <inheritdoc />
	[Required]
	[MaxLength(32)]
	public string Username { get; set; } = string.Empty;

	/// <inheritdoc />
	[Required]
	[MaxLength(32)]
	public string NormalizedUsername { get; set; } = string.Empty;

	/// <inheritdoc />
	[Required]
	[MaxLength(64)]
	public string Email { get; set; } = string.Empty;

	/// <inheritdoc />
	[Required]
	[MaxLength(64)]
	public string NormalizedEmail { get; set; } = string.Empty;

	/// <inheritdoc />
	public List<string> Roles { get; set; } = [];

	/// <inheritdoc />
	public string PasswordHash { get; set; } = string.Empty;

	/// <inheritdoc />
	public int LoginFailedCount { get; set; }

	/// <inheritdoc />
	public DateTime? LockoutEnd { get; set; }

	/// <inheritdoc />
	public List<VerificationCode> VerificationCodes { get; set; } = [];

	/// <inheritdoc />
	public List<LockoutReason<AppUser>> LockoutReasons { get; set; } = [];

	/// <inheritdoc />
	public bool EmailConfirmed { get; set; }

	/// <inheritdoc />
	public string? PendingEmail { get; set; }

	/// <inheritdoc />
	public string? NormalizedPendingEmail { get; set; }
}
