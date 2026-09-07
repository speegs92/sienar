import { classNames } from '@sienar/utils';

import type { HTMLAttributes } from 'react';
import type { Color } from '@ui/theme.ts';

/**
 * The props for the card actions component
 */
export interface CardActionsProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
	/**
	 * The color of the card actions
	 */
	color?: Color;

	/**
	 * The HTML tag with which to render the card actions
	 */
	tag?: keyof HTMLElementTagNameMap
}

export function CardActions(props: CardActionsProps) {
	const {
		tag: Tag = 'section',
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		'card__actions'
	);

	return (
		<Tag className={classes} {...rest} />
	);
}