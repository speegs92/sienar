import type { ReactNode } from 'react';
import type { InjectionKey } from '@sienar/utils';

export const USERS_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const USERS_ADD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const USERS_EDIT_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const USERS_ROLES_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const USERS_LOCK_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;

export const LOCKOUT_REASONS_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const LOCKOUT_REASONS_ADD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const LOCKOUT_REASONS_EDIT_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;

export const CHANGE_EMAIL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_EMAIL_CONFIRM_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_EMAIL_REQUESTED_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_EMAIL_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_PASSWORD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CHANGE_PASSWORD_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CONFIRM_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const CONFIRM_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const DELETE_ACCOUNT_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const DELETED_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const FORGOT_PASSWORD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const FORGOT_PASSWORD_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const LOGIN_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const PERSONAL_DATA_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const REGISTER_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const REGISTER_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const RESET_PASSWORD_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const RESET_PASSWORD_SUCCESSFUL_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;
export const ACCOUNT_LOCKED_LAYOUT = Symbol() as InjectionKey<InjectionKey<ReactNode>>;