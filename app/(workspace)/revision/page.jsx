'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  CalendarCheck2,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Calendar,
  History,
  Brain,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { DifficultyBadge } from '@/components/ui/Badge';
import { ActiveRecallSession } from '@/components/revision/ActiveRecallSession';
import { categorizeReviews } from '@/lib/revision/scheduler';

export default function RevisionPage() {
  const [schedules, setSchedules] = useState([]);
  const [history, setHistory] = useState([]);
  const [problemsMap, setProblemsMap] = useState({});
  const [activeSessionProblem, setActiveSessionProblem] = useState(null);
  const [activeTab, setActiveTab] = useState('due'); // 'due' | 'overdue' | 'upcoming' | 'history'
  const [loading, setLoading] = useState(true);

  const fetchRevisionData = async () => {
    try {
      const supabase = createClient();
      const [{ data: schedData }, { data: histData }, { data: probData }] = await Promise.all([
        supabase.from('problem_review_schedules').select('*').order('next_review_at', { ascending: true }),
        supabase.from('problem_review_history').select('*').order('reviewed_at', { ascending: false }).limit(20),
        supabase.from('problems').select('*'),
      ]);

      const pMap = {};
      (probData || []).forEach((p) => {
        pMap[p.id] = p;
      });

      setSchedules(schedData || []);
      setHistory(histData || []);
      setProblemsMap(pMap);
    } catch (err) {
      console.error('Error fetching revision data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevisionData();
  }, []);

  const categorized = useMemo(() => {
    return categorizeReviews(schedules);
  }, [schedules]);

  const handleStartReview = (probId) => {
    const prob = problemsMap[probId];
    if (prob) {
      const sched = schedules.find((s) => s.problem_id === probId);
      setActiveSessionProblem({ ...prob, schedule: sched });
    }
  };

  const handleCompleteReview = (probId, rating, result) => {
    setActiveSessionProblem(null);
    fetchRevisionData();
  };

  const currentTabItems = useMemo(() => {
    if (activeTab === 'due') return categorized.dueToday;
    if (activeTab === 'overdue') return categorized.overdue;
    if (activeTab === 'upcoming') return categorized.upcoming;
    return [];
  }, [activeTab, categorized]);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CalendarCheck2 className="w-6 h-6 text-accent" />
            Spaced Repetition Revision
          </h1>
          <p className="text-xs text-muted mt-1">
            Strengthen memory retention with scheduled active recall sessions (Day 1 → 7 → 21 → 45).
          </p>
        </div>

        {categorized.totalActionable > 0 && (
          <Button
            size="md"
            onClick={() => {
              const firstId =
                categorized.overdue[0]?.problem_id || categorized.dueToday[0]?.problem_id;
              if (firstId) handleStartReview(firstId);
            }}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Review Session ({categorized.totalActionable})</span>
          </Button>
        )}
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl border border-border bg-panel">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
            Due Today
          </span>
          <span className="text-2xl font-bold text-amber-400 mt-1 block">
            {categorized.dueToday.length}
          </span>
          <span className="text-[11px] text-muted">Ready for recall</span>
        </div>

        <div className="p-4 rounded-xl border border-border bg-panel">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
            Overdue
          </span>
          <span className="text-2xl font-bold text-rose-500 mt-1 block">
            {categorized.overdue.length}
          </span>
          <span className="text-[11px] text-muted">Prioritize first</span>
        </div>

        <div className="p-4 rounded-xl border border-border bg-panel">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
            Upcoming
          </span>
          <span className="text-2xl font-bold text-foreground mt-1 block">
            {categorized.upcoming.length}
          </span>
          <span className="text-[11px] text-muted">Future intervals</span>
        </div>

        <div className="p-4 rounded-xl border border-border bg-panel">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
            Total In System
          </span>
          <span className="text-2xl font-bold text-foreground mt-1 block">
            {schedules.length}
          </span>
          <span className="text-[11px] text-muted">Scheduled problems</span>
        </div>
      </div>

      {/* Revision Tabs */}
      <div className="flex items-center gap-2 border-b border-border text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('due')}
          className={`py-2.5 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'due'
              ? 'border-accent text-foreground font-semibold'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <span>Due Today</span>
          <span className="px-1.5 py-0.2 rounded-full bg-elevated text-[11px]">
            {categorized.dueToday.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('overdue')}
          className={`py-2.5 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'overdue'
              ? 'border-accent text-foreground font-semibold'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <span>Overdue</span>
          <span className="px-1.5 py-0.2 rounded-full bg-rose-500/15 text-rose-500 text-[11px]">
            {categorized.overdue.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`py-2.5 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'upcoming'
              ? 'border-accent text-foreground font-semibold'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <span>Upcoming</span>
          <span className="px-1.5 py-0.2 rounded-full bg-elevated text-[11px]">
            {categorized.upcoming.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`py-2.5 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'border-accent text-foreground font-semibold'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Review History</span>
        </button>
      </div>

      {/* Tab Panels */}
      {loading ? (
        <div className="p-12 text-center text-xs text-muted flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          Loading revision schedule...
        </div>
      ) : activeTab === 'history' ? (
        /* History View */
        <div className="rounded-xl border border-border bg-panel overflow-hidden">
          {history.length === 0 ? (
            <div className="p-10 text-center text-xs text-muted">
              No review history recorded yet. Complete an active recall session to log progress.
            </div>
          ) : (
            <div className="divide-y divide-border/60 text-xs">
              {history.map((h) => {
                const prob = problemsMap[h.problem_id];
                return (
                  <div key={h.id} className="p-4 flex items-center justify-between hover:bg-elevated/40">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">
                          {prob?.title || 'Unknown Problem'}
                        </span>
                        {prob?.difficulty && <DifficultyBadge difficulty={prob.difficulty} />}
                      </div>
                      <p className="text-[11px] text-muted">
                        Rating: <span className="font-semibold text-foreground">{h.rating}</span> •
                        Stage {h.stage_before} → Stage {h.stage_after}
                      </p>
                    </div>
                    <span className="text-[11px] text-muted">
                      {new Date(h.reviewed_at).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Schedule Items View */
        <div className="rounded-xl border border-border bg-panel overflow-hidden">
          {currentTabItems.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="text-sm font-semibold text-foreground">All caught up!</p>
              <p className="text-xs text-muted max-w-sm mx-auto">
                {activeTab === 'due'
                  ? 'No problems currently due today. Keep learning new patterns!'
                  : activeTab === 'overdue'
                  ? 'No overdue problems in your revision queue.'
                  : 'No upcoming scheduled problems found.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/60 text-xs">
              {currentTabItems.map((item) => {
                const prob = problemsMap[item.problem_id];
                if (!prob) return null;

                return (
                  <div
                    key={item.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-elevated/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {prob.problem_number && (
                          <span className="font-mono text-muted text-[11px]">
                            #{prob.problem_number}
                          </span>
                        )}
                        <Link
                          href={`/problems/${prob.id}`}
                          className="font-semibold text-foreground hover:text-amber-400"
                        >
                          {prob.title}
                        </Link>
                        <DifficultyBadge difficulty={prob.difficulty} />
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-muted">
                        <span>Current Stage {item.stage}</span>
                        <span>•</span>
                        <span>Scheduled: {new Date(item.next_review_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Reviewed {item.review_count} times</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <Button
                        size="sm"
                        onClick={() => handleStartReview(prob.id)}
                        className="gap-1.5"
                      >
                        <Brain className="w-3.5 h-3.5" />
                        <span>Active Recall</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Active Recall Modal Session */}
      {activeSessionProblem && (
        <ActiveRecallSession
          problem={activeSessionProblem}
          onCompleteReview={handleCompleteReview}
          onClose={() => setActiveSessionProblem(null)}
        />
      )}
    </div>
  );
}
