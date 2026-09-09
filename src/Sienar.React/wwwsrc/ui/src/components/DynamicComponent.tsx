import { classNames } from '@sienar/utils';

import type { ComponentPropsWithRef, ElementType } from 'react';

/**
 * Dynamically-typed props with support for additional classes
 */
export type DynamicComponentProps<T extends ElementType> = {
	/**
	 * The HTML tag or React component with which to render the component
	 */
	tag: T;
} & ComponentPropsWithRef<T>;

/**
 * Dynamically-typed props without support for additional classes. Used to type comopnents which wrap around &lt;DynamicElement&gt;
 */
export type DynamicComponentPropsWithAdditionalClasses<T extends ElementType> = {
	/**
	 * The additional classes to supply to the underlying HTML tag or React component
	 */
	additionalClasses?: (string | Record<string, boolean> | null | undefined)[];
} & DynamicComponentProps<T>;

export function DynamicComponent<T extends ElementType>(props: DynamicComponentPropsWithAdditionalClasses<T>) {
	const {
		tag: Tag,
		additionalClasses,
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		...additionalClasses
	);

	return (
		<Tag
			className={classes}
			{...rest}
		/>
	);
}
