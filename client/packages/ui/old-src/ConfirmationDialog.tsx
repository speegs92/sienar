import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Card from './Card.tsx';

import type { CardProps } from './Card.tsx';
import type { Color } from './theme.ts';

export type ConfirmationDialogSlots = {
	card?: Omit<CardProps, 'title'|'color'|'actions'>
}

export type ConfirmationDialogProps = {
	/**
	 * The title to appear at the top of the confirmation dialog
	 */
	title: string

	/**
	 * The question text the dialog should ask the user
	 */
	question: string

	/**
	 * The text to use for the affirmative button
	 */
	confirmText: string

	/**
	 * The text to use for the cancel button
	 */
	cancelText: string

	/**
	 * Whether the confirmation dialog should render
	 */
	open: boolean

	/**
	 * A function to execute when the user clicks the confirm button
	 */
	onConfirm: () => any

	/**
	 * A function to execute when the user clicks the cancel button or closes the modal by clicking on the backgrop
	 */
	onCancel: () => any

	/**
	 * The {@link Color} of the modal
	 */
	color?: Color

	/**
	 * Additional props to pass to nested components
	 */
	slots?: ConfirmationDialogSlots
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
	const {
		title,
		question,
		confirmText,
		cancelText,
		open,
		onConfirm,
		onCancel,
		color = 'primary',
		slots
	} = props;

	const actions = (
		<>
			<Button
				color={color}
				variant='contained'
				onClick={onConfirm}
			>
				{confirmText}
			</Button>
			<Button
				color={color}
				variant='outlined'
				onClick={onCancel}
			>
				{cancelText}
			</Button>
		</>
	);

	return (
		<Dialog
			open={open}
			onClose={onCancel}
		>
			<Card
				title={title}
				color={color}
				actions={actions}
				{...slots?.card}
			>
				<Typography>{question}</Typography>
			</Card>
		</Dialog>
	);
}