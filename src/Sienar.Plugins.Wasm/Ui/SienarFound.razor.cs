using System.Reflection;

namespace Sienar.Ui;

/// <summary>
/// Renders the found page view
/// </summary>
public partial class SienarFound
{
	private Type _lastPageType = null!;
	private Type _layout = null!;
	private readonly Dictionary<string, Type> _layoutCache = new();

	/// <summary>
    /// The name of the cascading value which provides the layout name to child components
    /// </summary>
    public const string CascadingLayoutName = "Layout";

    /// <summary>
	/// The route data provided by Blazor
	/// </summary>
	[CascadingParameter]
	public RouteData RouteData { get; set; } = null!;

	/// <summary>
	/// The current Blazor app
	/// </summary>
	[CascadingParameter]
	public BlazorApp App { get; set; } = null!;

	/// <inheritdoc />
	protected override void OnParametersSet()
	{
		var pageType = RouteData.PageType;
		if (_lastPageType == pageType)
		{
			return;
		}

		_lastPageType = pageType;
		var layoutKey = pageType.GetCustomAttribute<OverridableLayoutAttribute>()?.LayoutKey;

		if (layoutKey is null)
		{
			_layout = App.DefaultLayout;
			return;
		}

		if (_layoutCache.TryGetValue(layoutKey, out var cachedLayout))
		{
			_layout = cachedLayout;
			return;
		}

		if (App.LayoutProvider.TryGetValue(layoutKey, out var providedLayout))
		{
			_layoutCache[layoutKey] = providedLayout;
			_layout = providedLayout;
			return;
		}

		_layoutCache[layoutKey] = App.DefaultLayout;
		_layout = App.DefaultLayout;
	}
}

