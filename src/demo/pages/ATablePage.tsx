import { useState } from 'react';
import { ATable, ATableColumn } from '../../components/ATable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  salary?: number;
}

const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', salary: 85000 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', salary: 65000 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', salary: 60000 },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Manager', status: 'active', salary: 95000 },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'active', salary: 70000 },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active', salary: 90000 },
  { id: 7, name: 'Eve Davis', email: 'eve@example.com', role: 'User', status: 'inactive', salary: 62000 },
  { id: 8, name: 'Frank Miller', email: 'frank@example.com', role: 'Manager', status: 'active', salary: 92000 },
  { id: 9, name: 'Grace Lee', email: 'grace@example.com', role: 'User', status: 'active', salary: 68000 },
  { id: 10, name: 'Henry Wilson', email: 'henry@example.com', role: 'User', status: 'inactive', salary: 63000 },
  { id: 11, name: 'Ivy Chen', email: 'ivy@example.com', role: 'Admin', status: 'active', salary: 88000 },
  { id: 12, name: 'Jack Taylor', email: 'jack@example.com', role: 'User', status: 'active', salary: 67000 },
];

export function ATablePage() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [loadingRows, setLoadingRows] = useState<number[]>([]);
  const [columnLoadingDemo, setColumnLoadingDemo] = useState(false);

  // Simulate loading rows after action
  const handleRefreshRow = (rowIndex: number) => {
    setLoadingRows(prev => [...prev, rowIndex]);
    setTimeout(() => {
      setLoadingRows(prev => prev.filter(i => i !== rowIndex));
    }, 2000);
  };

  // Toggle column loading demo
  const toggleColumnLoading = () => {
    setColumnLoadingDemo(true);
    setTimeout(() => {
      setColumnLoadingDemo(false);
    }, 2000);
  };

  const userColumns: ATableColumn<User>[] = [
    { field: 'id', header: 'ID', sortable: true, width: '80px' },
    { field: 'name', header: 'Name', sortable: true, filterable: true },
    { field: 'email', header: 'Email', sortable: true, filterable: true },
    { field: 'role', header: 'Role', sortable: true, filterable: true, filterPlaceholder: 'Search role...' },
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      filterable: true,
      body: (rowData) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            rowData.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {rowData.status}
        </span>
      ),
    },
  ];

  const loadingDemoColumns: ATableColumn<User>[] = [
    { field: 'id', header: 'ID', sortable: true, width: '80px' },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email', sortable: true, loading: columnLoadingDemo },
    { field: 'role', header: 'Role', sortable: true },
    {
      field: 'salary',
      header: 'Salary',
      body: (rowData) => rowData.salary ? `$${rowData.salary.toLocaleString()}` : 'N/A',
    },
    {
      field: 'id',
      header: 'Actions',
      body: (rowData) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            const rowIndex = sampleUsers.findIndex(u => u.id === rowData.id);
            handleRefreshRow(rowIndex);
          }}
          className="px-3 py-1 text-xs bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Refresh
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">ATable Component</h1>
        <p className="text-slate-400">Dynamic data table with granular loading states</p>
      </div>

      {/* Loading States Demo */}
      <section id="table-loading" className="bg-slate-800 rounded-lg shadow-sm p-6 scroll-mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Granular Loading States</h2>
            <p className="text-sm text-slate-400 mt-1">
              Per-column, per-row, and per-cell loading support
            </p>
          </div>
          <button
            onClick={toggleColumnLoading}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Load Email Column
          </button>
        </div>
        <div className="bg-slate-900 rounded p-4 mb-4">
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• <strong>Column Loading:</strong> Click "Load Email Column" to see entire column loading</li>
            <li>• <strong>Row Loading:</strong> Click "Refresh" button to simulate loading for that row</li>
            <li>• <strong>Cell Loading:</strong> Individual cells can be marked as loading independently</li>
          </ul>
        </div>
        <ATable<User>
          data={sampleUsers}
          columns={loadingDemoColumns}
          loadingRows={loadingRows}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          striped
          hoverable
        />
      </section>

      {/* Client-Side Table */}
      <section id="table-client" className="bg-slate-800 rounded-lg shadow-sm p-6 scroll-mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Client-Side Table</h2>
        <p className="text-sm text-slate-400 mb-4">
          Pass data as an array for client-side rendering with built-in sorting and pagination
        </p>
        <ATable<User>
          data={sampleUsers}
          columns={userColumns}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          striped
          hoverable
        />
      </section>

      {/* Global Search & Column Filters */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Global Search & Column Filters</h2>
        <p className="text-sm text-slate-400 mb-4">
          Combine global search with per-column filters for powerful data filtering
        </p>
        <ATable<User>
          data={sampleUsers}
          columns={userColumns}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          globalSearch
          globalSearchPlaceholder="Search across all columns..."
          striped
          hoverable
        />
      </section>

      {/* Column Filters Only */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Column-Specific Filters</h2>
        <p className="text-sm text-slate-400 mb-4">
          Filter each column independently without global search
        </p>
        <ATable<User>
          data={sampleUsers}
          columns={userColumns}
          paginator
          rows={5}
          striped
          hoverable
        />
      </section>

      {/* Expandable Rows */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Expandable Rows</h2>
        <p className="text-sm text-slate-400 mb-4">
          Click the chevron icon to expand rows and show additional details in a drawer
        </p>
        <ATable<User>
          data={sampleUsers}
          columns={userColumns}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          rowExpansionTemplate={(user) => (
            <div className="grid grid-cols-2 gap-6 py-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">User Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-20">User ID:</span>
                    <span className="text-sm text-gray-900 font-medium">#{user.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-20">Full Name:</span>
                    <span className="text-sm text-gray-900">{user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-20">Email:</span>
                    <span className="text-sm text-gray-900">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-20">Role:</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'Manager' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Employment Info</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-24">Status:</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-24">Salary:</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      ${user.salary?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-24">Department:</span>
                    <span className="text-sm text-gray-900">Engineering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-24">Start Date:</span>
                    <span className="text-sm text-gray-900">Jan 2022</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          striped
          hoverable
        />
      </section>

      {/* Responsive Table - Stack Layout */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Responsive Table - Stack Layout</h2>
        <p className="text-sm text-slate-400 mb-4">
          On mobile devices (width &lt; 768px), columns stack vertically for better readability. Try resizing your browser!
        </p>
        <ATable<User>
          data={sampleUsers.slice(0, 6)}
          columns={userColumns}
          paginator
          rows={3}
          responsiveLayout="stack"
          striped
        />
      </section>

      {/* Responsive Table - Column Hiding */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Responsive Table - Hide Columns</h2>
        <p className="text-sm text-slate-400 mb-4">
          Some columns are hidden on mobile/tablet for a cleaner view. Email hidden on mobile, Role hidden on tablet.
        </p>
        <ATable<User>
          data={sampleUsers}
          columns={[
            { field: 'id', header: 'ID', width: '80px' },
            { field: 'name', header: 'Name' },
            { field: 'email', header: 'Email', hideOnMobile: true },
            { field: 'role', header: 'Role', hideOnTablet: true },
            { 
              field: 'status', 
              header: 'Status',
              body: (rowData) => (
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  rowData.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {rowData.status}
                </span>
              ),
            },
          ]}
          paginator
          rows={5}
          responsiveLayout="scroll"
          striped
          hoverable
        />
      </section>

      {/* Scrollable Table with Fixed Height */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Scrollable Table with Fixed Height</h2>
        <p className="text-sm text-gray-600 mb-4">
          Use <code className="px-2 py-1 bg-gray-100 rounded text-sm">scrollHeight</code> prop to create a scrollable table with sticky headers
        </p>
        <ATable<User>
          data={sampleUsers}
          columns={userColumns}
          scrollHeight="300px"
          striped
          hoverable
        />
      </section>

      {/* Table with Max Height */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Table with Maximum Height</h2>
        <p className="text-sm text-gray-600 mb-4">
          Use <code className="px-2 py-1 bg-gray-100 rounded text-sm">maxHeight</code> prop - table grows until reaching the limit
        </p>
        <ATable<User>
          data={sampleUsers.slice(0, 4)}
          columns={userColumns}
          maxHeight="400px"
          striped
          hoverable
        />
      </section>
      {/* Selectable Table */}
      <section id="table-selectable" className="bg-slate-800 rounded-lg shadow-sm p-6 scroll-mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Selectable Table</h2>
        <div className="mb-4">
          <p className="text-sm text-slate-400 mb-2">
            Enable row selection with checkboxes and handle selection changes
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-md text-sm font-medium">
            Selected: {selectedUsers.length} user(s)
          </div>
        </div>
        <ATable<User>
          data={sampleUsers}
          columns={userColumns}
          paginator
          rows={5}
          selectable
          selection={selectedUsers}
          onSelectionChange={setSelectedUsers}
          onRowClick={(user) => console.log('Clicked:', user)}
        />
      </section>

      {/* Server-Side Table Example */}
      <section id="table-server" className="bg-slate-800 rounded-lg shadow-sm p-6 scroll-mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Server-Side Table with Sorting</h2>
        <p className="text-sm text-slate-400 mb-4">
          Server-side mode with pagination and sorting. Click column headers to sort. 
          The table sends <code className="px-1.5 py-0.5 bg-slate-700 rounded text-xs">page</code>, 
          <code className="px-1.5 py-0.5 bg-slate-700 rounded text-xs mx-1">limit</code>, 
          <code className="px-1.5 py-0.5 bg-slate-700 rounded text-xs mx-1">sortBy</code>, and 
          <code className="px-1.5 py-0.5 bg-slate-700 rounded text-xs ml-1">sortOrder</code> parameters to the server.
        </p>
        <div className="bg-slate-900 rounded p-4 mb-4">
          <p className="text-xs text-slate-400 font-mono mb-2">Example API Request:</p>
          <code className="text-xs text-primary-400">
            GET /api/users?page=0&limit=5&sortBy=name&sortOrder=asc
          </code>
        </div>
        <ATable
          serverSide={{
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            dataTransform: (response) => response,
            totalRecordsTransform: (response) => response.length,
            // Custom params builder for server-side operations
            buildParams: (page, limit, sort) => ({
              _page: page + 1, // JSONPlaceholder uses 1-indexed pages
              _limit: limit,
              ...(sort?.order && {
                _sort: sort.field,
                _order: sort.order,
              }),
            }),
          }}
          columns={[
            { field: 'id', header: 'ID', sortable: true, width: '80px' },
            { field: 'name', header: 'Name', sortable: true },
            { field: 'email', header: 'Email', sortable: true },
            { field: 'phone', header: 'Phone' },
            {
              field: 'company',
              header: 'Company',
              body: (rowData: any) => rowData.company?.name || 'N/A',
            },
          ]}
          paginator
          rows={5}
          striped
        />
      </section>

      {/* Usage Examples */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6 text-white">Usage Examples</h2>
        
        {/* Basic Client-Side Usage */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">Basic Client-Side Table</h3>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-slate-300">
              <code>{`import { ATable, ATableColumn } from '@/components/ATable';

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: ATableColumn<User>[] = [
  { field: 'id', header: 'ID', sortable: true },
  { field: 'name', header: 'Name', sortable: true },
  { field: 'email', header: 'Email' },
];

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

<ATable
  data={data}
  columns={columns}
  paginator
  rows={10}
  striped
  hoverable
/>`}</code>
            </pre>
          </div>
        </div>

        {/* Server-Side Usage */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">Server-Side Table with Sorting</h3>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-slate-300">
              <code>{`<ATable
  serverSide={{
    url: 'https://api.example.com/users',
    method: 'GET',
    headers: { Authorization: 'Bearer token' },
    dataTransform: (response) => response.data,
    totalRecordsTransform: (response) => response.total,
    buildParams: (page, limit, sort) => ({
      page: page + 1,
      limit: limit,
      sortBy: sort?.field,
      sortOrder: sort?.order,
    }),
  }}
  columns={columns}
  paginator
  rows={10}
/>`}</code>
            </pre>
          </div>
        </div>

        {/* Loading States Usage */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">Granular Loading States</h3>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-slate-300">
              <code>{`// Column Loading
                  const columns: ATableColumn<User>[] = [
                    { field: 'id', header: 'ID' },
                    { field: 'email', header: 'Email', loading: true }, // Column loading
                  ];

                  // Row Loading
                  const [loadingRows, setLoadingRows] = useState<number[]>([0, 2]);

                  <ATable
                    data={data}
                    columns={columns}
                    loadingRows={loadingRows} // Rows 0 and 2 will show skeleton
                  />

                  // Cell Loading
                  <ATable
                    data={data}
                    columns={columns}
                    isCellLoading={(rowData, column, rowIndex, colIndex) => {
                      return rowData.id === 5 && column.field === 'email';
                    }}
                  />`}</code>
            </pre>
          </div>
        </div>

        {/* Custom Cell Rendering */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">Custom Cell Rendering</h3>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-slate-300">
              <code>{`const columns: ATableColumn<User>[] = [
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  {
    field: 'status',
    header: 'Status',
    body: (rowData) => (
      <span className={\`px-2 py-1 rounded-full \${
        rowData.status === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }\`}>
        {rowData.status}
      </span>
    ),
  },
  {
    field: 'actions',
    header: 'Actions',
    body: (rowData) => (
      <button onClick={() => handleEdit(rowData.id)}>
        Edit
      </button>
    ),
  },
];`}</code>
            </pre>
          </div>
        </div>

        {/* Row Selection Usage */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Row Selection</h3>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-slate-300">
              <code>{`const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
                  <ATable
                    data={data}
                    columns={columns}
                    selectable
                    selection={selectedUsers}
                    onSelectionChange={setSelectedUsers}
                    onRowClick={(user) => console.log('Clicked:', user)}
                  />`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Props Documentation */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6 text-white">Props Reference</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Prop</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Default</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">data</td>
                <td className="px-4 py-3 text-sm text-slate-300">T[]</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Array of data for client-side mode</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">serverSide</td>
                <td className="px-4 py-3 text-sm text-slate-300">ServerSideConfig</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Configuration for server-side mode</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">columns</td>
                <td className="px-4 py-3 text-sm text-slate-300">ATableColumn[]</td>
                <td className="px-4 py-3 text-sm text-slate-400">required</td>
                <td className="px-4 py-3 text-sm text-slate-300">Column definitions</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">paginator</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">false</td>
                <td className="px-4 py-3 text-sm text-slate-300">Enable pagination</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">rows</td>
                <td className="px-4 py-3 text-sm text-slate-300">number</td>
                <td className="px-4 py-3 text-sm text-slate-400">10</td>
                <td className="px-4 py-3 text-sm text-slate-300">Number of rows per page</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">loading</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">false</td>
                <td className="px-4 py-3 text-sm text-slate-300">Show loading state for entire table</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">loadingRows</td>
                <td className="px-4 py-3 text-sm text-slate-300">number[]</td>
                <td className="px-4 py-3 text-sm text-slate-400">[]</td>
                <td className="px-4 py-3 text-sm text-slate-300">Array of row indices that are loading</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">isCellLoading</td>
                <td className="px-4 py-3 text-sm text-slate-300">function</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Callback to determine if specific cell is loading</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">globalSearch</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">false</td>
                <td className="px-4 py-3 text-sm text-slate-300">Enable global search across all columns</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">filterable</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">false</td>
                <td className="px-4 py-3 text-sm text-slate-300">Enable per-column filtering (set on column)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">scrollHeight</td>
                <td className="px-4 py-3 text-sm text-slate-300">string</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Fixed height with scrollable body and sticky headers</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">maxHeight</td>
                <td className="px-4 py-3 text-sm text-slate-300">string</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Maximum height before table becomes scrollable</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">selectable</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">false</td>
                <td className="px-4 py-3 text-sm text-slate-300">Enable row selection with checkboxes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">rowExpansionTemplate</td>
                <td className="px-4 py-3 text-sm text-slate-300">function</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Template function for expanded row content</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">expandedRows</td>
                <td className="px-4 py-3 text-sm text-slate-300">number[]</td>
                <td className="px-4 py-3 text-sm text-slate-400">[]</td>
                <td className="px-4 py-3 text-sm text-slate-300">Array of expanded row indices (controlled mode)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">onRowToggle</td>
                <td className="px-4 py-3 text-sm text-slate-300">function</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Callback when row expansion changes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">striped</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">false</td>
                <td className="px-4 py-3 text-sm text-slate-300">Alternate row background colors</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">hoverable</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">true</td>
                <td className="px-4 py-3 text-sm text-slate-300">Enable hover effect on rows</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Features Overview */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-white">Features Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Granular Loading</h3>
              <p className="text-sm text-slate-400">Per-column, per-row, and per-cell loading states</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Client & Server-Side</h3>
              <p className="text-sm text-slate-400">Supports both rendering modes seamlessly</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Sorting</h3>
              <p className="text-sm text-slate-400">Click column headers to sort data</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Global & Column Search</h3>
              <p className="text-sm text-slate-400">Global search and per-column filtering</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Scrollable Height</h3>
              <p className="text-sm text-slate-400">Fixed or max height with sticky headers</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Row Selection</h3>
              <p className="text-sm text-slate-400">Single or multiple row selection support</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Expandable Rows</h3>
              <p className="text-sm text-slate-400">Expand rows to show detailed information in a drawer</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Mobile Responsive</h3>
              <p className="text-sm text-slate-400">Stack layout for mobile, column hiding, touch-friendly</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Custom Rendering</h3>
              <p className="text-sm text-slate-400">Use body function for custom cell content</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
