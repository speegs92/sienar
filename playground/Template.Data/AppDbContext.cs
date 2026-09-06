using Microsoft.EntityFrameworkCore;
using Sienar.Data;

namespace Template.Data;

/// <summary>
/// The application database context
/// </summary>
public class AppDbContext : SienarDbContext<AppUser>
{
	/// <inheritdoc />
	public AppDbContext(DbContextOptions options)
		: base(options) {}
}
