import { MdiIcon, Stack, Table } from '@sienar/ui';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/utils';

import type { User } from '@plugins-identity/types.ts';
import { roles } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the users page
 */
export const USERS_VIEW = Symbol() as InjectionKey<ReactNode>;

function Index() {
	useDocumentTitle('Users');

	// const actionMenuRenderer = (user?: User) => (
	// 	<>
	// 		{!user!.lockoutEnd && (
	// 			<IconButtonLink
	// 				title={`Lock ${user!.username}'s account`}
	// 				to={`${currentUrl}/${user!.id}/lock`}
	// 			>
	// 				<LockIcon/>
	// 			</IconButtonLink>
	// 		)}
	//
	// 		{user!.lockoutEnd && (
	// 			<IconButton
	// 				color='warning'
	// 				title={`Unlock ${user!.username}'s account`}
	// 				onClick={() => {
	// 					selectedUser.current = user!;
	// 					setUnlockModalOpen(true);
	// 				}}
	// 			>
	// 				<LockOpenIcon/>
	// 			</IconButton>
	// 		)}
	//
	// 		<IconButton
	// 			color={user!.emailConfirmed ? 'primary' : 'warning'}
	// 			title={user!.emailConfirmed ? `${user!.username}'s account is already confirmed` : `Confirm ${user!.username}'s account`}
	// 			onClick={() => {
	// 				if (user!.emailConfirmed) return;
	// 				selectedUser.current = user!;
	// 				setConfirmModalOpen(true);
	// 			}}
	// 		>
	// 			<CheckBoxIcon/>
	// 		</IconButton>
	//
	// 		<IconButtonLink
	// 			color='primary'
	// 			title={`Update ${user!.username}'s roles`}
	// 			to={`${currentUrl}/${user!.id}/roles`}
	// 		>
	// 			<AdminPanelSettingsIcon/>
	// 		</IconButtonLink>
	// 	</>
	// );

	return (
		<AuthorizeRoute roles={roles.admin}>
			<Table
				endpoint='/api/users'
				columns={[
					{
						name: 'username',
						displayName: 'Username',
						sortable: true
					},
					{
						name: 'email',
						displayName: 'Email',
						sortable: true
					},
					{
						name: 'lockoutEnd',
						displayName: 'Account locked',
						sortable: false,
						renderer: (user: User) => (
							<Stack direction='horizontal' justify='center'>
								{!!user.lockoutEnd && <MdiIcon icon='checkbox-outline'/>}
								{!user.lockoutEnd && <MdiIcon icon='checkbox-blank-outline'/>}
							</Stack>
						)
					}
				]}
			/>

			{/*<ConfirmationDialog*/}
			{/*	title={`Unlock user account`}*/}
			{/*	open={unlockModalOpen}*/}
			{/*	question={`Are you sure you want to unlock user ${selectedUser.current?.username}'s account?? This will take effect immediately!`}*/}
			{/*	confirmText="Yes, I'm sure"*/}
			{/*	cancelText='No, leave them locked'*/}
			{/*	color='warning'*/}
			{/*	onConfirm={async () => {*/}
			{/*		const service = inject(UNLOCK_USER_ACCOUNT_SERVICE);*/}
			{/*		await service({ userId: selectedUser.current!.id });*/}
			{/*		setUnlockModalOpen(false);*/}
			{/*		table.current.reloadData();*/}
			{/*	}}*/}
			{/*	onCancel={() => setUnlockModalOpen(false)}*/}
			{/*/>*/}
			
			{/*<ConfirmationDialog*/}
			{/*	title={`Confirm user account`}*/}
			{/*	open={confirmModalOpen}*/}
			{/*	question={`Are you sure you want to confirm user ${selectedUser.current?.username}'s account?? This cannot be undone!`}*/}
			{/*	confirmText="Yes, I'm sure"*/}
			{/*	cancelText='No, let them confirm themselves'*/}
			{/*	color='warning'*/}
			{/*	onConfirm={async () => {*/}
			{/*		const service = inject(MANUALLY_CONFIRM_USER_ACCOUNT_SERVICE);*/}
			{/*		await service({ userId: selectedUser.current!.id });*/}
			{/*		setConfirmModalOpen(false);*/}
			{/*		table.current.reloadData();*/}
			{/*	}}*/}
			{/*	onCancel={() => setConfirmModalOpen(false)}*/}
			{/*/>*/}
		</AuthorizeRoute>
	);
}

const module: ViewModule = {
	path: '/dashboard/users',
	view: <Index/>,
	viewKey: USERS_VIEW
};

export default module;
