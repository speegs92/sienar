import { addViewModules } from '@sienar/plugins-core';

export function setupViewModules() {
	setupGlobalViewModules();
	setupAccountViewModules();
	setupLockoutReasonsViewModules();
	setupUsersViewModules();
}

// region Global

import dashboard from '@plugins-identity/views/Dashboard.tsx';
import about from '@plugins-identity/views/About.tsx';

function setupGlobalViewModules() {
	addViewModules(dashboard, about);
}

// endregion

// region Account

import accountChangeEmailIndex from '@plugins-identity/views/account/change-email/Index.tsx';
import accountChangeEmailConfirm from '@plugins-identity/views/account/change-email/Confirm.tsx';
import accountChangeEmailRequested from '@plugins-identity/views/account/change-email/Requested.tsx';
import accountChangeEmailSuccessful from '@plugins-identity/views/account/change-email/Successful.tsx';

import accountChangePasswordIndex from '@plugins-identity/views/account/change-password/Index.tsx';
import accountChangePasswordSuccessful from '@plugins-identity/views/account/change-password/Successful.tsx';

import accountConfirmIndex from '@plugins-identity/views/account/confirm/Index.tsx';
import accountConfirmSuccessful from '@plugins-identity/views/account/confirm/Successful.tsx';

import accountForgotPasswordIndex from '@plugins-identity/views/account/forgot-password/Index.tsx';
import accountForgotPasswordSuccessful from '@plugins-identity/views/account/forgot-password/Successful.tsx';

import accountRegisterIndex from '@plugins-identity/views/account/register/Index.tsx';
import accountRegisterSuccessful from '@plugins-identity/views/account/register/Successful.tsx';

import accountResetPasswordIndex from '@plugins-identity/views/account/reset-password/Index.tsx';
import accountResetPasswordSuccessful from '@plugins-identity/views/account/reset-password/Successful.tsx';

import accountLocked from '@plugins-identity/views/account/AccountLocked.tsx';
import accountDelete from '@plugins-identity/views/account/Delete.tsx';
import accountDeleted from '@plugins-identity/views/account/Deleted.tsx';
import accountLogin from '@plugins-identity/views/account/Login.tsx';
import accountPersonalData from '@plugins-identity/views/account/PersonalData.tsx';

function setupAccountViewModules() {
	addViewModules(
		accountChangeEmailIndex,
		accountChangeEmailConfirm,
		accountChangeEmailRequested,
		accountChangeEmailSuccessful,

		accountChangePasswordIndex,
		accountChangePasswordSuccessful,

		accountConfirmIndex,
		accountConfirmSuccessful,

		accountForgotPasswordIndex,
		accountForgotPasswordSuccessful,

		accountRegisterIndex,
		accountRegisterSuccessful,

		accountResetPasswordIndex,
		accountResetPasswordSuccessful,

		accountLocked,
		accountDelete,
		accountDeleted,
		accountLogin,
		accountPersonalData
	);
}

// endregion

// region Lockout reasons

import lockoutReasonsIndex from '@plugins-identity/views/lockout-reasons/Index.tsx';
import { addModule as lockoutReasonsAdd, editModule as lockoutReasonsEdit } from '@plugins-identity/views/lockout-reasons/Upsert.tsx';

function setupLockoutReasonsViewModules() {
	addViewModules(
		lockoutReasonsIndex,
		lockoutReasonsAdd,
		lockoutReasonsEdit
	);
}

// endregion

// region Users

import usersIndex from '@plugins-identity/views/users/Index.tsx';
import usersLock from '@plugins-identity/views/users/Lock.tsx';
import usersRoles from '@plugins-identity/views/users/Roles.tsx';
import { addModule as usersAdd, editModule as usersEdit } from '@plugins-identity/views/users/Upsert.tsx';

function setupUsersViewModules() {
	addViewModules(
		usersIndex,
		usersLock,
		usersRoles,
		usersAdd,
		usersEdit,
	)
}

// endregion
