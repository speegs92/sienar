import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';

/**
 * The props for the level left component
 */
export type LevelLeftProps<T extends ElementType = 'div'> = {} & DynamicComponentProps<T>;

export function LevelLeft<T extends ElementType>(
	props: LevelLeftProps<T> & { tag: T }
): ReactElement;

export function LevelLeft(
	props: LevelLeftProps & { tag?: undefined }
): ReactElement;

export function LevelLeft<T extends ElementType = 'div'>(props: LevelLeftProps<T>) {
	return (
		<DynamicComponent
			additionalClasses={['hero-body']}
			{...props}
		/>
	);
}
