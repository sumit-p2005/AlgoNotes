'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Award,
  CalendarCheck2,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

export default function AnalyticsPage() {
  const [problems, setProblems] = useState([]);
  const [topics, setTopics] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [history, setHistory] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const [
          { data: pData },
          { data: tData },
          { data: patData },
          { data: hData },
          { data: sData },
        ] = await Promise.all([
          supabase.from('problems').select('*'),
          supabase.from('topics').select('*'),
          supabase.from('patterns').select('*'),
          supabase.from('problem_review_history').select('*'),
          supabase.from('problem_review_schedules').select('*'),
        ]);

        setProblems(pData || []);
        setTopics(tData || []);
        setPatterns(patData || []);
        setHistory(hData || []);
        setSchedules(sData || []);
      } catch (err) {
        console.error('Analytics load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Compute Analytics
  const analytics = useMemo(() => {
    const totalProblems = problems.length;
    const solvedCount = problems.filter((p) => p.status === 'Solved').length;
    const attemptedCount = problems.filter((p) => p.status === 'Attempted').length;
    const savedCount = problems.filter((p) => p.status === 'Saved').length;

    // Difficulty breakdown
    const easyCount = problems.filter((p) => p.difficulty === 'Easy').length;
    const mediumCount = problems.filter((p) => p.difficulty === 'Medium').length;
    const hardCount = problems.filter((p) => p.difficulty === 'Hard').length;

    // Recall stats
    const totalReviews = history.length;
    const forgotCount = history.filter((h) => h.rating === 'Forgot').length;
    const difficultCount = history.filter((h) => h.rating === 'Difficult').length;
    const goodCount = history.filter((h) => h.rating === 'Good').length;
    const easyRecallCount = history.filter((h) => h.rating === 'Easy').length;

    const recallRate =
      totalReviews > 0
        ? Math.round(((goodCount + easyRecallCount) / totalReviews) * 100)
        : 0;

    // Weak patterns / areas needing attention
    // Problems with confidence rating <= 2 or last rating = 'Forgot'
    const shakyProblems = problems.filter((p) => p.confidence_rating <= 2);

    return {
      totalProblems,
      solvedCount,
      attemptedCount,
      savedCount,
      easyCount,
      mediumCount,
      hardCount,
      totalReviews,
      forgotCount,
      difficultCount,
      goodCount,
      easyRecallCount,
      recallRate,
      shakyProblems,
    };
  }, [problems, history]);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-accent" />
          DSA Mastery & Retention Analytics
        </h1>
        <p className="text-xs text-muted mt-1">
          Measurable insights into your algorithmic preparation, retention curve, and mastery gaps.
        </p>
      </div>

      {/* Retention & Mastery Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Retention Rate */}
        <div className="p-5 rounded-xl border border-border bg-panel shadow-xs space-y-2">
          <span className="text-xs font-semibold uppercase text-muted tracking-wider flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-accent" />
            Active Recall Accuracy
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-amber-400">
              {analytics.recallRate}%
            </span>
            <span className="text-xs text-muted">
              ({analytics.goodCount + analytics.easyRecallCount} / {analytics.totalReviews} sessions)
            </span>
          </div>
          <p className="text-[11px] text-muted">
            Independent solution recall without revealing hints.
          </p>
        </div>

        {/* Solved vs Saved */}
        <div className="p-5 rounded-xl border border-border bg-panel shadow-xs space-y-2">
          <span className="text-xs font-semibold uppercase text-muted tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Solved Completion
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-500">
              {analytics.solvedCount}
            </span>
            <span className="text-xs text-muted">
              / {analytics.totalProblems} problems marked solved
            </span>
          </div>
          <p className="text-[11px] text-muted">
            {analytics.totalProblems > 0
              ? `${Math.round((analytics.solvedCount / analytics.totalProblems) * 100)}% of documented catalog solved`
              : 'Add problem notes to track solve completion'}
          </p>
        </div>

        {/* Weak Problems Needing Attention */}
        <div className="p-5 rounded-xl border border-border bg-panel shadow-xs space-y-2">
          <span className="text-xs font-semibold uppercase text-muted tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            Focus Areas
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-rose-500">
              {analytics.shakyProblems.length}
            </span>
            <span className="text-xs text-muted">problems with low confidence</span>
          </div>
          <p className="text-[11px] text-muted">
            Prioritize for revision sessions to convert to mastery.
          </p>
        </div>
      </div>

      {/* Difficulty Distribution & Review Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Difficulty Breakdown */}
        <div className="p-5 rounded-xl border border-border bg-panel shadow-xs space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted block">
            Difficulty Distribution
          </span>

          <div className="space-y-3 text-xs">
            {/* Easy */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-emerald-500">Easy</span>
                <span className="text-muted">{analytics.easyCount} problems</span>
              </div>
              <div className="w-full bg-elevated h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{
                    width: `${analytics.totalProblems ? (analytics.easyCount / analytics.totalProblems) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-amber-500">Medium</span>
                <span className="text-muted">{analytics.mediumCount} problems</span>
              </div>
              <div className="w-full bg-elevated h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full"
                  style={{
                    width: `${analytics.totalProblems ? (analytics.mediumCount / analytics.totalProblems) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Hard */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-rose-500">Hard</span>
                <span className="text-muted">{analytics.hardCount} problems</span>
              </div>
              <div className="w-full bg-elevated h-2 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full"
                  style={{
                    width: `${analytics.totalProblems ? (analytics.hardCount / analytics.totalProblems) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recall Rating Distribution */}
        <div className="p-5 rounded-xl border border-border bg-panel shadow-xs space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted block">
            Recall Response Distribution ({analytics.totalReviews} Total Reviews)
          </span>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-center">
              <span className="text-lg font-bold text-red-500">{analytics.forgotCount}</span>
              <span className="block text-[11px] text-muted mt-0.5">Forgot (Reset)</span>
            </div>

            <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-center">
              <span className="text-lg font-bold text-amber-500">{analytics.difficultCount}</span>
              <span className="block text-[11px] text-muted mt-0.5">Difficult (+3d)</span>
            </div>

            <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-center">
              <span className="text-lg font-bold text-emerald-500">{analytics.goodCount}</span>
              <span className="block text-[11px] text-muted mt-0.5">Good (Adv. stage)</span>
            </div>

            <div className="p-3 rounded-lg border border-blue-500/30 bg-blue-500/10 text-center">
              <span className="text-lg font-bold text-blue-500">{analytics.easyRecallCount}</span>
              <span className="block text-[11px] text-muted mt-0.5">Easy (+2 stages)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
