import { classNames } from '@sienar/utils';
import { useNotificationContext } from './utils.ts';

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
	const color = data.notification.type === 'error' ? 'danger' :  data.notification.type as Color;

	const classes = classNames(
		className,
		'notifications__notification',
		`is-${color}`
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
					<button onClick={data.close} />
				)}
			</div>

		</div>
	)
}
