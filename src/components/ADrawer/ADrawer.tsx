import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { ADrawerProps } from './ADrawer.types';

const sizeStyles = {
  left: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full',
  },
  right: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full',
  },
  top: {
    sm: 'h-64',
    md: 'h-80',
    lg: 'h-96',
    xl: 'h-[32rem]',
    full: 'h-full',
  },
  bottom: {
    sm: 'h-64',
    md: 'h-80',
    lg: 'h-96',
    xl: 'h-[32rem]',
    full: 'h-full',
  },
};

const positionStyles = {
  left: {
    container: 'top-0 left-0 h-full',
    enter: 'translate-x-0',
    exit: '-translate-x-full',
  },
  right: {
    container: 'top-0 right-0 h-full',
    enter: 'translate-x-0',
    exit: 'translate-x-full',
  },
  top: {
    container: 'top-0 left-0 w-full',
    enter: 'translate-y-0',
    exit: '-translate-y-full',
  },
  bottom: {
    container: 'bottom-0 left-0 w-full',
    enter: 'translate-y-0',
    exit: 'translate-y-full',
  },
};

const CloseIcon = () => (
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
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export const ADrawer = ({
  visible,
  onClose,
  position = 'right',
  size = 'md',
  header,
  children,
  footer,
  dismissable = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  backdropClassName,
  blockScroll = true,
  showBackdrop = true,
  zIndex = 1000,
}: ADrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    if (!visible || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [visible, closeOnEscape, onClose]);

  // Block body scroll when drawer is open
  useEffect(() => {
    if (!visible || !blockScroll) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [visible, blockScroll]);

  // Focus trap
  useEffect(() => {
    if (!visible) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    // Focus first focusable element
    const focusableElements = drawer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    if (firstElement) {
      firstElement.focus();
    }
  }, [visible]);

  if (!visible) return null;

  const content = (
    <>
      {/* Backdrop */}
      {showBackdrop && (
        <div
          className={clsx(
            'fixed inset-0 bg-black transition-opacity duration-300',
            visible ? 'bg-opacity-50' : 'bg-opacity-0',
            backdropClassName
          )}
          style={{ zIndex }}
          onClick={dismissable ? onClose : undefined}
          aria-hidden="true"
        />
      )}

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className={clsx(
          'fixed bg-white shadow-xl',
          'flex flex-col',
          'transition-transform duration-300 ease-in-out',
          positionStyles[position].container,
          sizeStyles[position][size],
          visible ? positionStyles[position].enter : positionStyles[position].exit,
          className
        )}
        style={{ zIndex: zIndex + 1 }}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(header || showCloseButton) && (
          <div
            className={clsx(
              'flex items-center justify-between',
              'px-6 py-4',
              'border-b border-gray-200',
              'flex-shrink-0',
              headerClassName
            )}
          >
            {header && (
              <div className="text-lg font-semibold text-gray-900">
                {header}
              </div>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={clsx(
                  'p-2 rounded-md',
                  'text-gray-400 hover:text-gray-500 hover:bg-gray-100',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  'transition-colors duration-200',
                  !header && 'ml-auto'
                )}
                aria-label="Close drawer"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div
          className={clsx(
            'flex-1 overflow-y-auto',
            'px-6 py-4',
            contentClassName
          )}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={clsx(
              'px-6 py-4',
              'border-t border-gray-200',
              'flex-shrink-0',
              footerClassName
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  );

  return createPortal(content, document.body);
};
