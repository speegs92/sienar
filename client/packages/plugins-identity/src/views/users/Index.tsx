// import { useRef, useState } from 'react';
// import IconButton from '@mui/material/IconButton';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import LockIcon from '@mui/icons-material/Lock';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import { ConfirmationDialog, IconButtonLink, Table, TableBooleanCell } from '@sienar/ui';
// import { AuthorizeRoute, inject, useDocumentTitle } from '@sienar/utils';
// import { MANUALLY_CONFIRM_USER_ACCOUNT_SERVICE, UNLOCK_USER_ACCOUNT_SERVICE, USERS_SERVICE } from '@plugins-identity/services.ts';
// import { USERS_URL } from '@plugins-identity/urls.ts';
//
// import type { TableHandle } from '@sienar/ui';
// import type { User } from '@plugins-identity/types.ts';
// import { roles } from '@plugins-identity/constants.ts';
import { USERS_URL } from '@plugins-identity/urls.ts';
import { USERS_LAYOUT } from '@plugins-identity/layouts.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the users page
 */
export const USERS_VIEW = Symbol() as InjectionKey<ReactNode>;

function Index() {
	// useDocumentTitle('Users');
	//
	// const currentUrl = inject(USERS_URL);
	// const selectedUser = useRef<User|null>(null);
	// const table = useRef<TableHandle>(null!);
	// const [ unlockModalOpen, setUnlockModalOpen ] = useState(false);
	// const [ confirmModalOpen, setConfirmModalOpen ] = useState(false);
	//
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
	//
	// return (
	// 	<AuthorizeRoute roles={roles.admin}>
	// 		<Table
	// 			ref={table}
	// 			title='Users'
	// 			columns={[
	// 				{
	// 					field: 'username',
	// 					headerName: 'Username',
	// 					flex: 1
	// 				},
	// 				{
	// 					field: 'email',
	// 					headerName: 'Email',
	// 					flex: 2
	// 				},
	// 				{
	// 					field: 'lockoutEnd',
	// 					headerName: 'Account locked',
	// 					sortable: false,
	// 					width: 120,
	// 					flex: 0,
	// 					renderCell: ({ value }) => (
	// 						<TableBooleanCell
	// 							value={value as boolean}
	// 							color='primary'
	// 							center />
	// 					)
	// 				}
	// 			]}
	// 			serviceKey={USERS_SERVICE}
	// 			generateEntityName={u => u?.username}
	// 			entityTypeName='user'
	// 			actionMenuRenderer={actionMenuRenderer}
	// 			actionsColumnWidth={270}
	// 		/>
	//
	// 		<ConfirmationDialog
	// 			title={`Unlock user account`}
	// 			open={unlockModalOpen}
	// 			question={`Are you sure you want to unlock user ${selectedUser.current?.username}'s account?? This will take effect immediately!`}
	// 			confirmText="Yes, I'm sure"
	// 			cancelText='No, leave them locked'
	// 			color='warning'
	// 			onConfirm={async () => {
	// 				const service = inject(UNLOCK_USER_ACCOUNT_SERVICE);
	// 				await service({ userId: selectedUser.current!.id });
	// 				setUnlockModalOpen(false);
	// 				table.current.reloadData();
	// 			}}
	// 			onCancel={() => setUnlockModalOpen(false)}
	// 		/>
	//
	// 		<ConfirmationDialog
	// 			title={`Confirm user account`}
	// 			open={confirmModalOpen}
	// 			question={`Are you sure you want to confirm user ${selectedUser.current?.username}'s account?? This cannot be undone!`}
	// 			confirmText="Yes, I'm sure"
	// 			cancelText='No, let them confirm themselves'
	// 			color='warning'
	// 			onConfirm={async () => {
	// 				const service = inject(MANUALLY_CONFIRM_USER_ACCOUNT_SERVICE);
	// 				await service({ userId: selectedUser.current!.id });
	// 				setConfirmModalOpen(false);
	// 				table.current.reloadData();
	// 			}}
	// 			onCancel={() => setConfirmModalOpen(false)}
	// 		/>
	// 	</AuthorizeRoute>
	// );
	return <></>;
}

const module: ViewModule = {
	path: '/dashboard/users',
	pathKey: USERS_URL,
	layout: USERS_LAYOUT,
	view: <Index/>,
	viewKey: USERS_VIEW
};

export default module;
