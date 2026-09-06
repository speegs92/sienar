import { useState } from 'react';
import { classNames } from '@sienar/utils';
import { createThemedClassNames } from '@ui/theme.ts';
import { TabContext } from './utils.ts';

import type { HTMLAttributes } from 'react';
import type { Color } from '@ui/theme.ts';
import type { TabData } from './utils.ts';

/**
 * The props for the tab group component
 */
export interface TabGroupProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
	/**
	 * The color of the tab group
	 */
	color?: Color;

	/**
	 * The HTML tag with which to render the tab group
	 */
	tag?: keyof HTMLElementTagNameMap;

	/**
	 * The CSS classnames to provide to the tab pane
	 */
	paneClassName?: string;
}

export function TabGroup(props: TabGroupProps) {
	const {
		color = 'default',
		tag: Tag = 'div',
		paneClassName,
		className,
		children,
		...rest
	} = props;

	const [ activeId, setActiveId ] = useState('');
	const [ tabList, setTabList ] = useState<TabData[]>([]);

	const classes = classNames(
		className,
		createThemedClassNames(color, undefined, 'tab')
	);

	const navClasses = createThemedClassNames(color, undefined, 'tab__nav');

	const paneClasses = classNames(
		paneClassName,
		createThemedClassNames(color, undefined, 'tab__pane')
	);

	const registerTab = (tab: TabData) => {
		setTabList(previous => {
			if (previous.length === 0) {
				setActiveId(tab.id);
			}

			return [ ...previous, tab ];
		});
	};

	const deregisterTab = (tab: TabData) => {
		setTabList(previous => {
			if (tab.id === activeId) {
				setActiveId(
					previous.length > 0
						? previous[0].id
						: ''
				);
			}

			return tabList.filter(t => t.id !== tab.id);
		});
	};

	return (
		<Tag className={classes} {...rest}>
			<nav className={navClasses}>
				{tabList.map(t => {
					const buttonClasses = classNames(
						createThemedClassNames(
							color,
							undefined,
							'tab__activator'
						),
						{
							'tab__activator--active': t.id === activeId
						}
					);

					return	(
						<button
							key={t.id}
							className={buttonClasses}
							onClick={() => setActiveId(t.id)}
						>
							{t.activatorContent}
						</button>
					)
				})}
			</nav>

			<section className={paneClasses}>
				<TabContext.Provider
					value={{
						activeTabId: activeId,
						setActiveTabId: setActiveId,
						registerTab,
						deregisterTab
					}}
				>
					{children}
				</TabContext.Provider>
			</section>
		</Tag>
	);
}
