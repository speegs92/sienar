import { classNames } from '@sienar/utils';
import { createThemedClassNames } from '@ui/theme.ts';

import type { HTMLAttributes } from 'react';
import type { Color } from '@ui/theme.ts';

/**
 * The props for the appbar component
 */
export interface AppbarProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
	/**
	 * The color of the appbar
	 */
	color?: Color;

	/**
	 * The HTML tag with which to render the sidebar
	 */
	tag?: keyof HTMLElementTagNameMap;
}

export function Appbar(props: AppbarProps) {
	const {
		tag: Tag = 'header',
		color,
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		createThemedClassNames(color, undefined, 'app__appbar')
	);

	return <Tag className={classes} {...rest} />;
}