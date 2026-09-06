import { useSearchParams } from 'react-router-dom';
import { useDocumentTitle } from '@sienar/utils';
import { REGISTER_SUCCESSFUL_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the register successful page
 */
export const REGISTER_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;

function Successful() {
	useDocumentTitle('Registered');

	const [ params ] = useSearchParams();
	const username = params.get('username');
	const email = params.get('email');

	return (
		<>
			<h1>Registered successfully</h1>
			<p>
				Thank you for registering, {username}! A welcome email has been sent to {email}. Please click the verification link in the welcome email to verify your account.
			</p>
		</>
	);
}

const module: ViewModule = {
	path: urls.account.register.successful,
	layout: REGISTER_SUCCESSFUL_LAYOUT,
	view: <Successful/>,
	viewKey: REGISTER_SUCCESSFUL_VIEW
};

export default module;
