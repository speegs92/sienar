import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export const TabContext = createContext<TabState>({
	activeTabId: '',
	setActiveTabId: () => {},
	registerTab: () => {},
	deregisterTab: () => {}
});

export const useTabContext = () => useContext(TabContext);

/**
 * The data describing an individual tab pane
 */
export interface TabData {
	/**
	 * The ID of the tab
	 */
	id: string;

	/**
	 * The inner content of the tab activator button
	 */
	activatorContent: ReactNode;
}

/**
 * The data describing the state of a tab group
 */
export interface TabState {
	/**
	 * The ID of the active tab
	 */
	activeTabId: string;

	/**
	 * Sets the activeId value
	 */
	setActiveTabId: (id: string) => void;

	/**
	 * Registers a tab as child content of the tab group
	 *
	 * @param tab The tab to register
	 */
	registerTab: (tab: TabData) => void;

	/**
	 * Removes a tab as child content of the tab group
	 *
	 * @param tab The tab to deregister
	 */
	deregisterTab: (tab: TabData) => void;
}