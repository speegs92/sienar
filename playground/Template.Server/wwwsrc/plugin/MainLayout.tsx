import { Outlet } from 'react-router-dom';
import { Application } from '@sienar/ui';

export default function MainLayout() {
	return (
		<Application color='primary'>
			<Outlet/>
		</Application>
	)
}
