import { createContext, useContext } from 'react';

import type { Breakpoint } from '@ui/theme.ts';

export const modalDefaultValuesContext = createContext<ModalDefaultValuesContext>({ maxWidth: 'md' });

export const useModalDefaultValuesContext = () => useContext(modalDefaultValuesContext);

/**
 * The context values provided by the modal context provider
 */
export interface ModalDefaultValuesContext {
	/**
	 * The default max width of the modal container
	 */
	maxWidth: Breakpoint;
}
