import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';

/**
 * The props for the hero body component
 */
export type HeroBodyProps<T extends ElementType = 'div'> = {} & DynamicComponentProps<T>;

export function HeroBody<T extends ElementType = 'div'>(props: HeroBodyProps<T>) {
	return (
		<DynamicComponent
			additionalClasses={['hero-body']}
			{...props}
		/>
	);
}
