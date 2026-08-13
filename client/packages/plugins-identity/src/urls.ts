import type { InjectionKey } from '@sienar/utils';

export const ABOUT_URL = Symbol() as InjectionKey<string>;
export const TOS_URL = Symbol() as InjectionKey<string>;
export const PRIVACY_POLICY_URL = Symbol() as InjectionKey<string>;

// region Users

export const USERS_URL = Symbol() as InjectionKey<string>;
export const USERS_ADD_URL = Symbol() as InjectionKey<string>;
export const USERS_EDIT_URL = Symbol() as InjectionKey<string>;
export const USERS_ROLES_URL = Symbol() as InjectionKey<string>;
export const USERS_LOCK_URL = Symbol() as InjectionKey<string>;

// endregion

// region Lockout reasons

export const LOCKOUT_REASONS_URL = Symbol() as InjectionKey<string>;
export const LOCKOUT_REASONS_ADD_URL = Symbol() as InjectionKey<string>;
export const LOCKOUT_REASONS_EDIT_URL = Symbol() as InjectionKey<string>;

// endregion