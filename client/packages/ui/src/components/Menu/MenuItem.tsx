import { inject } from '@sienar/utils';
import { useCloseableContext } from '@ui/utils.ts';
import { createThemedClassNames, useThemeContext } from '@ui/theme.ts';

import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import type { InjectionKey } from '@sienar/utils';
import type { Color } from '@ui/theme.ts';

/**
 * The props for the menu item component
 */
export interface MenuItemProps extends
	Omit<HTMLAttributes<HTMLLIElement>, 'color'> {
	/**
	 * The color of the menu item
	 */
	color?: Color;

	/**
	 * The text to display with the menu item, if any
	 */
	label?: string;

	/**
	 * The icon to display with the menu item, if any
	 */
	icon?: ReactNode;

	/**
	 * The <code>href</code> of the link, if any
	 */
	href?: string|InjectionKey<string>;

	/**
	 * The click handler, if any
	 */
	onClick?: MouseEventHandler<HTMLLIElement>
}

export function MenuItem(props: MenuItemProps) {
	const themeContext = useThemeContext();

	const {
		label,
		icon,
		color = themeContext.color,
		href,
		className,
		children,
		onClick,
		...rest
	} = props;

	const closeableContext = useCloseableContext();

	const classes = createThemedClassNames(
		color,
		undefined,
		'menu__item'
	);

	const handleClick: MouseEventHandler<HTMLLIElement> = e => {
		onClick?.(e);
		closeableContext.close();
	};

	const content = (
		<>
			<span className='menu__item-icon'>
				{icon}
			</span>
			{label ?? children}
		</>
	);

	return (
		<li
			className={classes}
			onClick={handleClick}
			{...rest}
		>
			{href && (
				<a
					className='menu__item-button'
					href={typeof href === 'string' ? href : inject(href)}
				>
					{content}
				</a>
			)}

			{!href && (
				<button className='menu__item-button'>
					{content}
				</button>
			)}
		</li>
	);
}