using Microsoft.AspNetCore.Builder;
using Sienar.Extensions;
using Sienar.Plugins;
using Template.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSienarDbContext<AppDbContext>();

builder
	.AddPlugin<SienarIdentityPlugin<AppUser>>()
	.ConfigureSienar();

// Add services to the container.
// builder.Services
// 	.AddAuthentication(o =>
// 	{
// 		o.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
// 		o.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
// 		o.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
// 	})
// 	.AddCookie(
// 		CookieAuthenticationDefaults.AuthenticationScheme,
// 		o =>
// 		{
// 			o.LoginPath = DashboardUrls.Account.Login;
// 			o.AccessDeniedPath = DashboardUrls.Account.Forbidden;
// 		});

var app = builder.Build();
app.UseSienar();
await app.RunAsync();
