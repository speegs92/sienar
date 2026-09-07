import { classNames } from '@sienar/utils';
import type { HTMLAttributes } from 'react';
import type { FlexAlign, FlexDirection, FlexJustify } from '@ui/theme.ts';

/**
 * The props for the stack component
 */
export interface StackProps extends HTMLAttributes<HTMLElement> {
	/**
	 * The item placement axis of the stack
	 */
	direction?: FlexDirection;

	/**
	 * The cross axis flex distribution
	 */
	align?: FlexAlign;

	/**
	 * The main axis flex distribution
	 */
	justify?: FlexJustify;

	/**
	 * Whether the flex direction should be reversed
	 */
	reverse?: boolean;

	/**
	 * The HTML tag with which to render the stack
	 */
	tag?: keyof HTMLElementTagNameMap;
}

export function Stack(props: StackProps) {
	const {
		tag: Tag = 'div',
		direction = 'horizontal',
		align: flexAlign,
		justify: flexJustify,
		reverse,
		className,
		...rest
	} = props;

	const align: FlexAlign = flexAlign ??
		(direction === 'horizontal'
			? 'start'
			: 'stretch');
	const justify: FlexJustify = flexJustify ??
		(direction == 'horizontal'
			? 'between'
			: 'end');

	const classes = classNames(
		className,
		'stack',
		'd-flex',
		'flex-wrap',
		`justify-content-${justify}`,
		`align-items-${align}`,
		{
			'flex-row': direction === 'horizontal' && !reverse,
			'flex-row-reverse': direction === 'horizontal' && !!reverse,
			'flex-column': direction === 'vertical' && !reverse,
			'flex-column-reverse': direction === 'vertical' && !!reverse
		}
	)

	return <Tag className={classes} {...rest} />;
}
