import { useFormFieldValidation } from '@sienar/utils';

/**
 * The props for the hidden input component
 */
export type HiddenInputProps = {
	/**
	 * The name of the form field
	 */
	name: string;

	/**
	 * The value of the form field
	 */
	value: string|number|boolean
}

export function HiddenInput({ name, value }: HiddenInputProps) {
	useFormFieldValidation(name, undefined, value, () => {}, []);

	return (
		<input
			type='hidden'
			name={name}
			value={value.toString()}
		/>
	)
}