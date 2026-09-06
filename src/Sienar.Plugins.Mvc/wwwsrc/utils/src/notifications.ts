import { createState } from './state.ts';

import type { ReactNode } from 'react';

let nextNotificationId = 0;
const notificationState = createState<NotificationInstance[]>([]);

/**
 * Provides React components access to the notification system state
 */
export const useNotifications = notificationState.hook;

/**
 * Creates a notification in the UI
 *
 * @param message The notification message
 * @param notificationType The notification type
 * @param configuration The notification configuration
 *
 * @returns The ID of the notification
 */
export function notify(
	message: string,
	notificationType: NotificationType,
	configuration?: NotificationConfiguration): CloseNotificationFunction;

/**
 * Creates a notification in the UI
 *
 * @param notification The notification
 * @param configuration The notification configuration
 *
 * @returns The ID of the notification
 */
export function notify(
	notification: Notification,
	configuration?: NotificationConfiguration
): CloseNotificationFunction;

export function notify(
	arg1: string|Notification,
	arg2?: NotificationType|NotificationConfiguration,
	arg3?: NotificationConfiguration
): CloseNotificationFunction {
	const notification: Notification = typeof arg1 === 'string'
		? { message: arg1, type: arg2 as NotificationType }
		: arg1;
	const configuration: NotificationConfiguration|undefined = typeof arg2 === 'string'
		? arg3!
		: arg2;

	return notifyRaw(notification, configuration);
}

function notifyRaw(
	notification: Notification,
	configuration: NotificationConfiguration|undefined
): CloseNotificationFunction {
	configuration = Object.assign({
		visibleDuration: notification.type === 'error' || notification.type === 'warning' ? 0 : 5000
	}, configuration);

	const id = ++nextNotificationId;

	const closeFunc = () => closeNotification(id);

	const data: NotificationInstance = {
		id,
		notification,
		configuration,
		close: closeFunc
	};

	notificationState.setter(n => [...n, data]);

	if (configuration.visibleDuration !== 0) {
		setTimeout(closeFunc, configuration.visibleDuration);
	}

	return closeFunc;
}

function closeNotification(id: number) {
	notificationState.setter(
		notifications => notifications.filter(
			n => n.id !== id));
}

/**
 * A notification
 */
export interface Notification {
	/**
	 * The notification message
	 */
	message: string;

	/**
	 * The type of the notification
	 */
	type: NotificationType
}

/**
 * The data describing a notification instance
 */
export interface NotificationInstance {
	/**
	 * The notification ID
	 */
	id: number;

	/**
	 * The notification data
	 */
	notification: Notification;

	/**
	 * The notification configuration data
	 */
	configuration: NotificationConfiguration;

	/**
	 * The function to close the notification
	 */
	close: CloseNotificationFunction;
}

/**
 * The extensibility point for notification configuration
 */
export interface ExtensibleNotificationConfiguration {}

/**
 * The available notification configuration settings
 */
export interface NotificationConfiguration extends ExtensibleNotificationConfiguration {
	/**
	 * The amount of time (in ms) for which the notification is visible. To require the user to manually close the notification, set to <code>0</code>
	 */
	visibleDuration?: number;

	/**
	 * The icon to display with the notification
	 */
	icon?: ReactNode;

	/**
	 * The dismiss button to display with the notification
	 */
	dismissButton?: ReactNode;
}

/**
 * Available types of notifications
 */
export type NotificationType =
	| 'success'
	| 'info'
	| 'warning'
	| 'error';

/**
 * A function which closes a notification
 */
export interface CloseNotificationFunction {
	(): void;
}
