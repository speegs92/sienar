import { useState } from 'react';
import { Form, HiddenInput, Link, Textbox, StandaloneCheckbox } from '@sienar/ui';
import { AuthorizeRoute, containsLower, containsNumber, containsSpecialCharacter, containsUpper, inject, isEmail, matches, maxLength, minLength, required, useDocumentTitle } from '@sienar/utils';
import { PRIVACY_POLICY_URL, TOS_URL } from '@plugins-identity/urls.ts';
import { REGISTER_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the register page
 */
export const REGISTER_VIEW = Symbol() as InjectionKey<ReactNode>;

function Index() {
	useDocumentTitle('Register');

	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');

	const tosRoute = inject(TOS_URL, true);
	const privacyPolicyRoute = inject(PRIVACY_POLICY_URL, true);
	const useHiddenField = !tosRoute && !privacyPolicyRoute;
	const useBothAcceptLinks = !!(tosRoute && privacyPolicyRoute);

	return (
		<AuthorizeRoute mustBeLoggedOut>
			<Form
				title='Register'
				submitText='Register'
				endpoint='/api/account'
				method='POST'
				onSuccess={`/dashboard/account/register/successful?username=${username}&email=${email}`}
			>
				<Textbox
					name='username'
					displayName='Username'
					value={username}
					onChange={setUsername}
					validators={[
						required(),
						minLength(6),
						maxLength(32)
					]}
				/>
				<Textbox
					name='email'
					displayName='Email address'
					type='email'
					value={email}
					onChange={setEmail}
					validators={[
						required(),
						isEmail()
					]}
				/>
				<Textbox
					name='password'
					displayName='Password'
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
					name='confirmPassword'
					displayName='Confirm password'
					type='password'
					validators={[
						matches('password')
					]}
				/>

				{useHiddenField && (
					<HiddenInput
						name='acceptTos'
						value={true}
					/>
				)}
				{!useHiddenField && (
					<StandaloneCheckbox
						name='acceptTos'
						displayName='accept terms'
						validators={[
							required()
						]}
					>
						I accept the {tosRoute && <Link href={tosRoute} target='_blank'>Terms of Service</Link>} {useBothAcceptLinks && 'and'} {privacyPolicyRoute && <Link href={privacyPolicyRoute} target='_blank'>Privacy Policy</Link>}
					</StandaloneCheckbox>
				)}
			</Form>
		</AuthorizeRoute>
	);
}

const module: ViewModule = {
	path: urls.account.register.index,
	layout: REGISTER_LAYOUT,
	view: <Index/>,
	viewKey: REGISTER_VIEW
};

export default module;
