import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';

/**
 * The props for the hero head component
 */
export type HeroHeadProps<T extends ElementType = 'div'> = {} & DynamicComponentProps<T>;

export function HeroHead<T extends ElementType = 'div'>(props: HeroHeadProps<T>) {
	return (
		<DynamicComponent
			additionalClasses={['hero-head']}
			{...props}
		/>
	);
}
