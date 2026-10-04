namespace Sienar.Html;

/// <summary>
/// Contains the data needed to create a generic HTML <c>&lt;meta&gt;</c> tag
/// </summary>
public class MetaResource
{
	/// <summary>
	/// The value of the <c>&lt;meta name="..."&gt;</c> attribute
	/// </summary>
	public required string Name { get; set; }

	/// <summary>
	/// The value of the <c>&lt;meta content="..."&gt;</c> attribute
	/// </summary>
	public required string Content { get; set; }
}
