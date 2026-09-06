import { AUTH_MISSING_ROLES_PARTIAL, AUTH_MUST_BE_LOGGED_IN_PARTIAL, AUTH_MUST_BE_LOGGED_OUT_PARTIAL, DRAWER_FOOTER_PARTIAL, provide } from '@sienar/utils';
import DrawerFooter from '@plugins-identity/partials/DrawerFooter.tsx';
import MissingRoles from '@plugins-identity/partials/MissingRoles.tsx';
import MustBeLoggedIn from '@plugins-identity/partials/MustBeLoggedIn.tsx';
import MustBeLoggedOut from '@plugins-identity/partials/MustBeLoggedOut.tsx';

export function setupIdentityPartials() {
	provide(DRAWER_FOOTER_PARTIAL, <DrawerFooter/>, false);
	provide(AUTH_MISSING_ROLES_PARTIAL, <MissingRoles/>, false);
	provide(AUTH_MUST_BE_LOGGED_IN_PARTIAL, <MustBeLoggedIn/>, false);
	provide(AUTH_MUST_BE_LOGGED_OUT_PARTIAL, <MustBeLoggedOut/>, false);
}
