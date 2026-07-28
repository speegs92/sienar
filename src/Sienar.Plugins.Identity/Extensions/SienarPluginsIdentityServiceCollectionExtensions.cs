namespace Sienar.Extensions;

/// <summary>
/// Contains <see cref="IServiceCollection"/> extension methods used by <c>Sienar.Plugins.Identity</c>
/// </summary>
public static class SienarPluginsIdentityServiceCollectionExtensions
{
	/// <summary>
	/// Adds Sienar Identity services to DI
	/// </summary>
	/// <param name="self">The service collection</param>
	/// <param name="config">The app configuration</param>
	/// <typeparam name="TUser">The type of the user entity</typeparam>
	/// <returns>the service collection</returns>
	public static IServiceCollection AddSienarIdentity<TUser>(
		this IServiceCollection self,
		IConfiguration config)
		where TUser : class, ISienarIdentityUser<TUser>, new()
	{
		self
			.AddScoped<IPasswordHasher<TUser>, PasswordHasher<TUser>>()
			.AddScoped<IPasswordManager<TUser>, PasswordManager<TUser>>()
			.AddScoped<IUserClaimsFactory<TUser>, ServerUserClaimsFactory<TUser>>()
			.AddScoped<IUserClaimsPrincipalFactory<TUser>, Identity.UserClaimsPrincipalFactory<TUser>>()
			.AddScoped<IVerificationCodeManager<TUser>, VerificationCodeManager<TUser>>();


		/************
		 * Identity *
		 ***********/

		self
			.AddScoped<IAccountEmailMessageFactory, AccountEmailMessageFactory>()
			.AddScoped<IAccountEmailManager<TUser>, AccountEmailManager<TUser>>()
			.AddScoped<IAccountUrlProvider, AccountUrlProvider>();

		// CRUD
		self
			.AddEfEntity<TUser, SienarUserFilterProcessor<TUser>>()
			.AddEntityApiMapping<ViewUserDto, ViewUserMapper<TUser>, UpsertUserDto, UpsertUserMapper<TUser>, TUser>()
			.AddAccessValidator<UserIsAdminAccessValidator<TUser>, TUser>()
			.AddBeforeDeleteActionHook<RemoveIdentityRelationsOnUserDeleted<TUser>, TUser>()
			.AddStateValidator<EnsureUsernameUniqueOnUpsert<TUser>, TUser>()
			.AddStateValidator<EnsureEmailUniqueOnUpsert<TUser>, TUser>()
			.AddEfEntity<LockoutReason<TUser>, LockoutReasonFilterProcessor<TUser>>()
			.AddEntityApiMapping<LockoutReasonDto, LockoutReasonToEntityMapper<TUser>, LockoutReasonToDtoMapper<TUser>, LockoutReason<TUser>>();

		// Security
		self
			.AddGeneralProcessor<LoginProcessor<TUser>, LoginRequest, LoginResult>()
			.AddStatusProcessor<LogoutProcessor<TUser>, LogoutRequest>()
			.AddResultProcessor<PersonalDataProcessor<TUser>, PersonalDataResult>()
			.AddAccessValidator<UserIsAdminAccessValidator<AddUserToRoleRequest>, AddUserToRoleRequest>()
			.AddAccessValidator<UserIsAdminAccessValidator<RemoveUserFromRoleRequest>, RemoveUserFromRoleRequest>()
			.AddStatusProcessor<LockUserAccountProcessor<TUser>, LockUserAccountRequest>()
			.AddAccessValidator<UserIsAdminAccessValidator<LockUserAccountRequest>, LockUserAccountRequest>()
			.AddStatusProcessor<UnlockUserAccountProcessor<TUser>, UnlockUserAccountRequest>()
			.AddAccessValidator<UserIsAdminAccessValidator<UnlockUserAccountRequest>, UnlockUserAccountRequest>()
			.AddStatusProcessor<ManuallyConfirmUserAccountProcessor<TUser>, ManuallyConfirmUserAccountRequest>()
			.AddAccessValidator<UserIsAdminAccessValidator<ManuallyConfirmUserAccountRequest>, ManuallyConfirmUserAccountRequest>()
			.AddStatusProcessor<ChangePasswordProcessor<TUser>, ChangePasswordRequest>()
			.AddStatusProcessor<ForgotPasswordProcessor<TUser>, ForgotPasswordRequest>()
			.AddStatusProcessor<ResetPasswordProcessor<TUser>, ResetPasswordRequest>()
			.AddResultProcessor<GetAccountDataProcessor, AccountDataResult>()
			.AddGeneralProcessor<GetLockoutReasonsProcessor<TUser>, AccountLockoutRequest, AccountLockoutResult>();

		// Registration
		self
			.AddStateValidator<RegistrationOpenValidator, RegisterRequest>()
			.AddStateValidator<AcceptTosValidator, RegisterRequest>()
			.AddStateValidator<EnsureUsernameUniqueOnRegister<TUser>, RegisterRequest>()
			.AddStateValidator<EnsureEmailUniqueOnRegister<TUser>, RegisterRequest>()
			.AddStatusProcessor<RegisterProcessor<TUser>, RegisterRequest>();

		// Email
		self
			.AddStatusProcessor<ConfirmAccountProcessor<TUser>, ConfirmAccountRequest>()
			.AddStatusProcessor<InitiateEmailChangeProcessor<TUser>, InitiateEmailChangeRequest>()
			.AddStatusProcessor<PerformEmailChangeProcessor<TUser>, PerformEmailChangeRequest>();

		// Personal data
		self
			.AddBeforeStatusActionHook<RemoveIdentityRelationsOnOwnAccountDeleted<TUser>, DeleteAccountRequest>()
			.AddStatusProcessor<DeleteAccountProcessor<TUser>, DeleteAccountRequest>();


		/********
		 * Auth *
		 *******/

		self.AddScoped<ISignInManager<TUser>, CookieSignInManager<TUser>>();


		/***********
		 * Options *
		 **********/

		self
			.Configure<SienarOptions>(config.GetSection("Sienar:Core"))
			.Configure<EmailSenderOptions>(config.GetSection("Sienar:Email:Sender"))
			.Configure<IdentityEmailSubjectOptions>(config.GetSection("Sienar:Email:IdentityEmailSubjects"))
			.Configure<LoginOptions>(config.GetSection("Sienar:Login"));

		return self;
	}
}
