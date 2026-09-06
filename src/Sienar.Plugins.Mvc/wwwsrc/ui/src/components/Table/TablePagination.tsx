import { useContext } from 'react';
import { tableContext as tc } from './shared.ts';

export function TablePagination() {
	const tableContext = useContext(tc);

	const startCount = tableContext.pageSize * (tableContext.page - 1) + tableContext.rowCount > 0 ? 1 : 0;
	const endCount = startCount + tableContext.rowCount - 1;

	return (
		<section className='table__pagination'>
			<div className='table__pagination-total-count'>
				{startCount} - {endCount} of {tableContext.totalCount}
			</div>

			<nav className='table__pagination-controls'>
				
			</nav>
		</section>
	);
}
