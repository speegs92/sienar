import { classNames } from '@sienar/utils';

import type { ReactNode } from 'react';
import type { Color, Size } from '@ui/theme.ts';

/**
 * Constructs the correct themed CSS classes for a button
 *
 * @param classes The existing CSS classes
 * @param color The button color
 * @param size The button size
 * @param responsive Whether the button is responsive
 * @param fullwidth Whether the button is fullwidth
 * @param outlined Whether the button is outlined
 * @param inverted Whether the button colors are inverted
 * @param rounded Whether the button is rounded
 * @param hovered Whether the button is hovered
 * @param focused Whether the button is focused
 * @param active Whether the button is active
 * @param loading Whether the button is active
 * @param staticValue Whether the button is static
 *
 * @returns The CSS classes
 */
export function createButtonClasses(
	classes: string|undefined,
	color: Color|undefined,
	size: Size|undefined,
	responsive: boolean|undefined,
	fullwidth: boolean|undefined,
	outlined: boolean|undefined,
	inverted: boolean|undefined,
	rounded: boolean|undefined,
	hovered: boolean|undefined,
	focused: boolean|undefined,
	active: boolean|undefined,
	loading: boolean|undefined,
	staticValue: boolean|undefined
): string|undefined {
	return classNames(
		classes,
		{
			[`is-${color}`]: !!color,
			[`is-${size}`]: !!size,
			'is-responsive': !!responsive,
			'is-fullwidth': !!fullwidth,
			'is-outlined': !!outlined,
			'is-inverted': !!inverted,
			'is-rounded': !!rounded,
			'is-hovered': !!hovered,
			'is-focused': !!focused,
			'is-active': !!active,
			'is-loading': !!loading,
			'is-static': !!staticValue
		}
	);
}

/**
 * Base props shared by all button components
 */
export interface ButtonBaseProps {
	/**
	 * The color of the button, if any
	 */
	color?: Color;

	/**
	 * The size of the button, if any
	 */
	size?: Size;

	/**
	 * The icon to render as the child content, if any
	 */
	icon?: ReactNode;

	/**
	 * Whether the button should be responsive
	 */
	responsive?: boolean;

	/**
	 * Whether the button should be fullwidth
	 */
	fullwidth?: boolean;

	/**
	 * Whether the button should be outlined
	 */
	outlined?: boolean;

	/**
	 * Whether the button colors should be inverted
	 */
	inverted?: boolean;

	/**
	 * Whether the button should be rounded
	 */
	rounded?: boolean;

	/**
	 * Whether the button should be hovered in style
	 */
	hovered?: boolean;

	/**
	 * Whether the button should be focused in style
	 */
	focused?: boolean;

	/**
	 * Whether the button should be active in style
	 */
	active?: boolean;

	/**
	 * Whether the button should be loading in style
	 */
	loading?: boolean;

	/**
	 * Whether the button should be static in style
	 */
	static?: boolean;

	/**
	 * Whether the button should be selected in style. For use with buttons grouped as addons
	 */
	selected?: boolean;
}
