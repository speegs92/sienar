import { classNames } from '@sienar/utils';

import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { Color } from '@ui/theme.ts';

export type MenuProps<T extends ElementType> = {
	/**
	 * The color of the menu
	 */
	color?: Color;

	/**
	 * The HTML element with which to render the menu
	 */
	tag?: T;
} & ComponentPropsWithoutRef<T>

export function Menu<T extends ElementType = 'ul'>(props: MenuProps<T>) {
	const {
		tag: Tag = 'ul',
		color,
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		'menu'
	);

	return <Tag className={classes} {...rest} />;
}
