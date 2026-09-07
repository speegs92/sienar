import { useEffect, useState } from 'react';
import { appendSearchParams, sendRequest } from '@sienar/utils';
import { tableContext } from './shared.ts';
import { TableHead } from './TableHead.tsx';
import { TablePagination } from './TablePagination.tsx';

import type { TableHTMLAttributes } from 'react';
import type { Filter, PagedQuery } from '@sienar/utils';
import type { TableColumnDefinition } from './shared.ts';


export interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
	/**
	 * The API endpoint used to query results
	 */
	endpoint: string;

	/**
	 * The columns the table should render
	 */
	columns: TableColumnDefinition<T>[];
}

export function Table<T extends Record<string, any>>(props: TableProps<T>) {
	const {
		endpoint,
		columns,
		...rest
	} = props;

	const [searchTerm, setSearchTerm] = useState<string|undefined>();
	const [sortName, setSortName] = useState<string|undefined>();
	const [sortDescending, setSortDescending] = useState(false);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [isLoading, setIsLoading] = useState(false);
	const [rows, setRows] = useState<T[]>([]);
	const [totalCount, setTotalCount] = useState(0);

	const handleSearchTermChanged = (newSearchTerm: string|undefined) => {
		setSearchTerm(newSearchTerm);
	};

	const handleSortNameChanged = (newSortName: string|undefined) => {
		setSortName(newSortName);
	};

	const handleSortDescendingChanged = (newSortDescending: boolean) => {
		setSortDescending(newSortDescending);
	};

	const handlePageChanged = (newPage: number) => {
		setPage(newPage);
	};

	const handlePageSizeChanged = (newPageSize: number) => {
		setPageSize(newPageSize);
	};

	const loadResults = async () => {
		const filter: Filter = {
			searchTerm,
			pageSize,
			sortName,
			page,
			sortDescending
		};

		setIsLoading(true);
		const result = await sendRequest<PagedQuery<T>>(
			appendSearchParams(endpoint, filter),
			'GET'
		);

		if (!result.wasSuccessful || !result.result) {
			setRows([]);
			setTotalCount(0);
			setIsLoading(false);
			return;
		}

		setRows(result.result.items);
		setTotalCount(result.result.totalCount);
		setIsLoading(false);
	};

	useEffect(() => {
		(async () => await loadResults())();
	}, [])

	return (
		<tableContext.Provider value={{
			searchTerm,
			setSearchTerm: handleSearchTermChanged,
			sortName,
			setSortName: handleSortNameChanged,
			sortDescending,
			setSortDescending: handleSortDescendingChanged,
			page,
			setPage: handlePageChanged,
			pageSize,
			setPageSize: handlePageSizeChanged,
			isLoading,
			setIsLoading,
			rowCount: rows.length,
			totalCount
		}}>
			<div className='table__container'>
				<table
					className='table__table'
					{...rest}
				>
					<thead>
						<tr>
							{columns.map(col => {
								const { renderer: _, ...tableHeadprops } = col;
								return (
									<TableHead
										key={col.name}
										{...tableHeadprops}
									/>
								);
							})}
						</tr>
					</thead>

					<tbody>
						{rows.map(row => (
							<tr>
								{columns.map(col => <td>{col.renderer ? col.renderer(row) : row[col.name]}</td>)}
							</tr>
						))}
					</tbody>
				</table>

				<TablePagination/>
			</div>
		</tableContext.Provider>
	);
}
