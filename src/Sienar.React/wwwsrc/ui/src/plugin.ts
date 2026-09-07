import { CONFIRM_MODAL, provide } from '@sienar/utils';
import { ConfirmModal } from '@ui/components';

export function plugin() {
	provide(CONFIRM_MODAL, ConfirmModal);
}
