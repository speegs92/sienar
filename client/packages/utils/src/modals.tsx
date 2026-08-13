import { createContext, useContext } from 'react';
import { inject } from './di.ts';
import { createState } from './state.ts';

import type { ComponentType, ReactNode } from 'react';
import type { InjectionKey } from './di.ts';

export const CONFIRM_MODAL = Symbol() as InjectionKey<ComponentType<ConfirmConfiguration>>;

const modalState = createState<ModalInstance<any>[]>([]);

/**
 * Provides React components access to the modal system state
 */
export const useModals = modalState.hook;

/**
 * Shows the given modal
 *
 * @param modal The modal to show
 * @param configuration The modal's configuration
 */
export function showModal<T>(
	modal: ReactNode,
	configuration?: ModalConfiguration
): Promise<ModalResult<T>> {
	configuration = Object.assign({}, configuration);

	return new Promise((resolve) => {
		const instance: ModalInstance<T> = {
			modal,
			configuration,
			close: (status, result) => {
				modalState.setter(m => m.slice(1));
				resolve({ status, result });
			}
		}

		modalState.setter(m => [instance, ...m]);
	});
}

export async function confirm(
	confirmConfig: ConfirmConfiguration,
	modalConfig?: ModalConfiguration
): Promise<ModalStatus>;

export async function confirm(
	question: string,
	confirmConfig?: Omit<ConfirmConfiguration, 'question'>,
	modalConfig?: ModalConfiguration
): Promise<ModalStatus>;

export async function confirm(
	arg1: string|ConfirmConfiguration,
	arg2?: Omit<ConfirmConfiguration, 'question'>|ModalConfiguration,
	arg3?: ModalConfiguration
): Promise<ModalStatus> {
	const question = typeof arg1 === 'string' ? arg1 : arg1.question;

	const finalConfirmConfig: ConfirmConfiguration = Object.assign(
		{ question },
		typeof arg1 === 'string' ? arg2 : arg1
	);

	const finalModalConfig = Object.assign({}, typeof arg1 === 'string' ? arg3 : arg2) as ModalConfiguration;

	const ConfirmModal = inject(CONFIRM_MODAL);

	const result = await showModal(
		<ConfirmModal {...finalConfirmConfig}/>,
		finalModalConfig
	);

	return result.status;
}

export const modalContext = createContext<ModalContext<any>>({close: () => ({ status: 'canceled' })});

/**
 * Uses the modal context with the given type
 */
export function useModalContext<T>() {
	return useContext<ModalContext<T>>(modalContext);
}

/**
 * The modal context
 */
export interface ModalContext<T> {
	/**
	 * The function to close the modal
	 */
	close: CloseModalFunction<T>;
}

/**
 * The extensibility point for modal configuration
 */
export interface ExtensibleModalConfiguration {}

/**
 * The available modal configuration options
 */
export interface ModalConfiguration extends ExtensibleModalConfiguration {
	/**
	 * The modal title
	 */
	title?: string;
}

/**
 * The extensibility point for confirm modal configuration
 */
export interface ExtensibleConfirmConfiguration {}

/**
 * The available confirm modal configuration options
 */
export interface ConfirmConfiguration extends ExtensibleConfirmConfiguration {
	/**
	 * The question to ask the user
	 */
	question: string;

	/**
	 * The text to display for the <code>accepted</code> option
	 */
	acceptedText?: string;

	/**
	 * The text to display for the <code>rejected</code> option
	 */
	rejectedText?: string;
}

/**
 * The data describing a modal instance
 */
export interface ModalInstance<T> {
	/**
	 * The modal
	 */
	modal: ReactNode;

	/**
	 * The modal configuration data
	 */
	configuration: ModalConfiguration;

	/**
	 * The function to close the modal
	 */
	close: CloseModalFunction<T>;
}

/**
 * The final result after closing a modal
 */
export interface ModalResult<T = undefined> {
	/**
	 * The result value
	 */
	result?: T;

	/**
	 * The modal status
	 */
	status: ModalStatus;
}

/**
 * The available modal statuses
 */
export type ModalStatus =
	| 'accepted'
	| 'rejected'
	| 'canceled';

/**
 * A function which closes a modal
 */
export interface CloseModalFunction<T> {
	(status: ModalStatus, result?: T): void;
}
