import type { EntityBase } from '@sienar/utils';

// region Users

/**
 * Represents a reason why a user would be locked out of their account
 */
export type User = EntityBase & {
	/**
	 * The username of the user
	 */
	username: string

	/**
	 * The password of the user. This is only used to update a user's password. The value is never stored or logged.
	 */
	password: string

	/**
	 * A confirmation copy of the user's password. This is only used to update a user's password. The value is never stored or logged.
	 */
	confirmPassword: string

	/**
	 * The number of times the user has attempted to log in unsuccessfully
	 */
	loginFailedCount: number

	/**
	 * The date that the user's lockout ends. If the user is not locked out, this will be empty.
	 */
	lockoutEnd: Date|null|undefined

	/**
	 * The roles to which the user belongs
	 */
	roles: Role[]

	/**
	 * The lockout reasons used to justify the user's lockout. If the lockout is based on surpassing the maximum number of login attempts, then this array will still be empty.
	 */
	lockoutReasons: LockoutReason[]

	/**
	 * The user's email address
	 */
	email: string

	/**
	 * Whether the user's email address is confirmed or not
	 */
	emailConfirmed: boolean

	/**
	 * The pending email which the user has not yet confirmed. Will be empty if the user does not have a pending email change request.
	 */
	pendingEmail: string|null|undefined
}

export type Role = EntityBase & {
	/**
	 * The name of the role
	 */
	name: string
}

/**
 * Represents a verification code that the user can present to perform a sensitive action
 */
export type VerificationCode = EntityBase & {
	/**
	 * The code the user must present
	 */
	code: string

	/**
	 * The purpose of the verification code
	 */
	type: string

	/**
	 * The expiration date of the verification code
	 */
	expiresAt: string
}

/**
 * A base request used to make modifications to a specific user account
 */
export type UserIdRequest = {
	/**
	 * The ID of the user on which to act
	 */
	userId: string
}

/**
 * A base request used to send a verification code
 */
export type VerificationCodeRequest = {
	/**
	 * The verification code
	 */
	verificationCode: string
}

/**
 * The data required to add a user to a specific role
 */
export type AddUserToRoleRequest = UserIdRequest & {
	/**
	 * The ID of the role to which to add the user
	 */
	roleId: string
}

/**
 * The data required to manually confirm a user account
 */
export type ManuallyConfirmUserAccountRequest = UserIdRequest;

/**
 * The data required to remove a user from a specific role
 */
export type RemoveUserFromRoleRequest = UserIdRequest & {
	/**
	 * The ID of the role from which to remove the user
	 */
	roleId: string
}

/**
 * The data required to unlock a user's account from the admin UI
 */
export type UnlockUserAccountRequest = UserIdRequest;

/**
 * The data required to request a user account's lockout data
 */
export type AccountLockRequest = UserIdRequest & VerificationCodeRequest;

/**
 * The data describing a user's lockout status
 */
export type AccountLockResult = {
	/**
	 * The list of reasons a user's account is locked
	 */
	lockoutReasons: LockoutReason[]

	/**
	 * The date the lockout is scheduled to end. If <code>null</code> or <code>undefined</code>, the lockout is permanent.
	 */
	lockoutEnd?: string|null
}

// endregion

// region Lockout reasons

/**
 * Represents a reason why a user would be locked out of their account
 */
export type LockoutReason = EntityBase & {
	/**
	 * The text of the reason why the user is locked out
	 */
	reason: string
}

// endregion