'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarCheck2, X, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DailyReviewModal({ dueCount = 0 }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(() => {
    if (dueCount <= 0 || typeof window === 'undefined') return false;
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const dismissedDate = sessionStorage.getItem('algonotes_review_prompt_dismissed');
      return dismissedDate !== todayStr;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (dueCount <= 0) return;

    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const dismissedDate = sessionStorage.getItem('algonotes_review_prompt_dismissed');

      if (dismissedDate !== todayStr) {
        const timer = setTimeout(() => setIsOpen(true), 0);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, [dueCount]);

  const handleDismiss = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    sessionStorage.setItem('algonotes_review_prompt_dismissed', todayStr);
    setIsOpen(false);
  };

  const handleStartReview = () => {
    handleDismiss();
    router.push('/revision');
  };

  if (!isOpen || dueCount <= 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Daily Spaced Repetition Due"
        className="relative w-full max-w-md rounded-2xl border border-border bg-panel shadow-2xl p-6 text-foreground"
      >
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-muted hover:text-foreground p-1 rounded-lg hover:bg-elevated transition-colors"
          aria-label="Dismiss review prompt"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-500">
            <CalendarCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-base text-foreground">
              Daily Spaced Repetition Due
            </h3>
            <p className="text-xs text-muted">
              Active recall keeps your DSA patterns fresh.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-elevated/50 mb-5 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-amber-400">{dueCount}</span>
            <span className="text-xs text-muted ml-2">problems scheduled for recall today</span>
          </div>
          <span className="text-xs text-muted flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> ~{Math.max(5, dueCount * 2)} mins
          </span>
        </div>

        <div className="flex items-center justify-end gap-2.5">
          <Button variant="outline" size="sm" onClick={handleDismiss}>
            Postpone for Later
          </Button>
          <Button variant="default" size="sm" onClick={handleStartReview} className="gap-1.5">
            <span>Start Active Recall</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

