import { useModalContext } from '@sienar/utils';
import { Button, CardContent, CardActions } from '@ui/components';

import type { ConfirmConfiguration } from '@sienar/utils';

export function ConfirmModal(props: ConfirmConfiguration) {
	const {
		question,
		acceptedText = 'Yes',
		acceptedColor = 'primary',
		acceptedOutlined,
		rejectedText = 'No',
		rejectedColor,
		rejectedOutlined = true
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
					outlined={rejectedOutlined}
					onClick={() => modal.close('rejected')}
				>
					{rejectedText}
				</Button>
				<Button
					color={acceptedColor}
					outlined={acceptedOutlined}
					onClick={() => modal.close('accepted')}
				>
					{acceptedText}
				</Button>
			</CardActions>
		</>
	)
}
