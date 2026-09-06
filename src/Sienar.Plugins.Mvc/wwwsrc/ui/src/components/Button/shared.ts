import { classNames } from '@sienar/utils';
import { createThemedClassNames } from '@ui/theme.ts';

import type { ReactNode } from 'react';
import type { Color, Themeable, Variant } from '@ui/theme.ts';

/**
 * Constructs the correct themed CSS classes for a button
 *
 * @param classes The existing CSS classes
 * @param color The theme color of the button
 * @param variant The theme variant of the button
 * @param isIcon Whether the button is an icon button
 *
 * @returns The CSS classes
 */
export function createButtonClasses(
	classes: string|undefined,
	color: Color|undefined,
	variant: Variant|undefined,
	isIcon: boolean
): string|undefined {
	return classNames(
		classes,
		createThemedClassNames(color, variant, 'button'),
		{
			'button--icon': isIcon
		}
	)
}

/**
 * Base props shared by all button components
 */
export interface ButtonBaseProps extends Themeable {
	/**
	 * The icon to render as the child content, if any
	 */
	icon?: ReactNode;
}
