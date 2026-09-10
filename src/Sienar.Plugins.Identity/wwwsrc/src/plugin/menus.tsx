import { addLinks, addLinksWithPriority, DASHBOARD_MENU, DASHBOARD_UTILS_MENU, DASHBOARD_UTILS_SETTINGS_MENU } from '@sienar/utils';
import { MAIN_URL } from '@sienar/plugins-core';
import { MdiIcon } from '@sienar/ui';
import { USER_SETTINGS_MENU } from '@plugins-identity/menus.ts';
import * as URLS from '@plugins-identity/urls.ts';
import { roles, urls } from '@plugins-identity/constants.ts';

export function setupIdentityMenus() {
	addLinksWithPriority(
		DASHBOARD_MENU,
		'highest',
		{
			text: 'Dashboard',
			href: MAIN_URL,
			icon: <MdiIcon icon='dashboard'/>,
			requireLoggedIn: false
		}
	);

	addLinksWithPriority(
		DASHBOARD_UTILS_MENU,
		'lowest',
		{
			text: 'About',
			href: URLS.ABOUT_URL,
			icon: <MdiIcon icon='info'/>
		}
	);

	addLinks(
		DASHBOARD_UTILS_MENU,
		{
			text: 'Settings',
			roles: roles.admin,
			icon: <MdiIcon icon='settings'/>,
			childMenu: DASHBOARD_UTILS_SETTINGS_MENU
		}
	);

	addLinks(
		DASHBOARD_UTILS_SETTINGS_MENU,
		{
			text: 'Users',
			href: URLS.USERS_URL,
			icon: <MdiIcon icon='users'/>
		},
		{
			text: 'Lockout reasons',
			href: URLS.LOCKOUT_REASONS_URL,
			icon: <MdiIcon icon='lock'/>
		}
	);

	addLinks(
		USER_SETTINGS_MENU,
		{
			text: 'Change email address',
			href: urls.account.changeEmail.index,
			icon: <MdiIcon icon='email'/>,
			requireLoggedIn: true
		},
		{
			text: 'Change password',
			href: urls.account.changePassword.index,
			icon: <MdiIcon icon='lock'/>,
			requireLoggedIn: true
		},
		{
			text: 'Personal data',
			href: urls.account.personalData,
			icon: <MdiIcon icon='key'/>,
			requireLoggedIn: true
		},
		{
			text: 'Delete account',
			href: urls.account.delete,
			icon: <MdiIcon icon='delete'/>,
			requireLoggedIn: true
		}
	);
}
