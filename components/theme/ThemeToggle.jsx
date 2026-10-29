'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }) {
  const { resolvedTheme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className={`w-14 h-7 rounded-full bg-elevated border border-border animate-pulse ${className}`} />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full border border-border bg-panel/80 ${className}`}
      role="group"
      aria-label="Theme switcher"
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`flex items-center justify-center w-6 h-6 rounded-full transition-all ${
          !isDark
            ? 'bg-amber-400 text-black shadow-xs font-bold'
            : 'text-muted hover:text-foreground'
        }`}
        title="Switch to light mode"
        aria-label="Light mode"
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`flex items-center justify-center w-6 h-6 rounded-full transition-all ${
          isDark
            ? 'bg-amber-400/20 text-amber-400 font-bold'
            : 'text-muted hover:text-foreground'
        }`}
        title="Switch to dark mode"
        aria-label="Dark mode"
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
