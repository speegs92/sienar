import { classNames, modalContext } from '@sienar/utils';
import { Card, CardHeader, Container, DismissButton } from '@ui/components';
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
			<Container
				fluid
				maxWidth={data.configuration.maxWidth ?? defaultValues.maxWidth}
			>
				<div className='modal'>
					<Card>
						<CardHeader className={headerClasses}>
							<h2 className='modal__title'>
								{data.configuration.title}
							</h2>
							<DismissButton
								className='ml-4'
								color='bold'
								onClick={() => close('canceled')}
							/>
						</CardHeader>

						{data.modal}
					</Card>
				</div>
			</Container>
		</modalContext.Provider>
	)
}
