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
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { categorizeReviews } from '@/lib/revision/scheduler';

export default function DashboardPage() {
  const [problems, setProblems] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [history, setHistory] = useState([]);
  const [userName, setUserName] = useState('Sumit Patel');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const [{ data: user }, { data: pData }, { data: sData }, { data: hData }] =
          await Promise.all([
            supabase.auth.getUser(),
            supabase.from('problems').select('*').order('updated_at', { ascending: false }),
            supabase.from('problem_review_schedules').select('*'),
            supabase.from('problem_review_history').select('*').order('reviewed_at', { ascending: false }),
          ]);

        if (user?.user?.user_metadata?.full_name) {
          setUserName(user.user.user_metadata.full_name);
        }
        setProblems(pData || []);
        setSchedules(sData || []);
        setHistory(hData || []);
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Compute metrics purely from real database state
  const metrics = useMemo(() => {
    const totalProblems = problems.length;
    const solvedCount = problems.filter((p) => p.status === 'Solved').length;
    const cat = categorizeReviews(schedules);
    const dueCount = cat.totalActionable;

    // Consecutive streak calculation from real review history dates
    const reviewDates = history.map((h) => h.reviewed_at?.split('T')[0]).filter(Boolean);
    const uniqueDays = Array.from(new Set(reviewDates)).sort().reverse();

    let streak = 0;
    if (uniqueDays.length > 0) {
      const todayStr = new Date().toISOString().split('T')[0];
      const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      if (uniqueDays[0] === todayStr || uniqueDays[0] === yesterdayStr) {
        streak = 1;
        let curr = new Date(uniqueDays[0]);
        for (let i = 1; i < uniqueDays.length; i++) {
          const prev = new Date(uniqueDays[i]);
          const diffDays = Math.round((curr - prev) / (1000 * 3600 * 24));
          if (diffDays === 1) {
            streak++;
            curr = prev;
          } else {
            break;
          }
        }
      }
    }

    return {
      totalProblems,
      solvedCount,
      dueCount,
      streak,
      overdueCount: cat.overdue.length,
    };
  }, [problems, schedules, history]);

  // Actual recent problems list from database
  const recentProblems = problems.slice(0, 5);

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6 text-foreground">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-muted">Good Evening</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>{userName}</span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-muted mt-0.5">Keep learning, keep growing!</p>
        </div>

        <Link href="/problems/new">
          <Button size="md" className="gap-2 font-bold">
            <span>+ New Note</span>
          </Button>
        </Link>
      </div>

      {/* 4 KPI Metrics Grid (Real DB values) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl border border-border bg-panel">
          <span className="text-2xl sm:text-3xl font-bold text-foreground block">
            {metrics.solvedCount}
          </span>
          <span className="text-xs text-muted block mt-1">Problems Solved</span>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-panel">
          <span className="text-2xl sm:text-3xl font-bold text-amber-400 block">
            {metrics.dueCount}
          </span>
          <span className="text-xs text-muted block mt-1">Due Today</span>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-panel">
          <span className="text-2xl sm:text-3xl font-bold text-foreground block">
            {metrics.totalProblems}
          </span>
          <span className="text-xs text-muted block mt-1">Total Notes</span>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-panel">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold text-foreground">
              {metrics.streak}
            </span>
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <span className="text-xs text-muted block mt-1">Streak</span>
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
          <Link href="/problems/new">
            <button
              type="button"
              className="px-4 py-2 rounded-xl border border-border bg-panel hover:bg-elevated text-foreground font-bold text-xs tracking-wide shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Create New Note</span>
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
