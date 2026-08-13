import { provide, inject } from './di.ts';
import { createState } from './state.ts';

import type { ReactNode } from 'react';
import type { InjectionKey } from './di.ts';

const menuNames: Record<InjectionKey<LinkDictionary>, string> = {};

export const DASHBOARD_MENU = Symbol() as InjectionKey<LinkDictionary>;
export const DASHBOARD_UTILS_MENU = Symbol() as InjectionKey<LinkDictionary>;
export const DASHBOARD_UTILS_SETTINGS_MENU = Symbol() as InjectionKey<LinkDictionary>;

/**
 * Sets a menu's display name
 *
 * @param key The injection key of the menu
 * @param displayName The display name of the menu
 */
export function setMenuName(
	key: InjectionKey<LinkDictionary>,
	displayName: string
) {
	menuNames[key] = displayName;
}

/**
 * Gets a menu's display name, if it exists
 *
 * @param key The injection key of the menu
 */
export function getMenuName(key: InjectionKey<LinkDictionary>): string|undefined {
	return menuNames[key];
}

/**
 * Adds a {@link MenuLink} to a {@link LinkDictionary} with normal priority
 *
 * @param key The key of the menu to which to add links
 * @param links The links to add
 */
export function addLinks(
	key: InjectionKey<LinkDictionary>,
	...links: MenuLink[]) {
	addLinksWithPriority(key, 'normal', ...links);
}

/**
 * Adds a {@link MenuLink} to a {@link LinkDictionary}
 *
 * @param key The key of the menu to which to add links
 * @param links The links to add
 * @param priority The priority of the link to add
 */
export function addLinksWithPriority(
	key: InjectionKey<LinkDictionary>,
	priority: MenuPriority,
	...links: MenuLink[]
) {
	links.forEach(link => {
		link.allRolesRequired ??= true;
		link.requireLoggedIn ??= false;
		link.requireLoggedOut ??= false;
		link.roles ??= [];
	});

	let dictionary = inject(key, true);
	if (!dictionary) {
		dictionary = {} as LinkDictionary;
		provide(key, dictionary);
	}

	dictionary[priority] ??= [];
	dictionary[priority].push(...links);
}

/**
 * Aggregates an array of {@link MenuLink} that have been registered to the given menu name
 *
 * @param key The key of the menu from which to aggregate links
 */
export function aggregateLinks(key: InjectionKey<LinkDictionary>): MenuLink[] {
	const includedLinks: MenuLink[] = [];
	const menu = inject(key);

	const priorities: MenuPriority[] = ['highest', 'high', 'normal', 'low', 'lowest'];
	for (const priority of priorities) {
		const prioritizedLinks = menu[priority];
		if (prioritizedLinks) {
			prioritizedLinks.forEach(l => {
				if (l.childMenu) l.sublinks = aggregateLinks(l.childMenu);
			})
			includedLinks.push(...prioritizedLinks);
		}
	}

	return includedLinks;
}

/**
 * Filters links to determine which links the current user is able to view. Works recursively for {@link MenuLink} with nested links.
 *
 * @param links The array of {@link MenuLink} to filter
 * @param userIsLoggedIn Whether the current user is logged in
 * @param userRoles The roles of the current user
 */
export function filterLinks(
	links: MenuLink[],
	userIsLoggedIn: boolean,
	userRoles: string[]): MenuLink[] {
	const includedLinks: MenuLink[] = [];

	for (let link of links) {
		if (!userIsAuthorized(link, userIsLoggedIn, userRoles)) {
			continue;
		}

		if (link.sublinks) {
			link.sublinks = filterLinks(link.sublinks, userIsLoggedIn, userRoles);
		}

		includedLinks.push(link);
	}

	return includedLinks;
}

/**
 * Determines if a user is authorized to view a link based on their sign-in status and current roles
 *
 * @param link The link to check for authorization
 * @param userIsSignedIn Whether the current user is signed in to the application
 * @param userRoles The roles of the current user
 */
export function userIsAuthorized(
	link: MenuLink,
	userIsSignedIn: boolean,
	userRoles: string[]): boolean {
	if (link.requireLoggedIn && !userIsSignedIn) return false;
	if (link.requireLoggedOut && userIsSignedIn) return false;
	if (!link.roles || link.roles.length === 0) return true;

	const linkRoles: string[] = [];
	if (Array.isArray(link.roles)) {
		linkRoles.push(...link.roles);
	} else {
		linkRoles.push(link.roles);
	}

	for (let role of linkRoles) {
		if (userRoles.includes(role)) {
			if (link.allRolesRequired) continue;
			return true;
		}

		if (link.allRolesRequired) return false;
	}

	// Default is added when the links are added, so this is guaranteed not to be undefined
	return link.allRolesRequired as boolean;
}

const activeMenu = createState<InjectionKey<LinkDictionary>>(Symbol() as InjectionKey<LinkDictionary>);

/**
 * Sets the app's active menu
 *
 * @param newMenu The menu to set as active
 */
export const setActiveMenu = activeMenu.setter;

/**
 * Gets the app's active menu
 */
export const getActiveMenu = activeMenu.getter;

/**
 * Provides React components access to the active menu state
 */
export const useActiveMenu = activeMenu.hook;

/**
 * A container for {@link MenuLink} arrays with a {@link MenuPriority} key representing the render order of that key's links
 */
export type LinkDictionary = {
	[id in MenuPriority]: MenuLink[];
};

/**
 * Contains all the data needed to create a menu link
 */
export interface MenuLink {
	/**
	 * The display text of the link
	 */
	text: string

	/**
	 * The URL the link points to, if any
	 */
	href?: string|InjectionKey<string>

	/**
	 * The React component to use as the button component
	 */
	buttonComponent?: ReactNode

	/**
	 * The icon to show along with the link, if any
	 */
	icon?: ReactNode

	/**
	 * Whether the authorization requirements stored in the roles array should be satisfied by all roles in the array being present, or only by a single role being present
	 */
	allRolesRequired?: boolean

	/**
	 * Whether the link should only be displayed if the user is logged in
	 */
	requireLoggedIn?: boolean

	/**
	 * Whether the link should only be displayed if the user is logged out
	 */
	requireLoggedOut?: boolean

	/**
	 * The role(s) required to see the link in the menu, if any
	 */
	roles?: string[]|string

	/**
	 * The menu to render as a submenu, if any
	 */
	childMenu?: InjectionKey<LinkDictionary>

	/**
	 * Child links to display in a submenu, if any
	 */
	sublinks?: MenuLink[]

	/**
	 * The icon to render at the end of a menu link
	 */
	endIcon?: ReactNode
}

/**
 * Represents the priority order in which menu items should be rendered
 */
export type MenuPriority =
	| 'lowest'
	| 'low'
	| 'normal'
	| 'high'
	| 'highest'
