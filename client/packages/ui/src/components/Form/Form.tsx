import { useContext, useEffect, useId, useRef } from 'react';
import { formValidationContext, sendRequest, useNavigate } from '@sienar/utils';

import type { HTMLAttributes, SubmitEvent } from 'react';
import type { HttpMethod, RequestResult, ValidationResult } from '@sienar/utils';
import type { Color } from '@ui/theme.ts';

/**
 * The props of the form component
 */
export type FormProps = {
	/**
	 * The theme color of the form, if any
	 */
	color?: Color;
	/**
	 * The function to call before submit. If it returns <code>true</code>, the form submission will continue. Otherwise, submission will end
	 */
	beforeSubmit?: <T>(payload: T) => boolean;

	/**
	 * The endpoint to which the form should submit its data
	 */
	endpoint: string;

	/**
	 * The HTTP method with which the form should submit its data
	 */
	method: HttpMethod;

	/**
	 * The function to call on reset
	 */
	onReset?: () => any;

	/**
	 * Whether to reset the form on submit
	 */
	resetOnSubmit?: boolean;

	/**
	 * Whether the form should immediately submit upon rendering
	 */
	immediate?: boolean;

	/**
	 * The function to call or the path to which to navigate on a successful form submission
	 */
	onSuccess?: string|((result: RequestResult<any>) => any);
} & Omit<HTMLAttributes<HTMLFormElement>, 'color'>;

export function Form(props: FormProps) {
	const {
		beforeSubmit,
		endpoint,
		method,
		resetOnSubmit = false,
		children,
		onReset,
		immediate,
		onSuccess
	} = props;

	const formId = useId();
	const formRef = useRef<HTMLFormElement>(null);
	const formContext = useContext(formValidationContext);
	const navigate = useNavigate();

	const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		formContext.hasInteracted = true;

		let valid = true;
		for (let field in formContext.fields) {
			if (!formContext.fields[field].validator()) {
				valid = false;
			}
		}

		if (!valid) {
			return;
		}

		const payload: Record<string, any> = {};
		for (let field in formContext.fields) {
			payload[field] = formContext.fields[field].value;
		}
		console.log(payload);

		if (beforeSubmit && !beforeSubmit(payload)) {
			return;
		}

		const result = await sendRequest<any>(
			endpoint,
			method,
			{
				body: JSON.stringify(payload),
				requestOptions: {
					headers: {
						"Content-Type": "application/json"
					}
				},
				onUnprocessable: e => {
					for (let errored in e.errors) {
						const validationErrors: ValidationResult[] = e.errors[errored].map(e => {
							return {
								valid: false,
								message: e
							};
						});

						// TODO: consider notifying of errors which don't have a matching field?
						formContext.fields[errored]?.setValidationResults(validationErrors);
					}
				}
			}
		);

		if (!result || !result.wasSuccessful) {
			return;
		}

		if (resetOnSubmit) {
			formRef.current!.reset();
		}

		if (typeof onSuccess === 'function') {
			onSuccess(result);
		} else if (typeof onSuccess === 'string') {
			navigate(onSuccess);
		}
	};

	const handleReset = async () => {
		formContext.hasInteracted = false;
		await onReset?.();
	}

	useEffect(() => {
		if (immediate) {
			formRef.current!.requestSubmit();
		}
	}, []);

	// This effect does nothing on load, but when the component unmounts,
	// it resets hasInteracted. Without this, revisiting a submitted forms
	// may cause validation to run on load, because
	// a) React caches components for reuse
	// b) the existing formContext.hasInteracted will therefore be true
	useEffect(() => {
		return () => {
			formContext.hasInteracted = false;
		};
	}, []);

	return (
		<formValidationContext.Provider value={formContext}>
			<form
				id={formId}
				ref={formRef}
				onSubmit={handleSubmit}
				onReset={handleReset}
			>
				{children}
			</form>
		</formValidationContext.Provider>
	);
}
