'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  FileCode2,
  CheckCircle2,
  CalendarCheck2,
  Target,
  Flame,
  TrendingUp,
  Brain,
  Plus,
  ArrowRight,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { DifficultyBadge, StatusBadge } from '@/components/ui/Badge';
import { categorizeReviews } from '@/lib/revision/scheduler';

export default function DashboardPage() {
  const [problems, setProblems] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [history, setHistory] = useState([]);
  const [topics, setTopics] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardMetrics() {
      try {
        const supabase = createClient();
        const [
          { data: probData },
          { data: schedData },
          { data: histData },
          { data: topData },
          { data: patData },
        ] = await Promise.all([
          supabase.from('problems').select('*').order('created_at', { ascending: false }),
          supabase.from('problem_review_schedules').select('*'),
          supabase.from('problem_review_history').select('*').order('reviewed_at', { ascending: false }),
          supabase.from('topics').select('*'),
          supabase.from('patterns').select('*'),
        ]);

        setProblems(probData || []);
        setSchedules(schedData || []);
        setHistory(histData || []);
        setTopics(topData || []);
        setPatterns(patData || []);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardMetrics();
  }, []);

  // Compute metrics from actual database records
  const metrics = useMemo(() => {
    const totalSaved = problems.length;
    const totalSolved = problems.filter((p) => p.status === 'Solved').length;
    const totalAttempted = problems.filter((p) => p.status === 'Attempted').length;
    const totalLearned = problems.filter((p) => p.is_learned).length;

    // Spaced repetition review categories
    const reviewCat = categorizeReviews(schedules);
    const dueCount = reviewCat.totalActionable;

    // Recall accuracy: % of (Good + Easy) / Total reviews
    const totalReviews = history.length;
    const successfulRecalls = history.filter(
      (h) => h.rating === 'Good' || h.rating === 'Easy'
    ).length;
    const recallAccuracy =
      totalReviews > 0 ? Math.round((successfulRecalls / totalReviews) * 100) : 0;

    // Streak calculation (consecutive active review/creation days)
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
      totalSaved,
      totalSolved,
      totalAttempted,
      totalLearned,
      dueCount,
      overdueCount: reviewCat.overdue.length,
      recallAccuracy,
      totalReviews,
      streak,
    };
  }, [problems, schedules, history]);

  // Topic mastery calculation
  const topicStats = useMemo(() => {
    const counts = {};
    topics.forEach((t) => {
      counts[t.id] = { id: t.id, name: t.name, total: 0, solved: 0 };
    });

    problems.forEach((p) => {
      if (counts[p.topic_id]) {
        counts[p.topic_id].total += 1;
        if (p.status === 'Solved') counts[p.topic_id].solved += 1;
      }
    });

    return Object.values(counts).slice(0, 6);
  }, [topics, problems]);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Interview Preparation Dashboard
          </h1>
          <p className="text-xs text-muted mt-1">
            Systematic tracking of patterns, active recall accuracy, and retention health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/problems/new">
            <Button size="md" className="gap-2">
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Note</span>
            </Button>
          </Link>
          <Link href="/revision">
            <Button variant="secondary" size="md" className="gap-2">
              <CalendarCheck2 className="w-4 h-4 text-amber-500" />
              <span>Daily Revision ({metrics.dueCount})</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Solved */}
        <div className="p-4 rounded-xl border border-border bg-panel shadow-xs">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Solved Problems</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-foreground">
              {metrics.totalSolved}
            </span>
            <span className="text-xs text-muted">/ {metrics.totalSaved} saved</span>
          </div>
          <div className="w-full bg-elevated h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all"
              style={{
                width: `${metrics.totalSaved ? (metrics.totalSolved / metrics.totalSaved) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        {/* Reviews Due Today */}
        <div className="p-4 rounded-xl border border-border bg-panel shadow-xs">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Due For Revision</span>
            <CalendarCheck2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-amber-400">
              {metrics.dueCount}
            </span>
            {metrics.overdueCount > 0 && (
              <span className="text-xs text-rose-500 font-medium">
                ({metrics.overdueCount} overdue)
              </span>
            )}
          </div>
          <p className="text-[11px] text-muted mt-2">Active recall intervals</p>
        </div>

        {/* Recall Accuracy */}
        <div className="p-4 rounded-xl border border-border bg-panel shadow-xs">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Recall Accuracy</span>
            <Brain className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-foreground">
              {metrics.recallAccuracy}%
            </span>
            <span className="text-xs text-muted">({metrics.totalReviews} reviews)</span>
          </div>
          <p className="text-[11px] text-muted mt-2">Good or Easy rating percentage</p>
        </div>

        {/* Current Study Streak */}
        <div className="p-4 rounded-xl border border-border bg-panel shadow-xs">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500/20" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-foreground">
              {metrics.streak}
            </span>
            <span className="text-xs text-muted">days consecutive</span>
          </div>
          <p className="text-[11px] text-muted mt-2">Consistent daily revision</p>
        </div>
      </div>

      {/* Main Content Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Recent Problems & Topic Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Problem Notes */}
          <div className="rounded-xl border border-border bg-panel overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-elevated/40">
              <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-accent" />
                Recent Problem Notes
              </span>
              <Link
                href="/problems"
                className="text-xs text-amber-500 hover:text-amber-400 font-medium flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs text-muted">Loading problems...</div>
            ) : problems.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <p className="text-sm font-semibold text-foreground">No notes created yet</p>
                <p className="text-xs text-muted">
                  Create your first DSA note to organize your solution and start spaced repetition.
                </p>
                <Link href="/problems/new" className="inline-block mt-2">
                  <Button size="sm">Create First Note</Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border/60 text-xs">
                {problems.slice(0, 5).map((p) => (
                  <div
                    key={p.id}
                    className="p-4 flex items-center justify-between hover:bg-elevated/30 transition-colors"
                  >
                    <div className="space-y-1 truncate pr-3">
                      <div className="flex items-center gap-2 truncate">
                        {p.problem_number && (
                          <span className="font-mono text-muted text-[11px]">
                            #{p.problem_number}
                          </span>
                        )}
                        <Link
                          href={`/problems/${p.id}`}
                          className="font-semibold text-foreground hover:text-amber-400 truncate"
                        >
                          {p.title}
                        </Link>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-muted">
                        <span>Updated {new Date(p.updated_at || p.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <StatusBadge status={p.status} size="sm" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <DifficultyBadge difficulty={p.difficulty} />
                      <Link
                        href={`/problems/${p.id}`}
                        className="p-1 rounded text-muted hover:text-foreground hover:bg-elevated"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Topic Progress Breakdown */}
          <div className="rounded-xl border border-border bg-panel p-5 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-4">
              Topic Coverage & Progress
            </span>

            {topicStats.length === 0 ? (
              <p className="text-xs text-muted">No topics tracked yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {topicStats.map((t) => (
                  <div key={t.id} className="p-3 rounded-lg border border-border bg-elevated/40 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>{t.name}</span>
                      <span className="text-muted text-[11px]">
                        {t.solved} / {t.total} solved
                      </span>
                    </div>
                    <div className="w-full bg-panel h-1.5 rounded-full overflow-hidden border border-border">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all"
                        style={{
                          width: `${t.total ? (t.solved / t.total) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Revision Queue & Quick Actions */}
        <div className="space-y-6">
          {/* Spaced Repetition Queue Card */}
          <div className="rounded-xl border border-border bg-panel p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <CalendarCheck2 className="w-4 h-4 text-amber-400" />
                Spaced Revision Queue
              </span>
              <span className="text-xs font-semibold text-amber-500">
                {metrics.dueCount} Due
              </span>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              Active recall on days 1, 7, 21, and 45 prevents forgetting curves and builds pattern intuition.
            </p>

            <Link href="/revision" className="block">
              <Button size="md" className="w-full gap-2">
                <Brain className="w-4 h-4" />
                <span>Begin Today&apos;s Revision</span>
              </Button>
            </Link>
          </div>

          {/* Quick Pattern Index */}
          <div className="rounded-xl border border-border bg-panel p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-400" />
                Core DSA Patterns
              </span>
              <Link href="/patterns" className="text-xs text-amber-500 hover:text-amber-400">
                Library
              </Link>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {patterns.slice(0, 8).map((pat) => (
                <Link
                  key={pat.id}
                  href={`/patterns?id=${pat.id}`}
                  className="text-xs px-2.5 py-1 rounded-md border border-border bg-elevated text-muted hover:text-foreground hover:border-amber-400/50 transition-colors"
                >
                  {pat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
