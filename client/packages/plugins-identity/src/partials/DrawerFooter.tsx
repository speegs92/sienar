import { Link } from 'react-router-dom';
import { Authorize } from '@sienar/utils';
import UserBadge from '@plugins-identity/components/UserBadge.tsx';
import { urls } from '@plugins-identity/constants.ts';

import type { UserBadgeProps } from '@plugins-identity/components/UserBadge.tsx';

export default function DrawerFooter(props: UserBadgeProps) {
	return (
		<Authorize unauthorized={(
			<>
				<Link
					className='d-block mb-2'
					color='secondary'
					to={urls.account.register.index}
				>
					Register
				</Link>
				<Link
					className='d-block'
					color='primary'
					to={urls.account.login}
				>
					Log in
				</Link>
			</>
		)}>
			<UserBadge {...props}/>
		</Authorize>
	)
};
