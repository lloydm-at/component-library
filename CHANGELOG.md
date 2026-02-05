# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-05

### Added
- Initial release of Avense Component Library
- **AButton Component**
  - 5 variants: primary, secondary, outline, ghost, danger
  - 4 sizes: sm, md, lg, xl
  - Loading state with spinner
  - Disabled state
  - Icon support (left/right position)
  - Full-width option
  - Full TypeScript support

- **ATable Component**
  - Client-side and server-side data support
  - Column sorting (single column mode)
  - Global search across all columns
  - Per-column filtering
  - Pagination with customizable page sizes
  - Row selection (single/multiple)
  - Expandable rows with custom templates
  - Granular loading states (table, row, column, cell-level)
  - Responsive layouts:
    - Stack layout for mobile devices
    - Column hiding on mobile/tablet
    - Touch-friendly pagination
  - Scrollable table with sticky headers
  - Fixed and max height options
  - Striped rows
  - Hover effects
  - Custom cell rendering
  - Empty state message
  - Error handling
  - Full TypeScript support with generics

### Developer Experience
- Full TypeScript definitions
- Tree-shakeable exports
- ES Modules and UMD builds
- Peer dependencies for React 18+
- Comprehensive documentation
- MIT License
