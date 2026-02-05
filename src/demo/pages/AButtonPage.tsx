import { useState } from 'react';
import { AButton } from '../../components/AButton';

export function AButtonPage() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">AButton Component</h1>
        <p className="text-slate-400">Versatile button with multiple states and styles</p>
      </div>

      {/* Variants Section */}
      <section id="button-variants" className="bg-slate-800 rounded-lg shadow-sm p-6 scroll-mt-8">
        <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <AButton variant="primary" label="Primary" />
          <AButton variant="secondary" label="Secondary" />
          <AButton variant="outline" label="Outline" />
          <AButton variant="ghost" label="Ghost" />
          <AButton variant="danger" label="Danger" />
        </div>
      </section>

      {/* Sizes Section */}
      <section id="button-sizes" className="bg-slate-800 rounded-lg shadow-sm p-6 scroll-mt-8">
        <h2 className="text-2xl font-semibold mb-4">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <AButton size="sm" label="Small" />
          <AButton size="md" label="Medium" />
          <AButton size="lg" label="Large" />
          <AButton size="xl" label="Extra Large" />
        </div>
      </section>

      {/* States Section */}
      <section id="button-states" className="bg-slate-800 rounded-lg shadow-sm p-6 scroll-mt-8">
        <h2 className="text-2xl font-semibold mb-4">Button States</h2>
        <div className="flex flex-wrap gap-4">
          <AButton label="Normal" onClick={() => alert('Clicked!')} />
          <AButton label="Disabled" disabled />
          <AButton label="Loading" loading={loading} onClick={handleClick} />
        </div>
      </section>

      {/* With Icons Section */}
      <section id="button-icons" className="bg-slate-800 rounded-lg shadow-sm p-6 scroll-mt-8">
        <h2 className="text-2xl font-semibold mb-4">Buttons with Icons</h2>
        <div className="flex flex-wrap gap-4">
          <AButton
            label="Download"
            iconLeft={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            }
          />
          <AButton
            label="Next"
            variant="outline"
            iconRight={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            }
          />
        </div>
      </section>

      {/* Full Width Section */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Full Width Button</h2>
        <AButton label="Full Width Button" fullWidth />
      </section>

      {/* Custom Styling Section */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4 text-white">Custom Styling</h2>
        <AButton
          label="Custom Button"
          className="shadow-lg hover:shadow-xl"
          variant="primary"
        />
      </section>

      {/* Usage Examples */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4 text-white">Usage Examples</h2>
        
        <div className="space-y-6">
          {/* Basic Usage */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Basic Button</h3>
            <div className="bg-slate-900 rounded-lg p-4 mb-3">
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`import { AButton } from '@avense/component-library';

function MyComponent() {
  return (
    <AButton 
      label="Click Me" 
      onClick={() => console.log('Clicked!')} 
    />
  );
}`}</code>
              </pre>
            </div>
          </div>

          {/* Loading State */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Loading State</h3>
            <div className="bg-slate-900 rounded-lg p-4 mb-3">
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await submitForm();
  } finally {
    setIsLoading(false);
  }
};

return (
  <AButton 
    label="Submit" 
    loading={isLoading}
    onClick={handleSubmit}
  />
);`}</code>
              </pre>
            </div>
          </div>

          {/* With Icons */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Button with Icons</h3>
            <div className="bg-slate-900 rounded-lg p-4 mb-3">
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`<AButton 
  label="Download"
  variant="primary"
  iconLeft={<DownloadIcon />}
  onClick={handleDownload}
/>

<AButton 
  label="Next"
  variant="outline"
  iconRight={<ArrowRightIcon />}
  onClick={handleNext}
/>`}</code>
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
                <td className="px-4 py-3 text-sm font-mono text-primary-400">label</td>
                <td className="px-4 py-3 text-sm text-slate-300">string</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Button text content</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">variant</td>
                <td className="px-4 py-3 text-sm text-slate-300">'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'</td>
                <td className="px-4 py-3 text-sm text-slate-400">'primary'</td>
                <td className="px-4 py-3 text-sm text-slate-300">Button visual variant</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">size</td>
                <td className="px-4 py-3 text-sm text-slate-300">'sm' | 'md' | 'lg' | 'xl'</td>
                <td className="px-4 py-3 text-sm text-slate-400">'md'</td>
                <td className="px-4 py-3 text-sm text-slate-300">Button size</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">disabled</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">false</td>
                <td className="px-4 py-3 text-sm text-slate-300">Whether the button is disabled</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">loading</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">false</td>
                <td className="px-4 py-3 text-sm text-slate-300">Whether the button is in loading state</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">iconLeft</td>
                <td className="px-4 py-3 text-sm text-slate-300">ReactNode</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Icon to display before the label</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">iconRight</td>
                <td className="px-4 py-3 text-sm text-slate-300">ReactNode</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Icon to display after the label</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">fullWidth</td>
                <td className="px-4 py-3 text-sm text-slate-300">boolean</td>
                <td className="px-4 py-3 text-sm text-slate-400">false</td>
                <td className="px-4 py-3 text-sm text-slate-300">Whether the button should take full width</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">onClick</td>
                <td className="px-4 py-3 text-sm text-slate-300">function</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Click event handler</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">className</td>
                <td className="px-4 py-3 text-sm text-slate-300">string</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Additional CSS classes to apply</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-primary-400">children</td>
                <td className="px-4 py-3 text-sm text-slate-300">ReactNode</td>
                <td className="px-4 py-3 text-sm text-slate-400">-</td>
                <td className="px-4 py-3 text-sm text-slate-300">Alternative to label prop, renders children inside button</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-slate-900 rounded-lg">
          <p className="text-sm text-slate-400">
            <strong className="text-slate-300">Note:</strong> AButton extends all native HTML button attributes, 
            so you can pass any standard button props like <code className="text-primary-400">type</code>, 
            <code className="text-primary-400">form</code>, <code className="text-primary-400">name</code>, etc.
          </p>
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
              <h3 className="font-semibold text-white">5 Variants</h3>
              <p className="text-sm text-slate-400">Primary, Secondary, Outline, Ghost, and Danger styles</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">4 Sizes</h3>
              <p className="text-sm text-slate-400">Small, Medium, Large, and Extra Large</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Loading State</h3>
              <p className="text-sm text-slate-400">Built-in loading spinner with automatic disable</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Icon Support</h3>
              <p className="text-sm text-slate-400">Add icons before or after the button label</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">Fully Accessible</h3>
              <p className="text-sm text-slate-400">Supports disabled state and keyboard navigation</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white">TypeScript Support</h3>
              <p className="text-sm text-slate-400">Full type definitions included</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
