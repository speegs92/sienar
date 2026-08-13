import { classNames } from '@sienar/utils';
import { createThemedClassNames, ThemeContext } from '@ui/theme.ts';
import { CloseableContext } from '@ui/utils.ts';
import { Backdrop } from '../Backdrop.tsx';

import type { HTMLAttributes } from 'react';
import type { Color } from '@ui/theme.ts';

/**
 * The props for the sidebar component
 */
export interface SidebarProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
	/**
	 * The color of the sidebar
	 */
	color?: Color;

	/**
	 * Whether the sidebar should be open
	 */
	open?: boolean;

	/**
	 * Sets the open state of the sidebar
	 *
	 * @param o The new open state
	 */
	setOpen?: (o: boolean) => void;

	/**
	 * The HTML tag with which to render the sidebar
	 */
	tag?: keyof HTMLElementTagNameMap;
}

export function Sidebar(props: SidebarProps) {
	const {
		tag: Tag = 'div',
		color,
		open = false,
		setOpen,
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		createThemedClassNames(color, undefined, 'app__sidebar'),
		{
			'app__sidebar--open': open
		}
	);

	return (
		<CloseableContext.Provider value={{
			isOpen: open,
			close: () => setOpen?.(false)
		}}>
			<ThemeContext.Provider value={{ color }}>
				<Backdrop
					visible={open}
					onClick={() => setOpen?.(false)}
				/>
				<Tag className={classes} {...rest} />
			</ThemeContext.Provider>
		</CloseableContext.Provider>
	);
}
