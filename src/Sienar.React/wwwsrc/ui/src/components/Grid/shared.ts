/**
 * Valid grid gap sizes
 */
export type GridGap =
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
 * A dictionary of valid grid gap configuration options
 */
export type GridGapDictionary = {
	/**
	 * The column gap
	 */
	column?: GridGap;

	/**
	 * The row gap
	 */
	row?: GridGap;
}

/**
 * Creates grid gap CSS classnames
 * 
 * @param gap The grid gap value
 * @returns The generated CSS classnames
 */
export function createGapClasses(
	gap: GridGap|GridGapDictionary|undefined
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
