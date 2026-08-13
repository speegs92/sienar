import Box from '@mui/material/Box';
import MaterialCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import type { ElementType, PropsWithChildren, ReactNode } from 'react';
import type { Color } from '@ui/theme.ts';

export type CardProps = PropsWithChildren & {
	title: string
	titleTypography?: string
	titleComponent?: ElementType
	subtitle?: string
	subtitleTypography?: string
	subtitleComponent?: ElementType
	headerIcon?: ReactNode
	color?: Color
	headerBackgroundColor?: string
	headerTextColor?: string
	actions?: ReactNode
	variant?: 'elevation'|'outlined'
	elevation?: number
}

export default function Card(props: CardProps) {
	const {
		actions,
		children,
		color,
		headerBackgroundColor,
		headerTextColor,
		headerIcon,
		title,
		titleTypography = 'h4',
		titleComponent = 'h4',
		subtitle,
		subtitleTypography = 'body1',
		subtitleComponent = 'h5',
		variant = 'elevation',
		elevation = 0
	} = props;

	return (
		<MaterialCard
			variant={variant}
			elevation={elevation}
		>
			<Box sx={{
				bgcolor: mapThemeBackground(headerBackgroundColor, color),
				color: mapThemeForeground(headerTextColor, color),
				px: 3,
				py: 2,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}>
				<div>
					<Typography
						component={titleComponent}
						typography={titleTypography}
					>
						{title}
					</Typography>
					{subtitle && (
						<Typography
							component={subtitleComponent}
							typography={subtitleTypography}
						>
							{subtitle}
						</Typography>
					)}
				</div>
				{headerIcon}
			</Box>

			<CardContent sx={{
				px: 3,
				py: 2
			}}>
				{children}
			</CardContent>

			{actions && (
				<CardActions sx={{
					p: 3,
					pt: 2
				}}>
					{actions}
				</CardActions>
			)}
		</MaterialCard>
	)
}

function mapThemeBackground(
	explicitColor: string|undefined,
	color: Color|undefined
): string {
	if (explicitColor) return explicitColor;
	if (color === undefined || color === 'inherit') return 'inherit';
	return `${color}.main`;
}

function mapThemeForeground(
	explicitColor: string|undefined,
	color: Color|undefined
): string {
	if (explicitColor) return explicitColor;
	if (color === undefined) return 'text.primary';
	return color === 'inherit'
		? 'inherit'
		: `${color}.contrastText`;
}