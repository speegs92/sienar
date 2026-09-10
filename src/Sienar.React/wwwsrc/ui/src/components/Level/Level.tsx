import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';

/**
 * The props for the level component
 */
export type LevelProps<T extends ElementType = 'div'> = {} & DynamicComponentProps<T>;

export function Level<T extends ElementType>(
	props: LevelProps<T> & { tag: T }
): ReactElement;

export function Level(
	props: LevelProps & { tag?: undefined }
): ReactElement;

export function Level<T extends ElementType = 'div'>(props: LevelProps<T>) {
	return (
		<DynamicComponent
			additionalClasses={['hero-body']}
			{...props}
		/>
	);
}
