import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ComponentPropsWithRef } from 'react';
import type { Size } from '@ui/theme.ts';

/**
 * The props for the delete component
 */
export type DeleteProps = {
	/**
	 * The delete button's size
	 */
	size?: Size;
} & ComponentPropsWithRef<'button'>;

export function Delete(props: DeleteProps) {
	const {
		size,
		...rest
	} = props;

	return (
		<DynamicComponent
			additionalClasses={[
				'delete',
				{
					[`is-${size}`]: !!size && size !== 'normal'
				}
			]}
			{...rest}
			tag='button'
		/>
	);
}
