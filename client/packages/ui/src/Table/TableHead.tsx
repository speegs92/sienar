import { useContext, useEffect, useState } from 'react';
import { tableContext as tc } from './shared.ts';

import type { TableColumnDefinition } from './shared.ts';

/**
 * The props of the table head component
 */
export interface TableHeadProps extends Omit<TableColumnDefinition<any>, 'renderer'>{}

export function TableHead(props: TableHeadProps) {
	const {
		name,
		displayName,
		sortable,
		...rest
	} = props;

	const tableContext = useContext(tc);
	const [showSortIcon, setShowSortIcon] = useState(false);

	useEffect(() => {
		setShowSortIcon(tableContext.sortName === name);
	}, [tableContext.sortName])

	const handleSort = () => {
		if (!sortable) {
			return;
		}

		if (tableContext.sortName === name) {
			tableContext.setSortDescending(!tableContext.sortDescending);
		} else {
			tableContext.setSortName(name);
			tableContext.setSortDescending(false);
		}
	};

	const handleMouseEnter = () => {
		if (tableContext.sortName !== name) {
			setShowSortIcon(true);
		}
	}

	const handleMouseLeave = () => {
		if (tableContext.sortName !== name) {
			setShowSortIcon(false);
		}
	}

	const arrowPointsDown = tableContext.sortDescending && tableContext.sortName === name;

	return (
		<th
			onClick={handleSort}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...rest}
		>
			{displayName}
			{sortable && showSortIcon && (
				<i className={`bi bi-${arrowPointsDown ? 'chevron-down' : 'chevron-up'}`}/>
			)}
		</th>
	);
}
