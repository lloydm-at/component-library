# Avense Component Library

A reactive, mobile-first React component library with Tailwind CSS. Built for modern web applications with TypeScript support.

[![npm version](https://img.shields.io/npm/v/@avense/component-library.svg)](https://www.npmjs.com/package/@avense/component-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Tailwind CSS** - Beautiful, customizable styling
- ⚛️ **React 18** - Built with modern React
- 📦 **TypeScript** - Full type safety
- 🔄 **Reactive States** - Loading, disabled, and interactive states
- 🎯 **Accessible** - WCAG compliant components
- 📱 **Mobile-First** - Responsive design that works on all devices
- 🚀 **Tree-shakeable** - Only import what you need
- 💪 **Zero Dependencies** - Except peer dependencies (React & React-DOM)


### Peer Dependencies

Make sure you have these installed:

```bash
npm install tailwindcss @tailwindcss/vite
npm install react react-dom
```

### Tailwind CSS Setup

This library uses Tailwind CSS. Add to your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@avense/component-library/dist/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
    },
  },
  plugins: [],
};
```

## 🚀 Quick Start

```tsx
import { AButton, ATable } from '@avense/component-library';
import type { ATableColumn } from '@avense/component-library';

function App() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div>
      <AButton 
        label="Click Me" 
        variant="primary"
        loading={loading}
        onClick={handleClick}
      />
    </div>
  );
}
```

## 📚 Components

### AButton

Reactive button component with multiple variants and states.

**Props:**
- `label` - Button text
- `variant` - 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size` - 'sm' | 'md' | 'lg' | 'xl'
- `loading` - Show loading spinner
- `disabled` - Disable button
- `icon` - ReactNode icon
- `iconPosition` - 'left' | 'right'
- `fullWidth` - Take full width of container

**Example:**

```tsx
<AButton 
  label="Save" 
  variant="primary"
  size="lg"
  loading={isSaving}
  onClick={handleSave}
/>
```

### ATable

Powerful data table with sorting, filtering, pagination, and more.

**Features:**
- ✅ Client-side & server-side data
- ✅ Sorting (single column)
- ✅ Global search & column filtering
- ✅ Pagination
- ✅ Row selection
- ✅ Expandable rows
- ✅ Loading states (table, row, column, cell-level)
- ✅ Responsive (stack layout on mobile)
- ✅ Scrollable with sticky headers
- ✅ Custom cell rendering

**Basic Example:**

```tsx
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: ATableColumn<User>[] = [
  { field: 'id', header: 'ID', sortable: true },
  { field: 'name', header: 'Name', sortable: true, filterable: true },
  { field: 'email', header: 'Email', sortable: true },
  { 
    field: 'role', 
    header: 'Role',
    body: (user) => <span className="font-bold">{user.role}</span>
  },
];

function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <ATable
      data={users}
      columns={columns}
      paginator
      rows={10}
      rowsPerPageOptions={[10, 25, 50]}
      globalSearch
      striped
      hoverable
    />
  );
}
```

**Server-Side Example:**

```tsx
<ATable
  serverSide={{
    url: 'https://api.example.com/users',
    method: 'GET',
    buildParams: (page, limit, sort, filter) => ({
      page: page + 1,
      limit,
      sortBy: sort?.field,
      sortOrder: sort?.order,
      search: filter?.global,
    }),
  }}
  columns={columns}
  paginator
  rows={10}
/>
```

**Responsive Options:**

```tsx
// Stack layout on mobile (cards)
<ATable
  data={users}
  columns={columns}
  responsiveLayout="stack"
  breakpoint={768}
/>

// Hide specific columns on mobile/tablet
const columns = [
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email', hideOnMobile: true },
  { field: 'details', header: 'Details', hideOnTablet: true },
];
```

**Expandable Rows:**

```tsx
<ATable
  data={users}
  columns={columns}
  rowExpansionTemplate={(user) => (
    <div className="p-4">
      <h3>User Details</h3>
      <p>Bio: {user.bio}</p>
      <p>Joined: {user.joinedDate}</p>
    </div>
  )}
/>
```

## 🎨 Customization

All components accept standard HTML attributes and className for custom styling:

```tsx
<AButton 
  label="Custom" 
  className="my-custom-class"
  style={{ borderRadius: '20px' }}
/>
```

## 📖 TypeScript Support

Full TypeScript support with exported types:

```tsx
import type { 
  AButtonProps, 
  ATableProps, 
  ATableColumn,
  SortMeta,
  FilterMeta 
} from '@avense/component-library';
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © Avense Tech

## 🔗 Links

- [GitHub Repository](https://github.com/avense-tech/component-library)
- [Issue Tracker](https://github.com/avense-tech/component-library/issues)
- [npm Package](https://www.npmjs.com/package/@avense/component-library)

## 📊 Roadmap

- [ ] AInput component
- [ ] ACard component
- [ ] ADialog/Modal component
- [ ] ADropdown component
- [ ] AToast notifications
- [ ] More table features (column resizing, frozen columns)
- [ ] Form validation helpers
- [ ] More themes and customization options


A versatile button component with multiple variants, sizes, and states.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Button text |
| variant | 'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' | 'primary' | Visual variant |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Button size |
| disabled | boolean | false | Disable the button |
| loading | boolean | false | Show loading state |
| iconLeft | ReactNode | - | Icon before label |
| iconRight | ReactNode | - | Icon after label |
| fullWidth | boolean | false | Full width button |
| className | string | - | Custom CSS classes |

#### Examples

**Basic Usage**
```tsx
<AButton label="Primary Button" />
```

**With Loading State**
```tsx
<AButton label="Submit" loading={isLoading} />
```

**With Icons**
```tsx
<AButton 
  label="Download" 
  iconLeft={<DownloadIcon />}
  variant="outline"
/>
```

**Disabled**
```tsx
<AButton label="Disabled" disabled />
```

**Custom Styling**
```tsx
<AButton 
  label="Custom" 
  className="shadow-xl hover:scale-105"
/>
```

## Development

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build library
npm run build
```

### Project Structure

```
component_library/
├── src/
│   ├── components/
│   │   ├── AButton/
│   │   │   ├── AButton.tsx
│   │   │   ├── AButton.types.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── demo/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── styles/
│   │   └── globals.css
│   └── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Avense Tech
