import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';
import type { HorizontalAlignment, Size } from '@ui/theme.ts';

/**
 * The Bulma breadcrumb separators
 */
export type BreadcrumbSeparator =
	| 'arrow'
	| 'bullet'
	| 'dot'
	| 'succeeds';

/**
 * The props for the breadcrumb component
 */
export type BreadcrumbProps<T extends ElementType = 'nav'> = {
	/**
	 * The horizontal alignment of the breadcrumbs within the container
	 */
	alignment?: Exclude<HorizontalAlignment, 'left'>;

	/**
	 * The separator between the breadcrumb items
	 */
	separator?: BreadcrumbSeparator;

	/**
	 * The breadcrumb size
	 */
	size?: Size;
} & DynamicComponentProps<T>;

export function Breadcrumb<T extends ElementType>(
	props: BreadcrumbProps<T> & { tag: T }
): ReactElement;

export function Breadcrumb(
	props: BreadcrumbProps & { tag?: undefined }
): ReactElement;

export function Breadcrumb<T extends ElementType = 'nav'>(props: BreadcrumbProps<T>) {
	const {
		alignment,
		separator,
		size,
		tag = 'nav' as T,
		children,
		...rest
	} = props;

	return (
		<DynamicComponent
			tag={tag}
			additionalClasses={[
				'breadcrumb',
				{
					[`is-${alignment}`]: !!alignment,
					[`has-${separator}-separator`]: !!separator,
					[`is-${size}`]: !!size && size !== 'normal'
				}
			]}
			{...rest}
		>
			<ul>
				{children}
			</ul>
		</DynamicComponent>
	);
}
