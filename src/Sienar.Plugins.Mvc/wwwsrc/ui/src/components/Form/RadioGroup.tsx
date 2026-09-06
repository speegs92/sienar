import { useEffect, useState } from 'react';
import { useFormFieldValidation } from '@sienar/utils';
import { checkboxRadioGroupContext, FormCheckRadioGroup } from './FormCheckRadioGroup.tsx';
import { Radio } from './Radio.tsx';

import type { ReactNode } from 'react';
import type { FormCheckRadioGroupProps } from './FormCheckRadioGroup.tsx';
import type { ValidationListProps } from './ValidationList.tsx';

/**
 * The props for the radio group component
 */
export interface RadioGroupProps<T> extends Omit<FormCheckRadioGroupProps<T>, 'validationListProps'> {
	/**
	 * The available radio options
	 */
	options?: T[];

	/**
	 * An optional render function to create the radio buttons
	 */
	radioRenderer?: (item: T) => ReactNode;

	/**
	 * The validation list props
	 */
	validationListProps?: Omit<ValidationListProps, 'validations'>;
}

export function RadioGroup<T>(props: RadioGroupProps<T|undefined>) {
	const {
		options = [],
		radioRenderer = (o) => (
			<Radio
				value={o}
				key={o?.toString()}
			>
				{o as ReactNode}
			</Radio>
		),
		validationListProps,
		children,
		...rest
	} = props;

	const [selected, setSelected] = useState<T|undefined>(undefined);

	const handleValueStateChange = (newValue: T|undefined) => {
		setSelected(newValue);
		props.onChange?.(newValue);
		interact();
	};

	const [validations, interact] = useFormFieldValidation(
		props.name!,
		props.displayName,
		selected,
		handleValueStateChange,
		props.validators ?? []);

	useEffect(() => {
		setSelected(props.value);
	}, [props.value]);

	return (
		<checkboxRadioGroupContext.Provider value={{
			selected,
			setSelected: handleValueStateChange,
			name: props.name!
		}}>
			<FormCheckRadioGroup
				validationListProps={{
					validations,
					...validationListProps
				}}
				{...rest}
			>
				{options.map(o => radioRenderer(o))}
				{children}
			</FormCheckRadioGroup>
		</checkboxRadioGroupContext.Provider>
	)
}
