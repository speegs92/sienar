import { useMemo, useState } from 'react';
import { aggregateLinks, classNames, DRAWER_HEADER_PARTIAL, DRAWER_FOOTER_PARTIAL, filterLinks, inject, useAuthContext, useActiveMenu } from '@sienar/utils';
import { useScrollLock } from '@ui/utils.ts';
import { Menu, MenuItem } from '@ui/Menu';
import { ModalContainer } from '@ui/Modal';
import { Notifications } from '@ui/Notification';
import { Appbar } from './Appbar.tsx';
import { Sidebar } from './Sidebar.tsx';

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
		'd-flex flex-row min-vh-100'
	);

	return (
		<>
			<Tag className={appClasses} {...rest}>
				<div
					className={classNames(
						'offcanvas-start offcanvas-lg',
						{
							'show': open
						}
					)}
					{...sidebarProps}
				>
					<div className='flex-grow-1'>
						{inject(DRAWER_HEADER_PARTIAL, true)}

						<Menu>
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
				</div>

				<div className='app__window'>
					<Appbar {...appbarProps}>
						<button
							className='btn btn-outline-primary d-lg-none'
							onClick={() => setOpen(!open)}
						>
							<i className='bi bi-list'/>
						</button>
					</Appbar>

					<main className='flex-grow-1'>
						<div className='container-fluid p-4'>
							{children}
						</div>
					</main>
				</div>
			</Tag>
			<Notifications/>
			<ModalContainer maxWidth='md'/>
		</>
	);
}
