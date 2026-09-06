import { Authorize } from '@sienar/utils';
import { LinkButton } from '@sienar/ui';
import UserBadge from '@plugins-identity/components/UserBadge.tsx';
import { urls } from '@plugins-identity/constants.ts';

import type { UserBadgeProps } from '@plugins-identity/components/UserBadge.tsx';

export default function DrawerFooter(props: UserBadgeProps) {
	return (
		<Authorize unauthorized={(
			<>
				<LinkButton
					className='d-block mb-2'
					variant='outlined'
					color='secondary'
					href={urls.account.register.index}
				>
					Register
				</LinkButton>
				<LinkButton
					className='d-block'
					color='primary'
					href={urls.account.login}
				>
					Log in
				</LinkButton>
			</>
		)}>
			<UserBadge {...props}/>
		</Authorize>
	)
};
