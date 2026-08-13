import { classNames } from '@sienar/utils';

import type { HTMLAttributes } from 'react';
import type { HorizontalAlignment, Breakpoint } from '@ui/theme.ts';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
	/**
	 * The horizontal alignment of the container
	 */
	alignment?: HorizontalAlignment;

	/**
	 * The maximum width of the container
	 */
	maxWidth?: Breakpoint;

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
		alignment = 'center',
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
			'container--fluid': !!fluid,
			[`container--${alignment}`]: !!alignment,
			[`container--${maxWidth}`]: !!maxWidth
		}
	);

	return <Tag className={classes} {...rest} />;
}
