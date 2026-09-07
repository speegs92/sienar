import { forwardRef } from 'react';
import { createButtonClasses } from './shared.ts';

import type { ForwardedRef, ButtonHTMLAttributes } from 'react';
import type { ButtonBaseProps } from './shared.ts';

/**
 * The props of the button component
 */
export interface ButtonProps extends
	ButtonBaseProps,
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
	const {
		color,
		size,
		responsive,
		fullwidth,
		outlined,
		inverted,
		rounded,
		hovered,
		focused,
		active,
		loading,
		static: staticValue,
		icon,
		className,
		children,
		...rest
	} = props;

	const classes = createButtonClasses(
		className,
		color,
		size,
		responsive,
		fullwidth,
		outlined,
		inverted,
		rounded,
		hovered,
		focused,
		active,
		loading,
		staticValue
	);

	return (
		<button
			ref={ref}
			className={classes}
			{...rest}
		>
			{icon ? icon : children}
		</button>
	);
});
