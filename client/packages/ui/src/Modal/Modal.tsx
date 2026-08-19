import { classNames, modalContext } from '@sienar/utils';
import { useModalDefaultValuesContext } from './utils.ts';

import type { ModalInstance, CloseModalFunction } from '@sienar/utils';

export interface ModalProps<T> {
	/**
	 * The modal data
	 */
	data: ModalInstance<T>;
}

export function Modal<T>(props: ModalProps<T>) {
	const { data } = props;
	const defaultValues = useModalDefaultValuesContext();

	const close: CloseModalFunction<T> = (status, result) => {
		return data.close(status, result);
	};

	const headerClasses = classNames(
		'd-flex flex-row justify-content-between align-items-center',
		{
			'modal__card-header--has-title': !!data.configuration.title
		}
	);

	return (
		<modalContext.Provider value={{ close }}>
			<div className='container-fluid'
				fluid
				maxWidth={data.configuration.maxWidth ?? defaultValues.maxWidth}
			>
				<div className='modal'>
					<div className={headerClasses}>
						<h2 className='modal__title'>
							{data.configuration.title}
						</h2>
						<button
							className='ml-4'
							color='bold'
							onClick={() => close('canceled')}
						/>
					</div>

					{data.modal}
				</div>
			</div>
		</modalContext.Provider>
	)
}
