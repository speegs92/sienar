import { Icon } from '@sienar/ui';
import { MAIN_MENU } from '@sienar/plugins-core';
import { ALT_MENU } from './utils.ts';

import type { ViewModule } from '@sienar/plugins-core';

function AboutView() {
	return <h1>About page</h1>;
}

const module: ViewModule = {
	path: '/about',
	view: <AboutView/>,
	menu: {
		text: 'About',
		href: '/about',
		icon: <Icon icon='home'/>
	},
	menuKey: MAIN_MENU,
	layoutMenu: ALT_MENU
}

export default module;
