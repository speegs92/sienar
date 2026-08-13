import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthorizeRoute, getDateString, inject } from '@sienar/utils';
import { Icon } from '@sienar/ui';
import { GET_LOCKOUT_REASONS_SERVICE } from '@plugins-identity/services.ts';
import { ACCOUNT_LOCKED_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';
import type { AccountLockResult } from '@plugins-identity/types.ts';

/**
 * The content of the account locked page
 */
export const ACCOUNT_LOCKED_VIEW = Symbol() as InjectionKey<ReactNode>;

function AccountLocked() {
	const [ params ] = useSearchParams();
	const [ lockResult, setLockResult ] = useState<AccountLockResult|null>(null);

	useEffect(() => {
		(async function() {
			const userId = params.get('userId');
			const verificationCode = params.get('verificationCode');

			if (!userId || !verificationCode) return;

			const service = inject(GET_LOCKOUT_REASONS_SERVICE);
			const result = await service({ userId, verificationCode });

			if (!result.wasSuccessful || !result.result) return;

			setLockResult(result.result);
		})();
	}, []);

	if (!lockResult) {
		return <p>Loading lockout reasons...</p>;
	}

	return (
		<AuthorizeRoute mustBeLoggedOut>
			<h1>Account locked out</h1>

			{lockResult.lockoutEnd && (
				<p>
					Your account is currently locked until <strong>{getDateString(lockResult.lockoutEnd)}</strong>
				</p>
			)}

			{!lockResult.lockoutEnd && (
				<p>
					Your account is locked <strong>permanently</strong>.
				</p>
			)}

			<p>
				Your account is locked for the following reasons:
			</p>

			<ul>
				{lockResult.lockoutReasons.map(r => (
					<li key={r.id}>
						<Icon icon='label'/>
						{r.reason}
					</li>
				))}
			</ul>
		</AuthorizeRoute>
	)
}

const module: ViewModule = {
	path: urls.account.locked,
	layout: ACCOUNT_LOCKED_LAYOUT,
	view: <AccountLocked/>,
	viewKey: ACCOUNT_LOCKED_VIEW
};

export default module;
