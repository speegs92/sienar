import { useMemo } from 'react';

import type { PropsWithChildren } from 'react';
import type { FormValueValidator } from '@sienar/utils';

/**
 * Enables form fields to use arbitrary values such as objects as form field values
 *
 * @param values The valid form field values
 */
export function useArbitraryFormFieldValues<T>(values: T[]) {
	return useMemo(() => {
		const keyToValue = new Map<string, T>();
		const valueToKey = new Map<T, string>();

		values.forEach((o, i) => {
			if (typeof o === 'string') {
				keyToValue.set(o, o);
				valueToKey.set(o, o);
				return;
			}

			const key = `value-${i.toString()}`;
			keyToValue.set(key, o);
			valueToKey.set(o, key);
		});

		return {
			mapToValue: (key: string) => keyToValue.get(key),
			mapToString: (value: T|undefined) => valueToKey.get(value!) ?? ''
		};
	}, values);
}

export interface FormInputProps<T extends unknown> extends PropsWithChildren {
	/**
	 * The ID of the form input
	 */
	id?: string;

	/**
	 * The label text for the input
	 */
	displayName?: string;

	/**
	 * The value of the input
	 */
	value?: T;

	/**
	 * A function which receives the new value of the input when its <code>change</c> event fires
	 *
	 * @param newValue The new value of the input
	 */
	onChange?: (newValue: T) => Promise<any>|any;

	/**
	 * The validators for the input
	 */
	validators?: FormValueValidator<T>[];
}