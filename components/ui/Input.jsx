'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export const Input = forwardRef(function Input(
  { className = '', type = 'text', error, ...props },
  ref
) {
  return (
    <div className="w-full">
      <input
        type={type}
        ref={ref}
        className={cn(
          'w-full rounded-lg border border-border bg-panel px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  { className = '', rows = 4, error, ...props },
  ref
) {
  return (
    <div className="w-full">
      <textarea
        rows={rows}
        ref={ref}
        className={cn(
          'w-full rounded-lg border border-border bg-panel px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors resize-y',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

export const Select = forwardRef(function Select(
  { className = '', children, error, ...props },
  ref
) {
  return (
    <div className="w-full">
      <select
        ref={ref}
        className={cn(
          'w-full rounded-lg border border-border bg-panel px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

