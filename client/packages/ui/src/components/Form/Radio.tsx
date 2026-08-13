import { forwardRef, useId } from 'react';
import { FormCheckRadio } from './FormCheckRadio.tsx';
import { useCheckRadioGroupContext } from './FormCheckRadioGroup.tsx';

import type { ChangeEvent, ForwardedRef, ReactElement, RefAttributes } from 'react';
import type { FormCheckRadioProps } from './FormCheckRadio.tsx';

/**
 * The props for the radio component
 */
export interface RadioProps<T> extends  Omit<FormCheckRadioProps, 'checked'|'name'|'onChange'|'type'|'value'> {
	/**
	 * The value of the radio button
	 */
	value: T;
}

export const Radio = forwardRef(function Radio<T>(props: RadioProps<T>, ref: ForwardedRef<HTMLInputElement>) {
	const {
		id,
		value,
		children,
		...rest
	} = props;

	const inputId = useId();
	const context = useCheckRadioGroupContext<T>();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			context.setSelected(value);
		}
	};

	return (
		<FormCheckRadio
			ref={ref}
			id={id ?? inputId}
			type='radio'
			name={context.name}
			checked={context.selected === props.value}
			onChange={handleChange}
			children={children ?? value?.toString()}
			{...rest}
		/>
	);
}) as <T>(props: RadioProps<T> & RefAttributes<HTMLInputElement>) => ReactElement;
