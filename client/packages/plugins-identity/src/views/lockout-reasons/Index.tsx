// import { Table } from '@sienar/ui';
// import { LOCKOUT_REASONS_SERVICE } from '@plugins-identity/services.ts';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/utils';
import { roles } from '@plugins-identity/constants.ts';
import { LOCKOUT_REASONS_URL } from '@plugins-identity/urls.ts';
import { LOCKOUT_REASONS_LAYOUT } from '@plugins-identity/layouts.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the lockout reasons page
 */
export const LOCKOUT_REASONS_VIEW = Symbol() as InjectionKey<ReactNode>;

function Index() {
	useDocumentTitle('Lockout reasons');

	return (
		<AuthorizeRoute roles={roles.admin}>
			{/*<Table*/}
			{/*	title='Lockout reasons'*/}
			{/*	columns={[*/}
			{/*		{*/}
			{/*			field: 'reason',*/}
			{/*			headerName: 'Reason',*/}
			{/*			flex: 1*/}
			{/*		}*/}
			{/*	]}*/}
			{/*	serviceKey={LOCKOUT_REASONS_SERVICE}*/}
			{/*	entityTypeName='lockout reason'*/}
			{/*/>*/}
		</AuthorizeRoute>
	);
}

const module: ViewModule = {
	path: '/dashboard/lockout-reasons',
	pathKey: LOCKOUT_REASONS_URL,
	layout: LOCKOUT_REASONS_LAYOUT,
	view: <Index/>,
	viewKey: LOCKOUT_REASONS_VIEW
};

export default module;
