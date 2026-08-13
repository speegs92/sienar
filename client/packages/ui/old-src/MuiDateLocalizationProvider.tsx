import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// When the app transitions to ESM imports with importmap
// use https://esm.sh/@mui/x-date-pickers@7.22.1/AdapterDayjs for this import
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { ComponentType, PropsWithChildren } from 'react';
import type { InjectionKey } from '@sienar/utils';

export const MUI_DATE_LOCALIZATION_PROVIDER = Symbol() as InjectionKey<ComponentType<PropsWithChildren>>;

export default function MuiDateLocalizationProvider({ children }: PropsWithChildren) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			{children}
		</LocalizationProvider>
	);
}