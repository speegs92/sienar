import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';
import type { Color, Size } from '@ui/theme.ts';

/**
 * The props for the hero component
 */
export type HeroProps<T extends ElementType = 'div'> = {
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
	
} & DynamicComponentProps<T>;

export function Hero<T extends ElementType>(
	props: HeroProps<T> & { tag: T }
): ReactElement;

export function Hero(
	props: HeroProps & { tag?: undefined }
): ReactElement;

export function Hero<T extends ElementType = 'div'>(props: HeroProps<T>) {
	const {
		color,
		size,
		...rest
	} = props;

	return (
		<DynamicComponent
			additionalClasses={[
				'hero',
				{
					[`is-${color}`]: !!color,
					[`is-${size}`]: !!size
				}
			]}
			{...rest as DynamicComponentProps<T>}
		/>
	);
}
