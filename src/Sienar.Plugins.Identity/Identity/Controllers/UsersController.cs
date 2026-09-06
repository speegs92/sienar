namespace Sienar.Identity.Controllers;

/// <summary>
/// Contains API endpoints for user entity management
/// </summary>
/// <typeparam name="T">The type of the identity user</typeparam>
[ApiController]
[Route("/api/users")]
[Authorize(Roles = Roles.Admin)]
public class UsersController<T>
	where T : class, ISienarIdentityUser<T>, new()
{
	/// <summary>
	/// Reads a collection of users
	/// </summary>
	/// <param name="filter">The request filter, if any</param>
	/// <param name="orchestrator">The read request orchestrator</param>
	/// <returns>the user collection</returns>
	[HttpGet]
	public Task<IActionResult> Read(
		[FromQuery] Filter? filter,
		[FromServices] IReadAllActionOrchestrator<ViewUserDto, T> orchestrator)
		=> orchestrator.Execute(filter);

	/// <summary>
	/// Reads a single user by ID
	/// </summary>
	/// <param name="id">The ID of the user to fetch</param>
	/// <param name="filter">The request filter, if any</param>
	/// <param name="orchestrator">The read request orchestrator</param>
	/// <returns>the user</returns>
	[HttpGet("{id:int}")]
	public Task<IActionResult> Read(
		int id,
		[FromQuery] Filter? filter,
		[FromServices] IReadActionOrchestrator<ViewUserDto, T> orchestrator)
		=> orchestrator.Execute(id, filter);

	/// <summary>
	/// Creates a new user
	/// </summary>
	/// <param name="user">The user information</param>
	/// <param name="orchestrator">The create request orchestrator</param>
	/// <returns>the new user's ID</returns>
	[HttpPost]
	public Task<IActionResult> Create(
		UpsertUserDto user,
		[FromServices] ICreateActionOrchestrator<UpsertUserDto, T> orchestrator)
		=> orchestrator.Execute(user);

	/// <summary>
	/// Updates a user
	/// </summary>
	/// <param name="user">The user information</param>
	/// <param name="orchestrator">The update request orchestrator</param>
	/// <returns>whether the user was updated</returns>
	[HttpPut]
	public Task<IActionResult> Update(
		UpsertUserDto user,
		[FromServices] IUpdateActionOrchestrator<UpsertUserDto, T> orchestrator)
		=> orchestrator.Execute(user);

	/// <summary>
	/// Deletes a user
	/// </summary>
	/// <param name="id">The ID of the user to delete</param>
	/// <param name="orchestrator">The delete request orchestrator</param>
	/// <returns>whether the user was deleted</returns>
	[HttpDelete("{id:int}")]
	public Task<IActionResult> Delete(
		int id,
		[FromServices] IDeleteActionOrchestrator<T> orchestrator)
		=> orchestrator.Execute(id);

	/// <summary>
	/// Adds a user to a role
	/// </summary>
	/// <param name="data">The user and role information</param>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns>whether the user was added to the role</returns>
	[HttpPost("roles")]
	public Task<IActionResult> AddToRole(
		AddUserToRoleRequest data,
		[FromServices] IStatusActionOrchestrator<AddUserToRoleRequest> orchestrator)
		=> orchestrator.Execute(data);

	/// <summary>
	/// Removes a user from a role
	/// </summary>
	/// <param name="data">The user and role information</param>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns>whether the user was removed from the role</returns>
	[HttpDelete("roles")]
	public Task<IActionResult> RemoveFromRole(
		RemoveUserFromRoleRequest data,
		[FromServices] IStatusActionOrchestrator<RemoveUserFromRoleRequest> orchestrator)
		=> orchestrator.Execute(data);

	/// <summary>
	/// Locks a user account
	/// </summary>
	/// <param name="data">The user lock request data</param>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns>whether the user was locked</returns>
	[HttpPatch("lock")]
	public Task<IActionResult> LockUser(
		LockUserAccountRequest data,
		[FromServices] IStatusActionOrchestrator<LockUserAccountRequest> orchestrator)
		=> orchestrator.Execute(data);

	/// <summary>
	/// Unlocks a user account
	/// </summary>
	/// <param name="data">The user unlock request data</param>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns>whether the user was unlocked</returns>
	[HttpDelete("lock")]
	public Task<IActionResult> UnlockUser(
		UnlockUserAccountRequest data,
		[FromServices] IStatusActionOrchestrator<UnlockUserAccountRequest> orchestrator)
		=> orchestrator.Execute(data);

	/// <summary>
	/// Manually confirms a user account
	/// </summary>
	/// <remarks>
	/// This endpoint is intended to allow an administrator to confirm a user account if automatic account verification fails for some reason. It should not be used to confirm accounts under ordinary circumstances. Instead, typical account confirmation requests should be sent to <see cref="AccountController.Confirm"/>
	/// </remarks>
	/// <param name="data">The user confirmation request data</param>
	/// <param name="orchestrator">The status action orchestrator</param>
	/// <returns>whether the user account was confirmed</returns>
	[HttpPatch("confirm")]
	public Task<IActionResult> ConfirmUserAccount(
		ManuallyConfirmUserAccountRequest data,
		[FromServices] IStatusActionOrchestrator<ManuallyConfirmUserAccountRequest> orchestrator)
		=> orchestrator.Execute(data);
}