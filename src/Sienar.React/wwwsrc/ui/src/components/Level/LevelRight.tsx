import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';

/**
 * The props for the level right component
 */
export type LevelRightProps<T extends ElementType = 'div'> = {} & DynamicComponentProps<T>;

export function LevelRight<T extends ElementType>(
	props: LevelRightProps<T> & { tag: T }
): ReactElement;

export function LevelRight(
	props: LevelRightProps & { tag?: undefined }
): ReactElement;

export function LevelRight<T extends ElementType = 'div'>(props: LevelRightProps<T>) {
	return (
		<DynamicComponent
			additionalClasses={['hero-body']}
			{...props}
		/>
	);
}
