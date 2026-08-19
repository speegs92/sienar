import { useContext } from 'react';
import { classNames, formValidationContext } from '@sienar/utils';
import { ValidationListItem } from './ValidationListItem.tsx';

import type { HTMLAttributes } from 'react';
import type { ValidationResult } from '@sienar/utils';

/**
 * The props for the validation list component
 */
export interface ValidationListProps extends HTMLAttributes<HTMLUListElement> {
	/**
	 * The validation results for the parent form element
	 */
	validations: ValidationResult[]

	/**
	 * Whether to hide non-error validation results
	 */
	hideNonErrors?: boolean

	/**
	 * Whether to hide validation results if all results are valid
	 */
	hideIfAllValid?: boolean

	/**
	 * The message to display if all validation results are valid
	 */
	allValidMessage?: string
}

export function ValidationList(props: ValidationListProps) {
	const {
		validations,
		hideNonErrors = false,
		hideIfAllValid = true,
		allValidMessage = 'All requirements met',
		className,
		...rest
	} = props;

	const context = useContext(formValidationContext);

	let filtered = validations;

	if (hideNonErrors) {
		filtered = validations.filter(v => !v.valid);
	}
	else if (hideIfAllValid) {
		if (validations.every(v => v.valid)) {
			filtered = context.hasInteracted && validations.length > 0
				?  [{ valid: true, message: allValidMessage }]
				: [];
		}
	}

	const classes = classNames(className, 'validation-list');

	return filtered.length > 0 && (
		<ul
			className={classes}
			{...rest}
		>
			{filtered.map(r => (
				<ValidationListItem
					key={r.message}
					validation={r}
				/>
			))}
		</ul>
	) || null;
}