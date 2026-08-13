import { useDocumentTitle } from '@sienar/utils';
import { FORGOT_PASSWORD_SUCCESSFUL_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the forgot password successful page
 */
export const FORGOT_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;

function Successful() {
	useDocumentTitle('Password reset requested');

	return (
		<>
			<h1>Password reset requested successfully</h1>
			<p>
				You have successfully requested to reset your password. Check your email for a link to reset your password. Click the link, then follow the on-screen instructions to finish resetting your password.
			</p>
		</>
	)
}

const module: ViewModule = {
	path: urls.account.forgotPassword.successful,
	layout: FORGOT_PASSWORD_SUCCESSFUL_LAYOUT,
	view: <Successful/>,
	viewKey: FORGOT_PASSWORD_SUCCESSFUL_VIEW
};

export default module;
