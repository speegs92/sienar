import { classNames } from '@sienar/utils';

import type { HTMLAttributes } from 'react';

/**
 * The props for the backdrop component
 */
export interface BackdropProps extends HTMLAttributes<HTMLElement> {
	/**
	 * Whether the backdrop should be visible
	 */
	visible: boolean;

	/**
	 * The HTML tag with which to render the backdrop
	 */
	tag?: keyof HTMLElementTagNameMap;
}

export function Backdrop(props: BackdropProps) {
	const {
		visible,
		tag: Tag = 'div',
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		'backdrop',
		{
			'backdrop--visible': visible
		}
	);

	return <Tag className={classes} {...rest}/>;
}
