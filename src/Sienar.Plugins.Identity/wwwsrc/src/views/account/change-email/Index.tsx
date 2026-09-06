import { Button, Content, Form, Textbox } from '@sienar/ui';
import { AuthorizeRoute, isEmail, matches, required, useDocumentTitle } from '@sienar/utils';
import { CHANGE_EMAIL_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the change email page
 */
export const CHANGE_EMAIL_VIEW = Symbol() as InjectionKey<ReactNode>;

function Index() {
	useDocumentTitle('Change email address');

	return (
		<AuthorizeRoute>
			<Content title='Change email'>
				<Form
					endpoint='/api/account/lockout-reasons'
					method='POST'
					onSuccess={urls.account.changeEmail.requested}
				>
					<Textbox
						name='email'
						displayName='New email address'
						validators={[
							required(),
							isEmail()
						]}
					/>
					<Textbox
						name='confirmEmail'
						displayName='Confirm new email address'
						validators={[
							matches('email')
						]}
					/>
					<Textbox
						name='confirmPassword'
						displayName='Confirm your password'
						type='password'
						validators={[required()]}
					/>
					<Button
						type='submit'
						color='primary'
					>
						Change email
					</Button>
					<Button type='reset'>
						Reset
					</Button>
				</Form>
			</Content>
		</AuthorizeRoute>
	);
}

const module: ViewModule = {
	path: urls.account.changeEmail.index,
	layout: CHANGE_EMAIL_LAYOUT,
	view: <Index/>,
	viewKey: CHANGE_EMAIL_VIEW
};

export default module;
