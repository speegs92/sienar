import { useSearchParams } from 'react-router-dom';
import { Button, Content, Icon, LinkButton, Form, StandaloneCheckbox, Textbox } from '@sienar/ui';
import { AuthorizeRoute, required, useNavigate, useAuthContext, useDocumentTitle } from '@sienar/utils';
import { MAIN_URL } from '@sienar/plugins-core';
import { LOGIN_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey, RequestResult } from '@sienar/utils';

/**
 * The content of the login page
 */
export const LOGIN_VIEW = Symbol() as InjectionKey<ReactNode>;

function Login() {
	useDocumentTitle('Log in');
	const navigate = useNavigate();
	const authContext = useAuthContext();
	const [ params ] = useSearchParams();

	const onLogin = async (result: RequestResult<LoginResult>) => {
		if (result.result) {
			const { userId, verificationCode } = result.result;
			navigate(urls.account.locked, { userId, verificationCode });
		}

		if (!result.wasSuccessful) return;

		await authContext.loadUserData();
		const returnUrl = params.get('returnUrl');

		if (returnUrl) {
			params.delete('returnUrl');
			const queryParams = params.toString();
			navigate(`${returnUrl}?${queryParams}`)
		} else {
			navigate(MAIN_URL);
		}
	}

	return (
		<AuthorizeRoute mustBeLoggedOut>
			<Content title='Log in'>
				<Form
					endpoint='/api/account/login'
					method='POST'
					onSuccess={onLogin}
				>
					<Textbox
						name='accountName'
						displayName='Username or email address'
						leftIcon={<Icon icon='account'/>}
						validators={[required()]}
						validationListProps={{
							hideNonErrors: true
						}}
					/>
					<Textbox
						name='password'
						displayName='Password'
						type='password'
						leftIcon={<Icon icon='lock'/>}
						validators={[required()]}
						validationListProps={{
							hideNonErrors: true
						}}
					/>
					<StandaloneCheckbox name='rememberMe' color='secondary'>
						Remember me
					</StandaloneCheckbox>

					<Button
						type='submit'
						color='primary'
					>
						Log in
					</Button>

					<LinkButton
						href={urls.account.forgotPassword.index}
						color='secondary'
						variant='outlined'
					>
						I forgot my password
					</LinkButton>
				</Form>
			</Content>
		</AuthorizeRoute>
	);
}

/**
 * The data describing the result of a login operation
 */
interface LoginResult {
	/**
	 * The ID of the user who failed to log in
	 */
	userId: string

	/**
	 * The verification code the user can use to view the reason(s) their account is locked
	 */
	verificationCode: string
}

const module: ViewModule = {
	path: urls.account.login,
	layout: LOGIN_LAYOUT,
	view: <Login/>,
	viewKey: LOGIN_VIEW
};

export default module;
