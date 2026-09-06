export const roles = {
	admin: 'Administrator'
};

export const urls = {
	account: {
		changeEmail: {
			confirm: '/dashboard/account/change-email/confirm',
			index: '/dashboard/account/change-email',
			requested: '/dashboard/account/change-email/requested',
			successful: '/dashboard/account/change-email/successful'
		},
		changePassword: {
			index: '/dashboard/account/change-password',
			successful: '/dashboard/account/change-password/successful'
		},
		confirm: {
			index: '/dashboard/account/confirm',
			successful: '/dashboard/account/confirm/successful'
		},
		forgotPassword: {
			index: '/dashboard/account/forgot-password',
			successful: '/dashboard/account/forgot-password/successful'
		},
		register: {
			index: '/dashboard/account/register',
			successful: '/dashboard/account/register/successful'
		},
		resetPassword: {
			index: '/dashboard/account/reset-password',
			successful: '/dashboard/account/reset-password/successful'
		},
		locked: '/dashboard/account/locked',
		delete: '/dashboard/account/delete',
		deleted: '/dashboard/account/deleted',
		login: '/dashboard/account/login',
		personalData: '/dashboard/account/personal-data'
	}
}
