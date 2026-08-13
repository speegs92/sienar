import { Link } from '@sienar/ui';
import { useDocumentTitle } from '@sienar/utils';
import { DELETED_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the account deleted page
 */
export const ACCOUNT_DELETED_VIEW = Symbol() as InjectionKey<ReactNode>;

function Deleted() {
	useDocumentTitle('Account deleted');

	return (
		<>
			<h1>Account deleted successfully</h1>
			<p>
				Your account has been deleted. You can no longer log in or access your account data, but you can <Link href={urls.account.register.index}>register again</Link>.
			</p>
		</>
	);
}

const module: ViewModule = {
	path: urls.account.deleted,
	layout: DELETED_LAYOUT,
	view: <Deleted/>,
	viewKey: ACCOUNT_DELETED_VIEW
};

export default module;
