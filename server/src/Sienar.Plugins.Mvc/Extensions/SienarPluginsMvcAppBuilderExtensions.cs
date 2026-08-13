namespace Sienar.Extensions;

/// <summary>
/// Contains <see cref="IHost"/> extension properties used by Sienar applications
/// </summary>
public static class SienarPluginsMvcAppBuilderExtensions
{
	/// <param name="_">The host application</param>
	extension(IHost _)
	{
		/// <summary>
		/// The middleware position immediately before routing middleware
		/// </summary>
		public int BeforeRouting => -21;

		/// <summary>
		/// The routing middleware position
		/// </summary>
		public int WithRouting => -20;

		/// <summary>
		/// The middleware position immediately after routing middleware
		/// </summary>
		public int AfterRouting => -19;

		/// <summary>
		/// The middleware position immediately before authentication middleware
		/// </summary>
		public int BeforeAuthentication => -11;

		/// <summary>
		/// The authentication middleware position
		/// </summary>
		public int WithAuthentication => -10;

		/// <summary>
		/// The middleware position immediately after authentication middleware
		/// </summary>
		public int AfterAuthentication => -9;

		/// <summary>
		/// The middleware position immediately before authorization middleware
		/// </summary>
		public int BeforeAuthorization => -1;

		/// <summary>
		/// The authorization middleware position
		/// </summary>
		public int WithAuthorization => 0;

		/// <summary>
		/// The middleware position immediately after authorization middleware
		/// </summary>
		public int AfterAuthorization => 1;

		/// <summary>
		/// The middleware position immediately before static assets middleware
		/// </summary>
		public int BeforeStaticAssets => 9;

		/// <summary>
		/// The static assets middleware position
		/// </summary>
		public int WithStaticAssets => 10;

		/// <summary>
		/// The middleware position immediately after static assets middleware
		/// </summary>
		public int AfterStaticAssets => 11;

		/// <summary>
		/// The middleware position immediately before controller/Razor Pages middleware
		/// </summary>
		public int BeforeControllers => 19;

		/// <summary>
		/// The controller/Razor Pages middleware position
		/// </summary>
		public int WithControllers => 20;

		/// <summary>
		/// The middleware position immediately after controller/Razor Pages middleware
		/// </summary>
		public int AfterControllers => 21;
	}
}
