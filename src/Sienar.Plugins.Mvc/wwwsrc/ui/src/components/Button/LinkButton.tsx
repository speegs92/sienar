import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { inject } from '@sienar/utils';
import { createButtonClasses } from './shared.ts';

import type { ForwardedRef, AnchorHTMLAttributes } from 'react';
import type { InjectionKey } from '@sienar/utils';
import type { ButtonBaseProps } from './shared.ts';

/**
 * The props for the link button component
 */
export interface LinkButtonProps extends
	ButtonBaseProps,
	Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'|'href'> {
	/**
	 * The link <code>href</code>
	 */
	href: string|InjectionKey<string>;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(function LinkButton(props: LinkButtonProps, ref: ForwardedRef<HTMLAnchorElement>) {
	const {
		color = 'default',
		variant = 'solid',
		icon,
		href,
		className,
		children,
		...rest
	} = props;

	const childContent = icon ? icon : children;
	const classes = createButtonClasses(
		className,
		color,
		variant,
		!!icon
	);

	// noinspection SuspiciousTypeOfGuard
	const destination = typeof href === 'symbol'
		? inject(href)
		: href;

	if (destination.startsWith('http')) {
		return (
			<a
				ref={ref}
				href={destination}
				className={classes}
				{...rest}
			>
				{childContent}
			</a>
		);
	}

	return (
		<Link
			ref={ref}
			to={destination}
			className={classes}
			{...rest}
		>
			{childContent}
		</Link>
	)
});
