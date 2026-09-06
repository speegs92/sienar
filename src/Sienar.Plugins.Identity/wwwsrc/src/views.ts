import type { ReactNode } from 'react';
import type { InjectionKey } from '@sienar/utils';

export const ABOUT_VIEW = Symbol() as InjectionKey<ReactNode>;

export const CHANGE_EMAIL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_CONFIRM_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_REQUESTED_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CONFIRM_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CONFIRM_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const DELETE_ACCOUNT_VIEW = Symbol() as InjectionKey<ReactNode>;
export const DELETED_VIEW = Symbol() as InjectionKey<ReactNode>;
export const FORGOT_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const FORGOT_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const LOGIN_VIEW = Symbol() as InjectionKey<ReactNode>;
export const PERSONAL_DATA_VIEW = Symbol() as InjectionKey<ReactNode>;
export const REGISTER_VIEW = Symbol() as InjectionKey<ReactNode>;
export const REGISTER_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const RESET_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const RESET_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const ACCOUNT_LOCKOUT_VIEW = Symbol() as InjectionKey<ReactNode>;

export const USERS_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_ADD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_EDIT_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_ROLES_VIEW = Symbol() as InjectionKey<ReactNode>;
export const USERS_LOCK_VIEW = Symbol() as InjectionKey<ReactNode>;

export const LOCKOUT_REASONS_VIEW = Symbol() as InjectionKey<ReactNode>;
export const LOCKOUT_REASONS_ADD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const LOCKOUT_REASONS_EDIT_VIEW = Symbol() as InjectionKey<ReactNode>;