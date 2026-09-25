import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';

/**
 * The props for the cell component
 */
export type CellProps<T extends ElementType = 'div'> = {
	
} & DynamicComponentProps<T>;

export function Cell<T extends ElementType>(
	props: CellProps<T> & { tag: T }
): ReactElement;

export function Cell(
	props: CellProps & { tag?: undefined }
): ReactElement;

export function Cell<T extends ElementType = 'div'>(props: CellProps<T>) {
	const {
		...rest
	} = props;

	return (
		<DynamicComponent
			additionalClasses={[
				'cell'
			]}
			{...rest}
		/>
	);
}
