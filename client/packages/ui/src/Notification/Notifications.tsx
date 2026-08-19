import { useNotifications } from '@sienar/utils';
import { Notification } from './Notification.tsx';
import { notificationContext } from './utils.ts';

import type { ReactNode } from 'react';
import type { NotificationType } from '@sienar/utils';

/**
 * The props for the notification provider component
 */
export interface NotificationsProps {
	/**
	 * The default icon to use with each notification type
	 */
	icons?: { [id in NotificationType]: ReactNode };
}

export function Notifications(props: NotificationsProps) {
	const icons: Record<NotificationType, ReactNode> = Object.assign({
		success: <i className='checkbox-marked-circle-outline'/>,
		info: <i className='information'/>,
		warning: <i className='alert-outline'/>,
		error: <i className='alert-circle'/>
	}, props.icons);

	const notifications = useNotifications();

	return (
		<notificationContext.Provider value={{ icons }}>
			<div className='notifications'>
				{notifications.map(n => (
					<Notification
						key={n.id}
						data={n}
					/>
				))}
			</div>
		</notificationContext.Provider>
	);
}
