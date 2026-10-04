using System.Reflection;

namespace Sienar.Infrastructure;

/// <summary>
/// A Blazor application to be rendered by the <see cref="SienarApp"/> component
/// </summary>
public class BlazorApp
{
	/// <summary>
	/// The app's language, used as the value of the <c>&lt;html lang="..."&gt;</c> attribute
	/// </summary>
	public string Language { get; set; } = "en";

	/// <summary>
	/// The app's character set, used as the value of the <c>charset</c> meta tag
	/// </summary>
	public string Charset { get; set; } = "utf-8";

	/// <summary>
	/// The app's script provider
	/// </summary>
	public ScriptProvider ScriptProvider { get; } = new();

	/// <summary>
	/// The app's style provider
	/// </summary>
	public StyleProvider StyleProvider { get; } = new();

	/// <summary>
	/// The app's meta provider
	/// </summary>
	public MetaProvider MetaProvider { get; } = new();

	/// <summary>
	/// The render mode for the head outlet
	/// </summary>
	public IComponentRenderMode? HeadRenderMode { get; set; }

	/// <summary>
	/// The render mode for the app content
	/// </summary>
	public IComponentRenderMode? BodyRenderMode { get; set; }

	/// <summary>
	/// The assemblies containing routable components for the app
	/// </summary>
	public List<Assembly> RoutableAssemblies { get; } = [];

	/// <summary>
	/// The default layout component to use when no layout is specified
	/// </summary>
	public required Type DefaultLayout { get; set; }

	/// <summary>
	/// The default menus to render if a page does not define its own menus
	/// </summary>
	public required List<string> DefaultMenus { get; set; }

	/// <summary>
	/// The component to render when no route is matched by the router
	/// </summary>
	public required Type NotFoundView { get; set; }

	/// <summary>
	/// The component to render when the user is fails an authorization check
	/// </summary>
	public required Type UnauthorizedView { get; set; }

	/// <summary>
	/// The components to render within the <see cref="SienarRoutes"/> component before the <see cref="Router"/> is rendered 
	/// </summary>
	public List<Type> RouterAdjacentComponents { get; } = [];

	/// <summary>
	/// The app's layout provider
	/// </summary>
	public Dictionary<string, Type> LayoutProvider { get; } = new();
}
