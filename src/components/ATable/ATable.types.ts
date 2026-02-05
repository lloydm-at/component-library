import { ReactNode } from 'react';

export interface ATableColumn<T = any> {
  /**
   * Unique identifier for the column
   */
  field: keyof T | string;
  
  /**
   * Display header text
   */
  header: string;
  
  /**
   * Custom render function for cell content
   */
  body?: (rowData: T, column: ATableColumn<T>) => ReactNode;
  
  /**
   * Whether the column is sortable
   * @default false
   */
  sortable?: boolean;
  
  /**
   * Custom CSS class for the column
   */
  className?: string;
  
  /**
   * Custom CSS class for the header
   */
  headerClassName?: string;
  
  /**
   * Column width (CSS value)
   */
  width?: string | number;
  height?: string | number;
  /**
   * Text alignment
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * Loading state for the entire column
   * When true, all cells in this column will show loading skeleton
   * @default false
   */
  loading?: boolean;
  
  /**
   * Enable filter/search for this specific column
   * @default false
   */
  filterable?: boolean;
  
  /**
   * Placeholder text for column filter input
   */
  filterPlaceholder?: string;
  
  /**
   * Hide column on mobile devices (screens < 768px)
   * @default false
   */
  hideOnMobile?: boolean;
  
  /**
   * Hide column on tablet devices (screens < 1024px)
   * @default false
   */
  hideOnTablet?: boolean;
}

export type SortOrder = 'asc' | 'desc' | null;

export interface SortMeta {
  field: string;
  order: SortOrder;
}

export interface FilterMeta {
  /**
   * Global search query (searches across all columns)
   */
  global?: string;
  
  /**
   * Column-specific filters
   * Key is the column field, value is the search term
   */
  columns?: Record<string, string>;
}

export interface PaginationConfig {
  /**
   * Current page (0-indexed)
   */
  page: number;
  
  /**
   * Number of rows per page
   */
  pageSize: number;
  
  /**
   * Total number of records
   */
  totalRecords: number;
}

export interface ServerSideConfig {
  /**
   * API endpoint URL
   */
  url: string;
  
  /**
   * HTTP method
   * @default 'GET'
   */
  method?: 'GET' | 'POST';
  
  /**
   * Additional headers
   */
  headers?: Record<string, string>;
  
  /**
   * Transform response to extract data
   * @default (response) => response.data
   */
  dataTransform?: (response: any) => any[];
  
  /**
   * Transform response to extract total records
   * @default (response) => response.total
   */
  totalRecordsTransform?: (response: any) => number;
  
  /**
   * Custom query params builder for server-side operations
   * @param page - Current page number (0-indexed)
   * @param pageSize - Number of rows to display per page
   * @param sort - Sort metadata containing field name and order (asc/desc)
   * @param filter - Filter metadata containing global search and column filters
   * @returns Object with query parameters to send to server
   * @example
   * buildParams: (page, pageSize, sort, filter) => ({
   *   page: page + 1, // Convert to 1-indexed
   *   limit: pageSize,
   *   sortBy: sort?.field,
   *   sortOrder: sort?.order,
   *   search: filter?.global,
   *   filters: filter?.columns
   * })
   */
  buildParams?: (page: number, pageSize: number, sort?: SortMeta, filter?: FilterMeta) => Record<string, any>;
}

export interface ATableProps<T = any> {
  /**
   * Array of data to display (client-side mode)
   */
  data?: T[];
  
  /**
   * Server-side configuration (server-side mode)
   */
  serverSide?: ServerSideConfig;
  
  /**
   * Column definitions
   */
  columns: ATableColumn<T>[];
  
  /**
   * Enable pagination
   * @default false
   */
  paginator?: boolean;
  
  /**
   * Rows per page
   * @default 10
   */
  rows?: number;
  
  /**
   * Row per page options
   * @default [10, 25, 50, 100]
   */
  rowsPerPageOptions?: number[];
  
  /**
   * Loading state for the entire table
   */
  loading?: boolean;
  
  /**
   * Array of row indices that are currently loading
   * Used for per-row loading state
   */
  loadingRows?: number[];
  
  /**
   * Callback to determine if a specific row is loading
   * Alternative to loadingRows array
   */
  isRowLoading?: (rowData: T, rowIndex: number) => boolean;
  
  /**
   * Callback to determine if a specific cell is loading
   * Used for per-cell loading state
   */
  isCellLoading?: (rowData: T, column: ATableColumn<T>, rowIndex: number, colIndex: number) => boolean;
  
  /**
   * Enable global search across all columns
   * @default false
   */
  globalSearch?: boolean;
  
  /**
   * Placeholder text for global search input
   * @default 'Search...'
   */
  globalSearchPlaceholder?: string;
  
  /**
   * Global search value (for controlled mode)
   */
  globalSearchValue?: string;
  
  /**
   * Column-specific filter values (for controlled mode)
   */
  columnFilters?: Record<string, string>;
  
  /**
   * Callback when search/filter values change
   * For server-side, this is where you can trigger API calls
   */
  onFilter?: (filter: FilterMeta) => void;
  
  /**
   * Enable row selection
   */
  selectable?: boolean;
  
  /**
   * Selected rows
   */
  selection?: T[];
  
  /**
   * Selection change callback
   */
  onSelectionChange?: (value: T[]) => void;
  
  /**
   * Row click callback
   */
  onRowClick?: (rowData: T) => void;
  
  /**
   * Empty message
   * @default 'No data available'
   */
  emptyMessage?: string;
  
  /**
   * Custom CSS class
   */
  className?: string;
  
  /**
   * Height of the scrollable table body (CSS value)
   * When set, the table body becomes scrollable with fixed headers
   * @example '400px', '50vh', 'calc(100vh - 200px)'
   */
  scrollHeight?: string;
  
  /**
   * Maximum height of the table (CSS value)
   * Table will grow up to this height before becoming scrollable
   * @example '600px', '80vh'
   */
  maxHeight?: string;
  
  /**
   * Enable striped rows
   * @default false
   */
  striped?: boolean;
  
  /**
   * Enable hover effect
   * @default true
   */
  hoverable?: boolean;
  
  /**
   * Sort mode
   * @default 'single'
   */
  sortMode?: 'single' | 'multiple';
  
  /**
   * Sort field (for controlled sorting)
   */
  sortField?: string;
  
  /**
   * Sort order (for controlled sorting)
   */
  sortOrder?: SortOrder;
  
  /**
   * Sort change callback
   */
  onSort?: (meta: SortMeta) => void;
  
  /**
   * Template for expanded row content
   * When provided, adds an expand/collapse icon column
   */
  rowExpansionTemplate?: (rowData: T) => ReactNode;
  
  /**
   * Array of expanded row indices (controlled mode)
   */
  expandedRows?: number[];
  
  /**
   * Callback when row expansion changes
   */
  onRowToggle?: (expandedRowIndices: number[]) => void;
  
  /**
   * Responsive layout mode
   * - 'scroll': Horizontal scroll on small screens (default)
   * - 'stack': Stack columns vertically on mobile
   * @default 'scroll'
   */
  responsiveLayout?: 'scroll' | 'stack';
  
  /**
   * Breakpoint for mobile stack layout (in pixels)
   * @default 768
   */
  breakpoint?: number;
}
