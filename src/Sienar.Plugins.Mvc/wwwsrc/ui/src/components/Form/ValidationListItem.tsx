import { classNames } from '@sienar/utils';
import { Icon } from '@ui/components';

import type { HTMLAttributes } from 'react';
import type { ValidationResult } from '@sienar/utils';

export interface ValidationListItemProps extends HTMLAttributes<HTMLLIElement> {
	/**
	 * The validation result to display
	 */
	validation: ValidationResult;
}

export function ValidationListItem(props: ValidationListItemProps) {
	const {
		validation,
		className,
		...rest
	} = props;

	let validationIcon = 'message-alert';

	if (validation.valid === true) {
		validationIcon = 'check';
	} else if (validation.valid === false) {
		validationIcon = 'alert-circle';
	}

	const classes = classNames(
		className,
		'validation-list__result',
		{
			'validation-list__result--valid': validation.valid === true,
			'validation-list__result--invalid': validation.valid === false
		}
	);

	return (
		<li
			className={classes}
			{...rest}
		>
			<span className='validation-list__result-icon'>
				<Icon icon={validationIcon}/>
			</span>

			<span className='validation-list__result-message'>
				{validation.message}
			</span>
		</li>
	)
}
