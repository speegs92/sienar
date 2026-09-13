import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';
import { Icon } from './Icon.tsx';

import type { ElementType,  ReactElement, ReactNode } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';
import type { Size } from '@ui/theme.ts';

/**
 * The props for the icon text component
 */
export type IconTextProps<T extends ElementType = 'span'> = {
	/**
	 * The size of the icon text
	 */
	size?: Size;

	/**
	 * The icon to render
	 */
	icon: ReactNode;
} & DynamicComponentProps<T>;

export function IconText<T extends ElementType>(
	props: IconTextProps<T> & { tag: T }
): ReactElement;

export function IconText(
	props: IconTextProps & { tag?: undefined }
): ReactElement;

export function IconText<T extends ElementType = 'span'>(props: IconTextProps<T>) {
	const {
		size,
		icon,
		children,
		tag = 'span' as T,
		...rest
	} = props;

	return (
		<DynamicComponent
			tag={tag}
			additionalClasses={['icon-text']}
			{...rest}
		>
			<Icon size={size}>
				{icon}
			</Icon>
			<span>{children}</span>
		</DynamicComponent>
	);
}
