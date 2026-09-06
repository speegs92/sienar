using System.Net.Mime;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Sienar.Configuration.Mvc;

/// <summary>
/// Configures the <see cref="IMvcBuilder"/>
/// </summary>
public class AspNetMvcBuilderConfigurer : IConfigurer<IMvcBuilder>
{
	/// <inheritdoc />
	public void Configure(IMvcBuilder target)
	{
		target
			.ConfigureApiBehaviorOptions(o =>
			{
				o.InvalidModelStateResponseFactory = context =>
				{
					var details = new ValidationProblemDetails(context.ModelState)
					{
						Extensions =
						{
							["traceId"] = context.HttpContext.TraceIdentifier
						}
					};

					return new UnprocessableEntityObjectResult(details)
					{
						ContentTypes =
						{
							MediaTypeNames.Application.Json,
							MediaTypeNames.Application.Xml
						}
					};
				};
			})
			.AddJsonOptions(o =>
			{
				o.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
				o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.SnakeCaseLower));
			});
	}
}