import { createContext } from 'react';
import type { ReactNode, ThHTMLAttributes } from 'react';

export const tableContext = createContext<TableContext>({
	searchTerm: '',
	setSearchTerm: () => ({}),
	sortName: '',
	setSortName: () => ({}),
	sortDescending: false,
	setSortDescending: () => ({}),
	page: 0,
	setPage: () => ({}),
	pageSize: 0,
	setPageSize: () => ({}),
	isLoading: false,
	setIsLoading: () => ({}),
	rowCount: 0,
	totalCount: 0
});

/**
 * The table data context
 */
export interface TableContext {
	/**
	 * The table's current search term
	 */
	searchTerm: string|undefined;

	/**
	 * Sets the table's new `searchTerm`
	 */
	setSearchTerm: (t: string|undefined) => void;

	/**
	 * The table's sort name
	 */
	sortName: string|undefined;

	/**
	 * Sets the table's new `sortName`
	 */
	setSortName: (n: string|undefined) => void;

	/**
	 * Whether the table is sorting its sort column in descending order
	 */
	sortDescending: boolean;

	/**
	 * Sets the table's new `sortDescending`
	 */
	setSortDescending: (d: boolean) => void;

	/**
	 * Whether the table is loading data
	 */
	isLoading: boolean;

	/**
	 * Sets the table's new `isLoading`
	 */
	setIsLoading: (l: boolean) => void;

	/**
	 * The table's current page
	 */
	page: number;

	/**
	 * Sets the table's new `page`
	 */
	setPage: (p: number) => void;

	/**
	 * The table's current page size
	 */
	pageSize: number;

	/**
	 * Sets the table's new `pageSize`
	 */
	setPageSize: (p: number) => void;

	/**
	 * The table's current number of loaded rows
	 */
	rowCount: number;

	/**
	 * The table's total number of rows
	 */
	totalCount: number;
}

/**
 * The data defining a table column
 */
export interface TableColumnDefinition<T> extends ThHTMLAttributes<HTMLTableCellElement> {
	/**
	 * The property name used to access the column's value
	 */
	name: string;

	/**
	 * The display name used in the column's header
	 */
	displayName: string;

	/**
	 * Whether the column is sortable
	 */
	sortable?: boolean;

	/**
	 * The column's cell renderer
	 */
	renderer?: (item: T) => ReactNode;
}
