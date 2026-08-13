import { classNames } from '@sienar/utils';
import type { HTMLAttributes } from 'react';

export interface MainContentProps extends HTMLAttributes<HTMLElement> {
	/**
	 * Whether the top-level sidebar is open
	 */
	sidebarOpen: boolean;

	/**
	 * The HTML tag with which to render the main content
	 */
	tag?: keyof HTMLElementTagNameMap;
}

export function MainContent(props: MainContentProps) {
	const {
		tag: Tag = 'main',
		sidebarOpen,
		className,
		...rest
	} = props;

	const classes = classNames(
		className,
		'app__main',
		{
			'app__main--sidebar-open': sidebarOpen
		}
	);

	return <Tag className={classes} {...rest} />;
}
