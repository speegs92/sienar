import { SnackbarProvider as NotistackSnackbarProvider, closeSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import Cancel from '@mui/icons-material/Cancel';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Error from '@mui/icons-material/Error';
import Help from '@mui/icons-material/Help';
import Warning from '@mui/icons-material/Warning';

import type { PropsWithChildren } from 'react';

export default function SnackbarProvider({ children }: PropsWithChildren) {
	return (
		<NotistackSnackbarProvider
			anchorOrigin={{
				horizontal: 'right',
				vertical: 'top'
			}}
			maxSnack={5}
			iconVariant={{
				success: <CheckCircle sx={{ mr: 1 }}/>,
				warning: <Warning sx={{ mr: 1 }}/>,
				error: <Error sx={{ mr: 1 }}/>,
				info: <Help sx={{ mr: 1 }}/>
			}}
			action={id => (
				<IconButton
					color='inherit'
					onClick={() => closeSnackbar(id)}
				>
					<Cancel/>
				</IconButton>
			)}
		>
			{children}
		</NotistackSnackbarProvider>
	)
}