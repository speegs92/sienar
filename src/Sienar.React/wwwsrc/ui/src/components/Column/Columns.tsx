import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ElementType, ReactElement } from 'react';
import type { DynamicComponentProps } from '@ui/components/DynamicComponent.tsx';
import type { BreakpointDictionary } from '@ui/theme.ts';

/**
 * The supported column gap sizes
 */
export type ColumnGap = 
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
 * The props for the columns component
 */
export type ColumnsProps<T extends ElementType = 'div'> = {
	/**
	 * Whether the column container should support mobile-breakpoint columns
	 */
	mobile?: boolean;

	/**
	 * Whether the column container should support desktop-only columns
	 */
	desktop?: boolean;

	/**
	 * Whether the column container should vertically center its columns
	 */
	vcentered?: boolean;

	/**
	 * Whether the column container should horizontally center its columns
	 */
	centered?: boolean;

	/**
	 * Whether the column container should support multiline columns
	 */
	multiline?: boolean;

	/**
	 * Whether to remove the space between columns
	 */
	gapless?: boolean;

	/**
	 * The column gap size
	 */
	gap?: ColumnGap|BreakpointDictionary<ColumnGap>;
} & DynamicComponentProps<T>;

export function Columns<T extends ElementType>(
	props: ColumnsProps<T> & { tag: T }
): ReactElement;

export function Columns(
	props: ColumnsProps & { tag?: undefined }
): ReactElement;

export function Columns<T extends ElementType = 'div'>(props: ColumnsProps<T>) {
	const {
		mobile = false,
		desktop = false,
		vcentered = false,
		centered = false,
		gapless = false,
		gap,
		...rest
	} = props;

	return (
		<DynamicComponent
			additionalClasses={[
				'columns',
				createGapClasses(gap),
				{
					'is-mobile': mobile && !desktop,
					'is-desktop': desktop && !mobile,
					'is-vcentered': vcentered,
					'is-centered': centered,
					'is-gapless': gapless
				}
			]}
			{...rest}
		/>
	);
}

function createGapClasses(gap: ColumnsProps['gap']): Record<string, boolean>|undefined {
	if (typeof gap === 'undefined') {
		return  undefined;
	}

	if (typeof gap === 'object') {
		return {
			[`is-${gap.mobile}-mobile`]: !!gap.mobile || gap.mobile === 0,
			[`is-${gap.tablet}-tablet`]: !!gap.tablet || gap.tablet === 0,
			[`is-${gap.desktop}-desktop`]: !!gap.desktop || gap.desktop === 0,
			[`is-${gap.widescreen}-widescreen`]: !!gap.widescreen || gap.widescreen === 0,
			[`is-${gap.fullhd}-fullhd`]: !!gap.fullhd || gap.fullhd === 0
		};
	}

	return {
		[`is-${gap}`]: !!gap || gap === 0
	};
}
