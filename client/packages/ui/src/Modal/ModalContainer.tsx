import { useEffect, useState } from 'react';
import { classNames, useModals } from '@sienar/utils';
import { Backdrop } from '@ui/components';
import { Modal } from './Modal.tsx';
import { modalDefaultValuesContext } from './utils.ts';

import type { ModalInstance } from '@sienar/utils';
import type { Breakpoint } from '@ui/theme.ts';

/**
 * The props for the modal component
 */
export interface ModalContainerProps {
	/**
	 * The default max width of the modal container
	 */
	maxWidth?: Breakpoint;
}

export function ModalContainer(props: ModalContainerProps) {
	const { maxWidth = 'md' } = props;

	const modals = useModals();
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [currentModal, setCurrentModal] = useState<ModalInstance<any>|undefined>(undefined);

	useEffect(() => {
		if (modals[0] === undefined) {
			setModalVisible(false);

			const timeoutId = setTimeout(() => {
				setCurrentModal(undefined);
			}, 300);

			return () => clearTimeout(timeoutId);
		} else {
			setModalVisible(true);
			setCurrentModal(modals[0]);
		}
	}, [modals]);

	const wrapperClasses = classNames(
		'modal-container__modal-wrapper',
		{
			'modal-container__modal-wrapper--visible': modalVisible
		}
	)

	return (
		<modalDefaultValuesContext.Provider value={{ maxWidth }}>
			<div className='modal-container'>
				<Backdrop
					visible={modalVisible}
					onClick={() => modals[0]?.close('canceled')}
				/>

				<div className={wrapperClasses}>
					{currentModal && <Modal data={currentModal}/>}
				</div>
			</div>
		</modalDefaultValuesContext.Provider>
	);
}
