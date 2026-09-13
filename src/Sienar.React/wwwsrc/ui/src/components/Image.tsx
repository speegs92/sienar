import { DynamicComponent } from '@ui/components/DynamicComponent.tsx';

import type { ComponentPropsWithRef } from 'react';

/**
 * Supported square image dimensions
 */
export type SquareImageDimensions =
	| '16x16'
	| '24x24'
	| '32x32'
	| '48x48'
	| '64x64'
	| '96x96'
	| '128x128';

/**
 * Supported image ratios
 */
export type ImageRatio =
	| 'square'
	| '1by1'
	| '5by4'
	| '4by3'
	| '3by2'
	| '5by3'
	| '16by9'
	| '2by1'
	| '3by1'
	| '4by5'
	| '3by4'
	| '2by3'
	| '3by5'
	| '9by16'
	| '1by2'
	| '1by3';

/**
 * The props for the image component
 */
export type ImageProps = {
	/**
	 * The image's fixed square dimensions
	 */
	dimensions?: SquareImageDimensions;

	/**
	 * The image dimensions ratio
	 */
	ratio?: ImageRatio;

	/**
	 * Whether the image should be rounded
	 */
	rounded?: boolean;
} & ComponentPropsWithRef<'figure'>;

export function Image(props: ImageProps) {
	const {
		dimensions,
		ratio,
		rounded = false,
		...rest
	} = props;

	return (
		<DynamicComponent
			additionalClasses={[
				'image',
				{
					'is-rounded': rounded,
					[`is-${dimensions}`]: !!dimensions,
					[`is-${ratio}`]: !!ratio
				}
			]}
			{...rest}
			tag='figure'
		/>
	);
}
