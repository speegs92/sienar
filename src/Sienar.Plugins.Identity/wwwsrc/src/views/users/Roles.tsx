// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Card, LoadingPage, Switch } from '@sienar/ui';
// import { AuthorizeRoute, inject, useDocumentTitle } from '@sienar/utils';
// import { ROLES_SERVICE, USERS_SERVICE, ADD_USER_TO_ROLE_SERVICE, REMOVE_USER_FROM_ROLE_SERVICE } from '@plugins-identity/services.ts';
// import { roles as appRoles } from '@plugins-identity/constants.ts';
// import type { Role, User } from '@plugins-identity/types.ts';
import { USERS_ROLES_URL } from '@plugins-identity/urls.ts';
import { USERS_ROLES_LAYOUT } from '@plugins-identity/layouts.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the users roles page
 */
export const USERS_ROLES_VIEW = Symbol() as InjectionKey<ReactNode>;

function Roles() {
	return <></>;
	// useDocumentTitle('Update user roles');
	//
	// const params = useParams();
	// const userId = params['id'];
	// const [ user, setUser ] = useState<User|null>(null);
	// const [ roles, setRoles ] = useState<Role[]>([]);
	//
	// const loadUser = async () => {
	// 	if (!userId) return;
	//
	// 	const service = inject(USERS_SERVICE);
	// 	setUser(await service.read(userId));
	// };
	//
	// useEffect(() => {
	// 	(async function() {
	// 		const service = inject(ROLES_SERVICE);
	// 		const result = await service.readAll();
	// 		setRoles(result.items);
	// 	})();
	// }, []);
	//
	// useEffect(() => {
	// 	loadUser();
	// }, [userId]);
	//
	// if (!user) {
	// 	return <p>User is loading, please wait...</p>;
	// }
	//
	// const addToRole = async (roleId: string) => {
	// 	const service = inject(ADD_USER_TO_ROLE_SERVICE);
	// 	const successful = await service({ userId: userId!, roleId });
	// 	if (successful) await loadUser();
	// };
	//
	// const removeFromRole = async (roleId: string) => {
	// 	const service = inject(REMOVE_USER_FROM_ROLE_SERVICE);
	// 	const successful = await service({ userId: userId!, roleId });
	// 	if (successful) await loadUser();
	// };
	//
	// return (
	// 	<AuthorizeRoute roles={appRoles.admin}>
	// 		<Card
	// 			title={`Update ${user.username}'s roles`}
	// 		>
	// 			{roles.map(r => (
	// 				<Switch
	// 					key={r.id}
	// 					color='primary'
	// 					checked={user.roles.some(userRole => userRole.id === r.id)}
	// 					onActivated={() => addToRole(r.id)}
	// 					onDeactivated={() => removeFromRole(r.id)}
	// 				>
	// 					{r.name}
	// 				</Switch>
	// 			))}
	// 		</Card>
	// 	</AuthorizeRoute>
	// );
}

const module: ViewModule = {
	path: '/dashboard/users/:id/roles',
	pathKey: USERS_ROLES_URL,
	layout: USERS_ROLES_LAYOUT,
	view: <Roles/>,
	viewKey: USERS_ROLES_VIEW
};

export default module;
