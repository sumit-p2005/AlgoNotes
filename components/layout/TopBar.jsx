'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, User, LogOut, Settings as SettingsIcon, Menu, CalendarCheck2 } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { createClient } from '@/lib/supabase/client';

export function TopBar({ onToggleMobileMenu, dueCount = 0 }) {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch {
        // ignore
      }
    }
    loadUser();
  }, []);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 border-b border-border bg-panel/95 backdrop-blur-md">
      {/* Left side: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden p-1.5 rounded-lg border border-border text-muted hover:text-foreground hover:bg-elevated"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('open-command-search'))}
          className="flex items-center justify-between w-full max-w-md px-3 py-1.5 rounded-lg border border-border bg-elevated/50 hover:bg-elevated text-xs text-muted hover:text-foreground transition-colors group text-left"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
            <span>Search topics, patterns, notes...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-border bg-panel text-[10px] font-mono font-medium text-muted">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2.5">
        {/* Spaced Repetition Due Counter */}
        <Link
          href="/revision"
          className="relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-elevated/40 hover:bg-elevated text-xs font-medium text-foreground transition-colors"
          title="Daily Revision Reviews"
        >
          <CalendarCheck2 className="w-4 h-4 text-amber-500" />
          <span className="hidden sm:inline">Revision</span>
          {dueCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold rounded-full bg-accent text-accent-text">
              {dueCount}
            </span>
          )}
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-elevated hover:bg-border/60 text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="User account menu"
          >
            <User className="w-4 h-4" />
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-panel shadow-xl p-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-2 border-b border-border mb-1">
                  <p className="font-semibold text-foreground truncate">
                    {user?.user_metadata?.full_name || 'AlgoNotes User'}
                  </p>
                  <p className="text-muted text-[11px] truncate">
                    {user?.email || 'Student Account'}
                  </p>
                </div>

                <Link
                  href="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-elevated text-foreground transition-colors"
                >
                  <SettingsIcon className="w-4 h-4 text-muted" />
                  <span>Settings & Preferences</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
