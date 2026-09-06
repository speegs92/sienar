import { useSearchParams } from 'react-router-dom';
import { Button, Content, Form, HiddenInput, Textbox } from '@sienar/ui';
import { AuthorizeRoute, containsLower, containsNumber, containsSpecialCharacter, containsUpper, matches, maxLength, minLength, useDocumentTitle } from '@sienar/utils';
import { RESET_PASSWORD_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the reset password page
 */
export const RESET_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;

function Index() {
	useDocumentTitle('Reset password');

	const [ query ] = useSearchParams();
	const userId = query.get('userId');
	const code = query.get('code');

	return (
		<AuthorizeRoute mustBeLoggedOut>
			<Content title='Reset password'>
				<p>
					Please enter your new password. Your password should be at least 8 characters long and have at least one lowercase letter, one uppercase letter, one number, and one special character.
				</p>

				<Form
					endpoint='/api/account/password'
					method='PATCH'
					onSuccess='/dashboard/account/reset-password/successful'
				>
					<HiddenInput
						value={ userId ?? '' }
						name='userId'
					/>
					<HiddenInput
						value={ code ?? '' }
						name='verificationCode'
					/>
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
						validators={[
							matches('newPassword')
						]}
					/>

					<Button
						type='submit'
						color='primary'
					>
						Reset password
					</Button>
				</Form>
			</Content>

		</AuthorizeRoute>
	);
}

const module: ViewModule = {
	path: urls.account.resetPassword.index,
	layout: RESET_PASSWORD_LAYOUT,
	view: <Index/>,
	viewKey: RESET_PASSWORD_VIEW
};

export default module;
