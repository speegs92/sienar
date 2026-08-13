import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { getHref } from './shared.ts';

import type { ButtonProps } from '@mui/material';
import type { LinkPropsBase } from './shared.ts';

export type IconButtonLinkProps = Omit<ButtonProps<typeof Link>, 'to'> & LinkPropsBase;

export default function ButtonLink(props: IconButtonLinkProps) {
	const { to } = props;
	const href = getHref(to);

	return (
		<IconButton
			component={Link}
			{...props}
			to={href}
		/>
	);
}