/**
 * The theme colors supported by Bulma
 */
export type Color =
	| 'primary'
	| 'link'
	| 'success'
	| 'info'
	| 'warning'
	| 'danger'
	| 'white'
	| 'black'
	| 'light'
	| 'dark';

/**
 * The sizes supported by Bulma
 */
export type Size =
	| 'small'
	| 'normal'
	| 'medium'
	| 'large';

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
	| 'mobile'
	| 'tablet'
	| 'desktop'
	| 'widescreen'
	| 'fullhd';

/**
 * A dictionary with width breakpoints as the keys and <code>T</code> as the values
 * 
 * NOTE: This type is an explicitly-keyed dictionary because Typescript v6.0 changed the way partial record keys are type-inferred, and this change broke a naive <code>Partial<Record<Breakpoint, T>></code>-type implementation. The only way to preserve intellisense in TSX files, as far as I can tell, is explicitly defining the keys here.
 */
export interface BreakpointDictionary<T> {
	mobile?: T;
	tablet?: T;
	desktop?: T;
	widescreen?: T;
	fullhd?: T;
}

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
