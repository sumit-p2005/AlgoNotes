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
import { calculateStreak, calculateWeekActivity } from '@/lib/revision/activity';

export function WorkspaceShell({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dueCount, setDueCount] = useState(0);
  const [streakData, setStreakData] = useState(() => ({
    streak: 0,
    weekDays: calculateWeekActivity([]),
  }));
  const pathname = usePathname();

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener('open-command-search', handleOpenSearch);
    return () => window.removeEventListener('open-command-search', handleOpenSearch);
  }, []);

  // Fetch real due reviews and user study streak
  useEffect(() => {
    async function fetchStats() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const nowIso = new Date().toISOString();
        const todayStr = nowIso.split('T')[0];

        // 1. Fetch genuine due reviews
        const [{ count: customCount }, { count: currCount }] = await Promise.all([
          supabase
            .from('problem_review_schedules')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .lte('next_review_at', nowIso),
          supabase
            .from('user_curriculum_review_schedules')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .lte('next_review_date', todayStr),
        ]);

        const totalDue = (customCount || 0) + (currCount || 0);
        setDueCount(totalDue);

        // 2. Fetch genuine activity events for streak
        const [
          { data: actEvents },
          { data: probHistory },
          { data: currHistory },
          { data: currProgress },
        ] = await Promise.all([
          supabase.from('activity_events').select('created_at').eq('user_id', user.id).limit(100),
          supabase.from('problem_review_history').select('reviewed_at').limit(100),
          supabase.from('user_curriculum_review_history').select('reviewed_at').eq('user_id', user.id).limit(100),
          supabase.from('user_curriculum_progress').select('last_activity_at').eq('user_id', user.id).limit(100),
        ]);

        const timestamps = [
          ...(actEvents || []).map((e) => e.created_at),
          ...(probHistory || []).map((h) => h.reviewed_at),
          ...(currHistory || []).map((h) => h.reviewed_at),
          ...(currProgress || []).map((p) => p.last_activity_at),
        ].filter(Boolean);

        const streak = calculateStreak(timestamps);
        const weekDays = calculateWeekActivity(timestamps);
        setStreakData({ streak, weekDays });
      } catch {
        // Keep initial zero state on network/auth errors
      }
    }
    fetchStats();

    const handleRevisionUpdate = () => {
      fetchStats();
    };
    window.addEventListener('revision-updated', handleRevisionUpdate);
    return () => {
      window.removeEventListener('revision-updated', handleRevisionUpdate);
    };
  }, [pathname]);

  // Show dedicated Column 2 (DSA Problems Sidebar) on Problems, Sheets, and Dashboard workspaces
  const isTopicsPage = pathname.startsWith('/topics');
  const isNotesPage = pathname.startsWith('/notes');
  const isRevisionPage = pathname.startsWith('/revision');
  const isAnalyticsPage = pathname.startsWith('/analytics');
  const isBookmarksPage = pathname.startsWith('/bookmarks');
  const isSettingsPage = pathname.startsWith('/settings');

  const showTopicTree =
    !isTopicsPage &&
    !isNotesPage &&
    !isRevisionPage &&
    !isAnalyticsPage &&
    !isBookmarksPage &&
    !isSettingsPage &&
    (pathname.startsWith('/problems') || pathname.startsWith('/sheets') || pathname === '/dashboard');

  return (
    <div className="flex h-screen w-full overflow-hidden bg-page text-foreground">
      {/* 1. Primary Left Navigation Bar */}
      <AppSidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        dueCount={dueCount}
        streakData={streakData}
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
