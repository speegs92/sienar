import { classNames } from '@sienar/utils';
import type { HTMLAttributes } from 'react';
import type { ColumnSize } from '@ui/theme.ts';

/**
 * The props for the column component
 */
export interface ColumnProps extends HTMLAttributes<HTMLElement> {
	/**
	 * The HTML tag with which to render the column
	 */
	tag?: keyof HTMLElementTagNameMap;

	/**
	 * The default column size (below the lowest breakpoint). Defaults to <code>12</code>
	 */
	col?: ColumnSize;

	/**
	 * The column size for small screens. There is no default value.
	 */
	sm?: ColumnSize;

	/**
	 * The column size for medium screens. There is no default value.
	 */
	md?: ColumnSize;

	/**
	 * The column size for large screens. There is no default value.
	 */
	lg?: ColumnSize;

	/**
	 * The column size for extra-large screens. There is no default value.
	 */
	xl?: ColumnSize;

	/**
	 * The column size for extra-extra-large screens. There is no default value.
	 */
	xxl?: ColumnSize;
}

export function Column(props: ColumnProps) {
	const {
		tag: Tag = 'div',
		col = 12,
		sm,
		md,
		lg,
		xl,
		xxl,
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		`col-${col}`,
		{
			[`col-sm-${sm}`]: !!sm,
			[`col-md-${md}`]: !!md,
			[`col-lg-${lg}`]: !!lg,
			[`col-xl-${xl}`]: !!xl,
			[`col-xxl-${xxl}`]: !!xxl
		}
	);

	return <Tag className={classes} {...rest} />;
}