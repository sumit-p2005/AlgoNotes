'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  FileCode2,
  CheckCircle2,
  CalendarCheck2,
  Flame,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { categorizeReviews } from '@/lib/revision/scheduler';
import { CurrentProgressWizard } from '@/components/onboarding/CurrentProgressWizard';
import { calculateStreak } from '@/lib/revision/activity';

export default function DashboardPage() {
  const [problems, setProblems] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [history, setHistory] = useState([]);
  const [userName, setUserName] = useState('');
  const [curriculumData, setCurriculumData] = useState(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);
  const [allTimestamps, setAllTimestamps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [todayStr] = useState(() => new Date().toISOString().split('T')[0]);

  const loadData = async () => {
    try {
      const supabase = createClient();
      const [{ data: user }, { data: pData }, { data: sData }, { data: hData }] =
        await Promise.all([
          supabase.auth.getUser(),
          supabase.from('problems').select('*').order('updated_at', { ascending: false }),
          supabase.from('problem_review_schedules').select('*'),
          supabase.from('problem_review_history').select('*').order('reviewed_at', { ascending: false }),
        ]);

      const name =
        user?.user?.user_metadata?.full_name ||
        user?.user?.email?.split('@')[0] ||
        'Learner';
      setUserName(name);

      setProblems(pData || []);
      setSchedules(sData || []);
      setHistory(hData || []);

      // Fetch curriculum stats & onboarding status
      const [currRes, onbRes] = await Promise.all([
        fetch('/api/curriculum'),
        fetch('/api/curriculum/onboarding'),
      ]);

      if (currRes.ok) {
        const cData = await currRes.json();
        setCurriculumData(cData);
      }

      if (onbRes.ok) {
        const oData = await onbRes.json();
        setHasCompletedOnboarding(!!oData.completedOnboarding);
      }

      // Fetch all activity timestamps for deterministic streak calculation
      if (user?.user?.id) {
        const [
          { data: actEvents },
          { data: currHistory },
          { data: currProgress },
        ] = await Promise.all([
          supabase.from('activity_events').select('created_at').eq('user_id', user.user.id).limit(100),
          supabase.from('user_curriculum_review_history').select('reviewed_at').eq('user_id', user.user.id).limit(100),
          supabase.from('user_curriculum_progress').select('last_activity_at').eq('user_id', user.user.id).limit(100),
        ]);

        const timestamps = [
          ...(hData || []).map((h) => h.reviewed_at),
          ...(actEvents || []).map((e) => e.created_at),
          ...(currHistory || []).map((h) => h.reviewed_at),
          ...(currProgress || []).map((p) => p.last_activity_at),
        ].filter(Boolean);

        setAllTimestamps(timestamps);
      }
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const execute = async () => {
      await loadData();
    };
    execute();
  }, []);

  // Compute metrics purely from real database state
  const metrics = useMemo(() => {
    const totalProblems = problems.length;
    const solvedCount = problems.filter((p) => p.status === 'Solved').length;
    const cat = categorizeReviews(schedules);
    const dueCount = cat.totalActionable;
    const streak = calculateStreak(allTimestamps);

    return {
      totalProblems,
      solvedCount,
      dueCount,
      streak,
    };
  }, [problems, schedules, allTimestamps]);

  const recentProblems = useMemo(() => {
    return problems.slice(0, 5);
  }, [problems]);

  const currStats = curriculumData?.stats || {
    totalProblems: 463,
    totalSolved: 0,
    completionPercent: 0,
    totalTopicsStudied: 0,
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto overflow-y-auto">
      {/* Onboarding Wizard Modal */}
      <CurrentProgressWizard
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
        curriculumData={curriculumData}
        initialMode="choice"
        onComplete={() => {
          setHasCompletedOnboarding(true);
          loadData();
        }}
      />

      {/* Top Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-muted">{greeting}</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>{userName}</span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-muted mt-0.5">Keep learning, keep growing!</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowOnboardingModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-amber-400/40 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Update My Progress</span>
          </button>

          <Link href="/problems/new">
            <Button size="md" className="gap-2 font-bold">
              <span>+ New Note</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* New User Onboarding Callout Banner (if onboarding not completed) */}
      {!hasCompletedOnboarding && (
        <div className="p-5 rounded-2xl border border-amber-400/30 bg-amber-400/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-fade-in">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-accent text-accent-text text-[10px] font-black uppercase">
                Welcome Onboarding
              </span>
              <span className="text-xs font-bold text-amber-400">
                Setup your Striver A2Z DSA progress
              </span>
            </div>
            <p className="text-xs text-muted max-w-xl leading-relaxed">
              Have you already solved problems on Striver’s sheet? Mark your completed topics and questions so you don’t have to start from scratch.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowOnboardingModal(true)}
              className="px-4 py-2 rounded-xl bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs tracking-wide shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start From My Current Progress</span>
            </button>
          </div>
        </div>
      )}

      {/* 4 KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl border border-border bg-card shadow-xs">
          <span className="text-2xl sm:text-3xl font-bold text-foreground block">
            {metrics.solvedCount}
          </span>
          <span className="text-xs text-muted block mt-1">Problems Solved</span>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card shadow-xs">
          <span className="text-2xl sm:text-3xl font-bold text-amber-400 block">
            {metrics.dueCount}
          </span>
          <span className="text-xs text-muted block mt-1">Due Today</span>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card shadow-xs">
          <span className="text-2xl sm:text-3xl font-bold text-foreground block">
            {metrics.totalProblems}
          </span>
          <span className="text-xs text-muted block mt-1">Custom Notes</span>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card shadow-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold text-foreground">
              {metrics.streak}
            </span>
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <span className="text-xs text-muted block mt-1">Streak</span>
        </div>
      </div>

      {/* Preinstalled Striver A2Z DSA Sheet Card */}
      <div className="p-5 rounded-2xl border border-border bg-card flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xs">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent text-accent-text flex items-center justify-center font-black text-xs shadow-sm">
              A2Z
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <span>Striver A2Z DSA Sheet</span>
                <span className="text-[10px] text-muted font-normal">• Preinstalled</span>
              </h3>
              <p className="text-[11px] text-muted">
                {currStats.totalTopicsStudied} of 18 Topics Studied • {currStats.totalSolved} of 463 Questions Solved
              </p>
            </div>
          </div>

          <div className="w-full max-w-md h-2 rounded-full bg-border overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(currStats.completionPercent, 2))}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/sheets/striver-a2z"
            className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-accent-text font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span>Open Sheet</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Today's Revision Banner */}
      <div className="p-5 rounded-2xl border border-amber-400/30 bg-amber-400/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 block">
            Today&apos;s Revision
          </span>
          <p className="text-sm font-semibold text-foreground mt-0.5">
            {metrics.dueCount > 0
              ? `${metrics.dueCount} problems due for active recall`
              : 'All caught up! No problems due for revision today'}
          </p>
        </div>

        {metrics.dueCount > 0 ? (
          <Link href="/revision">
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs tracking-wide shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Start Revision</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        ) : (
          <Link href="/sheets/striver-a2z">
            <button
              type="button"
              className="px-4 py-2 rounded-xl border border-border bg-panel hover:bg-elevated text-foreground font-bold text-xs tracking-wide shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Practice Problems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        )}
      </div>

      {/* Recent Activity */}
      <div className="p-5 rounded-2xl border border-border bg-panel space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Recent Notes & Activity
          </span>
          <Link
            href="/problems"
            className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentProblems.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <p className="text-sm font-semibold text-foreground">No notes created yet</p>
            <p className="text-xs text-muted">
              Start by adding your first problem note to track your algorithmic progress.
            </p>
            <Link href="/problems/new" className="inline-block mt-2">
              <Button size="sm">Create First Note</Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border/60 text-xs">
            {recentProblems.map((item) => (
              <Link
                key={item.id}
                href={`/problems/${item.id}`}
                className="py-3 flex items-center justify-between hover:bg-elevated/40 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      item.status === 'Solved' ? 'text-emerald-500' : 'text-muted'
                    }`}
                  />
                  <div>
                    <span className="font-semibold text-foreground text-sm block">
                      {item.title}
                    </span>
                    <span className="text-muted text-xs">
                      {item.difficulty} • {item.language || 'Code'}
                    </span>
                  </div>
                </div>

                <span className="text-muted text-xs">
                  {new Date(item.updated_at || item.created_at).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
