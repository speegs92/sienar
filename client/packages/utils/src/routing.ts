// noinspection SuspiciousTypeOfGuard

import { createBrowserRouter } from 'react-router-dom';
import { inject } from './di.ts';

import type { ReactNode } from 'react'
import type { MiddlewareFunction, RouteObject } from 'react-router-dom';
import type { InjectionKey } from './di.ts';

const routes = new Map<(InjectionKey<InjectionKey<ReactNode>>|InjectionKey<ReactNode>), Route[]>();

export const ERROR_VIEW = Symbol() as InjectionKey<ReactNode>;

/**
 * Registers routes with the Sienar application
 *
 * @param layoutKey The key of the layout with which to render the routes
 * @param items The routes to render
 */
export function registerRoutes(layoutKey: InjectionKey<InjectionKey<ReactNode>>|InjectionKey<ReactNode>, ...items: Route[]): void {
	if (!routes.has(layoutKey)) {
		routes.set(layoutKey, []);
	}

	routes.get(layoutKey)!.push(...items);
}

export function createRouter() {
	const layoutRoutes: RouteObject[] = [];
	const mappedRoutes = new Map<ReactNode, Route[]>();
	const errorComponent = inject(ERROR_VIEW, true);

	for (let [layoutKey, childRoutes] of routes) {
		const injectedValue = inject(layoutKey);
		const layout = typeof injectedValue === 'symbol'
			? inject(injectedValue) as ReactNode
			: injectedValue as ReactNode;

		if (!mappedRoutes.has(layout)) {
			mappedRoutes.set(layout, []);
		}

		mappedRoutes
			.get(layout)!
			.push(...childRoutes);
	}

	for (let [layout, childRoutes] of mappedRoutes) {
		layoutRoutes.push({
			path: '',
			element: layout,
			errorElement: errorComponent,
			children: convertSienarRoutesToReactRoutes(childRoutes)
		});
	}

	return createBrowserRouter(layoutRoutes);
}

export function convertSienarRoutesToReactRoutes(sienarRoutes: Route[]): RouteObject[] {
	const reactRouterRoutes: RouteObject[] = [];

	for (let route of sienarRoutes) {
		const path = typeof route.path === 'string' ? route.path : inject(route.path);
		const rawElement = typeof route.element === 'symbol' ? inject(route.element) : route.element;
		const element: ReactNode = typeof rawElement === 'symbol' ? inject(rawElement) : rawElement;

		const reactRouterRoute: RouteObject = {
			path,
			element,
			middleware: route.middleware,
			children: route.children ? convertSienarRoutesToReactRoutes(route.children) : undefined
		}
		reactRouterRoutes.push(reactRouterRoute);
	}

	return reactRouterRoutes;
}

/**
 * A Sienar route object
 */
export interface Route {
	/**
	 * The route path. Can be either a string or an injection key pointing to a string
	 */
	path: string|InjectionKey<string>;

	/**
	 * The element to render. Can be either a {@link ReactNode} or an {@link InjectionKey} pointing to a {@see ReactNode}
	 */
	element: ReactNode|InjectionKey<ReactNode>;

	/**
	 * The child routes to render, if any
	 */
	children?: Route[];

	/**
	 * The middlewares to execute on navigation, if any
	 */
	middleware?: MiddlewareFunction[];
}