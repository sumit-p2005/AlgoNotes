'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderTree, CalendarCheck2, Search } from 'lucide-react';
import { AppSidebar } from './AppSidebar';
import { TopicTreeSidebar } from './TopicTreeSidebar';
import { TopBar } from './TopBar';
import { CommandSearchModal } from './CommandSearchModal';
import { DailyReviewModal } from '@/components/revision/DailyReviewModal';
import { createClient } from '@/lib/supabase/client';

export function WorkspaceShell({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dueCount, setDueCount] = useState(12);
  const pathname = usePathname();

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener('open-command-search', handleOpenSearch);
    return () => window.removeEventListener('open-command-search', handleOpenSearch);
  }, []);

  // Fetch due reviews count on mount
  useEffect(() => {
    async function fetchDueReviews() {
      try {
        const supabase = createClient();
        const nowIso = new Date().toISOString();
        const { count, error } = await supabase
          .from('problem_review_schedules')
          .select('id', { count: 'exact', head: true })
          .lte('next_review_at', nowIso);

        if (!error && count !== null) {
          setDueCount(count > 0 ? count : 12);
        }
      } catch {
        // ignore
      }
    }
    fetchDueReviews();
  }, []);

  // Show Topic Tree column on workspace views
  const showTopicTree =
    pathname.startsWith('/problems') ||
    pathname.startsWith('/topics') ||
    pathname === '/dashboard';

  return (
    <div className="flex h-screen w-full overflow-hidden bg-page text-foreground">
      {/* 1. Primary Left Navigation Bar */}
      <AppSidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* 2. Topic Tree Sidebar (Column 2 from Reference) */}
      {showTopicTree && <TopicTreeSidebar />}

      {/* 3. Main Workspace Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Global Top Bar */}
        <TopBar
          onToggleMobileMenu={() => setIsMobileOpen(true)}
          dueCount={dueCount}
        />

        {/* Content View */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar (Image 2) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-14 border-t border-border bg-panel/95 backdrop-blur-md flex items-center justify-around z-30 px-2 text-xs">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center gap-1 ${
              pathname === '/dashboard' ? 'text-amber-400 font-bold' : 'text-muted'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px]">Home</span>
          </Link>

          <Link
            href="/topics"
            className={`flex flex-col items-center gap-1 ${
              pathname.startsWith('/topics') ? 'text-amber-400 font-bold' : 'text-muted'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span className="text-[10px]">Topics</span>
          </Link>

          <Link
            href="/revision"
            className={`flex flex-col items-center gap-1 relative ${
              pathname.startsWith('/revision') ? 'text-amber-400 font-bold' : 'text-muted'
            }`}
          >
            <CalendarCheck2 className="w-4 h-4" />
            {dueCount > 0 && (
              <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-accent" />
            )}
            <span className="text-[10px]">Revision</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center gap-1 text-muted hover:text-foreground"
          >
            <Search className="w-4 h-4" />
            <span className="text-[10px]">Search</span>
          </button>
        </div>
      </div>

      {/* Command Search Modal (Ctrl + K) */}
      <CommandSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Daily Spaced Repetition Prompt Modal */}
      <DailyReviewModal dueCount={dueCount} />
    </div>
  );
}
