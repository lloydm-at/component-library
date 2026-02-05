import React, { useState } from 'react';
import { AButtonPage, ATablePage, ADrawerPage } from './pages';
import { AButton } from '../components/AButton';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: MenuItem[];
}

function App() {
  const [activePage, setActivePage] = useState<string>('button');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: 'button',
      label: 'Button',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
    },
    {
      id: 'table',
      label: 'Table',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'drawer',
      label: 'Drawer',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
  ];

  const handleMenuClick = (id: string) => {
    setActivePage(id);
  };

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case 'button':
        return <AButtonPage />;
      case 'table':
        return <ATablePage />;
      case 'drawer':
        return <ADrawerPage />;
      default:
        return <AButtonPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 fixed h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-50 mb-1">Avense UI</h2>
          <p className="text-xs text-slate-400 mb-6">Component Library</p>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.id}>
                <AButton
                  onClick={() => {
                    handleMenuClick(item.id);
                    toggleExpand(item.id);
                  }}
                  variant={activePage === item.id ? 'primary' : 'ghost'}
                  className="w-full justify-between"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.subItems && (
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedItems.includes(item.id) ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </AButton>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8 bg-slate-950">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;