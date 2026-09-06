import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { classNames, inject } from '@sienar/utils';
import { createThemedClassNames } from '@ui/theme.ts';

import type { AnchorHTMLAttributes } from 'react';
import type { InjectionKey } from '@sienar/utils';
import type { Color } from '@ui/theme.ts';

/**
 * The props for the link component
 */
export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'|'href'> {
	/**
	 * The <code>href</code> of the link
	 */
	href: string|InjectionKey<string>;

	/**
	 * The color of the link
	 */
	color?: Color;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
	const {
		href: to,
		color = 'primary',
		className,
		...rest
	} = props;

	const href = typeof to === 'string'
		? to
		: inject(to);

	const classes = classNames(
		className,
		createThemedClassNames(
			color,
			undefined,
			'link'
		)
	);

	if (href.startsWith('http')) {
		return (
			<a
				ref={ref}
				href={href}
				className={classes}
				{...rest}
			/>
		);
	}

	return (
		<RouterLink
			ref={ref}
			to={href}
			className={classes}
			{...rest}
		/>
	);
})
