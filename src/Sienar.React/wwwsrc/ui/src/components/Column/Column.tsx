import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';
import type { BreakpointDictionary } from '@ui/theme.ts';

/**
 * The supported column sizes
 */
export type ColumnSize =
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
	| 'full'
	| 'four-fifths'
	| 'three-quarters'
	| 'two-thirds'
	| 'three-fifths'
	| 'half'
	| 'two-fifths'
	| 'one-third'
	| 'one-quarter'
	| 'one-fifth';

/**
 * The props for the column component
 */
export type ColumnProps<T extends ElementType = 'div'> = {
	/**
	 * The column size
	 */
	size?: ColumnSize|BreakpointDictionary<ColumnSize>;

	/**
	 * The column offset
	 */
	offset?: ColumnSize|BreakpointDictionary<ColumnSize>;

	/**
	 * Whether the column should limit itself to its needed space only
	 */
	narrow?: boolean|BreakpointDictionary<boolean>;
} & DynamicComponentProps<T>;

export function Column<T extends ElementType>(
	props: ColumnProps<T> & { tag: T }
): ReactElement;

export function Column(
	props: ColumnProps & { tag?: undefined }
): ReactElement;

export function Column<T extends ElementType = 'div'>(props: ColumnProps<T>) {
	const {
		size,
		offset,
		narrow,
		...rest
	} = props;

	return (
		<DynamicComponent
			additionalClasses={[
				'column',
				createSizeClasses(size, false),
				createSizeClasses(offset, true),
				createNarrowClasses(narrow),
				{
					
				}
			]}
			{...rest}
		/>
	);
}

function createSizeClasses(
	size: ColumnSize|BreakpointDictionary<ColumnSize>|undefined,
	offset: boolean
): string|undefined|Record<string, boolean>  {
	if (typeof size === 'undefined') {
		return undefined;
	}

	const offsetInfix = offset ? '-offset' : '';

	if (typeof size === 'object') {
		return {
			[`is${offsetInfix}-${size.mobile}-mobile`]: !!size.mobile,
			[`is${offsetInfix}-${size.tablet}-tablet`]: !!size.tablet,
			[`is${offsetInfix}-${size.desktop}-desktop`]: !!size.desktop,
			[`is${offsetInfix}-${size.widescreen}-widescreen`]: !!size.widescreen,
			[`is${offsetInfix}-${size.fullhd}-fullhd`]: !!size.fullhd
		};
	}

	return `is${offsetInfix}-${size}`;
}

function createNarrowClasses(narrow: ColumnProps['narrow']): string|Record<string, boolean>|undefined {
	if (typeof narrow === 'undefined') {
		return undefined;
	}

	if (typeof narrow === 'object') {
		return {
			'is-narrow-mobile': !!narrow.mobile,
			'is-narrow-tablet': !!narrow.tablet,
			'is-narrow-desktop': !!narrow.desktop,
			'is-narrow-widescreen': !!narrow.widescreen,
			'is-narrow-fullhd': !!narrow.fullhd
		};
	}

	return {
		'is-narrow': narrow
	}
}
