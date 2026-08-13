import { enqueueSnackbar } from 'notistack';
import type { Notification, NotificationType, Notifier } from '@sienar/utils';

/**
 * Renders a notification in the UI
 * @param message The message to render
 * @param type The type of the notification to render
 */
export function notify(message: string, type: NotificationType) {
	enqueueSnackbar(message, {
		variant: type,
		autoHideDuration: type === 'error' || type === 'warning'
			? null
			: 5000
	});
}

export const notifier: Notifier = {
	success(message: string) {
		notify(message, 'success');
	},
	warning(message: string) {
		notify(message, 'warning');
	},
	info(message: string) {
		notify(message, 'info');
	},
	error(message: string) {
		notify(message, 'error');
	},
	notify(notification: Notification | string, type?: NotificationType) {
		if (typeof notification === 'string') {
			notify(notification, type!);
		} else {
			notify(notification.message, notification.type);
		}
	}
}
