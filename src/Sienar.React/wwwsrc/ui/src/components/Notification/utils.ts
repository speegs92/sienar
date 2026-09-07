import { createContext, useContext } from 'react';

import type { ReactNode } from 'react';
import type { NotificationType } from '@sienar/utils';

export const notificationContext = createContext<NotificationContext|null>(null);

export const useNotificationContext = () => useContext(notificationContext);

/**
 * The context values provided by the notification context provider
 */
export interface NotificationContext {
	/**
	 * The default icon to use with each notification type
	 */
	icons: Record<NotificationType, ReactNode>;
}
