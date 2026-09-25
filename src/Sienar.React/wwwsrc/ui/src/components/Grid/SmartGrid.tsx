import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';
import { createGapClasses } from './shared.ts';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';
import type { GridGap, GridGapDictionary } from './shared.ts';

/**
 * The smart grid column width sizes
 */
export type SmartGridColumnWidth =
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30
	| 31
	| 32;

/**
 * The props for the smart grid component
 */
export type SmartGridProps<T extends ElementType = 'div'> = {
	/**
	 * The minimum column width for the smart grid
	 */
	minWidth?: SmartGridColumnWidth;

	/**
	 * The smart grid gap value
	 */
	gap?: GridGap|GridGapDictionary;
} & DynamicComponentProps<T>;

export function SmartGrid<T extends ElementType>(
	props: SmartGridProps<T> & { tag: T }
): ReactElement;

export function SmartGrid(
	props: SmartGridProps & { tag?: undefined }
): ReactElement;

export function SmartGrid<T extends ElementType = 'div'>(props: SmartGridProps<T>) {
	const {
		minWidth,
		gap,
		...rest
	} = props;

	return (
		<DynamicComponent
			additionalClasses={[
				'grid',
				createGapClasses(gap),
				{
					[`is-col-min-${minWidth}`]: !!minWidth
				}
			]}
			{...rest}
		/>
	);
}
