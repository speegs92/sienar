import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';
import type { Size } from '@ui/theme.ts';

/**
 * The props for the tags component
 */
export type TagsProps<T extends ElementType = 'div'> = {
	/**
	 * The size of the child tags
	 */
	size?: Size;

	/**
	 * Whether the tags has addons
	 */
	addons?: boolean;
} & DynamicComponentProps<T>;

export function Tags<T extends ElementType>(
	props: TagsProps<T> & { tag: T }
): ReactElement;

export function Tags(
	props: TagsProps & { tag?: undefined }
): ReactElement;

export function Tags<T extends ElementType = 'div'>(props: TagsProps<T>) {
	const {
		tag = 'div' as T,
		size,
		addons = false,
		...rest
	} = props;

	return (
		<DynamicComponent
			tag={tag}
			additionalClasses={[
				'tags',
				{
					'has-addons': addons,
					[`are-${size}`]: !!size
				}
			]}
			{...rest}
		/>
	);
}
