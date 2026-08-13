import { Outlet } from 'react-router-dom';
import DashboardShared from './DashboardShared.tsx';

export default function Dashboard() {
	return (
		<DashboardShared>
			<Outlet/>
		</DashboardShared>
	)
}