import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';
import { SmartGrid } from './SmartGrid.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';
import type { BreakpointDictionary } from '@ui/theme.ts';
import type { GridGap, GridGapDictionary } from './shared.ts';

/**
 * The supported fixed grid column count
 */
export type FixedGridColumns =
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
	| 12;

/**
 * The props for the fixed grid component
 */
export type FixedGridProps<T extends ElementType = 'div'> = {
	/**
	 * The column count for the fixed grid
	 */
	columns?: FixedGridColumns|BreakpointDictionary<FixedGridColumns>;

	/**
	 * The grid gap value
	 */
	gap?: GridGap|GridGapDictionary;
} & DynamicComponentProps<T>;

export function FixedGrid<T extends ElementType>(
	props: FixedGridProps<T> & { tag: T }
): ReactElement;

export function FixedGrid(
	props: FixedGridProps & { tag?: undefined }
): ReactElement;

export function FixedGrid<T extends ElementType = 'div'>(props: FixedGridProps<T>) {
	const {
		columns,
		gap,
		children,
		...rest
	} = props;

	return (
		<DynamicComponent
			additionalClasses={[
				'fixed-grid',
				createColumnClasses(columns)
			]}
			{...rest}
		>
			<SmartGrid gap={gap}>
				{children}
			</SmartGrid>
		</DynamicComponent>
	);
}

function createColumnClasses(
	columns: FixedGridColumns|BreakpointDictionary<FixedGridColumns>|undefined
): string|Record<string, boolean>|undefined {
	if (typeof columns === 'undefined') {
		return undefined;
	}

	if (typeof columns === 'object') {
		return {
			[`has-${columns.mobile}-cols-mobile`]: !!columns.mobile || columns.mobile === 0,
			[`has-${columns.tablet}-cols-tablet`]: !!columns.tablet || columns.tablet === 0,
			[`has-${columns.desktop}-cols-desktop`]: !!columns.desktop || columns.desktop === 0,
			[`has-${columns.widescreen}-cols-widescreen`]: !!columns.widescreen || columns.widescreen === 0,
			[`has-${columns.fullhd}-cols-fullhd`]: !!columns.fullhd || columns.fullhd === 0
		};
	}

	return `has-${columns}-cols`;
}
