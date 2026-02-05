import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import global CSS styles (TypeScript will recognize this with a .d.ts declaration)
import '../styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
