import { useSearchParams } from 'react-router-dom';
import { Content, Form, HiddenInput } from '@sienar/ui';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/utils';
import { CHANGE_EMAIL_CONFIRM_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the change email confirmation page
 */
export const CHANGE_EMAIL_CONFIRM_VIEW = Symbol() as InjectionKey<ReactNode>;

function Index() {
	useDocumentTitle('Confirming email address');

	const [ search ] = useSearchParams();
	const userId = search.get('userId');
	const code = search.get('code');

	return (
		<AuthorizeRoute>
			<Content title='Confirming new email'>
				<p>
					Please wait while we confirm your new email address...
				</p>

				<Form
					endpoint='/api/account/email'
					method='PATCH'
					onSuccess='/dashboard/account/change-email/successful'
					immediate
				>
					<HiddenInput
						value={ userId ?? '' }
						name='userId'
					/>
					<HiddenInput
						value={ code ?? '' }
						name='verificationCode'
					/>
				</Form>
			</Content>
		</AuthorizeRoute>
	);
}

const module: ViewModule = {
	path: urls.account.changeEmail.confirm,
	layout: CHANGE_EMAIL_CONFIRM_LAYOUT,
	view: <Index/>,
	viewKey: CHANGE_EMAIL_CONFIRM_VIEW
}

export default module;
