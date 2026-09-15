import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';

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
 * The smart grid gap sizes
 */
export type SmartGridGap =
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8;

/**
 * A dictionary of valid smart grid gap configuration options
 */
export type SmartGridGapDictionary = {
	/**
	 * The column gap
	 */
	column?: SmartGridGap;

	/**
	 * The row gap
	 */
	row?: SmartGridGap;
}

/**
 * The props for the grid component
 */
export type SmartGridProps<T extends ElementType = 'div'> = {
	/**
	 * The minimum column width for the grid
	 */
	minWidth?: SmartGridColumnWidth;

	/**
	 * The grid gap value
	 */
	gap?: SmartGridGap|SmartGridGapDictionary;
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

function createGapClasses(
	gap: SmartGridGap|SmartGridGapDictionary|undefined
): string|Record<string, boolean>|undefined {
	if (typeof gap === 'undefined') {
		return undefined;
	}

	if (typeof gap === 'object') {
		return {
			[`is-column-gap-${gap.column}`]: !!gap.column || gap.column === 0,
			[`is-row-gap${gap.row}`]: !!gap.row || gap.column === 0
		};
	}

	return `is-gap-${gap}`;
}
