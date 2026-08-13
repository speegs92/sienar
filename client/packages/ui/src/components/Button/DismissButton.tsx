import { classNames } from '@sienar/utils';
import { createThemedClassNames } from '@ui/theme.ts';
import { Icon } from '@ui/components';

import type { HTMLAttributes } from 'react';
import type { Color } from '@ui/theme.ts';

export interface DismissButtonProps extends HTMLAttributes<HTMLButtonElement> {
	/**
	 * The color of the dismiss button
	 */
	color?: Color;
}

export function DismissButton(props: DismissButtonProps) {
	const {
		color,
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		createThemedClassNames(color, undefined, 'dismiss-button')
	);

	return (
		<button
			className={classes}
			{...rest}
		>
			<Icon icon='close'/>
		</button>
	);
}
