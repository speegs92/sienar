import Box from '@mui/material/Box';
import CheckBox from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';

import type { Color } from '@ui/theme.ts';

export type TableBooleanCellProps = {
	/**
	 * The value of the boolean property to render
	 */
	value: boolean

	/**
	 * The color to render with. If not set, the render color will be dark gray
	 */
	color?: Color

	/**
	 * Whether to center
	 */
	center?: boolean
}

export default function TableBooleanCell(props: TableBooleanCellProps) {
	const {
		value,
		color,
		center = false
	} = props;

	return (
		<Box sx={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: center ? 'center' : undefined,
			height: '100%',
			width: '100%',
			color: color
		}}>
			{value && (<CheckBox color={color}/>)}
			{!value && (<CheckBoxOutlineBlank/>)}
		</Box>
	);
}