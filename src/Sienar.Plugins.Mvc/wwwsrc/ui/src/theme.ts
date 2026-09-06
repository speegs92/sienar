import { createContext, useContext } from 'react';

export const ThemeContext = createContext<Themeable>({});

export const useThemeContext = () => useContext(ThemeContext);

/**
 * Creates a string of CSS class names based on the value of theme-based props
 *
 * @param color The selected theme color, if any
 * @param variant The selected variant, if any
 * @param base The base component CSS class name
 *
 * @returns The space-separated CSS class names
 */
export function createThemedClassNames(
	color: Color|undefined,
	variant: Variant|undefined,
	base: string): string {
	const classes = [ base ];

	if (color && color !== 'default') classes.push(`${base}--${color}`);
	if (variant) classes.push(`${base}--${variant}`);

	return classes.join(' ');
}


/**
 * The theme colors supported by Sienar UI
 */
export type Color =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'success'
	| 'info'
	| 'warning'
	| 'error'
	| 'soft'
	| 'bold'
	| 'default';

/**
 * The color solidity variants supported by Sienar UI
 */
export type Variant =
	| 'solid'
	| 'outlined'
	| 'text';

/**
 * The themeable props
 */
export type Themeable = {
	/**
	 * The themeable color
	 */
	color?: Color;

	/**
	 * The themeable variant
	 */
	variant?: Variant;
}

/**
 * Flex <code>justify-content</code> values
 */
export type FlexJustify =
	| 'start'
	| 'end'
	| 'center'
	| 'between'
	| 'around'
	| 'evenly'

/**
 * Flex <code>align-item</code> or <code>align-self</code> values
 */
export type FlexAlign =
	| 'start'
	| 'end'
	| 'center'
	| 'baseline'
	| 'stretch';

/**
 * Flex <code>flex-direction</code> values
 */
export type FlexDirection =
	| 'horizontal'
	| 'vertical';

/**
 * Directions
 */
export type Direction =
	| 'up'
	| 'down'
	| 'left'
	| 'right';

/**
 * Horizontal alignment
 */
export type HorizontalAlignment =
	| 'left'
	| 'right'
	| 'center';

/**
 * Vertical alignment
 */
export type VerticalAlignment =
	| 'top'
	| 'bottom'
	| 'center';

/**
 * Text alignment
 */
export type TextAlignment = HorizontalAlignment | 'justify';

/**
 * Width breakpoints
 */
export type Breakpoint =
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| 'xxl';

/**
 * The available column sizes in the Sienar grid system
 */
export type ColumnSize =
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 'auto';
