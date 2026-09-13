import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';
import type { Size } from '@ui/theme.ts';

/**
 * The props for the icon component
 */
export type IconProps = {
	/**
	 * The size of the icon
	 */
	size?: Size;
} & DynamicComponentProps<'span'>;

export function Icon(props: IconProps) {
	const {
		size,
		...rest
	} = props;

	return (
		<DynamicComponent
			tag='span'
			additionalClasses={[
				'icon',
				{
					[`is-${size}`]: !!size && size !== 'normal'
				}
			]}
			{...rest}
		/>
	);
}
