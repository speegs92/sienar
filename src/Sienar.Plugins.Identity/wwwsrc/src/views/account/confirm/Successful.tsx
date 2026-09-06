import { useDocumentTitle } from '@sienar/utils';
import { Link } from '@sienar/ui';
import { CONFIRM_SUCCESSFUL_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the confirm account successful page
 */
export const CONFIRM_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;

function Successful() {
	useDocumentTitle('Account confirmed');

	return (
		<>
			<h1>Confirmed successfully</h1>
			<p>
				Your account is now confirmed! You can now <Link href={urls.account.login}>log in</Link>.
			</p>
		</>
	);
}

const module: ViewModule = {
	path: urls.account.confirm.successful,
	layout: CONFIRM_SUCCESSFUL_LAYOUT,
	view: <Successful/>,
	viewKey: CONFIRM_SUCCESSFUL_VIEW
};

export default module;
