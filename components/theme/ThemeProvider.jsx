'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const ThemeContext = createContext({
  theme: 'system',
  resolvedTheme: 'dark',
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('algonotes_theme') || 'system';
      } catch {}
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('algonotes_theme') || 'system';
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return stored === 'dark' || (stored === 'system' && systemDark) ? 'dark' : 'light';
      } catch {}
    }
    return 'dark';
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Listen to system theme changes if theme === 'system'
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const nextResolved = e.matches ? 'dark' : 'light';
      setResolvedTheme(nextResolved);
      if (nextResolved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = async (newTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('algonotes_theme', newTheme);
    } catch {
      // ignore
    }

    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextResolved = newTheme === 'dark' || (newTheme === 'system' && systemDark) ? 'dark' : 'light';
    setResolvedTheme(nextResolved);

    if (nextResolved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Persist to user profile if logged in
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('profiles').update({ theme: newTheme }).eq('id', user.id);
      }
    } catch {
      // Ignore background sync errors
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

