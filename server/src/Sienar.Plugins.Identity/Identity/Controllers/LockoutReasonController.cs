#pragma warning disable CA1822 // Member can be marked as static

namespace Sienar.Identity.Controllers;

/// <summary>
/// Contains API endpoints for lockout reason entity management
/// </summary>
/// <typeparam name="T">The type of the identity user</typeparam>
[ApiController]
[Route("/api/lockout-reasons")]
[Authorize(Roles = Roles.Admin)]
public class LockoutReasonController<T>
	where T : class, ISienarIdentityUser<T>
{
	/// <summary>
	/// Reads a collection of lockout reasons
	/// </summary>
	/// <param name="filter">The request filter, if any</param>
	/// <param name="orchestrator">The read request orchestrator</param>
	/// <returns>the lockout reason collection</returns>
	[HttpGet]
	public Task<IActionResult> Read(
		[FromQuery] Filter? filter,
		[FromServices] IReadAllActionOrchestrator<LockoutReasonDto, LockoutReason<T>> orchestrator)
		=> orchestrator.Execute(filter);

	/// <summary>
	/// Reads a single lockout reason by ID
	/// </summary>
	/// <param name="id">The ID of the lockout reason to fetch</param>
	/// <param name="filter">The request filter, if any</param>
	/// <param name="orchestrator">The read request orchestrator</param>
	/// <returns>the lockout reason</returns>
	[HttpGet("{id:int}")]
	public Task<IActionResult> Read(
		int id,
		[FromQuery] Filter? filter,
		[FromServices] IReadActionOrchestrator<LockoutReasonDto, LockoutReason<T>> orchestrator)
		=> orchestrator.Execute(id, filter);

	/// <summary>
	/// Creates a new lockout reason
	/// </summary>
	/// <param name="lockoutReason">The lockout reason information</param>
	/// <param name="orchestrator">The create request orchestrator</param>
	/// <returns>the new lockout reason's ID</returns>
	[HttpPost]
	public Task<IActionResult> Create(
		LockoutReasonDto lockoutReason,
		[FromServices] ICreateActionOrchestrator<LockoutReasonDto, LockoutReason<T>> orchestrator)
		=> orchestrator.Execute(lockoutReason);

	/// <summary>
	/// Updates a lockout reason
	/// </summary>
	/// <param name="lockoutReason">The lockout reason information</param>
	/// <param name="orchestrator">The update request orchestrator</param>
	/// <returns>whether the lockout reason was updated</returns>
	[HttpPut]
	public Task<IActionResult> Update(
		LockoutReasonDto lockoutReason,
		[FromServices] IUpdateActionOrchestrator<LockoutReasonDto, LockoutReason<T>> orchestrator)
		=> orchestrator.Execute(lockoutReason);

	/// <summary>
	/// Deletes a lockout reason
	/// </summary>
	/// <param name="id">The ID of the lockout reason to delete</param>
	/// <param name="orchestrator">The delete request orchestrator</param>
	/// <returns>whether the lockout reason was deleted</returns>
	[HttpDelete("{id:int}")]
	public Task<IActionResult> Delete(
		int id,
		[FromServices] IDeleteActionOrchestrator<LockoutReason<T>> orchestrator)
		=> orchestrator.Execute(id);
}
