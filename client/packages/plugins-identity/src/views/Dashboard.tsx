import { MAIN_URL, MAIN_VIEW, MAIN_MENU } from '@sienar/plugins-core';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/utils';

import type { ViewModule } from '@sienar/plugins-core';

function Dashboard() {
	useDocumentTitle('Dashboard');

	return (
		<AuthorizeRoute>
			<h1>Dashboard stub</h1>
		</AuthorizeRoute>
	);
}

const module: ViewModule = {
	path: '/dashboard',
	pathKey: MAIN_URL,
	view: <Dashboard/>,
	viewKey: MAIN_VIEW,
	menu: {
		text: 'Dashboard',
		href: MAIN_URL,
		icon: ''
	},
	menuKey: MAIN_MENU
};

export default module;
