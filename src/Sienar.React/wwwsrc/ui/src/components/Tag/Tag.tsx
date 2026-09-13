import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';
import type { Color, Size } from '@ui/theme.ts';

/**
 * Supported HTML elements for the tag component
 */
type TagElement =
	| 'a'
	| 'button'
	| 'div'
	| 'span';

/**
 * The props for the tag component
 */
export type TagProps<T extends TagElement = 'span'> = {
	/**
	 * The tag's color
	 */
	color?: Color;

	/**
	 * The tag's size
	 */
	size?: Size;

	/**
	 * Whether the tag should be light
	 */
	light?: boolean;

	/**
	 * Whether the tag should be hoverable
	 */
	hoverable?: boolean;

	/**
	 * Whether the tag should be rounded
	 */
	rounded?: boolean;
} & DynamicComponentProps<T>;

export function Tag<T extends TagElement>(
	props: TagProps<T> & { tag: T }
): ReactElement;

export function Tag(
	props: TagProps & { tag?: undefined }
): ReactElement;

export function Tag<T extends ElementType = 'span'>(props: TagProps<T>) {
	const {
		color,
		size,
		light = false,
		hoverable = false,
		rounded = false,
		tag = 'span' as T,
		...rest
	} = props;

	return (
		<DynamicComponent
			tag={tag}
			additionalClasses={[
				'tag',
				{
					'is-light': light,
					'is-hoverable': hoverable,
					'is-rounded': rounded,
					[`is-${color}`]: !!color,
					[`is-${size}`]: !!size
				}
			]}
			{...rest}
		/>
	);
}
