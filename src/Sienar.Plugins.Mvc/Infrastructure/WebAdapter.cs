using Microsoft.Extensions.Configuration;

namespace Sienar.Infrastructure;

/// <summary>
/// A Sienar application builder adapter for ASP.NET web applications
/// </summary>
public class WebAdapter : IBuilderAdapter
{
	private WebApplicationBuilder _builder = null!;

	/// <inheritdoc />
	public IConfigurationManager Configuration
		=> _builder.Configuration;

	/// <inheritdoc />
	public IHostEnvironment Environment
		=> _builder.Environment;

	/// <inheritdoc />
	public IServiceCollection Services
		=> _builder.Services;

	/// <inheritdoc />
	public void Create(string[] args, IServiceCollection startupServices)
	{
		_builder = WebApplication.CreateBuilder(args);

		startupServices
			.AddSingleton(_builder)
			.AddSingleton(_builder.Configuration)
			.AddSingleton(_builder.Environment)
			.AddSingleton(_builder.Host)
			.AddSingleton(_builder.Logging)
			.AddSingleton(_builder.Metrics)
			.AddSingleton(_builder.WebHost);
	}

	/// <inheritdoc />
	public HostAdapter Build(IServiceProvider startupServiceProvider)
	{
		var app = _builder.Build();

		return new HostAdapter
		{
			Host = app,
			Services = app.Services
		};
	}
}
