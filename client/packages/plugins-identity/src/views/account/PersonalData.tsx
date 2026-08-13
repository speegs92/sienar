import { Content, LinkButton } from '@sienar/ui';
import { AuthorizeRoute, useDocumentTitle } from '@sienar/utils';
import { PERSONAL_DATA_LAYOUT } from '@plugins-identity/layouts.ts';
import { urls } from '@plugins-identity/constants.ts';

import type { ReactNode } from 'react';
import type { ViewModule } from '@sienar/plugins-core';
import type { InjectionKey } from '@sienar/utils';

/**
 * The content of the personal data page
 */
export const PERSONAL_DATA_VIEW = Symbol() as InjectionKey<ReactNode>;

function PersonalData() {
	useDocumentTitle('Personal data');

	return (
		<AuthorizeRoute>
			<Content title='Personal data'>
				<p>
					By creating an account, you give us personal data that we store. You have the right to know what data we have. You also have the right to request that we delete your personal data.
				</p>

				<LinkButton
					href='/api/account/personal-data'
					target='_blank'
				>
					Download personal data
				</LinkButton>
			</Content>
		</AuthorizeRoute>
	);
}

const module: ViewModule = {
	path: urls.account.personalData,
	layout: PERSONAL_DATA_LAYOUT,
	view: <PersonalData/>,
	viewKey: PERSONAL_DATA_VIEW
};

export default module;
