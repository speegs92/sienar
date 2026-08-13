import { addLinksWithPriority, provide, registerRoutes, setActiveMenu } from '@sienar/utils';
import { MAIN_LAYOUT, MAIN_MENU } from './plugin.ts';

import type { ReactNode } from 'react';
import type { InjectionKey, LinkDictionary, MenuLink, MenuPriority } from '@sienar/utils';

/**
 * Adds view modules' definitions to the Sienar app
 *
 * @param viewModules The view modules to add
 */
export function addViewModules(...viewModules: ViewModule[]) {
	for (const module of viewModules) {
		if (module.pathKey) {
			provide(module.pathKey, module.path);
		}

		if (module.viewKey) {
			provide(module.viewKey, module.view);
		}

		if (module.menu) {
			addLinksWithPriority(
				module.menuKey ?? MAIN_MENU,
				module.menuPriority ?? 'normal',
				module.menu
			)
		}

		registerRoutes(
			module.layout ?? MAIN_LAYOUT,
			{
				path: module.pathKey ?? module.path,
				element: module.viewKey ?? module.view,
				middleware: [
					() => setActiveMenu(module.layoutMenu ?? MAIN_MENU)
				]
			}
		);
	}
}

/**
 * A routable view module containing all the information needed to render a view in Sienar
 */
export interface ViewModule {
	/**
	 * The route path. Can be either a string or an injection key pointing to a string
	 */
	path: string|InjectionKey<string>;

	/**
	 * The injection key at which to provide the view module's path
	 */
	pathKey?: InjectionKey<string>;

	/**
	 * The element to render
	 */
	view: InjectionKey<ReactNode>|ReactNode;

	/**
	 * The injection key at which to provide the view module's view
	 */
	viewKey?: InjectionKey<ReactNode>;

	/**
	 * The layout in which to render the view
	 */
	layout?: InjectionKey<InjectionKey<ReactNode>>|InjectionKey<ReactNode>;

	/**
	 * The menu link to add to the given menu key
	 */
	menu?: MenuLink;

	/**
	 * The priority at which to add the given menu link to the given menu
	 */
	menuPriority?: MenuPriority;

	/**
	 * The menu key associated with the view
	 */
	menuKey?: InjectionKey<LinkDictionary>;

	/**
	 * The menu to display in the layout when this page is active
	 */
	layoutMenu?: InjectionKey<LinkDictionary>;
}