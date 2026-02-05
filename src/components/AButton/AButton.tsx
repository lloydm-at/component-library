import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { AButtonProps } from './AButton.types';

const variantStyles = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 disabled:bg-primary-300',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 disabled:bg-gray-300',
  outline: 'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 disabled:border-primary-300 disabled:text-primary-300',
  ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 active:bg-primary-100 disabled:text-primary-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-300',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5"
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
);

export const AButton = forwardRef<HTMLButtonElement, AButtonProps>(
  (
    {
      label,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      className,
      children,
      onClick,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const buttonClasses = clsx(
      // Base styles
      'inline-flex items-center justify-center gap-2 font-medium rounded-lg',
      'transition-all duration-200 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
      
      // Variant styles
      variantStyles[variant],
      
      // Size styles
      sizeStyles[size],
      
      // State styles
      {
        'cursor-not-allowed opacity-60': isDisabled,
        'cursor-pointer': !isDisabled,
        'w-full': fullWidth,
      },
      
      // Custom className
      className
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled || !onClick) return;
      onClick(e);
    };

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        onClick={handleClick}
        {...rest}
      >
        {loading ? (
          <>
            <LoadingSpinner />
            <span>{label || children || 'Loading...'}</span>
          </>
        ) : (
          <>
            {iconLeft && <span className="inline-flex">{iconLeft}</span>}
            {label || children}
            {iconRight && <span className="inline-flex">{iconRight}</span>}
          </>
        )}
      </button>
    );
  }
);

AButton.displayName = 'AButton';
