import '@sienar/utils';
import type { Breakpoint, Color } from '@ui/theme.ts';

export * from './Modal.tsx';
export * from './ModalContainer.tsx';
export * from './ConfirmModal.tsx';
export * from './utils.ts';

declare module '@sienar/utils' {
	interface ExtensibleModalConfiguration {
		/**
		 * The max width of the modal
		 */
		maxWidth?: Breakpoint;
	}

	interface ExtensibleConfirmConfiguration {
		/**
		 * The color of the <code>accepted</code> button
		 */
		acceptedColor?: Color;

		/**
		 * Whether the <code>accepted</code> button should be outlined
		 */
		acceptedOutlined?: boolean;

		/**
		 * The color of the <code>rejected</code> button
		 */
		rejectedColor?: Color;

		/**
		 * Whether the <code>rejected</code> button should be outlined
		 */
		rejectedOutlined?: boolean;
	}
}
