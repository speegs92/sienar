using System.IO;
using Microsoft.EntityFrameworkCore;

namespace Template.Data;

public static class DbContextOptionsBuilderExtensions
{
	public static void UseAppDb(this DbContextOptionsBuilder o)
	{
		var filesDirectory = Path.Combine(
			Directory.GetCurrentDirectory(),
			"../SienarFiles");
		var cnx = $"Data Source={filesDirectory}/sienar.db";

		o.UseSqlite(cnx);
	}
}
