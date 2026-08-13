import { classNames } from '@sienar/utils';
import { createThemedClassNames } from '@ui/theme.ts';
import { useNotificationContext } from './utils.ts';
import { DismissButton } from '@ui/components';

import type { HTMLAttributes } from 'react';
import type { NotificationInstance } from '@sienar/utils';
import type { Color } from '@ui/theme.ts';

export interface NotificationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
	/**
	 * The notification data
	 */
	data: NotificationInstance;
}

export function Notification(props: NotificationProps) {
	const {
		data,
		className,
		...rest
	} = props;

	const context = useNotificationContext()!;

	// Sienar names these such that notification types map one-to-one to theme colors
	const color = data.notification.type as Color;

	const classes = classNames(
		className,
		createThemedClassNames(
			color,
			undefined,
			'notifications__notification'
		)
	);

	return (
		<div
			className={classes}
			{...rest}
		>
			<div className='notifications__notification-icon'>
				{data.configuration.icon || context.icons[data.notification.type]}
			</div>

			<div className='notifications__notification-message'>
				{data.notification.message}
			</div>

			<div className='notifications__notification-close-button-wrapper'>
				{data.configuration.dismissButton || (
					<DismissButton
						color={color}
						onClick={data.close}
					/>
				)}
			</div>

		</div>
	)
}
