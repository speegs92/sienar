import { Button, Content, Form, Textbox } from '@sienar/ui';
import { AuthorizeRoute, required, useAuthContext, useDocumentTitle, useNavigate } from '@sienar/utils';
import { DELETE_ACCOUNT_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the delete account page
 */
export const DELETE_ACCOUNT_VIEW = Symbol() as InjectionKey<ReactNode>;

function Delete() {
	useDocumentTitle('Delete account');

	const authContext = useAuthContext();
	const navigate = useNavigate();

	return (
		<AuthorizeRoute>
			<Content title='Delete account'>
				<p>
					Are you sure you want to delete your account? This cannot be undone! Enter your password to confirm you wish to proceed.
				</p>

				<Form
					color='error'
					endpoint='/api/account'
					method='DELETE'
					onSuccess={successful => {
						if (successful) {
							authContext.logout();
							navigate('/dashboard/account/deleted');
						}
					}}
				>
					<Textbox
						name='password'
						displayName='Password'
						type='password'
						validators={[required()]}
						validationListProps={{ hideNonErrors: true }}
					/>

					<Button
						type='submit'
						color='error'
					>
						Delete account forever!
					</Button>
				</Form>
			</Content>
		</AuthorizeRoute>
	);
}

const module: ViewModule = {
	path: urls.account.delete,
	layout: DELETE_ACCOUNT_LAYOUT,
	view: <Delete/>,
	viewKey: DELETE_ACCOUNT_VIEW
};

export default module;
