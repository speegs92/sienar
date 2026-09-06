import { AuthorizeRoute, useDocumentTitle } from '@sienar/utils';
import { CHANGE_PASSWORD_SUCCESSFUL_LAYOUT} from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the change password successful page
 */
export const CHANGE_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;

function Successful() {
	useDocumentTitle('Password changed');

	return (
		<AuthorizeRoute>
			<h1>Password changed successfully</h1>
			<p>
				Your password was changed successfully! The next time you log in, you will need to use your updated password.
			</p>
		</AuthorizeRoute>
	);
}

const module: ViewModule = {
	path: urls.account.changePassword.successful,
	layout: CHANGE_PASSWORD_SUCCESSFUL_LAYOUT,
	view: <Successful/>,
	viewKey: CHANGE_PASSWORD_SUCCESSFUL_VIEW
};

export default module;
