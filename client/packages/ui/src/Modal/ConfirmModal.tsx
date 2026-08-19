import { useModalContext } from '@sienar/utils';

import type { ConfirmConfiguration } from '@sienar/utils';

export function ConfirmModal(props: ConfirmConfiguration) {
	const {
		question,
		acceptedText = 'Yes',
		acceptedColor = 'primary',
		acceptedVariant = 'solid',
		rejectedText = 'No',
		rejectedColor = 'secondary',
		rejectedVariant = 'outlined'
	} = props;

	const modal = useModalContext<void>();

	return (
		<>
			<p>
				{question}
			</p>
			<div className='d-flex justify-content-end'>
				<button
					color={rejectedColor}
					variant={rejectedVariant}
					onClick={() => modal.close('rejected')}
				>
					{rejectedText}
				</button>
				<button
					color={acceptedColor}
					variant={acceptedVariant}
					onClick={() => modal.close('accepted')}
				>
					{acceptedText}
				</button>
			</div>
		</>
	)
}
