import { provide, NOTIFICATION_PROVIDER_COMPONENT, NOTIFIER } from '@sienar/utils';
import SnackbarProvider from './SnackbarProvider.tsx';
import { MUI_DATE_LOCALIZATION_PROVIDER, default as MuiDateLocalizationProvider } from './MuiDateLocalizationProvider.tsx';
import { notifier } from './utils.ts';

export function plugin() {
	provide(NOTIFICATION_PROVIDER_COMPONENT, SnackbarProvider);
	provide(MUI_DATE_LOCALIZATION_PROVIDER, MuiDateLocalizationProvider);
	provide(NOTIFIER, notifier);
}