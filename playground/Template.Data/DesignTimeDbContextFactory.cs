using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Template.Data;

/// <summary>
/// The design-time database context factory for <see cref="AppDbContext"/>
/// </summary>
public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
	/// <inheritdoc />
	public AppDbContext CreateDbContext(string[] args)
	{
		var builder = new DbContextOptionsBuilder<AppDbContext>();
		builder.UseAppDb();
		return new AppDbContext(builder.Options);
	}
}
