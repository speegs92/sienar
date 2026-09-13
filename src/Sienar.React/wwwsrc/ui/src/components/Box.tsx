import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';

/**
 * The props for the box component
 */
export type HeroHeadProps<T extends ElementType = 'div'> = {} & DynamicComponentProps<T>;

export function Box<T extends ElementType>(
	props: HeroHeadProps<T> & { tag: T }
): ReactElement;

export function Box(
	props: HeroHeadProps & { tag?: undefined }
): ReactElement;

export function Box<T extends ElementType = 'div'>(props: HeroHeadProps<T>) {
	return (
		<DynamicComponent
			additionalClasses={['box']}
			{...props}
		/>
	);
}
