// import { useParams } from 'react-router-dom';
// import { Form, Textbox } from '@sienar/ui';
// import { AuthorizeRoute, isEmail, required, useDocumentTitle } from '@sienar/utils';
// import { USERS_URL } from '@plugins-identity/urls.ts';
// import { USERS_SERVICE } from '@plugins-identity/services.ts';
// import { roles } from '@plugins-identity/constants.ts';
import { USERS_ADD_URL, USERS_EDIT_URL } from '@plugins-identity/urls.ts';
import { USERS_ADD_LAYOUT, USERS_EDIT_LAYOUT } from '@plugins-identity/layouts.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the users add page
 */
export const USERS_ADD_VIEW = Symbol() as InjectionKey<ReactNode>;

/**
 * The content of the users edit page
 */
export const USERS_EDIT_VIEW = Symbol() as InjectionKey<ReactNode>;

function Upsert() {
	return <></>;
	// const params = useParams();
	// const id = params['id'];
	//
	// useDocumentTitle(id ? 'Update user' : 'Create user');
	//
	// return (
	// 	<AuthorizeRoute roles={roles.admin}>
	// 		<Form
	// 			serviceKey={USERS_SERVICE}
	// 			createTitle='Create user'
	// 			createSubmitText='Add user'
	// 			updateTitle='Update user'
	// 			updateSubmitText='Update user'
	// 			upsert
	// 			successRedirectRoute={USERS_URL}
	// 		>
	// 			<Textbox
	// 				name='username'
	// 				displayName='Username'
	// 				validators={[required()]}
	// 			/>
	// 			<Textbox
	// 				name='email'
	// 				displayName='Email'
	// 				type='email'
	// 				validators={[
	// 					required(),
	// 					isEmail()
	// 				]}
	// 			/>
	// 			<Textbox
	// 				name='password'
	// 				displayName='Password'
	// 				type='password'
	// 				validators={[required()]}
	// 			/>
	// 			<Textbox
	// 				name='confirmPassword'
	// 				displayName='Confirm password'
	// 				type='password'
	// 				validators={[required()]}
	// 			/>
	// 		</Form>
	// 	</AuthorizeRoute>
	// );
}

export const addModule: ViewModule = {
	path: '/dashboard/users/add',
	pathKey: USERS_ADD_URL,
	layout: USERS_ADD_LAYOUT,
	view: <Upsert/>,
	viewKey: USERS_ADD_VIEW
};

export const editModule: ViewModule = {
	path: '/dashboard/users/:id',
	pathKey: USERS_EDIT_URL,
	layout: USERS_EDIT_LAYOUT,
	view: <Upsert/>,
	viewKey: USERS_EDIT_VIEW
};
