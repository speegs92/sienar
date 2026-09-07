import { classNames } from '@sienar/utils';
import type { HTMLAttributes } from 'react';
import type { Color } from '@ui/theme.ts';

/**
 * The props for the card header component
 */
export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
	/**
	 * The color of the card header
	 */
	color?: Color;

	/**
	 * The HTML tag with which to render the card header
	 */
	tag?: keyof HTMLElementTagNameMap
}

export function CardHeader(props: CardHeaderProps) {
	const {
		tag: Tag = 'header',
		color,
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		'card__header'
	);

	return (
		<Tag className={classes} {...rest} />
	);
}