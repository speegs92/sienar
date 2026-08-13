import { useEffect, useId } from 'react';
import { classNames } from '@sienar/utils';
import { useTabContext } from './utils.ts';

import type { HTMLAttributes, ReactNode } from 'react';
import type { TabData } from './utils.ts';

/**
 * the props for the tab pane component
 */
export interface TabPaneProps extends HTMLAttributes<HTMLElement> {
	/**
	 * The HTML tag with which to render the tab item
	 */
	tag?: keyof HTMLElementTagNameMap;

	/**
	 * The custom content to show in the tab activator button
	 *
	 * This prop overrides the title prop.
	 */
	activatorContent: ReactNode;
}

export function TabPane(props: TabPaneProps) {
	const tabContext = useTabContext();

	const {
		tag: Tag = 'article',
		activatorContent,
		className,
		...rest
	} = props;

	const id = useId();
	const isActiveTab = id === tabContext.activeTabId;

	useEffect(() => {
		const tabData: TabData = { id, activatorContent };

		tabContext.registerTab(tabData);

		return () => tabContext.deregisterTab(tabData);
	}, []);

	const tabItemClasses = classNames(
		className,
		'tab__tab-item',
		{
			'd-none': !isActiveTab
		}
	);

	return <Tag className={tabItemClasses} {...rest} />;
}
