import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';
import type { Size } from '@ui/theme.ts';

/**
 * The props for the section component
 */
export type SectionProps<T extends ElementType = 'section'> = {
	size?: Extract<Size, 'medium'|'large'>
} & DynamicComponentProps<T>;

export function Section<T extends ElementType>(
	props: SectionProps<T> & { tag: T }
): ReactElement;

export function Section(
	props: SectionProps & { tag?: undefined }
): ReactElement;

export function Section<T extends ElementType = 'section'>(props: SectionProps<T>) {
	const {
		tag = 'section' as T,
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
