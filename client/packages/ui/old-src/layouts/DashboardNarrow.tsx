import { Outlet } from 'react-router-dom';
import Narrow from '@ui/Narrow.tsx';
import DashboardShared from './DashboardShared.tsx';

export default function DashboardNarrow() {
	return (
		<DashboardShared>
			<Narrow>
				<Outlet/>
			</Narrow>
		</DashboardShared>
	)
}