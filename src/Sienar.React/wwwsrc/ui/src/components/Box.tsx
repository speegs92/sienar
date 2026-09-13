import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';

/**
 * The props for the box component
 */
export type BoxProps<T extends ElementType = 'div'> = {} & DynamicComponentProps<T>;

export function Box<T extends ElementType>(
	props: BoxProps<T> & { tag: T }
): ReactElement;

export function Box(
	props: BoxProps & { tag?: undefined }
): ReactElement;

export function Box<T extends ElementType = 'div'>(props: BoxProps<T>) {
	return (
		<DynamicComponent
			additionalClasses={['box']}
			{...props}
		/>
	);
}
