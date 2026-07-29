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
		var filesDirectory = Path.Combine(
			Directory.GetCurrentDirectory(),
			"../SienarFiles");
		var cnx = $"Data Source={filesDirectory}/sienar.db";

		builder.UseSqlite(cnx);

		return new AppDbContext(builder.Options);
	}
}
