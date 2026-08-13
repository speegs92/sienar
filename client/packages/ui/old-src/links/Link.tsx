import { Link as RouterLink } from 'react-router-dom';
import MaterialLink from '@mui/material/Link';
import { getHref } from './shared.ts';

import type { LinkProps as MaterialLinkProps } from '@mui/material';
import type { LinkPropsBase } from './shared.ts';

export type LinkProps = Omit<MaterialLinkProps<typeof RouterLink>, 'to'> & LinkPropsBase;

export default function Link(props: LinkProps) {
	const { to } = props;
	const href = getHref(to);

	return (
		<MaterialLink
			component={RouterLink}
			{...props}
			to={href}
		/>
	);
}