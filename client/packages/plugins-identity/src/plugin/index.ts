import { setupIdentityLayouts } from './layouts.tsx';
import { setupIdentityMenus } from './menus.tsx';
import { setupIdentityServices } from './services.ts';
import { setupIdentityPartials } from './partials.tsx';
import { setupViewModules } from './viewModules.ts';

export * from './layouts.tsx';
export * from './menus.tsx';
export * from './partials.tsx';
export * from './services.ts';
export * from './viewModules.ts';

export function plugin() {
	setupIdentityLayouts();
	setupIdentityMenus();
	setupIdentityServices();
	setupIdentityPartials();

	setupViewModules();
}
