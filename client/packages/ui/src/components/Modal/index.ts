import '@sienar/utils';
import type { Breakpoint, Color, Variant } from '@ui/theme.ts';

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
		 * The variant of the <code>accepted</code> button
		 */
		acceptedVariant?: Variant;

		/**
		 * The color of the <code>rejected</code> button
		 */
		rejectedColor?: Color;

		/**
		 * The variant of the <code>rejected</code> button
		 */
		rejectedVariant?: Variant;
	}
}
