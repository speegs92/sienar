import { useMemo, useState } from 'react';
import { aggregateLinks, classNames, DRAWER_HEADER_PARTIAL, DRAWER_FOOTER_PARTIAL, filterLinks, inject, useAuthContext, useActiveMenu } from '@sienar/utils';
import { createThemedClassNames } from '@ui/theme.ts';
import { useScrollLock } from '@ui/utils.ts';
import { Button, Container, Icon, Menu, MenuItem, ModalContainer, Notifications } from '@ui/components';
import { Appbar } from './Appbar.tsx';
import { Sidebar } from './Sidebar.tsx';
import { MainContent } from './MainContent.tsx';

import type { HTMLAttributes } from 'react';
import type { Color } from '@ui/theme.ts';
import type { SidebarProps } from './Sidebar.tsx';
import type { AppbarProps } from './Appbar.tsx';

/**
 * The props of the application component
 */
export interface ApplicationProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
	/**
	 * The color of the application
	 */
	color?: Color;

	/**
	 * The HTML tag with which to render the application
	 */
	tag?: keyof HTMLElementTagNameMap;

	/**
	 * The props to supply to the appbar component
	 */
	appbarProps?: AppbarProps;

	/**
	 * The props to supply to the sidebar component
	 */
	sidebarProps?: SidebarProps;
}

export function Application(props: ApplicationProps) {
	const {
		tag: Tag = 'div',
		color = 'bold',
		className,
		appbarProps,
		sidebarProps,
		children,
		...rest
	} = props;

	const activeMenu = useActiveMenu();
	const authContext = useAuthContext();
	const [open, setOpen] = useState(false);
	useScrollLock(open);

	const menuItems = useMemo(() => {
		const links = aggregateLinks(activeMenu);
		return filterLinks(links, authContext.isLoggedIn, authContext.roles);
	}, [activeMenu]);

	const appClasses = classNames(
		className,
		createThemedClassNames(color, undefined, 'app'),
		'd-flex flex-row',
		{
			'app--open': open
		}
	);

	return (
		<>
			<Tag className={appClasses} {...rest}>
				<Sidebar
					open={open}
					setOpen={setOpen}
					{...sidebarProps}
				>
					<div className='flex-grow-1'>
						{inject(DRAWER_HEADER_PARTIAL, true)}

						<Menu color={color}>
							{menuItems.map(item => (
								<MenuItem
									key={item.text}
									label={item.text}
									href={item.href}
									icon={item.icon}
								/>
							))}
						</Menu>
					</div>

					{inject(DRAWER_FOOTER_PARTIAL, true)}
				</Sidebar>

				<div className='app__window'>
					<Appbar {...appbarProps}>
						<Button
							className='d-lg-none'
							color={color}
							variant='text'
							icon={<Icon icon='menu'/>}
							onClick={() => setOpen(!open)}
						/>
					</Appbar>

					<MainContent
						sidebarOpen={open}
						className='flex-grow-1'
					>
						<Container className='p-4'>
							{children}
						</Container>
					</MainContent>
				</div>
			</Tag>
			<Notifications/>
			<ModalContainer maxWidth='md'/>
		</>
	);
}
