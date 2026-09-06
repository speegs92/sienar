// import { useParams } from 'react-router-dom';
// import { Form, Textbox } from '@sienar/ui';
// import { AuthorizeRoute, required, useDocumentTitle } from '@sienar/utils';
// import { LOCKOUT_REASONS_URL } from '@plugins-identity/urls.ts';
// import { LOCKOUT_REASONS_SERVICE } from '@plugins-identity/services.ts';
// import { roles } from '@plugins-identity/constants.ts';
import { LOCKOUT_REASONS_ADD_URL, LOCKOUT_REASONS_EDIT_URL } from '@plugins-identity/urls.ts';
import { LOCKOUT_REASONS_ADD_LAYOUT, LOCKOUT_REASONS_EDIT_LAYOUT } from '@plugins-identity/layouts.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the lockout reasons add page
 */
export const LOCKOUT_REASONS_ADD_VIEW = Symbol() as InjectionKey<ReactNode>;

/**
 * The content of the lockout reasons edit page
 */
export const LOCKOUT_REASONS_EDIT_VIEW = Symbol() as InjectionKey<ReactNode>;

function Upsert() {
	// const params = useParams();
	// const id = params['id'];
	//
	// useDocumentTitle(id ? 'Update lockout reason' : 'Create lockout reason');
	//
	// return (
	// 	<AuthorizeRoute roles={roles.admin}>
	// 		<Form
	// 			serviceKey={LOCKOUT_REASONS_SERVICE}
	// 			successRedirectRoute={LOCKOUT_REASONS_URL}
	// 			createTitle='Create lockout reason'
	// 			createSubmitText='Add reason'
	// 			updateTitle='Update lockout reason'
	// 			updateSubmitText='Update reason'
	// 			upsert
	// 		>
	// 			<Textbox
	// 				name='reason'
	// 				displayName='Reason'
	// 				validators={[required()]}
	// 			/>
	// 		</Form>
	// 	</AuthorizeRoute>
	// );
	return <></>;
}

export const addModule: ViewModule = {
	path: '/dashboard/lockout-reasons/add',
	pathKey: LOCKOUT_REASONS_ADD_URL,
	layout: LOCKOUT_REASONS_ADD_LAYOUT,
	view: <Upsert/>,
	viewKey: LOCKOUT_REASONS_ADD_VIEW
};

export const editModule: ViewModule = {
	path: '/dashboard/lockout-reasons/:id',
	pathKey: LOCKOUT_REASONS_EDIT_URL,
	layout: LOCKOUT_REASONS_EDIT_LAYOUT,
	view: <Upsert/>,
	viewKey: LOCKOUT_REASONS_EDIT_VIEW
};
