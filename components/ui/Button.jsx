'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

export function Button({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const variants = {
    default: 'bg-accent text-accent-text hover:bg-accent-hover font-semibold shadow-xs',
    secondary: 'bg-elevated text-foreground hover:bg-border/60 border border-border',
    outline: 'border border-border text-foreground hover:bg-elevated',
    ghost: 'text-foreground/80 hover:text-foreground hover:bg-elevated',
    danger: 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 hover:bg-red-500/25',
    subtle: 'bg-accent-subtle text-amber-700 dark:text-amber-300 hover:opacity-90',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-4 py-2.5 gap-2.5',
    icon: 'p-2 w-8 h-8',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

