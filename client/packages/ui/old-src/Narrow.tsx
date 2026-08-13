import Container from '@mui/material/Container';
import type { PropsWithChildren } from 'react';

export default function Narrow({ children }: PropsWithChildren) {
	return (
		<Container maxWidth='sm'>
			{children}
		</Container>
	)
}