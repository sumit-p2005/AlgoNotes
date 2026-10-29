'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }) {
  const { resolvedTheme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className={`w-8 h-8 rounded-md bg-stone-200/50 dark:bg-stone-800/50 animate-pulse ${className}`} />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border text-foreground/80 hover:text-foreground hover:bg-surface-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-stone-700" />
      )}
    </button>
  );
}
