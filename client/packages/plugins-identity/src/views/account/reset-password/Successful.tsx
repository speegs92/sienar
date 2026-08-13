import { Link } from '@sienar/ui';
import { useDocumentTitle } from '@sienar/utils';
import { RESET_PASSWORD_SUCCESSFUL_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the reset password successful page
 */
export const RESET_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;

function Successful() {
	useDocumentTitle('Password reset');

	return (
		<>
			<h1>Password reset successfully</h1>
			<p>
				You have reset your password successfully! You can now <Link href={urls.account.login}>log in</Link>.
			</p>
		</>
	)
}

const module: ViewModule = {
	path: urls.account.resetPassword.successful,
	layout: RESET_PASSWORD_SUCCESSFUL_LAYOUT,
	view: <Successful/>,
	viewKey: RESET_PASSWORD_SUCCESSFUL_VIEW
};

export default module;
