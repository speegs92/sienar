import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';

/**
 * The props for the block component
 */
export type BlockProps<T extends ElementType = 'div'> = {} & DynamicComponentProps<T>;

export function Block<T extends ElementType>(
	props: BlockProps<T> & { tag: T }
): ReactElement;

export function Block(
	props: BlockProps & { tag?: undefined }
): ReactElement;

export function Block<T extends ElementType = 'div'>(props: BlockProps<T>) {
	return (
		<DynamicComponent
			additionalClasses={['block']}
			{...props}
		/>
	);
}
