import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { getHref } from './shared.ts';

import type { ButtonProps } from '@mui/material';
import type { LinkPropsBase } from './shared.ts';

export type ButtonLinkProps = Omit<ButtonProps<typeof Link>, 'to'> & LinkPropsBase;

export default function ButtonLink(props: ButtonLinkProps) {
	const { to } = props;
	const href = getHref(to);

	return (
		<Button
			component={Link}
			{...props}
			to={href}
		/>
	);
}