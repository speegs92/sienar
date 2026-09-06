import { useSearchParams } from 'react-router-dom';
import { Content, Form, HiddenInput } from '@sienar/ui';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/utils';
import { CONFIRM_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the confirm account page
 */
export const CONFIRM_VIEW = Symbol() as InjectionKey<ReactNode>;

function Index() {
	useDocumentTitle('Confirming account');

	const [ search ] = useSearchParams();
	const userId = search.get('userId');
	const code = search.get('code');

	return (
		<AuthorizeRoute mustBeLoggedOut>
			<Content title='Confirming account'>
				<p>
					Please wait while we confirm your account...
				</p>

				<Form
					endpoint='/api/account/confirm'
					method='POST'
					onSuccess='/dashboard/account/confirm/successful'
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
	path: urls.account.confirm.index,
	layout: CONFIRM_LAYOUT,
	view: <Index/>,
	viewKey: CONFIRM_VIEW
};

export default module;
