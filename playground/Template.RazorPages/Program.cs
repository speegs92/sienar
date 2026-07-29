using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Sienar;
using Sienar.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder
	.AddSienar();

// Add services to the container.
builder.Services
	.AddAuthentication(o =>
	{
		o.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
		o.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
		o.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
	})
	.AddCookie(
		CookieAuthenticationDefaults.AuthenticationScheme,
		o =>
		{
			o.LoginPath = DashboardUrls.Account.Login;
			o.AccessDeniedPath = DashboardUrls.Account.Forbidden;
		});

builder.Services.AddAuthorization();

builder.Services.AddRazorPages();

var app = builder.Build();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapStaticAssets();
app
	.MapRazorPages()
	.WithStaticAssets();

await app.RunAsync();
