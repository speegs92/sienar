import { useId, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { classNames, useFormFieldValidation, useRerender } from '@sienar/utils';
import { Icon } from '@ui/components';
import { FormField } from './FormField.tsx';

import type { ChangeEvent, FocusEvent, InputHTMLAttributes, PropsWithChildren } from 'react';
import type { Dayjs } from 'dayjs';
import type { Color } from '@ui/theme.ts';
import type { FormFieldProps } from './FormField.tsx';
import type { ValidationListProps } from './ValidationList.tsx';
import type { FormInputProps } from './shared.ts';

/**
 * The props for the datepicker component
 */
export interface DatePickerProps extends
	PropsWithChildren,
	Omit<InputHTMLAttributes<HTMLInputElement>, 'color'|'onChange'|'type'|'value'>,
	Pick<FormFieldProps, 'leftIcon'>,
	FormInputProps<Dayjs> {
	/**
	 * The theme color of the date picker
	 */
	color?: Color;

	/**
	 * The validation list props
	 */
	validationListProps?: Omit<ValidationListProps, 'validations'>;
}

export function DatePicker(props: DatePickerProps) {
	const {
		id,
		name,
		displayName,
		leftIcon,
		validationListProps,
		validators = [],
		value,
		onBlur,
		onChange,
		onFocus,
		color = 'primary',
		children,
		className,
		...rest
	} = props;

	const inputId = useId();
	const currentValue = useRef<Dayjs>(dayjs(
		value ?? null,
		{utc: true}
	));
	const input = useRef<HTMLInputElement|null>(null);
	const [rerender] = useRerender();
	const [focused, setFocused] = useState(false);

	const handleValueStateChange = (newValue: Dayjs) => {
		if (currentValue.current.isSame(newValue)) {
			return;
		}

		currentValue.current = newValue;
		onChange?.(newValue);
		rerender();
	};

	const [validations, interact] = useFormFieldValidation(name!,
		displayName,
		currentValue.current, handleValueStateChange, validators);

	const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
		setFocused(false);
		onBlur?.(e);
	};

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = dayjs(
			e.target.value,
			{utc: true}
		);

		if (!currentValue.current.isSame(newValue)) {
			handleValueStateChange(newValue);
			interact();
		}
	};

	const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
		setFocused(true);
		onFocus?.(e);
	};

	const classes = classNames(
		className,
		{
			'form-field--focused': focused
		}
	);

	return (
		<FormField
			className={classes}
			inputId={id ?? inputId}
			labelContent={children ?? displayName}
			leftIcon={leftIcon}
			rightIcon={(
				<Icon
					icon='calendar'
					onClick={() => input.current!.showPicker()}
					style={{cursor: 'pointer'}}
					role='button'
				/>
			)}
			validations={validations}
			validationListProps={validationListProps}
		>
			<input
				ref={input}
				id={id ?? inputId}
				className='form-field__input'
				name={name}
				type='datetime-local'
				value={currentValue.current.toISOString().substring(0, 19)}
				onBlur={handleBlur}
				onChange={handleChange}
				onFocus={handleFocus}
				{...rest}
			/>
		</FormField>
	);
}
