import { Button, Content, Form, Textbox } from '@sienar/ui';
import { AuthorizeRoute, required, useDocumentTitle } from '@sienar/utils';
import { FORGOT_PASSWORD_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the forgot password page
 */
export const FORGOT_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;

function Index() {
	useDocumentTitle('Password reset');

	return (
		<AuthorizeRoute mustBeLoggedOut>
			<Content title='Forgot password'>
				<p>
					Please enter your username or email address. If your account exists, you should receive an email to reset your password shortly.
				</p>

				<Form
					endpoint='/api/account/password'
					method='DELETE'
					onSuccess='/dashboard/account/forgot-password/successful'
				>
					<Textbox
						name='accountName'
						displayName='Username or email address'
						validators={[required()]}
						validationListProps={{ hideNonErrors: true }}
					>
						Username or email address
					</Textbox>

					<Button
						type='submit'
						color='primary'
					>
						Request password reset
					</Button>
				</Form>
			</Content>
		</AuthorizeRoute>
	);
}

const module: ViewModule = {
	path: urls.account.forgotPassword.index,
	layout: FORGOT_PASSWORD_LAYOUT,
	view: <Index/>,
	viewKey: FORGOT_PASSWORD_VIEW
};

export default module;
