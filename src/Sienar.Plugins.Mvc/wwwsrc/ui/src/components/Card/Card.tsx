import { classNames } from '@sienar/utils';

import type { HTMLAttributes } from 'react';
import type { Color } from '@ui/theme.ts';

/**
 * The props for the card component
 */
export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
	/**
	 * The color of the card
	 */
	color?: Color;

	/**
	 * The background color of the card
	 */
	backgroundColor?: Color;

	/**
	 * The HTML tag with which to render the card
	 */
	tag?: keyof HTMLElementTagNameMap;
}

export function Card(props: CardProps) {
	const {
		color,
		backgroundColor,
		tag: Tag = 'article',
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		'card',
		{
			[`card--background-${backgroundColor}`]: !!backgroundColor
		}
	);

	return <Tag className={classes} {...rest} />;
}