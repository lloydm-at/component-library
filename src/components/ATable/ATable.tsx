import React, { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { ATableProps, ATableColumn, SortMeta, SortOrder, FilterMeta } from './ATable.types';

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg
    className={clsx(
      'w-5 h-5 transition-transform duration-200',
      expanded && 'transform rotate-90'
    )}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const SortIcon = ({ order }: { order: SortOrder }) => (
  <span className="inline-flex flex-col ml-1">
    <svg
      className={clsx('w-3 h-3 -mb-1', order === 'asc' ? 'text-primary-600' : 'text-gray-400')}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" />
    </svg>
    <svg
      className={clsx('w-3 h-3', order === 'desc' ? 'text-primary-600' : 'text-gray-400')}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" />
    </svg>
  </span>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <svg
      className="animate-spin h-8 w-8 text-primary-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </div>
);

const CellSkeleton = ({ width = '100%' }: { width?: string }) => (
  <div className="animate-pulse">
    <div 
      className="h-4 bg-gray-200 rounded"
      style={{ width }}
    />
  </div>
);

const RowSkeleton = ({ columnCount }: { columnCount: number }) => (
  <>
    {Array.from({ length: columnCount }).map((_, index) => (
      <td key={index} className="px-6 py-4">
        <CellSkeleton width={`${60 + Math.random() * 40}%`} />
      </td>
    ))}
  </>
);

export function ATable<T = any>({
  data,
  serverSide,
  columns,
  paginator = false,
  rows = 10,
  rowsPerPageOptions = [10, 25, 50, 100],
  loading: externalLoading,
  loadingRows = [],
  isRowLoading,
  isCellLoading,
  globalSearch = false,
  globalSearchPlaceholder = 'Search...',
  globalSearchValue,
  columnFilters: externalColumnFilters,
  onFilter,
  selectable = false,
  selection = [],
  onSelectionChange,
  onRowClick,
  emptyMessage = 'No data available',
  className,
  scrollHeight,
  maxHeight,
  striped = false,
  hoverable = true,
  sortMode: _sortMode = 'single', // Prefixed with _ to indicate intentionally unused
  sortField,
  sortOrder,
  onSort,
  rowExpansionTemplate,
  expandedRows: externalExpandedRows,
  onRowToggle,
  responsiveLayout = 'scroll',
  breakpoint = 768,
}: ATableProps<T>) {
  const [internalData, setInternalData] = useState<T[]>([]);
  const [internalLoading, setInternalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(rows);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sortMeta, setSortMeta] = useState<SortMeta>({
    field: sortField || '',
    order: sortOrder || null,
  });
  const [globalSearchQuery, setGlobalSearchQuery] = useState(globalSearchValue || '');
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(externalColumnFilters || {});
  const [expandedRowIndices, setExpandedRowIndices] = useState<number[]>(externalExpandedRows || []);
  const [isMobile, setIsMobile] = useState(false);

  const isServerSide = !!serverSide;
  const isLoading = externalLoading || internalLoading;
  const hasExpansion = !!rowExpansionTemplate;

  // Use controlled expansion if provided
  const currentExpandedRows = externalExpandedRows !== undefined ? externalExpandedRows : expandedRowIndices;
  
  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);
  
  // Filter visible columns based on screen size
  const visibleColumns = useMemo(() => {
    if (responsiveLayout !== 'scroll') return columns;
    
    return columns.filter(col => {
      if (isMobile && col.hideOnMobile) return false;
      if (window.innerWidth < 1024 && col.hideOnTablet) return false;
      return true;
    });
  }, [columns, isMobile, responsiveLayout]);

  // Build filter metadata
  const filterMeta: FilterMeta = {
    global: globalSearchQuery,
    columns: columnFilters,
  };

  // Fetch data from server
  const fetchServerData = async () => {
    if (!serverSide) return;

    setInternalLoading(true);
    setError(null);

    try {
      const { url, method = 'GET', headers = {}, dataTransform, totalRecordsTransform, buildParams } = serverSide;

      let fetchUrl = url;
      let fetchOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };

      // Build query params
      const params = buildParams
        ? buildParams(currentPage, pageSize, sortMeta.order ? sortMeta : undefined, filterMeta)
        : {
            page: currentPage,
            limit: pageSize,
            ...(sortMeta.order && { sortBy: sortMeta.field, sortOrder: sortMeta.order }),
            ...(filterMeta.global && { search: filterMeta.global }),
            ...(Object.keys(filterMeta.columns || {}).length > 0 && { filters: JSON.stringify(filterMeta.columns) }),
          };

      if (method === 'GET') {
        const queryString = new URLSearchParams(
          Object.entries(params).reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          }, {} as Record<string, string>)
        ).toString();
        fetchUrl = `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
      } else {
        fetchOptions.body = JSON.stringify(params);
      }

      const response = await fetch(fetchUrl, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      const tableData = dataTransform ? dataTransform(result) : result.data || result;
      const total = totalRecordsTransform ? totalRecordsTransform(result) : result.total || tableData.length;

      setInternalData(tableData);
      setTotalRecords(total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setInternalData([]);
    } finally {
      setInternalLoading(false);
    }
  };

  // Effect for server-side data fetching
  useEffect(() => {
    if (isServerSide) {
      fetchServerData();
    }
  }, [currentPage, pageSize, sortMeta, filterMeta.global, filterMeta.columns]);

  // Effect for client-side data
  useEffect(() => {
    if (!isServerSide && data) {
      setInternalData(data);
      setTotalRecords(data.length);
    }
  }, [data, isServerSide]);

  // Client-side filtering
  const filteredData = useMemo(() => {
    if (isServerSide) return internalData;

    let result = [...internalData];

    // Apply global search
    if (globalSearchQuery) {
      const searchLower = globalSearchQuery.toLowerCase();
      result = result.filter((row) => {
        return columns.some((column) => {
          const value = (row as any)[column.field];
          return value != null && String(value).toLowerCase().includes(searchLower);
        });
      });
    }

    // Apply column-specific filters
    Object.entries(columnFilters).forEach(([field, filterValue]) => {
      if (filterValue) {
        const filterLower = filterValue.toLowerCase();
        result = result.filter((row) => {
          const value = (row as any)[field];
          return value != null && String(value).toLowerCase().includes(filterLower);
        });
      }
    });

    return result;
  }, [internalData, globalSearchQuery, columnFilters, columns, isServerSide]);

  // Client-side sorting
  const sortedData = useMemo(() => {
    if (isServerSide || !sortMeta.order) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = (a as any)[sortMeta.field];
      const bValue = (b as any)[sortMeta.field];

      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortMeta.order === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortMeta, isServerSide]);

  // Update total records for filtered data
  useEffect(() => {
    if (!isServerSide) {
      setTotalRecords(filteredData.length);
    }
  }, [filteredData, isServerSide]);

  // Client-side pagination
  const paginatedData = useMemo(() => {
    if (isServerSide || !paginator) return sortedData;

    const start = currentPage * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, pageSize, paginator, isServerSide]);

  const displayData = paginator ? paginatedData : sortedData;

  // Handle sort
  const handleSort = (column: ATableColumn<T>) => {
    if (!column.sortable) return;

    const field = String(column.field);
    let newOrder: SortOrder = 'asc';

    if (sortMeta.field === field) {
      if (sortMeta.order === 'asc') newOrder = 'desc';
      else if (sortMeta.order === 'desc') newOrder = null;
    }

    const newSortMeta = { field, order: newOrder };
    setSortMeta(newSortMeta);
    
    if (onSort) {
      onSort(newSortMeta);
    }
  };

  // Handle global search
  const handleGlobalSearch = (value: string) => {
    setGlobalSearchQuery(value);
    setCurrentPage(0); // Reset to first page
    if (onFilter) {
      onFilter({ global: value, columns: columnFilters });
    }
  };

  // Handle column filter
  const handleColumnFilter = (field: string, value: string) => {
    const newFilters = { ...columnFilters, [field]: value };
    setColumnFilters(newFilters);
    setCurrentPage(0); // Reset to first page
    if (onFilter) {
      onFilter({ global: globalSearchQuery, columns: newFilters });
    }
  };

  // Handle row expansion toggle
  const toggleRowExpansion = (rowIndex: number) => {
    const newExpandedRows = currentExpandedRows.includes(rowIndex)
      ? currentExpandedRows.filter(idx => idx !== rowIndex)
      : [...currentExpandedRows, rowIndex];
    
    if (externalExpandedRows === undefined) {
      setExpandedRowIndices(newExpandedRows);
    }
    
    if (onRowToggle) {
      onRowToggle(newExpandedRows);
    }
  };

  // Handle row selection
  const handleRowSelect = (rowData: T) => {
    if (!selectable || !onSelectionChange) return;

    const isSelected = selection.some((item) => item === rowData);
    const newSelection = isSelected
      ? selection.filter((item) => item !== rowData)
      : [...selection, rowData];

    onSelectionChange(newSelection);
  };

  // Pagination controls
  const totalPages = Math.ceil(totalRecords / pageSize);
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(0, Math.min(newPage, totalPages - 1)));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(0);
  };

  return (
    <div className={clsx('w-full', className)}>
      {/* Global Search */}
      {globalSearch && (
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              value={globalSearchValue !== undefined ? globalSearchValue : globalSearchQuery}
              onChange={(e) => handleGlobalSearch(e.target.value)}
              placeholder={globalSearchPlaceholder}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}
      
      <div 
        className={clsx(
          "rounded-lg border border-gray-200 shadow-sm",
          responsiveLayout === 'scroll' && "overflow-x-auto"
        )}
        style={{ 
          maxHeight: maxHeight,
          ...(scrollHeight && { height: scrollHeight, display: 'flex', flexDirection: 'column' })
        }}
      >
        <div className={clsx(scrollHeight && 'flex-1 overflow-auto')}>
        {responsiveLayout === 'stack' && isMobile ? (
          // Mobile Stack Layout
          <div className="divide-y divide-gray-200">
            {isLoading ? (
              <div className="p-8">
                <LoadingSpinner />
              </div>
            ) : displayData.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {emptyMessage}
              </div>
            ) : (
              displayData.map((rowData, rowIndex) => {
                const isExpanded = currentExpandedRows.includes(rowIndex);
                const isSelected = selection.some((item) => item === rowData);
                
                return (
                  <div
                    key={rowIndex}
                    className={clsx(
                      'p-4',
                      striped && rowIndex % 2 === 1 && 'bg-gray-50',
                      isSelected && 'bg-primary-50'
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {hasExpansion && (
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => toggleRowExpansion(rowIndex)}
                          >
                            <ChevronIcon expanded={isExpanded} />
                          </button>
                        )}
                        {selectable && (
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded"
                            checked={isSelected}
                            onChange={() => handleRowSelect(rowData)}
                          />
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {visibleColumns.map((column, colIndex) => (
                        <div key={colIndex} className="flex justify-between items-start">
                          <span className="text-sm font-medium text-gray-500 w-1/3">
                            {column.header}:
                          </span>
                          <span className="text-sm text-gray-900 w-2/3 text-right">
                            {column.body
                              ? column.body(rowData, column)
                              : String((rowData as any)[column.field] ?? '')}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {hasExpansion && isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        {rowExpansionTemplate(rowData)}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        ) : (
          // Desktop Table Layout
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={clsx('bg-gray-50', scrollHeight && 'sticky top-0 z-10')}>
            <tr>
              {hasExpansion && (
                <th className="w-12 px-4 py-3 text-left"></th>
              )}
              {selectable && (
                <th className="w-12 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    checked={selection.length === displayData.length && displayData.length > 0}
                    onChange={(e) => {
                      if (onSelectionChange) {
                        onSelectionChange(e.target.checked ? [...displayData] : []);
                      }
                    }}
                  />
                </th>
              )}
              {visibleColumns.map((column, index) => (
                <th
                  key={index}
                  className={clsx(
                    'px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.sortable && 'cursor-pointer select-none hover:bg-gray-100',
                    column.headerClassName
                  )}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable && (
                      <SortIcon order={sortMeta.field === column.field ? sortMeta.order : null} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
            {/* Column Filters Row */}
            {visibleColumns.some((col) => col.filterable) && (
              <tr>
                {hasExpansion && <th className="w-12 px-4 py-2"></th>}
                {selectable && <th className="w-12 px-4 py-2"></th>}
                {visibleColumns.map((column, index) => (
                  <th key={index} className="px-6 py-2">
                    {column.filterable && (
                      <input
                        type="text"
                        value={
                          externalColumnFilters?.[String(column.field)] !== undefined
                            ? externalColumnFilters[String(column.field)]
                            : columnFilters[String(column.field)] || ''
                        }
                        onChange={(e) => handleColumnFilter(String(column.field), e.target.value)}
                        placeholder={column.filterPlaceholder || `Filter ${column.header}...`}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={visibleColumns.length + (selectable ? 1 : 0) + (hasExpansion ? 1 : 0)}>
                  <LoadingSpinner />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={visibleColumns.length + (selectable ? 1 : 0) + (hasExpansion ? 1 : 0)}
                  className="px-6 py-12 text-center text-red-600"
                >
                  Error: {error}
                </td>
              </tr>
            ) : displayData.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length + (selectable ? 1 : 0) + (hasExpansion ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              displayData.map((rowData, rowIndex) => {
                const isSelected = selection.some((item) => item === rowData);
                const rowLoading = isRowLoading?.(rowData, rowIndex) || loadingRows.includes(rowIndex);
                const isExpanded = currentExpandedRows.includes(rowIndex);
                
                return (
                  <React.Fragment key={rowIndex}>
                    <tr
                      className={clsx(
                        striped && rowIndex % 2 === 1 && 'bg-gray-50',
                        hoverable && 'hover:bg-gray-100',
                        onRowClick && 'cursor-pointer',
                        isSelected && 'bg-primary-50'
                      )}
                      onClick={() => onRowClick && onRowClick(rowData)}
                    >
                      {hasExpansion && (
                        <td className="w-12 px-4 py-4">
                          <button
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRowExpansion(rowIndex);
                            }}
                          >
                            <ChevronIcon expanded={isExpanded} />
                          </button>
                        </td>
                      )}
                      {selectable && (
                      <td className="w-12 px-4 py-4">
                        {rowLoading ? (
                          <CellSkeleton width="16px" />
                        ) : (
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleRowSelect(rowData);
                            }}
                          />
                        )}
                      </td>
                    )}
                    {rowLoading ? (
                      <RowSkeleton columnCount={visibleColumns.length} />
                    ) : (
                      visibleColumns.map((column, colIndex) => {
                        const columnLoading = column.loading;
                        const cellLoading = isCellLoading?.(rowData, column, rowIndex, colIndex);
                        const showLoading = columnLoading || cellLoading;
                        
                        return (
                          <td
                            key={colIndex}
                            className={clsx(
                              'px-6 py-4 text-sm text-gray-900',
                              column.align === 'center' && 'text-center',
                              column.align === 'right' && 'text-right',
                              column.className
                            )}
                          >
                            {showLoading ? (
                              <CellSkeleton />
                            ) : column.body ? (
                              column.body(rowData, column)
                            ) : (
                              String((rowData as any)[column.field] ?? '')
                            )}
                          </td>
                        );
                      })
                    )}
                  </tr>
                  {/* Expansion Row */}
                  {hasExpansion && isExpanded && (
                    <tr>
                      <td 
                        colSpan={visibleColumns.length + (selectable ? 1 : 0) + 1}
                        className="px-6 py-4 bg-gray-50 border-t border-gray-200"
                      >
                          <div className="animate-fadeIn padding-4">
                          {rowExpansionTemplate(rowData)}
                        </div>
                      </td>
                    </tr>
                  )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
        )}
        </div>
      </div>

      {paginator && !isLoading && displayData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-white border-t border-gray-200 rounded-b-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 hidden sm:inline">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-700 ml-2 sm:ml-4">
              {currentPage * pageSize + 1}-{Math.min((currentPage + 1) * pageSize, totalRecords)} of{' '}
              {totalRecords}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => handlePageChange(0)}
              disabled={!canGoPrevious}
              className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="First page"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!canGoPrevious}
              className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-700">
              <span className="hidden sm:inline">Page </span>{currentPage + 1} <span className="hidden sm:inline">of {totalPages}</span>
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!canGoNext}
              className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => handlePageChange(totalPages - 1)}
              disabled={!canGoNext}
              className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Last page"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
