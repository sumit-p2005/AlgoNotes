'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, LogOut, Settings as SettingsIcon, Menu, ChevronDown } from 'lucide-react';
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

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Learner';
  const initial = displayName.charAt(0).toUpperCase() || 'L';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-13 px-4 border-b border-border bg-page/95 backdrop-blur-md">
      {/* Left side: Mobile Toggle & Search input */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden p-1.5 rounded-lg border border-border text-muted hover:text-foreground hover:bg-panel"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Global Search Bar with Ctrl K badge */}
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('open-command-search'))}
          className="flex items-center justify-between w-full max-w-md px-3.5 py-1.5 rounded-xl border border-border bg-panel/70 hover:bg-panel text-xs text-muted hover:text-foreground transition-colors group text-left"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors" />
            <span className="text-muted/90 text-xs">Search problems, patterns, or notes...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-border/80 bg-elevated text-[10px] font-mono text-muted">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Sun / Moon Theme Toggle */}
        <ThemeToggle />

        {/* Notification Bell with indicator */}
        <Link
          href="/revision"
          className="relative p-1.5 rounded-full text-muted hover:text-foreground transition-colors"
          title={`${dueCount} reviews due`}
          aria-label={`${dueCount} reviews due`}
        >
          <Bell className="w-4 h-4" />
          {dueCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent animate-pulse" />
          )}
        </Link>

        {/* User Profile Pill Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-panel transition-colors focus-visible:outline-none"
            aria-label="User account menu"
          >
            <div className="w-7 h-7 rounded-full bg-pink-300 dark:bg-purple-300 text-purple-950 font-bold text-xs flex items-center justify-center shrink-0">
              {initial}
            </div>
            <span className="hidden sm:inline text-xs font-medium text-foreground">
              {displayName}
            </span>
            <ChevronDown className="w-3 h-3 text-muted" />
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-panel shadow-2xl p-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-2 border-b border-border mb-1">
                  <p className="font-semibold text-foreground truncate">{displayName}</p>
                  <p className="text-muted text-[11px] truncate">
                    {user?.email || 'sumitpatel01@gmail.com'}
                  </p>
                </div>

                <Link
                  href="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-elevated text-foreground transition-colors"
                >
                  <SettingsIcon className="w-3.5 h-3.5 text-muted" />
                  <span>Settings & Preferences</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
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
