import { classNames } from '@sienar/utils';
import type { HTMLAttributes } from 'react';
import type { Color } from '@ui/theme.ts';

/**
 * The props for the card content component
 */
export interface CardContentProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
	/**
	 * The color of the card content
	 */
	color?: Color;

	/**
	 * The HTML tag with which to render the card content
	 */
	tag?: keyof HTMLElementTagNameMap
}

export function CardContent(props: CardContentProps) {
	const {
		tag: Tag = 'section',
		color,
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		'card__content'
	);

	return (
		<Tag className={classes} {...rest} />
	);
}