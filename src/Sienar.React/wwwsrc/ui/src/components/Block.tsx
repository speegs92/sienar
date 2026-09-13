import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';

/**
 * The props for the block component
 */
export type HeroHeadProps<T extends ElementType = 'div'> = {} & DynamicComponentProps<T>;

export function Block<T extends ElementType>(
	props: HeroHeadProps<T> & { tag: T }
): ReactElement;

export function Block(
	props: HeroHeadProps & { tag?: undefined }
): ReactElement;

export function Block<T extends ElementType = 'div'>(props: HeroHeadProps<T>) {
	return (
		<DynamicComponent
			additionalClasses={['block']}
			{...props}
		/>
	);
}
