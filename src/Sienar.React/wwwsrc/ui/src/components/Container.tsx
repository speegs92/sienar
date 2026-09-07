import { classNames } from '@sienar/utils';

import type { HTMLAttributes } from 'react';
import type { Breakpoint } from '@ui/theme.ts';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
	/**
	 * The breakpoint at which the container stops being fullwidth
	 */
	fullwidthUntil?: Extract<Breakpoint, 'widescreen'|'fullhd'>;

	/**
	 * The maximum width of the container
	 */
	maxWidth?: Extract<Breakpoint, 'tablet'|'desktop'|'widescreen'>;

	/**
	 * Whether the container should be full-width between breakpoints
	 */
	fluid?: boolean;

	/**
	 * The HTML tag with which to render the container
	 */
	tag?: keyof HTMLElementTagNameMap;
}

export function Container(props: ContainerProps) {
	const {
		fullwidthUntil,
		maxWidth,
		fluid,
		tag: Tag = 'div',
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		'container',
		{
			'is-fluid': !!fluid,
			[`is-${fullwidthUntil}`]: !!fullwidthUntil,
			[`is-max-${maxWidth}`]: !!maxWidth
		}
	);

	return <Tag className={classes} {...rest} />;
}
