import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';
import type { Size } from '@ui/theme.ts';

/**
 * The props for the footer component
 */
export type FooterProps<T extends ElementType = 'footer'> = {
	size?: Extract<Size, 'medium'|'large'>
} & DynamicComponentProps<T>;

export function Footer<T extends ElementType>(
	props: FooterProps<T> & { tag: T }
): ReactElement;

export function Footer(
	props: FooterProps & { tag?: undefined }
): ReactElement;

export function Footer<T extends ElementType = 'footer'>(props: FooterProps<T>) {
	const {
		tag = 'footer' as T,
		size,
		...rest
	} = props;

	return (
		<DynamicComponent
			tag={tag}
			additionalClasses={[
				'hero-body',
				{
					[`is-${size}`]: !!size
				}
			]}
			{...rest}
		/>
	);
}
