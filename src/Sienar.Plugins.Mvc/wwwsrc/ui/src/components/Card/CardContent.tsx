import { classNames } from '@sienar/utils';
import { createThemedClassNames, useThemeContext } from '@ui/theme.ts';
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
	const themeContext = useThemeContext();

	const {
		tag: Tag = 'section',
		color = themeContext.color,
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		createThemedClassNames(color, undefined, 'card__content')
	);

	return (
		<Tag className={classes} {...rest} />
	);
}