import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';
import type { Color, Size } from '@ui/theme.ts';

/**
 * The props for the hero component
 */
export type HeroProps<T extends ElementType> = {
	/**
	 * The color of the hero
	 */
	color?: Color;

	/**
	 * The size of the hero
	 */
	size?: 
		| Extract<Size, 'small'|'medium'|'large'>
		| 'halfheight'
		| 'fullheight'
		| 'fullheight-with-navbar';
	
} & Omit<DynamicComponentProps<T>, 'color'>;

export function Hero<T extends ElementType>(props: HeroProps<T>) {
	const {
		color,
		size,
		...rest
	} = props;

	return (
		<DynamicComponent
			tag='a'
			additionalClasses={[]}
			href='http://google.com'
			target='_blank'
			{...rest as DynamicComponentProps<T>}
		/>
	);
}
