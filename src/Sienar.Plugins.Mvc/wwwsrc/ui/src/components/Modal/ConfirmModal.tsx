import { useModalContext } from '@sienar/utils';
import { Button, CardContent, CardActions } from '@ui/components';

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
			<CardContent>
				{question}
			</CardContent>
			<CardActions className='d-flex justify-content-end'>
				<Button
					color={rejectedColor}
					variant={rejectedVariant}
					onClick={() => modal.close('rejected')}
				>
					{rejectedText}
				</Button>
				<Button
					color={acceptedColor}
					variant={acceptedVariant}
					onClick={() => modal.close('accepted')}
				>
					{acceptedText}
				</Button>
			</CardActions>
		</>
	)
}
