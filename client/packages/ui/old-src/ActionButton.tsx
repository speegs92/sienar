import { useId, useRef } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { sendRequest } from '@sienar/utils';

import type { FormEvent, PropsWithChildren, ReactNode } from 'react';
import type { ButtonPropsColorOverrides, ButtonTypeMap, ExtendButtonBase, IconButtonTypeMap, SxProps, Theme } from '@mui/material';
import type { HttpMethod } from '@sienar/utils';
import type { ExtensibleColor } from '@ui/theme.ts';

export type ActionButtonProps = PropsWithChildren & {
	onSuccess?: (successful: boolean) => any
	action: string
	method: HttpMethod
	label?: string
	icon?: ReactNode
	variant?: 'outlined'|'contained'|'text',
	sx?: SxProps<Theme>
	color?: ExtensibleColor<ButtonPropsColorOverrides>
}

export default function ActionButton(props: ActionButtonProps) {
	const {
		children,
		onSuccess,
		action,
		method,
		label,
		icon,
		sx,
		color
	} = props;

	const {
		variant = label ? 'contained' : 'text'
	} = props;

	const formId = useId();
	const formRef = useRef<HTMLFormElement>(null);

	const AButton: ExtendButtonBase<ButtonTypeMap&IconButtonTypeMap> = label ? Button : IconButton;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = await sendRequest<boolean>(
			action,
			method,
			{ body: new FormData(formRef.current!) }
		);

		if (!result.result) return;
		onSuccess?.(result.result);
	}

	return (
		<AButton
			type='submit'
			color={color}
			form={formId}
			variant={variant}
			sx={sx}
		>
			{label || icon}
			<form
				id={formId}
				ref={formRef}
				style={{display:'none'}}
				onSubmit={handleSubmit}
			>
				{children}
			</form>
		</AButton>
	);
}