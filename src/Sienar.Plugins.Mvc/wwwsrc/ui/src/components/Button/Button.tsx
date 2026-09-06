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
		color = 'default',
		variant = 'solid',
		icon,
		className,
		children,
		...rest
	} = props;

	const classes = createButtonClasses(
		className,
		color,
		variant,
		!!icon
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
