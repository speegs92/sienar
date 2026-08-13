import { useMemo } from 'react';
import { aggregateLinks, createApiCall, filterLinks, useAuthContext } from '@sienar/utils';
import { Dropdown, Icon, Menu, MenuDivider, MenuItem, Stack } from '@sienar/ui';
import { USER_SETTINGS_MENU } from '@plugins-identity/menus.ts';

import type { ReactNode } from 'react';
import type { InjectionKey, MenuLink, LinkDictionary } from '@sienar/utils';

export type UserBadgeProps = {
	menuKeys?: InjectionKey<LinkDictionary>[]
}

export default function UserBadge(props: UserBadgeProps) {
	const {
		menuKeys = [USER_SETTINGS_MENU]
	} = props;

	const authContext = useAuthContext();
	const logoutCall = createApiCall(
		'/api/account/login',
		'DELETE',
		authContext.logout
	);

	const {
		isLoggedIn,
		username,
		roles
	} = authContext;

	const settingsMenus = useMemo(() => {
		const links: MenuLink[][] = [];
		for (let key of menuKeys) {
			const rawLinks = aggregateLinks(key);
			const filtered = filterLinks(rawLinks, isLoggedIn, roles);
			links.push(filtered);
		}

		return links;
	}, [isLoggedIn, roles]);

	const settingsMenuContent: ReactNode[] = [];
	settingsMenus.map((menu, i) => {
		menu.forEach(item => {
			settingsMenuContent.push((
				<MenuItem
					href={item.href}
					icon={item.icon}
					key={item.text}
				>
					{item.text}
				</MenuItem>
			));
		});

		// Yes, I know that keys shouldn't be an index.
		// However, I'm doing it anyway for a few reasons:
		// 1. There's no otherwise unique data available in the immediate context
		// 2. The order of menu items will not change during runtime, as this is determined at startup only
		// 3. The provided menuKeys prop should not be changed during runtime
		// These circumstances ensure that React's optimizations will still work because the order of elements rendered will never change. It's possible that some new elements might be added or removed in certain circumstances, but React will still rightly identify the diff and happily re-render. Those cases are so few and far between anyway (they should probably never happen during normal app execution) that they aren't really worth considering.
		settingsMenuContent.push(<MenuDivider key={i}/>)
	});

	return (
		<Stack
			direction='horizontal'
			align='center'
			className='pt-2 mx-n2 px-2'
			style={{
				borderTop: '1px solid var(--color-soft-darken)'
			}}
		>
			<div
				className='d-flex justify-content-center align-items-center bg-primary text-white mr-4'
				style={{
					width: 36,
					height: 36,
					borderRadius: '9999px'
				}}
			>
				U
			</div>
			<div className='mr-auto'>
				<p>{username}</p>
			</div>
			<Dropdown
				buttonVariant='text'
				icon={<Icon icon='cog'/>}
				direction='up'
			>
				<Menu>
					{settingsMenuContent}
					<MenuItem
						icon={<Icon icon='logout'/>}
						onClick={logoutCall}
					>
						Log out
					</MenuItem>
				</Menu>
			</Dropdown>
		</Stack>
	)
}