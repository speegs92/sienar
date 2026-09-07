import { createContext, useContext, useEffect } from 'react';

export function useScrollLock(isLocked: boolean) {
	useEffect(() => {
		if (!isLocked) {
			return;
		}

		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.paddingRight = `${scrollbarWidth}px`;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.paddingRight = '';
			document.body.style.overflow = '';
		}
	});
}

export const CloseableContext = createContext<Closeable>({
	isOpen: false,
	close: () => {}
});

export const useCloseableContext = () => useContext<Closeable>(CloseableContext);

/**
 * Represents a component which can be closed. Used to pass the open state and a close function to child components via a context.
 */
export type Closeable = {
	isOpen: boolean;
	close: () => void;
}
