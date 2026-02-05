import { useState } from 'react';
import { ADrawer } from '../../components/ADrawer';
import { AButton } from '../../components/AButton';

export function ADrawerPage() {
  const [leftDrawer, setLeftDrawer] = useState(false);
  const [rightDrawer, setRightDrawer] = useState(false);
  const [topDrawer, setTopDrawer] = useState(false);
  const [bottomDrawer, setBottomDrawer] = useState(false);
  const [sizeDrawer, setSizeDrawer] = useState(false);
  const [fullDrawer, setFullDrawer] = useState(false);
  const [customDrawer, setCustomDrawer] = useState(false);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">ADrawer Component</h1>
        <p className="text-slate-400">Slide-out panels for navigation, filters, and content</p>
      </div>

      {/* Basic Usage - Positions */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Drawer Positions</h2>
        <p className="text-sm text-slate-400 mb-4">
          Drawers can slide in from any side of the screen
        </p>
        <div className="flex flex-wrap gap-3">
          <AButton label="Left Drawer" onClick={() => setLeftDrawer(true)} />
          <AButton label="Right Drawer" onClick={() => setRightDrawer(true)} variant="secondary" />
          <AButton label="Top Drawer" onClick={() => setTopDrawer(true)} variant="outline" />
          <AButton label="Bottom Drawer" onClick={() => setBottomDrawer(true)} variant="ghost" />
        </div>
      </section>

      {/* Sizes */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Drawer Sizes</h2>
        <p className="text-sm text-slate-400 mb-4">
          Available sizes: sm (256px), md (320px), lg (384px), xl (512px), full (100%)
        </p>
        <div className="flex flex-wrap gap-3">
          <AButton label="Small Drawer" onClick={() => setSizeDrawer(true)} size="sm" />
          <AButton label="Full Screen" onClick={() => setFullDrawer(true)} variant="danger" />
        </div>
      </section>

      {/* Custom Content */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Custom Header & Footer</h2>
        <p className="text-sm text-slate-400 mb-4">
          Drawers support custom headers, content, and footers
        </p>
        <AButton label="Open Settings Drawer" onClick={() => setCustomDrawer(true)} />
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
              <h3 className="font-semibold text-white">4 Positions</h3>
              <p className="text-sm text-slate-400">Slide from left, right, top, or bottom</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">5 Sizes</h3>
              <p className="text-sm text-slate-400">From small to full-screen drawers</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Keyboard Support</h3>
              <p className="text-sm text-slate-400">Close with Escape key, focus trap</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Backdrop Control</h3>
              <p className="text-sm text-slate-400">Optional backdrop, click to close</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Custom Content</h3>
              <p className="text-sm text-slate-400">Header, body, and footer sections</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Smooth Animations</h3>
              <p className="text-sm text-slate-400">Slide transitions with backdrop fade</p>
            </div>
          </div>
        </div>
      </section>

      {/* Drawers */}
      <ADrawer
        visible={leftDrawer}
        onClose={() => setLeftDrawer(false)}
        position="left"
        header="Left Drawer"
      >
        <div className="space-y-4">
          <p>This drawer slides in from the left side.</p>
          <p>Perfect for navigation menus or filters.</p>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Navigation</h3>
            <nav className="space-y-2">
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">Dashboard</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">Users</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">Settings</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">Reports</a>
            </nav>
          </div>
        </div>
      </ADrawer>

      <ADrawer
        visible={rightDrawer}
        onClose={() => setRightDrawer(false)}
        position="right"
        header="Right Drawer"
        footer={
          <div className="flex justify-end gap-2">
            <AButton label="Cancel" variant="outline" onClick={() => setRightDrawer(false)} />
            <AButton label="Apply" onClick={() => setRightDrawer(false)} />
          </div>
        }
      >
        <div className="space-y-4">
          <p>This drawer slides in from the right side.</p>
          <p>Common for filters, shopping carts, or details panels.</p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Filter by Status</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Books</option>
              </select>
            </div>
          </div>
        </div>
      </ADrawer>

      <ADrawer
        visible={topDrawer}
        onClose={() => setTopDrawer(false)}
        position="top"
        header="Top Drawer"
        size="sm"
      >
        <div className="space-y-4">
          <p>This drawer slides down from the top.</p>
          <p>Great for notifications, announcements, or search bars.</p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <strong className="text-blue-900">Announcement:</strong>
            <p className="text-sm text-blue-700 mt-1">
              New features are now available! Check out the latest updates.
            </p>
          </div>
        </div>
      </ADrawer>

      <ADrawer
        visible={bottomDrawer}
        onClose={() => setBottomDrawer(false)}
        position="bottom"
        header="Bottom Drawer"
        size="md"
      >
        <div className="space-y-4">
          <p>This drawer slides up from the bottom.</p>
          <p>Perfect for mobile-style sheets or quick actions.</p>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200">
              <div className="text-2xl mb-1">📱</div>
              <div className="text-sm font-medium">Share</div>
            </button>
            <button className="px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200">
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-sm font-medium">Favorite</div>
            </button>
            <button className="px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200">
              <div className="text-2xl mb-1">📥</div>
              <div className="text-sm font-medium">Download</div>
            </button>
            <button className="px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200">
              <div className="text-2xl mb-1">🗑️</div>
              <div className="text-sm font-medium">Delete</div>
            </button>
          </div>
        </div>
      </ADrawer>

      <ADrawer
        visible={sizeDrawer}
        onClose={() => setSizeDrawer(false)}
        position="right"
        size="sm"
        header="Small Drawer"
      >
        <div className="space-y-3">
          <p>This is a small drawer (256px wide).</p>
          <p className="text-sm text-gray-600">
            Perfect for compact side panels that don't need much space.
          </p>
        </div>
      </ADrawer>

      <ADrawer
        visible={fullDrawer}
        onClose={() => setFullDrawer(false)}
        position="right"
        size="full"
        header="Full Screen Drawer"
        showBackdrop={false}
      >
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Full Screen Mode</h3>
          <p>This drawer takes up the entire screen.</p>
          <p>Great for forms, detailed views, or immersive experiences.</p>
          <div className="mt-8 p-6 bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Pro Tip</h4>
            <p className="text-sm text-gray-700">
              Full-screen drawers often don't need a backdrop since they cover the entire viewport.
            </p>
          </div>
        </div>
      </ADrawer>

      <ADrawer
        visible={customDrawer}
        onClose={() => setCustomDrawer(false)}
        position="right"
        size="lg"
        header={
          <div>
            <h2 className="text-xl font-bold">Settings</h2>
            <p className="text-sm text-gray-500">Manage your preferences</p>
          </div>
        }
        footer={
          <div className="flex justify-between items-center w-full">
            <button className="text-sm text-red-600 hover:text-red-700">
              Reset to Defaults
            </button>
            <div className="flex gap-2">
              <AButton label="Cancel" variant="outline" onClick={() => setCustomDrawer(false)} />
              <AButton label="Save Changes" onClick={() => setCustomDrawer(false)} />
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Account Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Notifications</span>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push Notifications</span>
                <input type="checkbox" className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Marketing Emails</span>
                <input type="checkbox" className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Privacy</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Visibility</span>
                <select className="px-2 py-1 text-sm border border-gray-300 rounded">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Friends Only</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Two-Factor Authentication</span>
                <input type="checkbox" className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Appearance</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Theme</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>Auto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Language</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </ADrawer>

      {/* Usage Examples */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4 text-white">Usage Examples</h2>
        
        <div className="space-y-6">
          {/* Basic Usage */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Basic Drawer</h3>
            <div className="bg-slate-900 rounded-lg p-4 mb-3">
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`import { useState } from 'react';
import { ADrawer, AButton } from '@avense/component-library';

function MyComponent() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <AButton 
        label="Open Drawer" 
        onClick={() => setVisible(true)} 
      />
      
      <ADrawer
        visible={visible}
        onClose={() => setVisible(false)}
        header="My Drawer"
      >
        <p>Drawer content goes here</p>
      </ADrawer>
    </>
  );
}`}</code>
              </pre>
            </div>
          </div>

          {/* With Footer */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Drawer with Footer</h3>
            <div className="bg-slate-900 rounded-lg p-4 mb-3">
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`<ADrawer
  visible={visible}
  onClose={() => setVisible(false)}
  position="right"
  size="lg"
  header="Settings"
  footer={
    <div className="flex justify-end gap-2">
      <AButton 
        label="Cancel" 
        variant="outline" 
        onClick={() => setVisible(false)} 
      />
      <AButton 
        label="Save" 
        onClick={handleSave} 
      />
    </div>
  }
>
  <SettingsForm />
</ADrawer>`}</code>
              </pre>
            </div>
          </div>

          {/* Mobile Sheet */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Mobile Bottom Sheet</h3>
            <div className="bg-slate-900 rounded-lg p-4 mb-3">
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`<ADrawer
  visible={visible}
  onClose={() => setVisible(false)}
  position="bottom"
  size="md"
  header="Quick Actions"
>
  <div className="grid grid-cols-2 gap-3">
    <button onClick={handleShare}>Share</button>
    <button onClick={handleDownload}>Download</button>
    <button onClick={handleFavorite}>Favorite</button>
    <button onClick={handleDelete}>Delete</button>
  </div>
</ADrawer>`}</code>
              </pre>
            </div>
          </div>

          {/* Full Screen */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Full Screen Drawer</h3>
            <div className="bg-slate-900 rounded-lg p-4 mb-3">
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`<ADrawer
  visible={visible}
  onClose={() => setVisible(false)}
  size="full"
  showBackdrop={false}
  header="Detailed View"
>
  <DetailedContent />
</ADrawer>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Props Reference */}
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
                <td className="px-4 py-3 text-sm font-mono text-primary-400">visible</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">required</td>
                <td className="px-4 py-3 text-sm text-slate-300">Whether the drawer is visible</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">onClose</td>
                <td className="px-4 py-3 text-sm text-slate-300">function</td>
                <td className="px-4 py-3 text-sm text-slate-400">required</td>
                <td className="px-4 py-3 text-sm text-slate-300">Callback fired when the drawer requests to be closed</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">position</td>
                <td className="px-4 py-3 text-sm text-slate-300">'left' | 'right' | 'top' | 'bottom'</td>
                <td className="px-4 py-3 text-sm text-slate-400">'right'</td>
                <td className="px-4 py-3 text-sm text-slate-300">Position from which the drawer slides in</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">size</td>
                <td className="px-4 py-3 text-sm text-slate-300">'sm' | 'md' | 'lg' | 'xl' | 'full'</td>
                <td className="px-4 py-3 text-sm text-slate-400">'md'</td>
                <td className="px-4 py-3 text-sm text-slate-300">Size of the drawer (width for left/right, height for top/bottom)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">header</td>
                <td className="px-4 py-3 text-sm text-slate-300">ReactNode</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Header content (can be string or custom JSX)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">children</td>
                <td className="px-4 py-3 text-sm text-slate-300">ReactNode</td>
                <td className="px-4 py-3 text-sm text-slate-400">required</td>
                <td className="px-4 py-3 text-sm text-slate-300">Main content of the drawer</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">footer</td>
                <td className="px-4 py-3 text-sm text-slate-300">ReactNode</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Footer content (typically action buttons)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">dismissable</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">true</td>
                <td className="px-4 py-3 text-sm text-slate-300">Whether clicking the backdrop closes the drawer</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">closeOnEscape</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">true</td>
                <td className="px-4 py-3 text-sm text-slate-300">Whether pressing Escape key closes the drawer</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">showCloseButton</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">true</td>
                <td className="px-4 py-3 text-sm text-slate-300">Show close button (X) in header</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">blockScroll</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">true</td>
                <td className="px-4 py-3 text-sm text-slate-300">Whether to block scroll on body when drawer is open</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">showBackdrop</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">true</td>
                <td className="px-4 py-3 text-sm text-slate-300">Whether to show backdrop overlay</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">zIndex</td>
                <td className="px-4 py-3 text-sm text-slate-300">number</td>
                <td className="px-4 py-3 text-sm text-slate-400">1000</td>
                <td className="px-4 py-3 text-sm text-slate-300">Z-index for the drawer and backdrop</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">className</td>
                <td className="px-4 py-3 text-sm text-slate-300">string</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Custom CSS class for the drawer panel</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">headerClassName</td>
                <td className="px-4 py-3 text-sm text-slate-300">string</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Custom CSS class for the header</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">contentClassName</td>
                <td className="px-4 py-3 text-sm text-slate-300">string</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Custom CSS class for the content area</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">footerClassName</td>
                <td className="px-4 py-3 text-sm text-slate-300">string</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Custom CSS class for the footer</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">backdropClassName</td>
                <td className="px-4 py-3 text-sm text-slate-300">string</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Custom CSS class for the backdrop</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-slate-900 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-300 mb-2">Size Reference</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
            <div>
              <strong className="text-slate-300">Left/Right Position:</strong>
              <ul className="mt-1 space-y-1 ml-4 list-disc">
                <li>sm: 256px width</li>
                <li>md: 320px width</li>
                <li>lg: 384px width</li>
                <li>xl: 512px width</li>
                <li>full: 100% width</li>
              </ul>
            </div>
            <div>
              <strong className="text-slate-300">Top/Bottom Position:</strong>
              <ul className="mt-1 space-y-1 ml-4 list-disc">
                <li>sm: 256px height</li>
                <li>md: 320px height</li>
                <li>lg: 384px height</li>
                <li>xl: 512px height</li>
                <li>full: 100% height</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
