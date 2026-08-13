import { useState } from 'react';
import { classNames } from '@sienar/utils';
import { Button } from '@ui/components/Button/Button.tsx';
import { createThemedClassNames, ThemeContext } from '@ui/theme.ts';
import { CloseableContext } from '@ui/utils.ts';

import type { HTMLAttributes,  ReactNode } from 'react';
import type { Color, Direction, HorizontalAlignment, Variant, VerticalAlignment } from '@ui/theme.ts';

/**
 * The props for the dropdown component
 */
export interface DropdownProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
	/**
	 * The global color of the dropdown
	 */
	color?: Color;

	/**
	 * The activator button theme color
	 */
	buttonColor?: Color;

	/**
	 * The activator button variant
	 */
	buttonVariant?: Variant;

	/**
	 * The list color
	 */
	listColor?: Color;

	/**
	 * The label text to show with the button, if any
	 */
	label?: string;

	/**
	 * The left icon to show with the activator button, if any
	 */
	leftIcon?: ReactNode;

	/**
	 * The right icon to show with the activator button, if any
	 */
	rightIcon?: ReactNode;

	/**
	 * The icon to render inside the activator button, if any. If this prop is present, the dropdown will only render this as child content of the activator button.
	 */
	icon?: ReactNode;

	/**
	 * The direction the dropdown should open
	 */
	direction?: Direction;

	/**
	 *
	 */
	alignment?: HorizontalAlignment | VerticalAlignment;

	/**
	 * Whether the dropdown should hide icons on dropdown items
	 */
	hideChildrenIcons?: boolean;
}

export function Dropdown(props: DropdownProps) {
	const {
		color = 'default',
		buttonColor,
		listColor,
		buttonVariant,
		label,
		leftIcon,
		rightIcon,
		icon,
		direction = 'down',
		alignment = 'left',
		hideChildrenIcons,
		children,
		className,
		...rest
	} = props;

	const [ isOpen, setIsOpen ] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const close = () => setIsOpen(false);

	const dropdownClasses = classNames(
		className,
		createThemedClassNames(color, undefined, 'dropdown'),
		{
			'dropdown--open': isOpen,
			'dropdown--child-icons-hidden': !!hideChildrenIcons
		}
	);

	const alignInfix = direction === 'up' || direction === 'down' ? 'x' : 'y';
	const contentClasses = classNames(
		createThemedClassNames(listColor ?? color, undefined, 'dropdown__content'),
		`dropdown__content--${direction}`,
		`dropdown__content--align-${alignInfix}-${alignment}`
	);

	return (
		<div className={dropdownClasses} {...rest}>
			<Button
				color={buttonColor ?? color}
				variant={buttonVariant}
				icon={icon}
				className='dropdown__activator'
				onClick={toggle}
			>
				{leftIcon}
				{label}
				{rightIcon}
			</Button>

			<CloseableContext.Provider value={{
				isOpen,
				close
			}}>
				<ThemeContext.Provider value={{ color: listColor ?? color }}>
					{isOpen && (
						<div
							className='dropdown__overlay'
							onClick={close}
						/>
					)}
					<div className={contentClasses}>
						{children}
					</div>
				</ThemeContext.Provider>
			</CloseableContext.Provider>
		</div>
	)
}