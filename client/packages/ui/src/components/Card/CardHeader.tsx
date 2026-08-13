import { classNames } from '@sienar/utils';
import { createThemedClassNames, useThemeContext } from '@ui/theme.ts';
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
	const themeContext = useThemeContext();

	const {
		tag: Tag = 'header',
		color = themeContext.color,
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		createThemedClassNames(color, undefined, 'card__header')
	);

	return (
		<Tag className={classes} {...rest} />
	);
}