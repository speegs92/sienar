import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DrawerContent from '@ui/drawers/DrawerContent.tsx';

import type { PropsWithChildren } from 'react';

export default function DashboardShared({ children }: PropsWithChildren) {
	const [open, setOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		setOpen(false)
	}, [location]);

	const drawerContent = <DrawerContent/>;

	const drawerWidth = '20%';
	const drawerMinWidth = '200px';
	const drawerMaxWidth = '300px';

	const drawerCommonStyles = {
		display: 'flex',
		minHeight: '100vh',
		flexDirection: 'column'
	};

	return (
		<Box sx={{display: 'flex'}}>
			<CssBaseline/>
			<AppBar
				position='fixed'
				sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						sx={{
							mr: 2,
							display: { xs: 'block', md: 'none' }
						}}
						onClick={() => setOpen(!open)}
					>
						{open ? <CloseIcon/> : <MenuIcon/>}
					</IconButton>
				</Toolbar>
			</AppBar>

			<Drawer
				variant='temporary'
				anchor='left'
				open={open}
				onClose={() => setOpen(false)}
				sx={{
					display: { xs: 'flex', md: 'none' },
					[`& .MuiDrawer-paper`]: drawerCommonStyles
				}}
			>
				{drawerContent}
			</Drawer>

			<Drawer
				variant='permanent'
				anchor='left'
				sx={{
					minWidth: drawerMinWidth,
					width: drawerWidth,
					maxWidth: drawerMaxWidth,
					display: { xs: 'none', md: 'block' },
					[`& .MuiDrawer-paper`]: {
						minWidth: drawerMinWidth,
						width: drawerWidth,
						maxWidth: drawerMaxWidth,
						boxSizing: 'border-box',
						...drawerCommonStyles
					}
				}}
			>
				{drawerContent}
			</Drawer>

			<Box
				sx={{
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh'
				}}
			>
				<Box sx={{ flexGrow: 1 }}>
					<Toolbar/>
					<Box
						component='main'
						sx={{ p: 4 }}
					>
						{children}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}