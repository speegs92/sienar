import { ApiCrudService, provide, sendStatusServiceRequest } from '@sienar/utils';
import * as SERVICES from '@plugins-identity/services.ts';
import type { LockoutReason, Role, User } from '@plugins-identity/types.ts';

export function setupIdentityServices() {

	provide(
		SERVICES.USERS_SERVICE,
		new ApiCrudService<User>('/api/users'),
		false
	);

	provide(
		SERVICES.ROLES_SERVICE,
		new ApiCrudService<Role>('/api/roles'),
		false
	);

	provide(
		SERVICES.ADD_USER_TO_ROLE_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/roles',
			'POST',
			data,
			config
		),
		false
	);

	provide(
		SERVICES.REMOVE_USER_FROM_ROLE_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/roles',
			'DELETE',
			data,
			config
		),
		false
	);

	provide(
		SERVICES.LOCK_USER_ACCOUNT_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/lock',
			'PATCH',
			data,
			config
		),
		false
	);

	provide(
		SERVICES.UNLOCK_USER_ACCOUNT_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/lock',
			'DELETE',
			data,
			config
		),
		false
	);

	provide(
		SERVICES.MANUALLY_CONFIRM_USER_ACCOUNT_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/confirm',
			'PATCH',
			data,
			config
		),
		false
	);

	provide(
		SERVICES.LOCKOUT_REASONS_SERVICE,
		new ApiCrudService<LockoutReason>('/api/lockout-reasons'),
		false
	);
}
