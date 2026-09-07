import { forwardRef, useId } from 'react';
import { FormCheckRadio } from './FormCheckRadio.tsx';
import { useCheckRadioGroupContext } from './FormCheckRadioGroup.tsx';

import type { ChangeEvent, ForwardedRef, ReactElement, RefAttributes } from 'react';
import type { FormCheckRadioProps } from './FormCheckRadio.tsx';

/**
 * The props for the checkbox component
 */
export interface CheckboxProps<T> extends  Omit<FormCheckRadioProps, 'checked'|'name'|'onChange'|'type'|'value'> {
	/**
	 * The value of the checkbox
	 */
	value: T;
}

export const Checkbox = forwardRef(function Checkbox<T>(props: CheckboxProps<T>, ref: ForwardedRef<HTMLInputElement>) {
	const {
		id,
		value,
		children,
		...rest
	} = props;

	const inputId = useId();
	const context = useCheckRadioGroupContext<T[]>();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;

		if (checked && context.selected.includes(value) ||
			!checked && !context.selected.includes(value)) {
			return;
		}

		const index = context.selected.findIndex(c => c === value);

		if (checked && index === -1) {
			context.selected.push(value);
			context.setSelected(context.selected);
		} else if (!checked && index > -1) {
			context.selected.splice(index, 1);
			context.setSelected(context.selected);
		}
	};

	return (
		<FormCheckRadio
			ref={ref}
			id={id ?? inputId}
			type='checkbox'
			name={context.name}
			checked={context.selected.includes(props.value)}
			onChange={handleChange}
			children={children ?? value?.toString()}
			{...rest}
		/>
	);
}) as <T>(props: CheckboxProps<T> & RefAttributes<HTMLInputElement>) => ReactElement;
