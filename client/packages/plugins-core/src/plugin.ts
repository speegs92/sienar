import { registerProvider, setActiveMenu } from '@sienar/utils';
import AuthProvider from '@plugins-core/AuthProvider.tsx';

import type { ReactNode } from 'react';
import type { InjectionKey, LinkDictionary } from '@sienar/utils';

/**
 * The main layout DI key
 */
export const MAIN_LAYOUT = Symbol() as InjectionKey<ReactNode|InjectionKey<ReactNode>>;

/**
 * The main menu DI key
 */
export const MAIN_MENU = Symbol() as InjectionKey<LinkDictionary>;

/**
 * The main view DI key
 */
export const MAIN_VIEW = Symbol() as InjectionKey<ReactNode|InjectionKey<ReactNode>>;

/**
 * The main URL DI key
 */
export const MAIN_URL = Symbol() as InjectionKey<string>;

export function plugin() {
	registerProvider(AuthProvider);
	setActiveMenu(MAIN_MENU);
}