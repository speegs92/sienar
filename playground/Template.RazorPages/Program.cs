using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Sienar;
using Sienar.Extensions;
using Sienar.Plugins;
using Template.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContextForSienar<AppDbContext>();

builder
	.AddSienar()
	.AddSienarIdentity<AppUser>()
	.AddPlugin<SienarMvcPlugin>()
	.AddPlugin<SienarRazorPagesPlugin>()
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

// builder.Services.AddAuthorization();

// builder.Services.AddMvc(o => {});

var app = builder.Build();
app.UseSienar();
await app.RunAsync();
