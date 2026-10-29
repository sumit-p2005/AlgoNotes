'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Save,
  AlertTriangle,
  Code2,
  FileText,
  Lightbulb,
  Cpu,
  History,
  Trash2,
  CalendarCheck2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { DifficultyBadge, StatusBadge } from '@/components/ui/Badge';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { MarkdownRenderer } from '@/components/editor/MarkdownRenderer';
import { initializeSchedule } from '@/lib/revision/scheduler';

export function ProblemNotebook({ initialProblem, topics = [], patterns = [], isNew = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState(
    initialProblem || {
      title: '',
      problem_number: '',
      external_url: '',
      difficulty: 'Medium',
      status: 'Saved',
      summary: '',
      recognition_clues: '',
      key_points: '',
      brute_force_approach: '',
      optimised_approach: '',
      code: '// Write your optimal solution here\n\nfunction solution() {\n  \n}\n',
      language: 'javascript',
      time_complexity: 'O(N)',
      space_complexity: 'O(1)',
      common_mistakes: '',
      edge_cases: '',
      additional_notes: '',
      confidence_rating: 3,
      is_bookmarked: false,
      is_learned: false,
      topic_id: topics[0]?.id || null,
      subtopic_id: null,
    }
  );

  const [activeTab, setActiveTab] = useState('notes');
  const [selectedPatternIds, setSelectedPatternIds] = useState(
    initialProblem?.selected_pattern_ids || []
  );
  const [saveStatus, setSaveStatus] = useState('Saved'); // 'Saved' | 'Saving...' | 'Unsaved' | 'Error'
  const [isDeleting, setIsDeleting] = useState(false);
  const [scheduleData, setScheduleData] = useState(initialProblem?.review_schedule || null);
  const isDirtyRef = useRef(false);
  const saveTimeoutRef = useRef(null);

  // Auto-save logic for existing problem
  const persistProblem = useCallback(
    async (updatedData) => {
      if (isNew || !updatedData.id) return;

      setSaveStatus('Saving...');
      try {
        const supabase = createClient();
        const { error } = await supabase
          .from('problems')
          .update({
            title: updatedData.title,
            problem_number: updatedData.problem_number,
            external_url: updatedData.external_url,
            difficulty: updatedData.difficulty,
            status: updatedData.status,
            summary: updatedData.summary,
            recognition_clues: updatedData.recognition_clues,
            key_points: updatedData.key_points,
            brute_force_approach: updatedData.brute_force_approach,
            optimised_approach: updatedData.optimised_approach,
            code: updatedData.code,
            language: updatedData.language,
            time_complexity: updatedData.time_complexity,
            space_complexity: updatedData.space_complexity,
            common_mistakes: updatedData.common_mistakes,
            edge_cases: updatedData.edge_cases,
            additional_notes: updatedData.additional_notes,
            confidence_rating: updatedData.confidence_rating,
            is_bookmarked: updatedData.is_bookmarked,
            is_learned: updatedData.is_learned,
            topic_id: updatedData.topic_id,
            subtopic_id: updatedData.subtopic_id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', updatedData.id);

        if (error) throw error;
        setSaveStatus('Saved');
        isDirtyRef.current = false;
      } catch (err) {
        console.error('Failed to autosave problem:', err);
        setSaveStatus('Error');
      }
    },
    [isNew]
  );

  const updateField = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      isDirtyRef.current = true;
      setSaveStatus('Unsaved');

      if (!isNew && prev.id) {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
          persistProblem(next);
        }, 800); // 800ms debounce
      }
      return next;
    });
  };

  // Toggle Mark as Learned (initiates spaced repetition schedule)
  const toggleLearned = async () => {
    const nextLearned = !formData.is_learned;
    updateField('is_learned', nextLearned);

    if (nextLearned && formData.id) {
      try {
        const supabase = createClient();
        const sched = initializeSchedule();
        const { data: user } = await supabase.auth.getUser();

        if (user?.user) {
          const { data: savedSched } = await supabase
            .from('problem_review_schedules')
            .upsert({
              problem_id: formData.id,
              user_id: user.user.id,
              stage: sched.stage,
              learning_date: sched.learningDate.toISOString(),
              next_review_at: sched.nextReviewAt.toISOString(),
              review_count: 0,
            })
            .select()
            .single();

          if (savedSched) {
            setScheduleData(savedSched);
          }
        }
      } catch (err) {
        console.error('Failed to schedule revision:', err);
      }
    }
  };

  // Create new problem
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSaveStatus('Saving...');
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert('Please sign in to save your problem notes.');
        return;
      }

      const { data: created, error } = await supabase
        .from('problems')
        .insert({
          user_id: user.id,
          title: formData.title,
          problem_number: formData.problem_number,
          external_url: formData.external_url,
          difficulty: formData.difficulty,
          status: formData.status,
          summary: formData.summary,
          recognition_clues: formData.recognition_clues,
          key_points: formData.key_points,
          brute_force_approach: formData.brute_force_approach,
          optimised_approach: formData.optimised_approach,
          code: formData.code,
          language: formData.language,
          time_complexity: formData.time_complexity,
          space_complexity: formData.space_complexity,
          common_mistakes: formData.common_mistakes,
          edge_cases: formData.edge_cases,
          additional_notes: formData.additional_notes,
          confidence_rating: formData.confidence_rating,
          is_bookmarked: formData.is_bookmarked,
          is_learned: formData.is_learned,
          topic_id: formData.topic_id,
          subtopic_id: formData.subtopic_id,
        })
        .select()
        .single();

      if (error) throw error;

      // Link selected patterns
      if (selectedPatternIds.length > 0) {
        const patternRows = selectedPatternIds.map((patId) => ({
          problem_id: created.id,
          pattern_id: patId,
          user_id: user.id,
        }));
        await supabase.from('problem_patterns').insert(patternRows);
      }

      // If marked as learned, create revision schedule
      if (formData.is_learned) {
        const sched = initializeSchedule();
        await supabase.from('problem_review_schedules').insert({
          problem_id: created.id,
          user_id: user.id,
          stage: sched.stage,
          learning_date: sched.learningDate.toISOString(),
          next_review_at: sched.nextReviewAt.toISOString(),
          review_count: 0,
        });
      }

      router.push(`/problems/${created.id}`);
      router.refresh();
    } catch (err) {
      console.error('Create problem error:', err);
      setSaveStatus('Error');
      alert(`Could not save problem: ${err.message}`);
    }
  };

  // Delete problem with confirmation
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${formData.title}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const supabase = createClient();
      await supabase.from('problems').delete().eq('id', formData.id);
      router.push('/problems');
      router.refresh();
    } catch (err) {
      console.error('Delete problem error:', err);
      setIsDeleting(false);
    }
  };

  const selectedTopic = topics.find((t) => t.id === formData.topic_id);

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-0 bg-page text-foreground overflow-hidden">
      {/* Central Problem Workspace */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border overflow-y-auto">
        {/* Top Header & Breadcrumbs Bar */}
        <div className="p-4 sm:px-6 border-b border-border bg-panel/60">
          <div className="flex items-center justify-between text-xs text-muted mb-2 gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 truncate">
              <Link href="/topics" className="hover:text-foreground">Topics</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium truncate">
                {selectedTopic?.name || 'Unassigned'}
              </span>
              {formData.problem_number && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="font-mono text-amber-500 font-semibold">
                    #{formData.problem_number}
                  </span>
                </>
              )}
            </div>

            {/* Autosave status indicator */}
            <div className="flex items-center gap-2">
              {!isNew && (
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted">
                  {saveStatus === 'Saving...' && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                  {saveStatus === 'Saved' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                  {saveStatus === 'Error' && (
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  )}
                  <span>{saveStatus}</span>
                </span>
              )}

              {/* Bookmark quick toggle */}
              <button
                type="button"
                onClick={() => updateField('is_bookmarked', !formData.is_bookmarked)}
                className="p-1.5 rounded-lg border border-border text-muted hover:text-amber-400 hover:bg-elevated transition-colors"
                title={formData.is_bookmarked ? 'Remove Bookmark' : 'Bookmark Problem'}
              >
                {formData.is_bookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>

              {/* Delete button (for existing problems) */}
              {!isNew && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="p-1.5 rounded-lg border border-border text-muted hover:text-red-500 hover:bg-elevated transition-colors"
                  title="Delete Note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Title & Metadata row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Enter Problem Title (e.g. 3Sum, LRU Cache)..."
                className="w-full text-xl sm:text-2xl font-bold bg-transparent text-foreground placeholder:text-muted focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              {/* Difficulty selector */}
              <select
                value={formData.difficulty}
                onChange={(e) => updateField('difficulty', e.target.value)}
                className="bg-panel border border-border rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              {/* Status selector */}
              <select
                value={formData.status}
                onChange={(e) => updateField('status', e.target.value)}
                className="bg-panel border border-border rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="Saved">Saved</option>
                <option value="Attempted">Attempted</option>
                <option value="Solved">Solved</option>
              </select>

              {/* External problem URL */}
              {formData.external_url ? (
                <a
                  href={formData.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border text-xs text-muted hover:text-foreground hover:bg-elevated transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>LeetCode</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Notebook Tabs Bar */}
        <div className="flex items-center gap-1 px-4 sm:px-6 border-b border-border bg-elevated/40 overflow-x-auto text-xs font-medium">
          {[
            { id: 'notes', label: 'Notes & Summary', icon: FileText },
            { id: 'code', label: 'Code Editor', icon: Code2 },
            { id: 'approach', label: 'Approaches & Intuition', icon: Lightbulb },
            { id: 'complexity', label: 'Complexity & Trade-offs', icon: Cpu },
            { id: 'mistakes', label: 'Mistakes & Edge Cases', icon: AlertTriangle },
            { id: 'revision', label: 'Revision History', icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-3.5 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'border-accent text-foreground font-semibold bg-panel/50'
                    : 'border-transparent text-muted hover:text-foreground hover:border-border'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-muted'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-6">
          {/* TAB: NOTES & SUMMARY */}
          {activeTab === 'notes' && (
            <div className="space-y-5 max-w-4xl">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Personal Problem Summary / Statement
                </label>
                <Textarea
                  rows={4}
                  value={formData.summary}
                  onChange={(e) => updateField('summary', e.target.value)}
                  placeholder="Summarize the core problem requirements in your own words..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Recognition Clues (What signals this pattern?)
                  </label>
                  <Textarea
                    rows={4}
                    value={formData.recognition_clues}
                    onChange={(e) => updateField('recognition_clues', e.target.value)}
                    placeholder="e.g. Sorted array, contiguous subarray with condition, pair sum..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Key Points To Remember
                  </label>
                  <Textarea
                    rows={4}
                    value={formData.key_points}
                    onChange={(e) => updateField('key_points', e.target.value)}
                    placeholder="e.g. Remember to skip duplicates after moving pointers; 0-indexed offset..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Additional Notes (Markdown Supported)
                </label>
                <Textarea
                  rows={5}
                  value={formData.additional_notes}
                  onChange={(e) => updateField('additional_notes', e.target.value)}
                  placeholder="Add any extra notes, diagrams or insights in markdown..."
                />
              </div>

              {formData.additional_notes && (
                <div className="p-4 rounded-xl border border-border bg-panel">
                  <span className="text-[11px] font-semibold uppercase text-muted tracking-wider block mb-2">
                    Markdown Preview
                  </span>
                  <MarkdownRenderer content={formData.additional_notes} />
                </div>
              )}
            </div>
          )}

          {/* TAB: CODE EDITOR */}
          {activeTab === 'code' && (
            <div className="space-y-4 max-w-4xl">
              <CodeEditor
                value={formData.code}
                onChange={(val) => updateField('code', val)}
                language={formData.language}
                onLanguageChange={(lang) => updateField('language', lang)}
                minHeight="460px"
              />
            </div>
          )}

          {/* TAB: APPROACHES & INTUITION */}
          {activeTab === 'approach' && (
            <div className="space-y-5 max-w-4xl">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Optimised Approach & Algorithmic Intuition
                </label>
                <Textarea
                  rows={6}
                  value={formData.optimised_approach}
                  onChange={(e) => updateField('optimised_approach', e.target.value)}
                  placeholder="Explain why this approach works, invariant preservation, and step-by-step logic..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Brute Force Approach (Initial Attempt)
                </label>
                <Textarea
                  rows={4}
                  value={formData.brute_force_approach}
                  onChange={(e) => updateField('brute_force_approach', e.target.value)}
                  placeholder="Describe the naive / brute-force solution and why it is too slow (e.g. O(N^2))..."
                />
              </div>
            </div>
          )}

          {/* TAB: COMPLEXITY & TRADE-OFFS */}
          {activeTab === 'complexity' && (
            <div className="space-y-5 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Time Complexity
                  </label>
                  <Input
                    value={formData.time_complexity}
                    onChange={(e) => updateField('time_complexity', e.target.value)}
                    placeholder="e.g. O(N log N) or O(N)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Space Complexity
                  </label>
                  <Input
                    value={formData.space_complexity}
                    onChange={(e) => updateField('space_complexity', e.target.value)}
                    placeholder="e.g. O(1) auxiliary or O(N)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: MISTAKES & EDGE CASES */}
          {activeTab === 'mistakes' && (
            <div className="space-y-5 max-w-4xl">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Common Pitfalls & Mistakes Made
                </label>
                <Textarea
                  rows={4}
                  value={formData.common_mistakes}
                  onChange={(e) => updateField('common_mistakes', e.target.value)}
                  placeholder="Where did you get stuck? Off-by-one errors, infinite loops, negative numbers..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Critical Edge Cases
                </label>
                <Textarea
                  rows={4}
                  value={formData.edge_cases}
                  onChange={(e) => updateField('edge_cases', e.target.value)}
                  placeholder="Empty input, single element, duplicates, all negatives, maximum integer overflow..."
                />
              </div>
            </div>
          )}

          {/* TAB: REVISION HISTORY */}
          {activeTab === 'revision' && (
            <div className="space-y-4 max-w-3xl">
              <div className="p-4 rounded-xl border border-border bg-panel">
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  Active Recall Schedule
                </h4>
                {scheduleData ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-elevated border border-border">
                      <span className="text-muted block text-[11px]">Current Stage</span>
                      <span className="font-bold text-sm text-amber-400">
                        Stage {scheduleData.stage}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-elevated border border-border">
                      <span className="text-muted block text-[11px]">Next Due</span>
                      <span className="font-semibold text-sm">
                        {new Date(scheduleData.next_review_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-elevated border border-border">
                      <span className="text-muted block text-[11px]">Times Reviewed</span>
                      <span className="font-semibold text-sm">{scheduleData.review_count}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-elevated border border-border">
                      <span className="text-muted block text-[11px]">Last Rating</span>
                      <span className="font-semibold text-sm text-foreground">
                        {scheduleData.last_rating || 'Not reviewed yet'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-muted mt-2">
                    This problem is not yet scheduled for revision. Mark it as &quot;Learned&quot; to initiate Day 1, 7, 21, 45 spaced intervals.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* New Problem Save button */}
          {isNew && (
            <div className="pt-4 border-t border-border">
              <Button type="button" onClick={handleCreate} size="md" className="gap-2">
                <Save className="w-4 h-4" />
                <span>Save New Problem Note</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Right-Side Revision & Metadata Panel */}
      <div className="w-full lg:w-80 border-t lg:border-t-0 bg-panel p-4 sm:p-5 flex flex-col gap-6 overflow-y-auto">
        {/* Active Recall Action Panel */}
        <div className="p-4 rounded-xl border border-border bg-elevated/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <CalendarCheck2 className="w-4 h-4 text-amber-400" /> Spaced Revision
            </span>
            <button
              type="button"
              onClick={toggleLearned}
              className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-colors ${
                formData.is_learned
                  ? 'bg-amber-400/20 text-amber-500 border-amber-400/40'
                  : 'bg-panel text-muted border-border hover:text-foreground'
              }`}
            >
              {formData.is_learned ? '✓ Learned' : '+ Mark Learned'}
            </button>
          </div>

          <p className="text-[11px] text-muted leading-relaxed">
            {formData.is_learned
              ? 'Active recall intervals: Day 1 → Day 7 → Day 21 → Day 45.'
              : 'Mark as learned when you understand the intuition to trigger spaced repetition.'}
          </p>

          {formData.id && (
            <Link
              href={`/revision?problem_id=${formData.id}`}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-accent text-accent-text hover:bg-accent-hover transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test Recall Now</span>
            </Link>
          )}
        </div>

        {/* Confidence Rating (1-5) */}
        <div>
          <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            Confidence Rating
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => updateField('confidence_rating', star)}
                className={`w-8 h-8 rounded-lg border text-xs font-bold transition-colors ${
                  formData.confidence_rating >= star
                    ? 'bg-amber-400/20 border-amber-400/50 text-amber-400'
                    : 'bg-elevated border-border text-muted hover:text-foreground'
                }`}
              >
                {star}
              </button>
            ))}
            <span className="text-xs text-muted ml-2">
              {formData.confidence_rating <= 2 ? 'Shaky' : formData.confidence_rating <= 4 ? 'Good' : 'Mastered'}
            </span>
          </div>
        </div>

        {/* Topic & Subtopic Selector */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
              Assigned Topic
            </label>
            <Select
              value={formData.topic_id || ''}
              onChange={(e) => updateField('topic_id', e.target.value)}
            >
              <option value="">Select Topic...</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
              Problem #
            </label>
            <Input
              value={formData.problem_number || ''}
              onChange={(e) => updateField('problem_number', e.target.value)}
              placeholder="e.g. 15, 206, 300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
              External Problem URL
            </label>
            <Input
              value={formData.external_url || ''}
              onChange={(e) => updateField('external_url', e.target.value)}
              placeholder="https://leetcode.com/problems/..."
            />
          </div>
        </div>

        {/* Associated Patterns Tags */}
        <div>
          <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            Pattern Tags ({selectedPatternIds.length})
          </label>
          <div className="flex flex-wrap gap-1.5">
            {patterns.map((p) => {
              const isSelected = selectedPatternIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={async () => {
                    const next = isSelected
                      ? selectedPatternIds.filter((id) => id !== p.id)
                      : [...selectedPatternIds, p.id];
                    setSelectedPatternIds(next);

                    if (formData.id) {
                      const supabase = createClient();
                      const { data: { user } } = await supabase.auth.getUser();
                      if (user) {
                        if (isSelected) {
                          await supabase
                            .from('problem_patterns')
                            .delete()
                            .match({ problem_id: formData.id, pattern_id: p.id });
                        } else {
                          await supabase.from('problem_patterns').insert({
                            problem_id: formData.id,
                            pattern_id: p.id,
                            user_id: user.id,
                          });
                        }
                      }
                    }
                  }}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                    isSelected
                      ? 'bg-amber-400/20 text-amber-500 border-amber-400/40 font-medium'
                      : 'bg-elevated text-muted border-border hover:text-foreground'
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
