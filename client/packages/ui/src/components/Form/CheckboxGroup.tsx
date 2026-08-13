import { useEffect, useState } from 'react';
import { useFormFieldValidation } from '@sienar/utils';
import { checkboxRadioGroupContext, FormCheckRadioGroup } from './FormCheckRadioGroup.tsx';
import { Checkbox } from './Checkbox.tsx';

import type { ReactNode } from 'react';
import type { FormCheckRadioGroupProps } from './FormCheckRadioGroup.tsx';
import type { ValidationListProps } from './ValidationList.tsx';

/**
 * The props for the checkbox group component
 */
export interface CheckboxGroupProps<T> extends Omit<FormCheckRadioGroupProps<T[]>, 'validationListProps'> {
	/**
	 * The available checkbox options
	 */
	options?: T[];

	/**
	 * An optional render function to create the checkboxes
	 */
	checkboxRenderer?: (item: T) => ReactNode;

	/**
	 * The validation list props
	 */
	validationListProps?: Omit<ValidationListProps, 'validations'>;
}

export function CheckboxGroup<T>(props: CheckboxGroupProps<T>) {
	const {
		options = [],
		checkboxRenderer = (o) => (
			<Checkbox
				value={o}
				key={o?.toString()}
			>
				{o as ReactNode}
			</Checkbox>
		),
		validationListProps,
		children,
		...rest
	} = props;

	const [selected, setSelected] = useState<T[]>([]);

	const handleValueStateChange = (newValue: T[]|undefined) => {
		if (newValue) {
			const v = [...newValue];
			setSelected(v);
			props.onChange?.(v);
			interact();
		}
	};

	const [validations, interact] = useFormFieldValidation(
		props.name!,
		props.displayName,
		selected,
		handleValueStateChange,
		props.validators ?? []);

	useEffect(() => {
		setSelected(props.value ?? []);
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
				{options.map(o => checkboxRenderer(o))}
				{children}
			</FormCheckRadioGroup>
		</checkboxRadioGroupContext.Provider>
	)
}
