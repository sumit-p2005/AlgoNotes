'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Brain,
  Eye,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Code2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DifficultyBadge } from '@/components/ui/Badge';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { MarkdownRenderer } from '@/components/editor/MarkdownRenderer';
import { calculateNextReview, RECALL_RATINGS } from '@/lib/revision/scheduler';
import { createClient } from '@/lib/supabase/client';

export function ActiveRecallSession({ problem, onCompleteReview, onClose }) {
  // Step in active recall flow:
  // 1: 'prompt' -> Problem statement shown, user attempts to recall pattern & intuition
  // 2: 'code_practice' -> (Optional) User attempts code reconstruction
  // 3: 'reveal' -> User reveals solution, approach, and hints
  // 4: 'rating' -> User rates recall (Forgot, Difficult, Good, Easy)
  const [step, setStep] = useState(1);
  const [userRecalledPattern, setUserRecalledPattern] = useState('');
  const [userRecalledIdea, setUserRecalledIdea] = useState('');
  const [codeAttempt, setCodeAttempt] = useState('// Reconstruct your solution from memory\n\n');
  const [showHints, setShowHints] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleRate = async (rating) => {
    setSubmitting(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      const currentStage = problem.schedule?.stage || 0;
      const reviewResult = calculateNextReview({
        rating,
        currentStage,
        nowDate: new Date(),
      });

      // 1. Update or create problem_review_schedules
      await supabase.from('problem_review_schedules').upsert({
        problem_id: problem.id,
        user_id: user.id,
        stage: reviewResult.nextStage,
        last_reviewed_at: new Date().toISOString(),
        next_review_at: reviewResult.nextReviewAt.toISOString(),
        review_count: (problem.schedule?.review_count || 0) + 1,
        last_rating: rating,
      });

      // 2. Insert into problem_review_history
      await supabase.from('problem_review_history').insert({
        problem_id: problem.id,
        user_id: user.id,
        rating,
        stage_before: currentStage,
        stage_after: reviewResult.nextStage,
        recalled_pattern: userRecalledPattern,
        recalled_idea: userRecalledIdea,
        code_attempt: codeAttempt,
        reviewed_at: new Date().toISOString(),
      });

      // 3. Log activity event
      await supabase.from('activity_events').insert({
        user_id: user.id,
        event_type: 'review_completed',
        problem_id: problem.id,
        metadata: {
          rating,
          nextStage: reviewResult.nextStage,
          intervalDays: reviewResult.intervalDays,
        },
      });

      onCompleteReview(problem.id, rating, reviewResult);
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('Error recording review. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-border bg-panel shadow-2xl overflow-hidden">
        {/* Session Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-elevated/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-500 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase text-muted tracking-wider">
                  Active Recall Session
                </span>
                <DifficultyBadge difficulty={problem.difficulty} size="sm" />
              </div>
              <h2 className="text-base font-bold text-foreground">
                {problem.problem_number ? `#${problem.problem_number} ` : ''}
                {problem.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs text-muted hover:text-foreground px-2.5 py-1 rounded-md border border-border"
          >
            Exit Session
          </button>
        </div>

        {/* Session Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* STEP 1: Problem Summary without solution */}
          <div className="p-4 rounded-xl border border-border bg-elevated/40">
            <h3 className="text-xs font-semibold uppercase text-muted tracking-wider mb-2">
              Problem Requirement / Personal Summary
            </h3>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {problem.summary || 'No summary entered yet. Recall the problem constraints and target goal.'}
            </p>
          </div>

          {/* Active Recall inputs */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  What core algorithmic pattern solves this?
                </label>
                <input
                  type="text"
                  value={userRecalledPattern}
                  onChange={(e) => setUserRecalledPattern(e.target.value)}
                  placeholder="e.g. Two Pointers, Monotonic Stack, Sliding Window..."
                  className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Explain the intuition & key idea (Mental Walkthrough):
                </label>
                <textarea
                  rows={3}
                  value={userRecalledIdea}
                  onChange={(e) => setUserRecalledIdea(e.target.value)}
                  placeholder="Explain why this approach works and what invariant is maintained..."
                  className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowHints(!showHints)}
                  className="text-xs text-muted hover:text-amber-400 flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHints ? 'Hide recognition clues' : 'Need a hint? Reveal clues'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setStep(2)}>
                    Code Practice (Optional)
                  </Button>
                  <Button variant="default" size="sm" onClick={() => setStep(3)}>
                    Reveal Saved Solution
                  </Button>
                </div>
              </div>

              {showHints && problem.recognition_clues && (
                <div className="p-3.5 rounded-xl border border-amber-400/30 bg-amber-400/10 text-xs text-foreground space-y-1">
                  <span className="font-semibold text-amber-500 block">Recognition Clues:</span>
                  <p>{problem.recognition_clues}</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Optional Code Reconstruction */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted uppercase">
                  Reconstruct Solution from Scratch
                </span>
                <span className="text-xs text-muted">
                  Language: {problem.language || 'javascript'}
                </span>
              </div>

              <CodeEditor
                value={codeAttempt}
                onChange={(val) => setCodeAttempt(val)}
                language={problem.language || 'javascript'}
                minHeight="260px"
              />

              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                  Back to Intuition
                </Button>
                <Button variant="default" size="sm" onClick={() => setStep(3)}>
                  Reveal Saved Solution
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3 & 4: Reveal and Recall Rating */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              {/* Saved Optimised Approach */}
              <div className="p-4 rounded-xl border border-border bg-elevated/60 space-y-2">
                <span className="text-xs font-semibold uppercase text-amber-500 tracking-wider block">
                  Saved Solution & Optimised Intuition
                </span>
                <p className="text-xs sm:text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {problem.optimised_approach || 'No detailed approach explanation was recorded.'}
                </p>
                {problem.key_points && (
                  <div className="mt-3 pt-3 border-t border-border text-xs">
                    <span className="font-semibold text-muted block mb-1">Key Points:</span>
                    <p className="text-foreground/90">{problem.key_points}</p>
                  </div>
                )}
              </div>

              {/* Saved Solution Code */}
              {problem.code && (
                <div>
                  <span className="text-xs font-semibold uppercase text-muted tracking-wider block mb-2">
                    Saved Reference Code ({problem.language})
                  </span>
                  <CodeEditor
                    value={problem.code}
                    language={problem.language}
                    readOnly={true}
                    minHeight="220px"
                  />
                </div>
              )}

              {/* Recall Rating Selector */}
              <div className="p-5 rounded-2xl border border-border bg-panel shadow-sm text-center space-y-3">
                <h4 className="text-sm font-bold text-foreground">
                  How well did you recall this solution?
                </h4>
                <p className="text-xs text-muted">
                  Your rating deterministically schedules your next spaced repetition interval.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {/* Forgot */}
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => handleRate(RECALL_RATINGS.FORGOT)}
                    className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors text-center"
                  >
                    <span className="block font-bold text-sm">Forgot</span>
                    <span className="block text-[11px] opacity-80 mt-0.5">Review in 1 day</span>
                  </button>

                  {/* Difficult */}
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => handleRate(RECALL_RATINGS.DIFFICULT)}
                    className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 transition-colors text-center"
                  >
                    <span className="block font-bold text-sm">Difficult</span>
                    <span className="block text-[11px] opacity-80 mt-0.5">Review in 3 days</span>
                  </button>

                  {/* Good */}
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => handleRate(RECALL_RATINGS.GOOD)}
                    className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 transition-colors text-center"
                  >
                    <span className="block font-bold text-sm">Good</span>
                    <span className="block text-[11px] opacity-80 mt-0.5">Next interval</span>
                  </button>

                  {/* Easy */}
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => handleRate(RECALL_RATINGS.EASY)}
                    className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-colors text-center"
                  >
                    <span className="block font-bold text-sm">Easy</span>
                    <span className="block text-[11px] opacity-80 mt-0.5">+2 stages advance</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

