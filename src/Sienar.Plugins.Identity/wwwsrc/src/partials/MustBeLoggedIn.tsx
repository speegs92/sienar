import { Link } from 'react-router-dom';
import { urls } from '@plugins-identity/constants.ts';

export default function MustBeLoggedIn() {
	return (
		<>
			<h1>You must be logged in</h1>
			<p>
				You must be logged in to view this page. <Link to={`${urls.account.login}?returnUrl=${window.location.pathname}`}>Go to login page</Link>
			</p>
		</>
	);
}
