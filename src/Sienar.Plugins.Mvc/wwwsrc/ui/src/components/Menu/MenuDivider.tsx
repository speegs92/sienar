import { classNames } from '@sienar/utils';
import { createThemedClassNames, useThemeContext } from '@ui/theme.ts';
import type { HTMLAttributes } from 'react';
import type { Color } from '@ui/theme.ts';

/**
 * The props for the menu divider component
 */
export interface MenuDividerProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children'|'color'> {
	/**
	 * The menu divider color
	 */
	color?: Color;
}

export function MenuDivider(props: MenuDividerProps) {
	const themeContext = useThemeContext();

	const {
		color = themeContext.color,
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		'menu__item--divider',
		createThemedClassNames(color, undefined, 'menu__item')
	);

	return (
		<li
			className={classes}
			{...rest}
		>
			<hr/>
		</li>
	);
}