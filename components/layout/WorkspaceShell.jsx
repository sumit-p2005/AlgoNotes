'use client';

import React, { useState, useEffect } from 'react';
import { AppSidebar } from './AppSidebar';
import { TopBar } from './TopBar';
import { CommandSearchModal } from './CommandSearchModal';
import { DailyReviewModal } from '@/components/revision/DailyReviewModal';
import { createClient } from '@/lib/supabase/client';

export function WorkspaceShell({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dueCount, setDueCount] = useState(0);

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
          setDueCount(count);
        }
      } catch {
        // ignore
      }
    }
    fetchDueReviews();
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-page text-foreground">
      {/* Left Sidebar */}
      <AppSidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar
          onToggleMobileMenu={() => setIsMobileOpen(true)}
          dueCount={dueCount}
        />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Command Search Dialog */}
      <CommandSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Daily Review Prompt Modal (Session-dismissable) */}
      <DailyReviewModal dueCount={dueCount} />
    </div>
  );
}
