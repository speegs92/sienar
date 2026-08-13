import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Add from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import ContentCopy from '@mui/icons-material/ContentCopy';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import Search from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { inject, NOTIFIER, useRerender } from '@sienar/utils';
import ButtonLink from '@ui/links/ButtonLink.tsx';
import Card from '@ui/Card.tsx';
import ConfirmationDialog from './ConfirmationDialog.tsx';
import IconButtonLink from '@ui/links/IconButtonLink.tsx';

import type { ForwardedRef, ForwardRefRenderFunction, ReactNode } from 'react';
import type { GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid';
import type { CrudService, EntityBase, Filter, InjectionKey } from '@sienar/utils';
import type { Color } from '@ui/theme.ts';

export type TableProps<T extends EntityBase> = {
	/**
	 * The title of the table
	 */
	title: string

	/**
	 * The name of the entity type. Should essentially be a human-friendly version of the backing entity name on the server.
	 */
	entityTypeName: string

	/**
	 * The service key of the {@link CrudService} that is used to interact with the entities displayed in the table
	 */
	serviceKey: InjectionKey<CrudService<T>>

	/**
	 * Generates the name of an entity for displaying to the user in the delete forms
	 *
	 * @param item The item representing the current row of the table
	 */
	generateEntityName?: (item: T|null|undefined) => string|null|undefined

	/**
	 * The color of the table header and controls
	 */
	color?: Color

	/**
	 * Whether to hide the search bar at the top of the table
	 */
	hideSearch?: boolean

	/**
	 * The columns to render
	 */
	columns: GridColDef[]

	/**
	 * Whether to hide the action button in the upper right corner of the table
	 */
	hideActionButton?: boolean

	/**
	 * Whether to hide the actions that can be performed on an entity in the table
	 */
	hideActions?: boolean

	/**
	 * Whether to hide the copy ID action in the actions menu
	 */
	hideCopy?: boolean

	/**
	 * Whether to hide the edit button in the actions menu
	 */
	hideEdit?: boolean

	/**
	 * Whether to hide the delete button in the actions menu
	 */
	hideDelete?: false

	/**
	 * The width of the action column in pixels
	 */
	actionsColumnWidth?: number,

	/**
	 * A render function that can render a custom action button in the upper right corner of the table. If this renderer is present, its result replaces the default action button.
	 */
	actionButtonRenderer?: () => ReactNode

	/**
	 * A render function that can render items in the acttion menu of the table. This render function renders items <em>in addition to</em> the edit and delete buttons rendered by default. If you want to create your own edit or delete buttons with customized functionality, use the <code>hideEdit</code> and/or <code>hideDelete</code> props and add your custom buttons to this render function.
	 *
	 * @param item The item representing the current row of the table
	 */
	actionMenuRenderer?: (item: T) => ReactNode
}

export type TableHandle = {
	/**
	 * Forces the table to reload its data internally
	 */
	reloadData: () => void
}

const Table: ForwardRefRenderFunction<TableHandle, TableProps<any>> = function Table<T extends EntityBase>(props: TableProps<T>, ref: ForwardedRef<TableHandle>) {
	const {
		title,
		entityTypeName,
		serviceKey,
		color,
		hideSearch = false,
		columns,
		hideActionButton = false,
		hideActions = false,
		hideCopy = false,
		hideEdit = false,
		hideDelete = false,
		actionsColumnWidth = 170,
		generateEntityName,
		actionButtonRenderer,
		actionMenuRenderer
	} = props;

	const service = inject(serviceKey);

	const [ searchTerm, setSearchTerm ] = useState('');
	const [ page, setPage ] = useState(1);
	const [ pageSize, setPageSize ] = useState(5);
	const [ sortName, setSortName ] = useState('');
	const [ sortDescending, setSortDescending ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ rows, setRows ] = useState<T[]>([]);
	const [ rowCount, setRowCount ] = useState(0);
	const [ modalOpen, setModalOpen ] = useState(false);
	const [ rerender, trigger ] = useRerender();
	const selectedItem = useRef<T|null>(null);
	const location = useLocation();

	useImperativeHandle(ref, () => ({ reloadData: () => rerender() }), []);

	// Set up data loading
	const loadResults = async () => {
		const filter: Filter = {
			searchTerm,
			pageSize,
			sortName,
			page,
			sortDescending
		};

		setIsLoading(true);
		const result = await service.readAll(filter);
		setRows(result.items);
		setRowCount(result.totalCount)
		setIsLoading(false);
	};

	const handleDeleteClicked = async (item: T) => {
		// await onDeleteButtonClick?.(item);
		setModalOpen(true);
		selectedItem.current = item;
	}

	// Set up columns
	if (!hideActions) {
		// Remove existing actions - we need this to be fresh
		const i = columns.findIndex(c => c.field === 'actions')
		if (i > -1) {
			columns.splice(i, 1);
		}

		columns.push({
			field: 'actions',
			headerName: 'Actions',
			sortable: false,
			width: actionsColumnWidth,
			valueGetter: (_params, row) => row,
			renderCell: ({ value }: GridRenderCellParams<any, T>) => {
				const entityName = generateEntityName?.(value) ?? entityTypeName;

				return (
					<>
						{actionMenuRenderer?.(value!)}
						{!hideCopy && (
							<IconButton
								color='primary'
								onClick={async () => {
									await navigator.clipboard.writeText(value!.id);
									const notifier = inject(NOTIFIER);
									notifier.success('ID copied to clipboard');
								}}
								title='Copy ID to clipboard'
							>
								<ContentCopy/>
							</IconButton>
						)}
						{!hideEdit && (
							<IconButtonLink
								to={`${location.pathname}/${value!.id}`}
								color='warning'
								title={`Edit ${entityName}`}
							>
								<Edit/>
							</IconButtonLink>
						)}
						{!hideDelete && (
							<IconButton
								color='error'
								onClick={() => handleDeleteClicked(value!)}
								title={`Delete ${entityName}`}
							>
								<DeleteForever/>
							</IconButton>
						)}
					</>
				)
			}
		});
	}

	// Search input adornments
	const searchIcon = (
		<Search
			color='inherit'
			sx={{ mr: 1 }}
			fontSize='medium'
		/>
	);

	const resetButton = searchTerm && (
		<IconButton
			size='small'
			color='inherit'
			onClick={() => setSearchTerm('')}
		>
			<Close fontSize='small'/>
		</IconButton>
	);

	// Action button
	const actionButtonContent = actionButtonRenderer
		? actionButtonRenderer()
		: (
			<ButtonLink
				to={`${location.pathname}/add`}
				color={color === undefined ? 'primary' : 'inherit'}
				sx={{ ml: 4 }}
				variant='outlined'
				startIcon={<Add/>}
			>
				Add new
			</ButtonLink>
		);

	// All filter variables should trigger an immediate table reload...
	useEffect(() => {loadResults()}, [pageSize, sortName, page, sortDescending, trigger]);

	// ...except searchTerm, which is typed and should be debounced
	useEffect(() => {
		const id = setTimeout(loadResults, 500);
		return () => clearTimeout(id);
	}, [searchTerm]);

	const handleSortModelChange = (sortModel: GridSortModel) => {
		if (sortModel.length < 1) {
			setSortName('');
			setSortDescending(false);
			return;
		}

		setSortName(sortModel[0].field);
		setSortDescending(sortModel[0].sort === 'desc');
	};

	return (
		<>
			<Card
				title={title}
				color={color}
				headerIcon={hideActionButton ? null : actionButtonContent}
			>
				<Box sx={{
					display: 'flex',
					justifyContent: 'end'
				}}>
					{!hideSearch && (
						<TextField
							color={color === 'inherit' || color === undefined ? 'primary' : color }
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							sx={{
								my: 2,
								minWidth: 300,
								maxWidth: '45%',
								'& .MuiInputBase-input': { p: 0	}
							}}
							slotProps={{
								input: {
									startAdornment: searchIcon,
									endAdornment: resetButton,
									sx: {
										p: 2,
										height: '40px'
									}
								}
							}}
						/>
					)}
				</Box>

				<div style={{
					display: 'flex',
					flexDirection: 'column',
					maxHeight: '75vh'
				}}>
					<DataGrid
						columns={columns}
						rows={rows}
						rowCount={rowCount}
						paginationModel={{ pageSize, page: page - 1  }}
						onPaginationModelChange={model => {
							setPage(model.page + 1);
							setPageSize(model.pageSize);
						}}
						pageSizeOptions={[5,10,25]}
						onSortModelChange={handleSortModelChange}
						loading={isLoading}
						paginationMode='server'
						sortingMode='server'
						disableColumnMenu
						disableRowSelectionOnClick
						sx={{
							'&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {outline: 'none'},
						}}
					/>
				</div>

				{!hideDelete && (
					<ConfirmationDialog
						title={`Delete ${entityTypeName}`}
						open={modalOpen}
						question={`Are you sure you want to delete ${generateEntityName?.(selectedItem.current) ?? ` ${entityTypeName} with ID ${selectedItem.current?.id}`}? This cannot be undone!`}
						confirmText="Yes, I'm sure"
						cancelText='No, keep it'
						color='error'
						onConfirm={async () => {
							// Shouldn't ever happen...but, you know...
							if (!selectedItem.current) return;

							await service.delete(selectedItem.current.id);
							setModalOpen(false);
							rerender();
						}}
						onCancel={() => setModalOpen(false)}
					/>
				)}
			</Card>
		</>
	);
}

export default forwardRef<TableHandle, TableProps<any>>(Table);