'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RotateCcw,
  Check,
  Calendar,
  X,
  Trash2,
  MoreVertical,
} from 'lucide-react';
import { DifficultyBadge } from '@/components/ui/Badge';
import { RECALL_RATINGS } from '@/lib/revision/scheduler';
import { cn } from '@/lib/utils/cn';

export function DailyRevisionChecklist({
  actionableItems = [],
  completedToday = [],
  onRefresh,
}) {
  const [selectedItemForReview, setSelectedItemForReview] = useState(null);
  const [ratingSelection, setRatingSelection] = useState(RECALL_RATINGS.GOOD);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snoozeMenuOpenId, setSnoozeMenuOpenId] = useState(null);
  const [showCompletedList, setShowCompletedList] = useState(true);

  // Calculate Progress
  const totalToday = actionableItems.length + completedToday.length;
  const completedCount = completedToday.length;
  const percentCompleted = totalToday > 0 ? Math.round((completedCount / totalToday) * 100) : 100;
  const allCaughtUp = totalToday === 0;
  const allFinishedToday = totalToday > 0 && actionableItems.length === 0;

  // Handle opening the recall modal
  const handleOpenRatingModal = (item) => {
    setSelectedItemForReview(item);
    setRatingSelection(RECALL_RATINGS.GOOD);
  };

  // Handle rating submission
  const handleSubmitReview = async () => {
    if (!selectedItemForReview || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/revision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: selectedItemForReview.problem_id,
          isCurriculum: selectedItemForReview.is_curriculum,
          rating: ratingSelection,
          currentStage: selectedItemForReview.stage,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit revision');
      }

      // Close modal
      setSelectedItemForReview(null);

      // Notify global shell for real-time sidebar badge update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('revision-updated'));
      }

      // Refresh parent page state
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Error saving review: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      console.error('Error snoozing review:', err);
    }
  };

  // Handle Remove from Revision
  const handleRemove = async (item) => {
    if (!window.confirm(`Remove "${item.title}" from your revision schedule?`)) return;

    try {
      const res = await fetch(
        `/api/revision?problemId=${encodeURIComponent(item.problem_id)}&isCurriculum=${item.is_curriculum}`,
        { method: 'DELETE' }
      );

      if (res.ok) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('revision-updated'));
        }
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      console.error('Error removing problem:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Progress Bar & Checklist Header */}
      <div className="rounded-2xl border border-border bg-panel p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <h2 className="text-base font-bold text-foreground">
                Today&apos;s Revision Checklist
              </h2>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Review due problems to strengthen memory retention and advance spaced repetition stages.
            </p>
          </div>

          {/* Progress Pill */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-right">
              <span className="text-xs font-bold text-foreground">
                {completedCount} of {totalToday} completed
              </span>
              <span className="text-[11px] text-muted block">
                {percentCompleted}% completed
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center font-mono font-bold text-xs text-amber-400">
              {percentCompleted}%
            </div>
          </div>
        </div>

        {/* Visual Progress Track */}
        <div className="w-full h-2 rounded-full bg-elevated overflow-hidden border border-border/50">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${percentCompleted}%` }}
          />
        </div>

        {/* Empty States */}
        {allCaughtUp && (
          <div className="py-6 px-4 rounded-xl border border-border/60 bg-card/60 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-semibold text-foreground">
              You&apos;re all caught up!
            </p>
            <p className="text-xs text-muted max-w-md mx-auto">
              No revisions scheduled for today. Keep learning new patterns in your DSA Sheets or My Notes.
            </p>
          </div>
        )}

        {allFinishedToday && (
          <div className="py-6 px-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-center space-y-2">
            <Sparkles className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
            <p className="text-sm font-bold text-emerald-400">
              Today&apos;s revision completed! Great work.
            </p>
            <p className="text-xs text-muted max-w-md mx-auto">
              All {completedCount} scheduled problems reviewed. Your active recall intervals have been updated.
            </p>
          </div>
        )}

        {/* 2. Actionable Pending List */}
        {actionableItems.length > 0 && (
          <div className="divide-y divide-border/60 rounded-xl border border-border bg-card overflow-hidden">
            {actionableItems.map((item) => {
              const isOverdue =
                item.next_review_at &&
                new Date(item.next_review_at) <
                  new Date(new Date().setHours(0, 0, 0, 0));

              return (
                <div
                  key={`${item.is_curriculum ? 'curr' : 'cust'}-${item.id}`}
                  className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-elevated/40 transition-colors"
                >
                  {/* Left: Checkbox & Problem Info */}
                  <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => handleOpenRatingModal(item)}
                      title="Click to submit active recall rating"
                      className="mt-0.5 sm:mt-0 w-5 h-5 rounded-md border-2 border-border hover:border-amber-400 bg-panel flex items-center justify-center text-transparent hover:text-amber-400/50 transition-all cursor-pointer shrink-0"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.problem_number && (
                          <span className="font-mono text-xs text-muted shrink-0">
                            #{item.problem_number}
                          </span>
                        )}
                        <Link
                          href={item.url}
                          className="text-xs font-semibold text-foreground hover:text-amber-400 transition-colors truncate"
                        >
                          {item.title}
                        </Link>
                        <DifficultyBadge difficulty={item.difficulty} />
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-elevated text-muted border border-border/50">
                          Stage {item.display_stage}
                        </span>

                        {/* Overdue vs Due Today Indicator */}
                        {isOverdue ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Overdue
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Due Today
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-muted mt-1">
                        <span className="truncate">{item.topic_name}</span>
                        <span>•</span>
                        <span>{item.is_curriculum ? 'Curriculum' : 'Personal Note'}</span>
                        {item.review_count > 0 && (
                          <>
                            <span>•</span>
                            <span>Reviewed {item.review_count}x</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 relative">
                    <Link
                      href={item.url}
                      className="px-2.5 py-1 rounded-lg border border-border bg-panel hover:bg-elevated text-xs font-medium text-foreground transition-colors flex items-center gap-1"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3 h-3 text-muted" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleOpenRatingModal(item)}
                      className="px-3 py-1 rounded-lg bg-amber-400 text-black hover:bg-amber-300 text-xs font-semibold transition-all cursor-pointer"
                    >
                      Rate & Complete
                    </button>

                    {/* Snooze Dropdown */}
                    <button
                      type="button"
                      onClick={() =>
                        setSnoozeMenuOpenId(
                          snoozeMenuOpenId === item.id ? null : item.id
                        )
                      }
                      title="More options"
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

      {/* 3. Completed Today Section */}
      {completedToday.length > 0 && (
        <div className="rounded-2xl border border-border bg-panel p-4 space-y-3">
          <button
            type="button"
            onClick={() => setShowCompletedList(!showCompletedList)}
            className="w-full flex items-center justify-between text-xs font-bold text-foreground cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Completed Today ({completedToday.length})</span>
            </div>
            {showCompletedList ? (
              <ChevronUp className="w-4 h-4 text-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted" />
            )}
          </button>

          {showCompletedList && (
            <div className="divide-y divide-border/60 rounded-xl border border-border bg-card overflow-hidden">
              {completedToday.map((h) => {
                const reviewedDate = new Date(h.reviewed_at);
                const timeString = reviewedDate.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={h.id}
                    className="p-3 flex items-center justify-between gap-3 text-xs opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 truncate">
                          {h.problem_number && (
                            <span className="font-mono text-muted text-[11px]">
                              #{h.problem_number}
                            </span>
                          )}
                          <Link
                            href={h.url}
                            className="font-medium text-foreground hover:text-amber-400 line-through text-muted hover:no-underline"
                          >
                            {h.title}
                          </Link>
                          {h.difficulty && <DifficultyBadge difficulty={h.difficulty} />}
                        </div>
                        <p className="text-[10px] text-muted mt-0.5">
                          Completed at {timeString}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded text-[10px] font-bold',
                          h.rating === 'Forgot'
                            ? 'bg-rose-500/20 text-rose-400'
                            : h.rating === 'Difficult'
                            ? 'bg-amber-500/20 text-amber-400'
                            : h.rating === 'Good'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        )}
                      >
                        {h.rating}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. Active Recall Rating Dialog */}
      {selectedItemForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl border border-border bg-panel shadow-2xl p-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider block">
                  Active Recall Check
                </span>
                <h3 className="text-base font-bold text-foreground mt-0.5">
                  How well did you recall this problem?
                </h3>
                <p className="text-xs text-muted truncate mt-0.5 font-medium">
                  #{selectedItemForReview.problem_number} {selectedItemForReview.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItemForReview(null)}
                className="text-muted hover:text-foreground p-1 rounded-lg hover:bg-elevated"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Rating Choices */}
            <div className="space-y-2">
              {[
                {
                  id: RECALL_RATINGS.FORGOT,
                  title: 'Forgot',
                  subtitle: 'Could not recall approach. Resets to Stage 1 (Review tomorrow).',
                  color: 'hover:border-rose-500/60 hover:bg-rose-500/10 text-rose-400',
                  selectedClass: 'border-rose-500 bg-rose-500/15',
                },
                {
                  id: RECALL_RATINGS.DIFFICULT,
                  title: 'Difficult',
                  subtitle: 'Recalled with heavy effort or hints. Review in 3 days.',
                  color: 'hover:border-amber-500/60 hover:bg-amber-500/10 text-amber-400',
                  selectedClass: 'border-amber-500 bg-amber-500/15',
                },
                {
                  id: RECALL_RATINGS.GOOD,
                  title: 'Good',
                  subtitle: 'Recalled normally. Advance to next standard stage (7d/21d/45d).',
                  color: 'hover:border-blue-500/60 hover:bg-blue-500/10 text-blue-400',
                  selectedClass: 'border-blue-500 bg-blue-500/15',
                },
                {
                  id: RECALL_RATINGS.EASY,
                  title: 'Easy',
                  subtitle: 'Instant recall without hesitation. Accelerated interval (21d+).',
                  color: 'hover:border-emerald-500/60 hover:bg-emerald-500/10 text-emerald-400',
                  selectedClass: 'border-emerald-500 bg-emerald-500/15',
                },
              ].map((option) => {
                const isSelected = ratingSelection === option.id;
                return (
                  <div
                    key={option.id}
                    onClick={() => setRatingSelection(option.id)}
                    className={cn(
                      'p-3 rounded-xl border text-left cursor-pointer transition-all',
                      isSelected
                        ? option.selectedClass
                        : 'border-border bg-card hover:bg-elevated'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={cn('text-xs font-bold', option.color)}>
                        {option.title}
                      </span>
                      <div
                        className={cn(
                          'w-4 h-4 rounded-full border flex items-center justify-center text-[10px]',
                          isSelected
                            ? 'border-amber-400 bg-amber-400 text-black'
                            : 'border-border'
                        )}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-muted mt-1 leading-snug">
                      {option.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedItemForReview(null)}
                className="px-3.5 py-1.5 rounded-xl border border-border bg-panel text-xs text-muted hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitReview}
                className="px-4 py-1.5 rounded-xl bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    Confirm & Complete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
