import { classNames } from '@sienar/utils';
import type { HTMLAttributes } from 'react';

/**
 * The props for the icon component
 */
export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
	/**
	 * The rotation to apply to the icon
	 */
	rotation?: IconRotation;

	/**
	 * The flip to apply to the icon
	 */
	flip?: IconFlip;

	/**
	 * Which icon to render. Omit the leading <code>mdi-</code>
	 */
	icon: string;
}

/**
 * The rotation of the icon
 */
export type IconRotation =
	| '45'
	| '90'
	| '135'
	| '180'
	| '225'
	| '270'
	| '315';

/**
 * the flip value of the icon
 */
export type IconFlip =
	| 'horizontal'
	| 'vertical'
	| 'both';

export function Icon(props: IconProps) {
	const {
		rotation,
		flip,
		icon,
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		'icon',
		'mdi',
		`mdi-${icon}`,
		{
			'mdi-flip-h': flip === 'horizontal' || flip === 'both',
			'mdi-flip-v': flip === 'vertical' || flip === 'both',
			[`mdi-rotate-${rotation}`]: !!rotation
		}
	);

	return <span className={classes} {...rest} />;
}
