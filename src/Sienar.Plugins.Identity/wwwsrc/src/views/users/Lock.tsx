// import { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import dayjs from 'dayjs';
// import { Checkbox, CheckboxGroup, DatePicker, Form, HiddenInput, Radio, RadioGroup, Spacer } from '@sienar/ui';
// import { AuthorizeRoute, inject, required, useDocumentTitle } from '@sienar/utils';
// import { LOCK_USER_ACCOUNT_SERVICE, LOCKOUT_REASONS_SERVICE, USERS_SERVICE } from '@plugins-identity/services.ts';
// import { USERS_URL } from '@plugins-identity/urls.ts';
//
// import type { Dayjs } from 'dayjs';
// import type { LockoutReason, User } from '@plugins-identity/types.ts';
// import { roles } from '@plugins-identity/constants.ts';
import { USERS_LOCK_URL } from '@plugins-identity/urls.ts';
import { USERS_LOCK_LAYOUT } from '@plugins-identity/layouts.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the users lock page
 */
export const USERS_LOCK_VIEW = Symbol() as InjectionKey<ReactNode>;

function Lock() {
	return <></>;
	// useDocumentTitle('Lock user account');
	//
	// const [ lockoutReasons, setLockoutReasons ] = useState<LockoutReason[]>([]);
	// const [ user, setUser ] = useState<User|null>(null);
	// const params = useParams();
	// const userId = params['id'];
	// const now = useRef<Dayjs|null>(null);
	// const [ lockoutEnd, setLockoutEnd ] = useState<Dayjs|null>(dayjs());
	//
	// useEffect(() => {
	// 	now.current = dayjs();
	//
	// 	(async function() {
	// 		if (!userId) return;
	//
	// 		const userService = inject(USERS_SERVICE);
	// 		setUser(await userService.read(userId));
	//
	// 		const lockoutReasonService = inject(LOCKOUT_REASONS_SERVICE);
	// 		const result = await lockoutReasonService.readAll({ pageSize: 0 });
	// 		setLockoutReasons(result.items);
	// 	})();
	// }, []);
	//
	// if (lockoutReasons.length === 0 || !user) {
	// 	return <p>Loading required data, please wait...</p>;
	// }
	//
	// return (
	// 	<AuthorizeRoute roles={roles.admin}>
	// 		<Form
	// 			title={`Lock user ${user.username}'s account`}
	// 			serviceKey={LOCK_USER_ACCOUNT_SERVICE}
	// 			submitText='Lock account'
	// 			successRedirectRoute={USERS_URL}
	// 		>
	// 			<HiddenInput
	// 				name='userId'
	// 				value={userId!}
	// 			/>
	//
	// 			<CheckboxGroup
	// 				label='Why should the user be locked out?'
	// 				name='reasons'
	// 				displayName='lockout reasons'
	// 				validators={[required('You must select one or more %name')]}
	// 				maxHeight={300}
	// 			>
	// 				{lockoutReasons.map(r => (
	// 					<Checkbox value={r.id}>
	// 						{r.reason}
	// 					</Checkbox>
	// 				))}
	// 			</CheckboxGroup>
	//
	// 			<Spacer spacing={3}/>
	//
	// 			<RadioGroup
	// 				name='endDate'
	// 				label='How long should the user be locked out?'
	// 				displayName='lockout end date'
	// 			>
	// 				<Radio value={now.current!.add(1, 'day').toISOString()}>
	// 					One day
	// 				</Radio>
	// 				<Radio value={now.current!.add(7, 'days').toISOString()}>
	// 					One week
	// 				</Radio>
	// 				<Radio value={now.current!.add(1, 'month').toISOString()}>
	// 					One month
	// 				</Radio>
	// 				<Radio value={now.current!.add(1, 'year').toISOString()}>
	// 					One year
	// 				</Radio>
	// 				<Radio value=''>
	// 					Permanently
	// 				</Radio>
	// 				<Radio value={lockoutEnd?.toISOString() ?? ''}>
	// 					<DatePicker
	// 						name=''
	// 						value={lockoutEnd}
	// 						onChange={setLockoutEnd}
	// 					>
	// 						Pick a custom time
	// 					</DatePicker>
	// 				</Radio>
	// 			</RadioGroup>
	// 		</Form>
	// 	</AuthorizeRoute>
	// );
}

const module: ViewModule = {
	path: '/dashboard/users/:id/lock',
	pathKey: USERS_LOCK_URL,
	layout: USERS_LOCK_LAYOUT,
	view: <Lock/>,
	viewKey: USERS_LOCK_VIEW
};

export default module;
