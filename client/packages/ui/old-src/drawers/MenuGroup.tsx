import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuLink from './MenuLink.tsx';

import type { MenuLink as Link } from '@sienar/utils';

export type MenuGroupProps = {
	data: Link
}

export default function DashboardMenuGroup({data}: MenuGroupProps) {
	const [open, setOpen] = useState(false);

	const toggleOpen = () => setOpen(!open);

	data.endIcon = open ? <ExpandLess/> : <ExpandMore/>

	return (
		<>
			<MenuLink
				data={data}
				onClick={toggleOpen}
			/>

			<Collapse
				in={open}
				timeout='auto'
			>
				<List
					component='div'
					disablePadding
					sx={{
						pl: 2
					}}
				>
					{data.sublinks?.map(child => child.sublinks
						? <DashboardMenuGroup key={child.text} data={child} />
						: <MenuLink key={child.text} data={child} />)}
				</List>
			</Collapse>
		</>
	);
}