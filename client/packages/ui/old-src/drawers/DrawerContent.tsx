import { useMemo, Fragment } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import DashboardMenuItem from './MenuLink.tsx';
import DashboardMenuGroup from './MenuGroup.tsx';
import { useAuthContext, useInfrastructureContext, aggregateLinks, filterLinks, inject, DRAWER_HEADER_PARTIAL, DRAWER_FOOTER_PARTIAL } from '@sienar/utils';
import type { MenuLink } from '@sienar/utils';

export default function DrawerContent() {
	const infrastructureContext = useInfrastructureContext();
	const { activeMenu, activeUtilsMenu } = infrastructureContext;
	const authContext = useAuthContext();
	const { isLoggedIn, roles } = authContext;

	const mainMenuItems = useMemo(() => {
		const links = aggregateLinks(activeMenu);
		return filterLinks(links, isLoggedIn, roles);
	}, [isLoggedIn, roles, activeMenu]);

	const utilsMenuItems = useMemo(() => {
		const links = aggregateLinks(activeUtilsMenu);
		return filterLinks(links, isLoggedIn, roles);
	}, [isLoggedIn, roles]);

	const drawerHeaderContent = inject(DRAWER_HEADER_PARTIAL, true);
	const drawerFooterContent = inject(DRAWER_FOOTER_PARTIAL, true);

	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between'
			}}
		>
			<div>
				<Toolbar/>
				{drawerHeaderContent}
				<DrawerMenu items={mainMenuItems}/>
				<Divider variant='middle'/>
				<DrawerMenu items={utilsMenuItems}/>
			</div>

			<div>
				{drawerFooterContent}
			</div>
		</Box>
	);
}

type DrawerMenuProps = {
	items: MenuLink[]
}

function DrawerMenu({ items }: DrawerMenuProps) {
	return (
		<List>
			{items.map(item => (
				<Fragment key={item.text}>
					{item.sublinks && (
						<DashboardMenuGroup data={item}	/>
					)}
					{!item.sublinks && (
						<DashboardMenuItem data={item} />
					)}
				</Fragment>
			))}
		</List>
	)
}