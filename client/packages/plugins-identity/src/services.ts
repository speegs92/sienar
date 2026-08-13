import type { CrudService, InjectionKey, Service, StatusService } from '@sienar/utils';
import type { AccountLockRequest, AccountLockResult, AddUserToRoleRequest, LockoutReason, ManuallyConfirmUserAccountRequest, RemoveUserFromRoleRequest, Role, UnlockUserAccountRequest, User } from '@plugins-identity/types.ts';

// region Account
export const GET_LOCKOUT_REASONS_SERVICE = Symbol() as InjectionKey<Service<AccountLockRequest, AccountLockResult>>;

// endregion

// region Users

export const USERS_SERVICE = Symbol() as InjectionKey<CrudService<User>>;
export const ROLES_SERVICE = Symbol() as InjectionKey<CrudService<Role>>;
export const ADD_USER_TO_ROLE_SERVICE = Symbol() as InjectionKey<StatusService<AddUserToRoleRequest>>;
export const REMOVE_USER_FROM_ROLE_SERVICE = Symbol() as InjectionKey<StatusService<RemoveUserFromRoleRequest>>;
export const LOCK_USER_ACCOUNT_SERVICE = Symbol() as InjectionKey<StatusService<FormData>>;
export const UNLOCK_USER_ACCOUNT_SERVICE = Symbol() as InjectionKey<StatusService<UnlockUserAccountRequest>>;
export const MANUALLY_CONFIRM_USER_ACCOUNT_SERVICE = Symbol() as InjectionKey<StatusService<ManuallyConfirmUserAccountRequest>>;

// endregion

// region Lockout reasons

export const LOCKOUT_REASONS_SERVICE = Symbol() as InjectionKey<CrudService<LockoutReason>>;

// endregion
