import Divider from '@mui/material/Divider';
import type { PropsWithChildren } from 'react';

export type SpacerProps = PropsWithChildren & {
	spacing: number
}

export default function Spacer(props: SpacerProps) {
	const { children, spacing } = props;

	return (
		<Divider
			sx={{
				opacity: 0,
				my: spacing
			}}
			aria-hidden={true}
		>
			{children}
		</Divider>
	)
}