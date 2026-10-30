'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ExternalLink,
  Star,
  ChevronLeft,
  ChevronRight,
  Save,
  Check,
  RotateCcw,
  Clock,
  Calendar,
  Code2,
  Copy,
  Lightbulb,
  Target,
  AlertTriangle,
  BookOpen,
  FileText,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { calculateNextReview, initializeSchedule } from '@/lib/revision/scheduler';

export function CurriculumQuestionNotebook({
  problem,
  topic,
  section,
  prevProblem,
  nextProblem,
  initialNotes,
  initialProgress,
  initialSchedule,
}) {
  const router = useRouter();

  // Problem Status
  const [status, setStatus] = useState(initialProgress?.status || 'Not started');

  // Notebook Fields (Empty initially as required)
  const [notesData, setNotesData] = useState({
    code: initialNotes?.code || '',
    language: initialNotes?.language || 'javascript',
    pattern_used: initialNotes?.pattern_used || '',
    pattern_cues: initialNotes?.pattern_cues || '',
    key_points: initialNotes?.key_points || '',
    brute_force_approach: initialNotes?.brute_force_approach || '',
    optimized_approach: initialNotes?.optimized_approach || '',
    intuition: initialNotes?.intuition || '',
    time_complexity: initialNotes?.time_complexity || 'O(N)',
    space_complexity: initialNotes?.space_complexity || 'O(1)',
    mistakes: initialNotes?.mistakes || '',
    edge_cases: initialNotes?.edge_cases || '',
    personal_notes: initialNotes?.personal_notes || '',
    confidence_rating: initialNotes?.confidence_rating || 3,
    tags: initialNotes?.tags || [],
  });

  // Revision Schedule
  const [schedule, setSchedule] = useState(() => {
    if (initialSchedule) return initialSchedule;
    return initializeSchedule();
  });

  // Autosave status state
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving' | 'unsaved' | 'error'
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'code' | 'approach' | 'complexity'

  const isInitialMount = useRef(true);
  const saveTimeoutRef = useRef(null);

  // Field update handler
  const handleFieldChange = (field, value) => {
    setNotesData((prev) => ({ ...prev, [field]: value }));
    setSaveStatus('unsaved');
  };

  // Perform Save
  const saveAll = useCallback(async () => {
    try {
      setSaveStatus('saving');
      const res = await fetch('/api/curriculum/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problem.id,
          notesData,
          status,
        }),
      });

      if (!res.ok) throw new Error('Save failed');

      setSaveStatus('saved');
      setLastSavedTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    } catch (e) {
      console.error('Autosave error:', e);
      setSaveStatus('error');
    }
  }, [problem.id, notesData, status]);

  // Debounced Autosave (1.5 seconds)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setSaveStatus('unsaved');
    saveTimeoutRef.current = setTimeout(() => {
      saveAll();
    }, 1500);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [notesData, status, saveAll]);

  // Status Change
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setSaveStatus('unsaved');
  };

  // Handle Recall Rating (Forgot, Difficult, Good, Easy)
  const handleRateRecall = async (rating) => {
    try {
      setSaveStatus('saving');
      const nextSchedule = calculateNextReview(schedule, rating);
      setSchedule(nextSchedule);

      // Save review to history and schedule
      await fetch('/api/curriculum/revision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problem.id,
          rating,
          schedule: nextSchedule,
        }),
      });

      setSaveStatus('saved');
      setLastSavedTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    } catch (e) {
      console.error('Error logging review:', e);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-page text-foreground overflow-y-auto">
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

        {/* Top Header: Breadcrumbs & Adjacent Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-muted flex-wrap">
              <Link href="/sheets" className="hover:text-foreground transition-colors">
                DSA Sheets
              </Link>
              <span>/</span>
              <Link href="/sheets/striver-a2z" className="hover:text-foreground transition-colors">
                Striver A2Z
              </Link>
              <span>/</span>
              <span className="text-muted truncate max-w-[200px]">
                {topic?.title || 'Topic'}
              </span>
              <span>/</span>
              <span className="text-amber-400 font-semibold truncate max-w-[200px]">
                {section?.title || 'Section'}
              </span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md">
                #{problem.problem_number}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {problem.title}
              </h1>

              {problem.external_url && (
                <a
                  href={problem.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-amber-400 transition-colors p-1"
                  title="Open Problem Link"
                  aria-label="Open external problem link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <span
                className={cn(
                  'px-2 py-0.5 rounded-full text-[11px] font-bold border',
                  problem.difficulty === 'Easy'
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    : problem.difficulty === 'Medium'
                    ? 'text-amber-400 bg-amber-500/10 border-amber-400/30'
                    : 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                )}
              >
                {problem.difficulty}
              </span>
            </div>
          </div>

          {/* Right Header Controls: Status, Adjacent Problems & Autosave Indicator */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Autosave Status Pill */}
            <div className="flex items-center gap-1.5 text-xs text-muted px-2.5 py-1 rounded-lg bg-panel border border-border">
              {saveStatus === 'saving' && (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span className="text-amber-400">Saving...</span>
                </>
              )}
              {saveStatus === 'saved' && (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saved {lastSavedTime ? `at ${lastSavedTime}` : ''}</span>
                </>
              )}
              {saveStatus === 'unsaved' && (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Unsaved changes</span>
                </>
              )}
              {saveStatus === 'error' && (
                <>
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span className="text-rose-400">Save failed</span>
                </>
              )}
            </div>

            {/* Status Dropdown */}
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none transition-colors cursor-pointer',
                status === 'Solved'
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                  : status === 'Attempted'
                  ? 'bg-blue-500/15 border-blue-500/40 text-blue-400'
                  : status === 'Needs revision'
                  ? 'bg-amber-400/15 border-amber-400/40 text-amber-400'
                  : 'bg-panel border-border text-muted hover:text-foreground'
              )}
            >
              <option value="Not started">Not started</option>
              <option value="Attempted">Attempted</option>
              <option value="Solved">Solved</option>
              <option value="Needs revision">Needs revision</option>
            </select>

            {/* Manual Save Button */}
            <button
              type="button"
              onClick={saveAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent text-accent-text hover:bg-accent-hover text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>

            {/* Adjacent Navigation Buttons */}
            <div className="flex items-center border border-border rounded-xl overflow-hidden bg-card">
              <button
                type="button"
                disabled={!prevProblem}
                onClick={() => prevProblem && router.push(`/sheets/striver-a2z/${prevProblem.id}`)}
                className="p-1.5 text-muted hover:text-foreground hover:bg-elevated disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                title={prevProblem ? `Previous: #${prevProblem.problem_number} ${prevProblem.title}` : 'No previous problem'}
                aria-label={prevProblem ? `Previous problem: #${prevProblem.problem_number} ${prevProblem.title}` : 'No previous problem'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="h-4 w-[1px] bg-border" />
              <button
                type="button"
                disabled={!nextProblem}
                onClick={() => nextProblem && router.push(`/sheets/striver-a2z/${nextProblem.id}`)}
                className="p-1.5 text-muted hover:text-foreground hover:bg-elevated disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                title={nextProblem ? `Next: #${nextProblem.problem_number} ${nextProblem.title}` : 'No next problem'}
                aria-label={nextProblem ? `Next problem: #${nextProblem.problem_number} ${nextProblem.title}` : 'No next problem'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Layout: 3 Columns / 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Central Notebook Workspace (8 cols) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Workspace Tab Bar */}
            <div className="flex items-center gap-1 border-b border-border pb-2 text-xs">
              {[
                { id: 'notes', label: 'Notes & Intuition' },
                { id: 'code', label: 'Solution Code' },
                { id: 'approach', label: 'Approaches & Patterns' },
                { id: 'complexity', label: 'Complexity & Edge Cases' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer',
                    activeTab === tab.id
                      ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                      : 'text-muted hover:text-foreground hover:bg-panel'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: NOTES & INTUITION */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                {/* Pattern Recognition Card */}
                <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Target className="w-4 h-4" />
                    <span>Pattern Used & Recognition Clues</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-muted block mb-1">
                        Pattern Name (e.g. Two Pointers, Sliding Window, Prefix Sum)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Two Pointers"
                        value={notesData.pattern_used}
                        onChange={(e) => handleFieldChange('pattern_used', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-panel border border-border text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted block mb-1">
                        Recognition Clues (When I see..., I use...)
                      </label>
                      <input
                        type="text"
                        placeholder="When sorted array + pair sum, use two pointers..."
                        value={notesData.pattern_cues}
                        onChange={(e) => handleFieldChange('pattern_cues', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-panel border border-border text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Key Points To Remember */}
                <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Lightbulb className="w-4 h-4" />
                    <span>Key Points to Remember</span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Bullet points or mental anchors to remember while coding..."
                    value={notesData.key_points}
                    onChange={(e) => handleFieldChange('key_points', e.target.value)}
                    className="w-full p-3 rounded-lg bg-panel border border-border text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-amber-400 resize-y leading-relaxed"
                  />
                </div>

                {/* Personal Notes (Markdown / Textarea) */}
                <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      <span>Personal Notes & Insights</span>
                    </div>
                    <span className="text-[10px] text-muted">Autosaved</span>
                  </div>
                  <textarea
                    rows={6}
                    placeholder="Document your own understanding, aha moments, intuition, or walkthrough in plain text or Markdown..."
                    value={notesData.personal_notes}
                    onChange={(e) => handleFieldChange('personal_notes', e.target.value)}
                    className="w-full p-3 rounded-lg bg-panel border border-border text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-amber-400 resize-y leading-relaxed font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: SOLUTION CODE */}
            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <CodeEditor
                    value={notesData.code}
                    onChange={(val) => handleFieldChange('code', val)}
                    language={notesData.language}
                    onLanguageChange={(lang) => handleFieldChange('language', lang)}
                    minHeight="420px"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: APPROACHES & PATTERNS */}
            {activeTab === 'approach' && (
              <div className="space-y-4">
                {/* Brute Force Approach */}
                <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                  <div className="text-xs font-bold text-foreground">
                    1. Brute-Force Approach
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Explain the initial straightforward or naive approach..."
                    value={notesData.brute_force_approach}
                    onChange={(e) => handleFieldChange('brute_force_approach', e.target.value)}
                    className="w-full p-3 rounded-lg bg-panel border border-border text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-amber-400 resize-y leading-relaxed"
                  />
                </div>

                {/* Optimised Approach & Intuition */}
                <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                  <div className="text-xs font-bold text-amber-400">
                    2. Optimised Approach & Intuition
                  </div>
                  <textarea
                    rows={5}
                    placeholder="Why does this optimization work? What was the reduction in duplicate work?..."
                    value={notesData.optimized_approach}
                    onChange={(e) => handleFieldChange('optimized_approach', e.target.value)}
                    className="w-full p-3 rounded-lg bg-panel border border-border text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-amber-400 resize-y leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: COMPLEXITY & EDGE CASES */}
            {activeTab === 'complexity' && (
              <div className="space-y-4">
                {/* Time & Space Complexity */}
                <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                  <div className="text-xs font-bold text-foreground">
                    Complexity Analysis
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-muted block mb-1">
                        Time Complexity
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. O(N log N)"
                        value={notesData.time_complexity}
                        onChange={(e) => handleFieldChange('time_complexity', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-panel border border-border text-xs text-foreground font-mono focus:outline-none focus:border-amber-400"
                      />
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {['O(1)', 'O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'].map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => handleFieldChange('time_complexity', c)}
                            className="px-2 py-0.5 rounded text-[10px] bg-panel text-muted hover:text-foreground border border-border"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-muted block mb-1">
                        Space Complexity
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. O(1)"
                        value={notesData.space_complexity}
                        onChange={(e) => handleFieldChange('space_complexity', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-panel border border-border text-xs text-foreground font-mono focus:outline-none focus:border-amber-400"
                      />
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'].map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => handleFieldChange('space_complexity', c)}
                            className="px-2 py-0.5 rounded text-[10px] bg-panel text-muted hover:text-foreground border border-border"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Common Mistakes & Edge Cases */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Common Mistakes</span>
                    </div>
                    <textarea
                      rows={4}
                      placeholder="e.g. Off-by-one error, forgetting to check for negative numbers..."
                      value={notesData.mistakes}
                      onChange={(e) => handleFieldChange('mistakes', e.target.value)}
                      className="w-full p-3 rounded-lg bg-panel border border-border text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-amber-400 resize-y leading-relaxed"
                    />
                  </div>

                  <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                      <Target className="w-4 h-4" />
                      <span>Edge Cases</span>
                    </div>
                    <textarea
                      rows={4}
                      placeholder="e.g. Empty array, single element, duplicates, integer overflow..."
                      value={notesData.edge_cases}
                      onChange={(e) => handleFieldChange('edge_cases', e.target.value)}
                      className="w-full p-3 rounded-lg bg-panel border border-border text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-amber-400 resize-y leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Revision & Meta Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-5">

            {/* Spaced Repetition Card */}
            <div className="p-4 rounded-xl border border-border bg-card space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-foreground">Revision Schedule</span>
                </div>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  Stage {schedule.review_stage || 1}/4
                </span>
              </div>

              {/* Next Review Date & Interval */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-panel border border-border">
                  <div className="text-[10px] text-muted">Next Review</div>
                  <div className="text-xs font-bold text-foreground mt-0.5">
                    {schedule.next_review_date || 'Today'}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-panel border border-border">
                  <div className="text-[10px] text-muted">Interval</div>
                  <div className="text-xs font-bold text-amber-400 mt-0.5">
                    {schedule.interval_days || 1} day(s)
                  </div>
                </div>
              </div>

              {/* Recall Rating Actions */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] text-muted">
                  Log active recall result:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleRateRecall('forgot')}
                    className="p-2 rounded-lg bg-panel hover:bg-rose-500/15 border border-border hover:border-rose-500/40 text-xs font-semibold text-rose-400 transition-colors cursor-pointer text-center"
                  >
                    Forgot (Day 1)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRateRecall('difficult')}
                    className="p-2 rounded-lg bg-panel hover:bg-amber-500/15 border border-border hover:border-amber-500/40 text-xs font-semibold text-amber-400 transition-colors cursor-pointer text-center"
                  >
                    Difficult (+3d)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRateRecall('good')}
                    className="p-2 rounded-lg bg-panel hover:bg-emerald-500/15 border border-border hover:border-emerald-500/40 text-xs font-semibold text-emerald-400 transition-colors cursor-pointer text-center"
                  >
                    Good (+7d)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRateRecall('easy')}
                    className="p-2 rounded-lg bg-panel hover:bg-sky-500/15 border border-border hover:border-sky-500/40 text-xs font-semibold text-sky-400 transition-colors cursor-pointer text-center"
                  >
                    Easy (+14d)
                  </button>
                </div>
              </div>
            </div>

            {/* Confidence Rating Card */}
            <div className="p-4 rounded-xl border border-border bg-card space-y-2.5 shadow-sm">
              <div className="text-xs font-bold text-foreground">
                Confidence Level
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleFieldChange('confidence_rating', star)}
                    className="p-1 text-muted hover:text-amber-400 transition-colors cursor-pointer"
                    aria-label={`Set confidence to ${star} out of 5`}
                  >
                    <Star
                      className={cn(
                        'w-5 h-5',
                        star <= notesData.confidence_rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-700'
                      )}
                    />
                  </button>
                ))}
                <span className="text-xs text-muted ml-2">
                  {notesData.confidence_rating}/5
                </span>
              </div>
            </div>

            {/* Curriculum Info Card */}
            <div className="p-4 rounded-xl border border-border bg-card space-y-3 shadow-sm">
              <div className="text-xs font-bold text-foreground">
                Curriculum Details
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted">Step</span>
                  <span className="font-semibold text-foreground">{topic?.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted">Subtopic</span>
                  <span className="font-semibold text-foreground">{section?.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted">Problem #</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {problem.problem_number} / 463
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted">Difficulty</span>
                  <span className="font-semibold text-foreground">{problem.difficulty}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

