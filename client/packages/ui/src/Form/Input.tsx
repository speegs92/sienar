import { forwardRef, useEffect, useState } from 'react';

import type { FocusEventHandler, ForwardedRef, InputHTMLAttributes } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(props: InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) {
	const {
		autoComplete = 'off',
		readOnly: nativeReadOnly,
		onFocus,
		...rest
	} = props;

	const [readOnly, setReadOnly] = useState(true);

	const handleFocus: FocusEventHandler<HTMLInputElement> = e => {
		onFocus?.(e);

		if (!nativeReadOnly && autoComplete === 'off') {
			setReadOnly(false);
		}
	};

	useEffect(() => {
		if (autoComplete !== 'off') {
			setReadOnly(!!nativeReadOnly);
		}
	}, []);

	return (
		<input
			ref={ref}
			onFocus={handleFocus}
			readOnly={readOnly}
			autoComplete={autoComplete}
			{...rest}
		/>
	);
});
