#pragma warning disable CA1822 // Member can be marked as static

using Microsoft.AspNetCore.Http;

namespace Sienar.Identity.Controllers;

/// <summary>
/// Contains API endpoints for account management
/// </summary>
/// <remarks>
/// This controller is exclusively for users managing their own accounts. For administrators managing users' accounts on their behalf, see <see cref="UsersController{T}"/>.
/// </remarks>
[ApiController]
[Route("/api/account")]
[Authorize]
public class AccountController : ControllerBase
{
	/// <summary>
	/// Registers a new user
	/// </summary>
	/// <param name="data">The new user's data</param>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns>whether the user was registered</returns>
	[HttpPost]
	[AllowAnonymous]
	public Task<IActionResult> Register(
		RegisterRequest data,
		[FromServices] IStatusActionOrchestrator<RegisterRequest> orchestrator)
		=> orchestrator.Execute(data);

	/// <summary>
	/// Retrieves the account data of the currently logged in user
	/// </summary>
	/// <remarks>
	/// This endpoint is intended to allow SPAs to load user information such as the user's username, email address, and roles. Because this is an authenticated endpoint, SPAs will know the user is logged out if the endpoint returns <c>HTTP 401 Unauthorized</c>.
	/// </remarks>
	/// <param name="orchestrator">The result action orchestrator</param>
	/// <returns>the current user's account data</returns>
	[HttpGet]
	public Task<IActionResult> GetAccountData(
		[FromServices] IResultActionOrchestrator<AccountDataResult> orchestrator)
		=> orchestrator.Execute();

	/// <summary>
	/// Deletes a user's account
	/// </summary>
	/// <param name="data">The information of the user to delete</param>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns>whether the user's account was deleted</returns>
	[HttpDelete]
	public Task<IActionResult> DeleteAccount(
		DeleteAccountRequest data,
		[FromServices] IStatusActionOrchestrator<DeleteAccountRequest> orchestrator)
		=> orchestrator.Execute(data);

	/// <summary>
	/// Confirms a user's account
	/// </summary>
	/// <param name="data">The account information</param>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns>Whether the user's account was confirmed</returns>
	[HttpPost("confirm")]
	[AllowAnonymous]
	public Task<IActionResult> Confirm(
		ConfirmAccountRequest data,
		[FromServices] IStatusActionOrchestrator<ConfirmAccountRequest> orchestrator)
		=> orchestrator.Execute(data);

	/// <summary>
	/// Logs a user into the app
	/// </summary>
	/// <remarks>
	/// The return value of this endpoint is somewhat complicated. If the user logs in successfully, the <see cref="LoginResult"/> will be <see langword="null"/>. If the user login fails for "typical" reasons (such as invalid credentials), the <see cref="LoginResult"/> will be <see langword="null"/> (and further information will be communicated via <see cref="OperationResult{T}.Message"/>. However, if the user's account is <b>locked</b>, the <see cref="LoginResult"/> will be populated with the locked user's ID and a one-time verification code which allows the user to access the lockout status of their account. This data can be provided to the <see cref="GetLockoutReaons"/> endpoint to display lockout information to the user.
	/// </remarks>
	/// <param name="data">The account information</param>
	/// <param name="orchestrator">The action orchestrator</param>
	/// <returns>the login result, if any</returns>
	[HttpPost("login")]
	[AllowAnonymous]
	public Task<IActionResult> Login(
		LoginRequest data,
		[FromServices] IGeneralActionOrchestrator<LoginRequest, LoginResult> orchestrator)
		=> orchestrator.Execute(data);

	/// <summary>
	/// Logs a user out of the app
	/// </summary>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns>whether the user was logged out</returns>
	[HttpDelete("login")]
	public Task<IActionResult> Logout(
		[FromServices] IStatusActionOrchestrator<LogoutRequest> orchestrator)
		=> orchestrator.Execute(new LogoutRequest());

	/// <summary>
	/// Requests a password reset link to be sent to the user's email address
	/// </summary>
	/// <remarks>
	/// For account obfuscation purposes, this endpoint always indicates success.
	/// </remarks>
	/// <param name="data">The account information</param>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns><see langword="true"/></returns>
	[HttpDelete("password")]
	[AllowAnonymous]
	public Task<IActionResult> RequestPasswordReset(
		ForgotPasswordRequest data,
		[FromServices] IStatusActionOrchestrator<ForgotPasswordRequest> orchestrator)
		=> orchestrator.Execute(data);

	/// <summary>
	/// Requests a user's password be changed using a verification code, after a password reset request is approved
	/// </summary>
	/// <param name="data">The account information, including the new password</param>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns>whether the user's password was reset</returns>
	[HttpPatch("password")]
	[AllowAnonymous]
	public Task<IActionResult> PerformPasswordReset(
		ResetPasswordRequest data,
		[FromServices] IStatusActionOrchestrator<ResetPasswordRequest> orchestrator)
		=> orchestrator.Execute(data);

	/// <summary>
	/// Changes a user's password while logged in
	/// </summary>
	/// <param name="data">The user's password information, including confirmation of their existing password</param>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns>fwhether the user's password was changed</returns>
	[HttpPatch("change-password")]
	public Task<IActionResult> ChangePassword(
		ChangePasswordRequest data,
		[FromServices] IStatusActionOrchestrator<ChangePasswordRequest> orchestrator)
		=> orchestrator.Execute(data);

	/// <summary>
	/// Requests a user's email address be changed
	/// </summary>
	/// <remarks>
	/// If this endpoint is successful, the email isn't actually changed. Instead, the new email is stored in the database and a confirmation email is sent to it. The user must then click the confirmation link, which will call <see cref="UpdateEmail"/> and actually change their email address in the database.
	/// </remarks>
	/// <param name="data">The user's account information, including confirmation of their password</param>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns>whether the user's email was marked for change</returns>
	[HttpPost("change-email")]
	public Task<IActionResult> ChangeEmail(
		InitiateEmailChangeRequest data,
		[FromServices] IStatusActionOrchestrator<InitiateEmailChangeRequest> orchestrator)
		=> orchestrator.Execute(data);

	/// <summary>
	/// Updates a user's email address following confirmation
	/// </summary>
	/// <param name="data">The user's account information, including a verification code which certifies that the new email address' verification link was clicked</param>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns>whether the user's email address was changed</returns>
	[HttpPatch("email")]
	public Task<IActionResult> UpdateEmail(
		PerformEmailChangeRequest data,
		[FromServices] IStatusActionOrchestrator<PerformEmailChangeRequest> orchestrator)
		=> orchestrator.Execute(data);

	/// <summary>
	/// Retrieves the user's personal data from the database
	/// </summary>
	/// <param name="actor">The personal data result actor</param>
	/// <returns>the user's personal data as a JSON file</returns>
	[HttpGet("personal-data")]
	public async Task<IActionResult> GetPersonalData(
		[FromServices] IResultActor<PersonalDataResult> actor)
	{
		var result = await actor.Execute();

		if (result.Status != OperationStatus.Success
			|| result.Result?.PersonalDataFile?.Contents is null)
		{
			return new ObjectResult("Unable to download personal data")
			{
				StatusCode = StatusCodes.Status500InternalServerError
			};
		}

		var file = result.Result.PersonalDataFile;
		Response.Headers.Append("Content-Disposition", $"attachment; filename={file.Name}");

		return new FileContentResult(
			result.Result.PersonalDataFile.Contents,
			result.Result.PersonalDataFile.Mime);
	}

	/// <summary>
	/// Retrieves the reason(s) why a user's account is locked out
	/// </summary>
	/// <param name="data">The user's account information, including a verification code providing one-time access to the user's lockout reason list</param>
	/// <param name="orchestrator">The action orchestrator</param>
	/// <returns>the list of reasons why a user's account is locked</returns>
	[HttpGet("lockout-reasons")]
	[AllowAnonymous]
	public Task<IActionResult> GetLockoutReaons(
		[FromQuery] AccountLockoutRequest data,
		[FromServices] IGeneralActionOrchestrator<AccountLockoutRequest, AccountLockoutResult> orchestrator)
		=> orchestrator.Execute(data);
}
