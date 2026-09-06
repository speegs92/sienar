import { Button, Content, Form, Textbox } from '@sienar/ui';
import { AuthorizeRoute, containsLower, containsNumber, containsSpecialCharacter, containsUpper, matches, maxLength, minLength, required, useDocumentTitle } from '@sienar/utils';
import { CHANGE_PASSWORD_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the change password page
 */
export const CHANGE_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;

function Index() {
	useDocumentTitle('Change password');

	return (
		<AuthorizeRoute>
			<Content title='Change password'>
				<Form
					endpoint='/api/account/change-password'
					method='PATCH'
					onSuccess='/dashboard/account/change-password/successful'
				>
					<Textbox
						name='newPassword'
						displayName='New password'
						type='password'
						validators={[
							minLength(8),
							maxLength(64),
							containsNumber(),
							containsLower(),
							containsUpper(),
							containsSpecialCharacter()
						]}
					/>
					<Textbox
						name='confirmNewPassword'
						displayName='Confirm new password'
						type='password'
						validators={[matches('newPassword')]}
					/>
					<Textbox
						name='currentPassword'
						displayName='Current password'
						type='password'
						validators={[required()]}
					/>

					<Button
						color='primary'
					>
						Change password
					</Button>
				</Form>
			</Content>
		</AuthorizeRoute>
	);
}

const module: ViewModule = {
	path: urls.account.changePassword.index,
	layout: CHANGE_PASSWORD_LAYOUT,
	view: <Index/>,
	viewKey: CHANGE_PASSWORD_VIEW
};

export default module;
