'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  CalendarCheck2,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  History,
  Brain,
  ChevronRight,
  ExternalLink,
  Trash2,
  MoreVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DifficultyBadge } from '@/components/ui/Badge';
import { DailyRevisionChecklist } from '@/components/revision/DailyRevisionChecklist';
import { ActiveRecallSession } from '@/components/revision/ActiveRecallSession';
import { cn } from '@/lib/utils/cn';

export default function RevisionPage() {
  const [data, setData] = useState({
    summary: { dueToday: 0, overdue: 0, upcoming: 0, totalInSystem: 0, totalActionable: 0 },
    dueToday: [],
    overdue: [],
    upcoming: [],
    allSchedules: [],
    history: [],
    completedToday: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('due'); // 'due' | 'overdue' | 'upcoming' | 'history'
  const [activeSessionProblem, setActiveSessionProblem] = useState(null);
  const [snoozeMenuOpenId, setSnoozeMenuOpenId] = useState(null);

  const fetchRevisionData = useCallback(async () => {
    try {
      const res = await fetch('/api/revision');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Error fetching revision data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRevisionData();

    const handleUpdate = () => {
      fetchRevisionData();
    };
    window.addEventListener('revision-updated', handleUpdate);
    return () => window.removeEventListener('revision-updated', handleUpdate);
  }, [fetchRevisionData]);

  // Combined actionable list for checklist
  const actionableItems = useMemo(() => {
    return [...(data.overdue || []), ...(data.dueToday || [])];
  }, [data.overdue, data.dueToday]);

  const currentTabItems = useMemo(() => {
    if (activeTab === 'due') return data.dueToday || [];
    if (activeTab === 'overdue') return data.overdue || [];
    if (activeTab === 'upcoming') return data.upcoming || [];
    return [];
  }, [activeTab, data]);

  // Handle Snooze
  const handleSnooze = async (item, daysToAdd) => {
    try {
      setSnoozeMenuOpenId(null);
      const res = await fetch('/api/revision', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: item.problem_id,
          isCurriculum: item.is_curriculum,
          daysToAdd,
        }),
      });

      if (res.ok) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('revision-updated'));
        }
        fetchRevisionData();
      }
    } catch (err) {
      console.error('Error snoozing review:', err);
    }
  };

  // Handle Remove from Revision
  const handleRemove = async (item) => {
    if (!window.confirm(`Remove "${item.title}" from your revision schedule?`)) return;

    try {
      setSnoozeMenuOpenId(null);
      const res = await fetch(
        `/api/revision?problemId=${encodeURIComponent(item.problem_id)}&isCurriculum=${item.is_curriculum}`,
        { method: 'DELETE' }
      );

      if (res.ok) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('revision-updated'));
        }
        fetchRevisionData();
      }
    } catch (err) {
      console.error('Error removing problem:', err);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CalendarCheck2 className="w-6 h-6 text-amber-400" />
            Spaced Repetition Revision
          </h1>
          <p className="text-xs text-muted mt-1">
            Strengthen memory retention with scheduled active recall sessions (Day 1 → 7 → 21 → 45).
          </p>
        </div>

        {data.summary.totalActionable > 0 && (
          <Button
            size="md"
            onClick={() => {
              const first = actionableItems[0];
              if (first) {
                // If it's a custom problem, open ActiveRecallSession modal
                if (!first.is_curriculum) {
                  setActiveSessionProblem({
                    id: first.problem_id,
                    title: first.title,
                    difficulty: first.difficulty,
                    schedule: {
                      stage: first.stage,
                      review_count: first.review_count,
                    },
                  });
                } else {
                  // Direct navigation to curriculum problem view
                  window.location.href = first.url;
                }
              }
            }}
            className="gap-2 bg-amber-400 text-black hover:bg-amber-300 font-semibold"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Review Session ({data.summary.totalActionable})</span>
          </Button>
        )}
      </div>

      {/* Summary Stat Cards (Single source of truth matching unified totals) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl border border-border bg-panel">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
            Due Today
          </span>
          <span className="text-2xl font-bold text-amber-400 mt-1 block">
            {data.summary.dueToday}
          </span>
          <span className="text-[11px] text-muted">Ready for recall</span>
        </div>

        <div className="p-4 rounded-xl border border-border bg-panel">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
            Overdue
          </span>
          <span className="text-2xl font-bold text-rose-500 mt-1 block">
            {data.summary.overdue}
          </span>
          <span className="text-[11px] text-muted">Prioritize first</span>
        </div>

        <div className="p-4 rounded-xl border border-border bg-panel">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
            Upcoming
          </span>
          <span className="text-2xl font-bold text-foreground mt-1 block">
            {data.summary.upcoming}
          </span>
          <span className="text-[11px] text-muted">Future intervals</span>
        </div>

        <div className="p-4 rounded-xl border border-border bg-panel">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
            Total In System
          </span>
          <span className="text-2xl font-bold text-foreground mt-1 block">
            {data.summary.totalInSystem}
          </span>
          <span className="text-[11px] text-muted">Scheduled problems</span>
        </div>
      </div>

      {/* NEW FEATURE: Today's Revision Checklist with Progress Bar & Rating Dialog */}
      <DailyRevisionChecklist
        actionableItems={actionableItems}
        completedToday={data.completedToday || []}
        onRefresh={fetchRevisionData}
      />

      {/* Revision Tabs */}
      <div className="flex items-center gap-2 border-b border-border text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('due')}
          className={`py-2.5 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'due'
              ? 'border-amber-400 text-foreground font-semibold'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <span>Due Today</span>
          <span className="px-1.5 py-0.2 rounded-full bg-elevated text-[11px]">
            {data.summary.dueToday}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('overdue')}
          className={`py-2.5 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'overdue'
              ? 'border-rose-500 text-foreground font-semibold'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <span>Overdue</span>
          <span className="px-1.5 py-0.2 rounded-full bg-rose-500/15 text-rose-500 text-[11px]">
            {data.summary.overdue}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`py-2.5 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'upcoming'
              ? 'border-amber-400 text-foreground font-semibold'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <span>Upcoming</span>
          <span className="px-1.5 py-0.2 rounded-full bg-elevated text-[11px]">
            {data.summary.upcoming}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`py-2.5 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'history'
              ? 'border-amber-400 text-foreground font-semibold'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Review History</span>
          <span className="px-1.5 py-0.2 rounded-full bg-elevated text-[11px]">
            {(data.history || []).length}
          </span>
        </button>
      </div>

      {/* Tab Panels */}
      {loading ? (
        <div className="p-12 text-center text-xs text-muted flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          Loading revision schedule...
        </div>
      ) : activeTab === 'history' ? (
        /* Unified History View */
        <div className="rounded-xl border border-border bg-panel overflow-hidden">
          {(data.history || []).length === 0 ? (
            <div className="p-10 text-center text-xs text-muted">
              No review history recorded yet. Complete an active recall session to log progress.
            </div>
          ) : (
            <div className="divide-y divide-border/60 text-xs">
              {(data.history || []).map((h) => {
                const reviewedDate = new Date(h.reviewed_at);
                return (
                  <div
                    key={`${h.is_curriculum ? 'curr' : 'cust'}-${h.id}`}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-elevated/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {h.problem_number && (
                          <span className="font-mono text-muted text-[11px]">
                            #{h.problem_number}
                          </span>
                        )}
                        <Link
                          href={h.url}
                          className="font-semibold text-foreground hover:text-amber-400"
                        >
                          {h.title}
                        </Link>
                        {h.difficulty && <DifficultyBadge difficulty={h.difficulty} />}
                        <span className="text-[10px] text-muted px-1.5 py-0.2 bg-elevated rounded">
                          {h.is_curriculum ? 'Curriculum' : 'Personal Note'}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted">
                        Rating:{' '}
                        <span
                          className={cn(
                            'font-semibold',
                            h.rating === 'Forgot'
                              ? 'text-rose-400'
                              : h.rating === 'Difficult'
                              ? 'text-amber-400'
                              : h.rating === 'Good'
                              ? 'text-blue-400'
                              : 'text-emerald-400'
                          )}
                        >
                          {h.rating}
                        </span>{' '}
                        • Stage {h.stage_before} → Stage {h.stage_after}
                      </p>
                    </div>
                    <span className="text-[11px] text-muted shrink-0">
                      {reviewedDate.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Unified Schedule Items View (Due / Overdue / Upcoming) */
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
                const isOverdue =
                  item.next_review_at &&
                  new Date(item.next_review_at) <
                    new Date(new Date().setHours(0, 0, 0, 0));

                return (
                  <div
                    key={`${item.is_curriculum ? 'curr' : 'cust'}-${item.id}`}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-elevated/40 transition-colors"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.problem_number && (
                          <span className="font-mono text-muted text-[11px]">
                            #{item.problem_number}
                          </span>
                        )}
                        <Link
                          href={item.url}
                          className="font-semibold text-foreground hover:text-amber-400 truncate"
                        >
                          {item.title}
                        </Link>
                        <DifficultyBadge difficulty={item.difficulty} />
                        <span className="text-[10px] text-muted px-1.5 py-0.2 bg-elevated rounded">
                          {item.is_curriculum ? 'Curriculum' : 'Personal Note'}
                        </span>
                        {isOverdue && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-500">
                            Overdue
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-muted flex-wrap">
                        <span className="text-amber-400 font-medium">Stage {item.display_stage}</span>
                        <span>•</span>
                        <span>
                          Scheduled:{' '}
                          {item.next_review_at
                            ? new Date(item.next_review_at).toLocaleDateString()
                            : item.next_review_date}
                        </span>
                        <span>•</span>
                        <span>Reviewed {item.review_count} times</span>
                        {item.topic_name && (
                          <>
                            <span>•</span>
                            <span className="truncate">{item.topic_name}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 relative">
                      <Link
                        href={item.url}
                        className="px-2.5 py-1 rounded-lg border border-border bg-panel hover:bg-elevated text-xs font-medium text-foreground transition-colors flex items-center gap-1"
                      >
                        <span>Open Problem</span>
                        <ExternalLink className="w-3 h-3 text-muted" />
                      </Link>

                      {/* Snooze & Options */}
                      <button
                        type="button"
                        onClick={() =>
                          setSnoozeMenuOpenId(
                            snoozeMenuOpenId === item.id ? null : item.id
                          )
                        }
                        title="Options"
                        className="p-1 rounded-md text-muted hover:text-foreground hover:bg-elevated transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {snoozeMenuOpenId === item.id && (
                        <div className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-border bg-elevated shadow-xl z-20 py-1 text-xs">
                          <div className="px-3 py-1 text-[10px] font-semibold text-muted uppercase tracking-wider">
                            Snooze Review
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSnooze(item, 1)}
                            className="w-full text-left px-3 py-1.5 hover:bg-panel flex items-center justify-between text-foreground"
                          >
                            <span>+1 Day (Tomorrow)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSnooze(item, 3)}
                            className="w-full text-left px-3 py-1.5 hover:bg-panel flex items-center justify-between text-foreground"
                          >
                            <span>+3 Days</span>
                          </button>
                          <div className="border-t border-border/60 my-1" />
                          <button
                            type="button"
                            onClick={() => handleRemove(item)}
                            className="w-full text-left px-3 py-1.5 hover:bg-rose-500/10 text-rose-400 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove from Revision</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Active Recall Modal Session for custom problems */}
      {activeSessionProblem && (
        <ActiveRecallSession
          problem={activeSessionProblem}
          onCompleteReview={() => {
            setActiveSessionProblem(null);
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new Event('revision-updated'));
            }
            fetchRevisionData();
          }}
          onClose={() => setActiveSessionProblem(null)}
        />
      )}
    </div>
  );
}
