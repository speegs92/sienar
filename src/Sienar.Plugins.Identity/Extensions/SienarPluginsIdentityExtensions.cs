namespace Sienar.Extensions;

/// <summary>
/// Contains extension methods for the <c>Sienar.Plugins.Identity</c> assembly
/// </summary>
public static class SienarPluginsIdentityExtensions
{
	/// <param name="sc">The service collection</param>
	extension(IServiceCollection sc)
	{
		/// <summary>
		/// Adds Sienar Identity services to DI
		/// </summary>
		/// <param name="config">The app configuration</param>
		/// <typeparam name="TUser">The type of the user entity</typeparam>
		/// <returns>the service collection</returns>
		public IServiceCollection AddSienarIdentity<TUser>(
			IConfiguration config)
			where TUser : class, ISienarIdentityUser<TUser>, new()
		{
			sc
				.AddScoped<IPasswordHasher<TUser>, PasswordHasher<TUser>>()
				.AddScoped<IPasswordManager<TUser>, PasswordManager<TUser>>()
				.AddScoped<IUserClaimsFactory<TUser>, ServerUserClaimsFactory<TUser>>()
				.AddScoped<IUserClaimsPrincipalFactory<TUser>, Identity.UserClaimsPrincipalFactory<TUser>>()
				.AddScoped<IVerificationCodeManager<TUser>, VerificationCodeManager<TUser>>();


			/************
			 * Identity *
			 ***********/

			sc
				.AddScoped<IAccountEmailMessageFactory, AccountEmailMessageFactory>()
				.AddScoped<IAccountEmailManager<TUser>, AccountEmailManager<TUser>>()
				.AddScoped<IAccountUrlProvider, AccountUrlProvider>();

			// CRUD
			sc
				.AddEfEntity<TUser, SienarUserFilterProcessor<TUser>>()
				.AddEntityApiMapping<ViewUserDto, ViewUserMapper<TUser>, UpsertUserDto, UpsertUserMapper<TUser>, TUser>()
				.AddAccessValidator<UserIsAdminAccessValidator<TUser>, TUser>()
				.AddBeforeDeleteActionHook<RemoveIdentityRelationsOnUserDeleted<TUser>, TUser>()
				.AddStateValidator<EnsureUsernameUniqueOnUpsert<TUser>, TUser>()
				.AddStateValidator<EnsureEmailUniqueOnUpsert<TUser>, TUser>()
				.AddEfEntity<LockoutReason<TUser>, LockoutReasonFilterProcessor<TUser>>()
				.AddEntityApiMapping<LockoutReasonDto, LockoutReasonToEntityMapper<TUser>, LockoutReasonToDtoMapper<TUser>, LockoutReason<TUser>>();

			// Security
			sc
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
			sc
				.AddStateValidator<RegistrationOpenValidator, RegisterRequest>()
				.AddStateValidator<AcceptTosValidator, RegisterRequest>()
				.AddStateValidator<EnsureUsernameUniqueOnRegister<TUser>, RegisterRequest>()
				.AddStateValidator<EnsureEmailUniqueOnRegister<TUser>, RegisterRequest>()
				.AddStatusProcessor<RegisterProcessor<TUser>, RegisterRequest>();

			// Email
			sc
				.AddStatusProcessor<ConfirmAccountProcessor<TUser>, ConfirmAccountRequest>()
				.AddStatusProcessor<InitiateEmailChangeProcessor<TUser>, InitiateEmailChangeRequest>()
				.AddStatusProcessor<PerformEmailChangeProcessor<TUser>, PerformEmailChangeRequest>();

			// Personal data
			sc
				.AddBeforeStatusActionHook<RemoveIdentityRelationsOnOwnAccountDeleted<TUser>, DeleteAccountRequest>()
				.AddStatusProcessor<DeleteAccountProcessor<TUser>, DeleteAccountRequest>();


			/********
			 * Auth *
			 *******/

			sc.AddScoped<ISignInManager<TUser>, CookieSignInManager<TUser>>();


			/***********
			 * Options *
			 **********/

			sc
				.Configure<SienarOptions>(config.GetSection("Sienar:Core"))
				.Configure<EmailSenderOptions>(config.GetSection("Sienar:Email:Sender"))
				.Configure<IdentityEmailSubjectOptions>(config.GetSection("Sienar:Email:IdentityEmailSubjects"))
				.Configure<LoginOptions>(config.GetSection("Sienar:Login"));

			return sc;
		}
	}

	extension<T>(ISienarIdentityUser<T> user)
		where T : class, ISienarIdentityUser<T>
	{
		/// <summary>
		/// Determines whether the given user is locked out
		/// </summary>
		/// <returns>Whether the user is locked out</returns>
		public bool IsLockedOut()
			=> user.LockoutEnd.HasValue &&
				user.LockoutEnd.Value > DateTime.UtcNow;
	}
}
