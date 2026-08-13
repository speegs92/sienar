import { createContext, useContext } from 'react';
import { ValidationList } from './ValidationList.tsx';

import type { FieldsetHTMLAttributes, ReactNode } from 'react';
import type { FormInputProps } from './shared.ts';
import type { ValidationListProps } from './ValidationList.tsx';

export const checkboxRadioGroupContext = createContext<CheckRadioGroupContext<any>>({
	selected: '',
	setSelected: () => {},
	name: ''
});

export function useCheckRadioGroupContext<T>() {
	return useContext<CheckRadioGroupContext<T>>(checkboxRadioGroupContext);
}

/**
 * The props of the checkbox/radio group component
 */
export interface FormCheckRadioGroupProps<T> extends
	Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'color'|'onChange'>,
	FormInputProps<T> {
	/**
	 * The label content
	 */
	labelContent?: ReactNode;

	/**
	 * The validation list props
	 */
	validationListProps: ValidationListProps;
}

export function FormCheckRadioGroup<T>(props: FormCheckRadioGroupProps<T>) {
	const {
		displayName,
		children,
		labelContent,
		validationListProps
	} = props;


	return (
		<fieldset className='check-radio-group'>
			<legend className='check-radio-group__label'>
				{labelContent ?? displayName}
			</legend>

			<div className='check-radio-group__content'>
				{children}
			</div>

			<ValidationList {...validationListProps}/>
		</fieldset>
	);
}

/**
 * The state of a checkbox or radio button input group
 */
export interface CheckRadioGroupContext<T> {
	/**
	 * The selected value
	 */
	selected: T;

	/**
	 * Sets the selected value
	 */
	setSelected: (newValue: T) => void;

	/**
	 * The name of the input field
	 */
	name: string;
}
