import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';

/**
 * The props for the hero foot component
 */
export type HeroFootProps<T extends ElementType = 'div'> = {} & DynamicComponentProps<T>;

export function HeroFoot<T extends ElementType = 'div'>(props: HeroFootProps<T>) {
	return (
		<DynamicComponent
			additionalClasses={['hero-foot']}
			{...props}
		/>
	);
}
