using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Diagnostics.Metrics;

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
	public ILoggingBuilder Logging
		=> _builder.Logging;

	/// <inheritdoc />
	public IMetricsBuilder Metrics
		=> _builder.Metrics;

	/// <inheritdoc />
	public IDictionary<object, object> Properties
		=> (_builder as IHostApplicationBuilder).Properties;

	/// <inheritdoc />
	public IServiceCollection Services
		=> _builder.Services;

	/// <inheritdoc />
	public void Create(string[] args, IServiceCollection startupServices)
	{
		_builder = WebApplication.CreateBuilder(args);
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

	/// <inheritdoc />
	public void ConfigureContainer<TContainerBuilder>(
		IServiceProviderFactory<TContainerBuilder> factory,
		Action<TContainerBuilder>? configure = null)
		where TContainerBuilder : notnull
	{
		(_builder as IHostApplicationBuilder).ConfigureContainer(factory, configure);
	}
}
