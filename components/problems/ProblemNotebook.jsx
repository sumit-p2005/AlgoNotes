'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ExternalLink,
  Star,
  MoreHorizontal,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  BarChart2,
  Edit3,
  Link2,
  ArrowRight,
  TrendingUp,
  FileText,
  Target,
  Lightbulb,
  Code2,
  Copy,
  Maximize2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Check,
  ChevronRight,
  Trash2,
  Sparkles,
  Save,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { calculateNextReview, initializeSchedule } from '@/lib/revision/scheduler';
import { ProblemStatusControl } from '@/components/problems/ProblemStatusControl';

export function ProblemNotebook({
  initialProblem,
  topics = [],
  patterns = [],
  isNew = false,
}) {
  const router = useRouter();

  // Problem State: Empty when isNew is true or when initialProblem is absent
  const [formData, setFormData] = useState(() => {
    if (initialProblem) {
      return {
        ...initialProblem,
        code: initialProblem.code ?? '',
        language: initialProblem.language || 'cpp',
        pattern_used: initialProblem.pattern_used || initialProblem.pattern || '',
        summary: initialProblem.summary || '',
        recognition_clues: initialProblem.recognition_clues || '',
        key_points: initialProblem.key_points || '',
        personal_notes: initialProblem.personal_notes || '',
        brute_force_approach: initialProblem.brute_force_approach || '',
        optimised_approach: initialProblem.optimised_approach || '',
        time_complexity: initialProblem.time_complexity || '',
        space_complexity: initialProblem.space_complexity || '',
        common_mistakes: initialProblem.common_mistakes || '',
        edge_cases: initialProblem.edge_cases || '',
        additional_notes: initialProblem.additional_notes || '',
        confidence_rating: initialProblem.confidence_rating || 3,
        is_bookmarked: initialProblem.is_bookmarked || false,
        is_learned: initialProblem.is_learned || false,
        tags: initialProblem.tags || [],
        topic_id: initialProblem.topic_id || topics[0]?.id || null,
      };
    }
    // Genuinely blank template for new notes — no predefined content
    return {
      title: '',
      problem_number: '',
      external_url: '',
      difficulty: 'Medium',
      status: 'Attempted',
      summary: '',
      pattern_used: '',
      recognition_clues: '',
      key_points: '',
      brute_force_approach: '',
      optimised_approach: '',
      code: '',
      language: 'cpp',
      time_complexity: '',
      space_complexity: '',
      common_mistakes: '',
      edge_cases: '',
      additional_notes: '',
      personal_notes: '',
      confidence_rating: 3,
      is_bookmarked: false,
      is_learned: false,
      tags: [],
      topic_id: topics[0]?.id || null,
    };
  });

  const [activeTab, setActiveTab] = useState('notes');
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [scheduleData, setScheduleData] = useState(() => {
    if (initialProblem?.review_schedule) return initialProblem.review_schedule;
    const init = initializeSchedule();
    return {
      stage: 1,
      next_review_at: init.nextReviewAt.toISOString(),
      days_left: 1,
    };
  });
  const [copiedCode, setCopiedCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const saveTimeoutRef = useRef(null);

  // Autosave existing problem (supports custom notes and curriculum notes)
  const persistProblem = useCallback(
    async (updated) => {
      if (isNew || !updated.id) return;
      setSaveStatus('Saving...');
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (updated.is_curriculum) {
          if (user) {
            // Upsert user curriculum notes
            await supabase.from('user_curriculum_notes').upsert({
              user_id: user.id,
              problem_id: updated.id,
              code: updated.code || '',
              language: updated.language || 'cpp',
              pattern_used: updated.pattern_used || '',
              pattern_cues: updated.recognition_clues || '',
              key_points: updated.key_points || '',
              brute_force_approach: updated.brute_force_approach || '',
              optimized_approach: updated.optimised_approach || '',
              intuition: updated.summary || '',
              time_complexity: updated.time_complexity || '',
              space_complexity: updated.space_complexity || '',
              mistakes: updated.common_mistakes || '',
              edge_cases: updated.edge_cases || '',
              personal_notes: updated.personal_notes || '',
              confidence_rating: updated.confidence_rating || 3,
              tags: updated.tags || [],
              updated_at: new Date().toISOString(),
            }, { onConflict: 'user_id,problem_id' });

            // Upsert user curriculum progress if attempted/solved
            const pStatus = (updated.status || '').toLowerCase();
            if (pStatus === 'solved' || pStatus === 'attempted') {
              await supabase.from('user_curriculum_progress').upsert({
                user_id: user.id,
                problem_id: updated.id,
                status: pStatus,
                last_activity_at: new Date().toISOString(),
              }, { onConflict: 'user_id,problem_id' });
            }
          }
          setSaveStatus('Saved');
          return;
        }

        // Standard custom problem note
        const { error } = await supabase
          .from('problems')
          .update({
            title: updated.title,
            problem_number: updated.problem_number,
            external_url: updated.external_url,
            difficulty: updated.difficulty,
            status: updated.status,
            summary: updated.summary,
            recognition_clues: updated.recognition_clues,
            key_points: updated.key_points,
            brute_force_approach: updated.brute_force_approach,
            optimised_approach: updated.optimised_approach,
            code: updated.code,
            language: updated.language || 'cpp',
            time_complexity: updated.time_complexity,
            space_complexity: updated.space_complexity,
            common_mistakes: updated.common_mistakes,
            edge_cases: updated.edge_cases,
            additional_notes: updated.additional_notes,
            personal_notes: updated.personal_notes,
            tags: updated.tags || [],
            confidence_rating: updated.confidence_rating,
            is_bookmarked: updated.is_bookmarked,
            is_learned: updated.is_learned,
            topic_id: updated.topic_id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', updated.id);

        if (error) throw error;
        setSaveStatus('Saved');
      } catch (err) {
        console.error('Autosave error:', err);
        setSaveStatus('Error');
      }
    },
    [isNew]
  );

  const updateField = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      setSaveStatus('Unsaved');
      if (!isNew && prev.id) {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => persistProblem(next), 700);
      }
      return next;
    });
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(formData.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // ignore
    }
  };

  // Bookmark Toggle with database synchronization
  const toggleBookmark = async () => {
    const nextState = !formData.is_bookmarked;
    updateField('is_bookmarked', nextState);

    if (formData.id) {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          if (nextState) {
            await supabase.from('bookmarks').upsert(
              { user_id: user.id, problem_id: formData.id },
              { onConflict: 'user_id,problem_id' }
            );
          } else {
            await supabase
              .from('bookmarks')
              .delete()
              .match({ user_id: user.id, problem_id: formData.id });
          }
        }
      } catch (err) {
        console.error('Bookmark sync error:', err);
      }
    }
  };

  // Toggle Learned / Revision Scheduling with conflict target
  const toggleLearned = async () => {
    const nextState = !formData.is_learned;
    updateField('is_learned', nextState);

    if (formData.id) {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const sched = initializeSchedule();
          const { data: savedSched, error } = await supabase
            .from('problem_review_schedules')
            .upsert(
              {
                problem_id: formData.id,
                user_id: user.id,
                stage: 1,
                learning_date: sched.learningDate.toISOString(),
                next_review_at: sched.nextReviewAt.toISOString(),
                review_count: 1,
                last_rating: 'Good',
                updated_at: new Date().toISOString(),
              },
              { onConflict: 'problem_id' }
            )
            .select()
            .single();

          if (!error && savedSched) {
            setScheduleData({
              stage: savedSched.stage,
              next_review_at: savedSched.next_review_at,
              days_left: 3,
            });
          }
        }
      } catch (err) {
        console.error('Revision schedule error:', err);
      }
    }
  };

  // Create new problem note in database
  const handleCreate = async () => {
    if (!formData.title || !formData.title.trim()) {
      alert('Please enter a problem title.');
      return;
    }

    setIsCreating(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert('Please sign in to save problem notes.');
        setIsCreating(false);
        return;
      }

      const { data: created, error } = await supabase
        .from('problems')
        .insert({
          user_id: user.id,
          title: formData.title.trim(),
          problem_number: formData.problem_number || '',
          external_url: formData.external_url || '',
          difficulty: formData.difficulty || 'Medium',
          status: formData.status || 'Attempted',
          summary: formData.summary || '',
          recognition_clues: formData.recognition_clues || '',
          key_points: formData.key_points || '',
          brute_force_approach: formData.brute_force_approach || '',
          optimised_approach: formData.optimised_approach || '',
          code: formData.code || '',
          language: formData.language || 'cpp',
          time_complexity: formData.time_complexity || '',
          space_complexity: formData.space_complexity || '',
          common_mistakes: formData.common_mistakes || '',
          edge_cases: formData.edge_cases || '',
          additional_notes: formData.additional_notes || '',
          personal_notes: formData.personal_notes || '',
          tags: formData.tags || [],
          confidence_rating: formData.confidence_rating || 3,
          is_bookmarked: formData.is_bookmarked || false,
          is_learned: formData.is_learned || false,
          topic_id: formData.topic_id || null,
        })
        .select()
        .single();

      if (error) throw error;

      // If marked as learned, insert review schedule
      if (formData.is_learned && created?.id) {
        const sched = initializeSchedule();
        await supabase.from('problem_review_schedules').insert({
          problem_id: created.id,
          user_id: user.id,
          stage: 1,
          learning_date: new Date().toISOString(),
          next_review_at: sched.nextReviewAt.toISOString(),
          review_count: 0,
        });
      }

      // If bookmarked, insert bookmark
      if (formData.is_bookmarked && created?.id) {
        await supabase.from('bookmarks').insert({
          user_id: user.id,
          problem_id: created.id,
        });
      }

      router.push(`/problems/${created.id}`);
      router.refresh();
    } catch (err) {
      console.error('Create problem note error:', err);
      alert(`Could not save note: ${err.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  // Delete problem with confirmation
  const handleDelete = async () => {
    if (!formData.id) return;
    if (!window.confirm(`Delete note "${formData.title}"? This cannot be undone.`)) return;

    setIsDeleting(true);
    try {
      const supabase = createClient();
      await supabase.from('problems').delete().eq('id', formData.id);
      router.push('/problems');
      router.refresh();
    } catch (err) {
      console.error('Delete note error:', err);
      setIsDeleting(false);
    }
  };

  // Add tag
  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    const clean = newTagInput.trim().toLowerCase();
    const currentTags = formData.tags || [];
    if (!currentTags.includes(clean)) {
      const updated = [...currentTags, clean];
      updateField('tags', updated);
    }
    setNewTagInput('');
    setShowTagInput(false);
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove) => {
    const updated = (formData.tags || []).filter((t) => t !== tagToRemove);
    updateField('tags', updated);
  };

  // Related Problems data
  const relatedProblems = [
    { id: 'two-sum-ii', title: 'Two Sum II (Input Array Is Sorted)', difficulty: 'Easy' },
    { id: '4sum', title: '4Sum', difficulty: 'Medium' },
    { id: '3sum-closest', title: '3Sum Closest', difficulty: 'Medium' },
    { id: '3sum-smaller', title: '3Sum Smaller', difficulty: 'Medium' },
    { id: '3sum-with-multiplicity', title: '3Sum With Multiplicity', difficulty: 'Hard' },
  ];

  return (
    <div className="flex flex-col h-full min-h-0 bg-page text-foreground overflow-y-auto">
      {/* ======================================================== */}
      {/* CENTRAL PROBLEM NOTEBOOK WORKSPACE                      */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Breadcrumbs Row */}
        <div className="px-6 pt-5 pb-2 text-xs text-muted flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted truncate">
            <Link href="/topics" className="hover:text-foreground">DSA</Link>
            <span>&gt;</span>
            <Link href="/topics" className="hover:text-foreground">Arrays</Link>
            <span>&gt;</span>
            <Link href="/topics" className="hover:text-foreground">Two Pointers</Link>
            <span>&gt;</span>
            <span className="text-foreground font-semibold truncate">
              {formData.title || 'Untitled Note'}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isNew ? (
              <button
                type="button"
                onClick={handleCreate}
                disabled={isCreating}
                className="px-3 py-1 rounded-lg text-xs font-bold bg-accent text-accent-text hover:bg-accent-hover shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isCreating ? 'Saving...' : 'Save Note'}</span>
              </button>
            ) : (
              <span className="text-[11px] text-muted font-mono">{saveStatus}</span>
            )}
          </div>
        </div>

        {/* Problem Title & Actions */}
        <div className="px-6 py-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter Problem Title..."
              className="text-2xl font-bold tracking-tight text-foreground bg-transparent focus:outline-none w-full placeholder:text-muted"
            />
            {formData.external_url && (
              <a
                href={formData.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground p-1 rounded transition-colors shrink-0"
                title="Open LeetCode problem"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleBookmark}
              className="p-1.5 rounded-lg border border-border bg-panel hover:bg-elevated transition-colors cursor-pointer"
              title={formData.is_bookmarked ? 'Bookmarked' : 'Add bookmark'}
              aria-label={formData.is_bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <Star
                className={`w-4 h-4 ${
                  formData.is_bookmarked
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-muted'
                }`}
              />
            </button>

            {!isNew && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1.5 rounded-lg border border-border bg-panel hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors cursor-pointer"
                title="Delete note"
                aria-label="Delete note"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tags Row */}
        <div className="px-6 py-2 flex items-center gap-2 flex-wrap text-xs">
          {/* Difficulty selector pill */}
          <select
            value={formData.difficulty}
            onChange={(e) => updateField('difficulty', e.target.value)}
            className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400/15 border border-amber-400/30 text-amber-400 focus:outline-none cursor-pointer"
          >
            <option value="Easy" className="bg-panel text-foreground">Easy</option>
            <option value="Medium" className="bg-panel text-foreground">Medium</option>
            <option value="Hard" className="bg-panel text-foreground">Hard</option>
          </select>

          {/* Dedicated Problem Status Control */}
          <ProblemStatusControl
            status={formData.status}
            onChange={(newStatus) => updateField('status', newStatus)}
            problemId={formData.id}
          />

          {/* Tags Pills */}
          {(formData.tags || []).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs bg-panel border border-border text-foreground/90 font-medium flex items-center gap-1.5"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-400 text-muted"
                aria-label={`Remove tag ${tag}`}
              >
                ×
              </button>
            </span>
          ))}

          {showTagInput ? (
            <div className="inline-flex items-center gap-1">
              <input
                type="text"
                autoFocus
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddTag();
                  if (e.key === 'Escape') setShowTagInput(false);
                }}
                placeholder="tag name..."
                className="w-24 px-2 py-0.5 rounded-full text-xs border border-accent bg-panel text-foreground focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="text-[10px] px-1.5 py-0.5 rounded bg-accent text-accent-text font-bold"
              >
                ✓
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowTagInput(true)}
              className="px-2.5 py-1 rounded-full text-xs border border-dashed border-border text-muted hover:text-foreground hover:border-muted transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add Tag</span>
            </button>
          )}
        </div>

        {/* Two-Column Working Layout (Left Notes ~60-65%, Right Persistent Solution Code ~35-40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          
          {/* Left Column: Problem Notes (7 cols) */}
          <div className="lg:col-span-7 space-y-5 min-w-0">
            {/* Tabs Bar */}
            <div className="border-b border-border flex items-center gap-2 pb-2 text-xs font-medium overflow-x-auto">
              {[
                { id: 'notes', label: 'Notes & Intuition' },
                { id: 'approach', label: 'Approaches & Patterns' },
                { id: 'complexity', label: 'Complexity & Edge Cases' },
                { id: 'revision', label: 'Revision & Info' },
              ].map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                        : 'text-muted hover:text-foreground hover:bg-panel'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB: NOTES & INTUITION */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                {/* CARD 1: Problem Statement */}
                <div className="p-4 rounded-2xl border border-border bg-panel space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Problem Statement</span>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.summary}
                    onChange={(e) => updateField('summary', e.target.value)}
                    placeholder="Summarize the problem in your own words..."
                    className="w-full bg-transparent text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans focus:outline-none resize-y placeholder:text-muted"
                  />
                </div>

                {/* CARD 2: Pattern Used */}
                <div className="p-4 rounded-2xl border border-border bg-panel space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Target className="w-4 h-4 text-amber-400" />
                    <span>Pattern Used</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="relative">
                      <input
                        type="text"
                        list="pattern-options-list"
                        value={formData.pattern_used || ''}
                        onChange={(e) => updateField('pattern_used', e.target.value)}
                        placeholder="Select or enter the pattern used..."
                        className="w-full bg-elevated/50 border border-border rounded-lg px-3 py-1.5 text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                      <datalist id="pattern-options-list">
                        {(patterns || []).map((p) => (
                          <option key={p.id} value={p.name} />
                        ))}
                        <option value="Two Pointers" />
                        <option value="Sliding Window" />
                        <option value="Prefix Sum" />
                        <option value="Binary Search" />
                        <option value="Fast & Slow Pointers" />
                        <option value="Monotonic Stack" />
                        <option value="BFS & DFS" />
                        <option value="Dynamic Programming" />
                        <option value="Greedy" />
                        <option value="Backtracking" />
                        <option value="Bit Manipulation" />
                        <option value="Union Find" />
                      </datalist>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-muted block">
                        Recognition Clues
                      </label>
                      <input
                        type="text"
                        value={formData.recognition_clues || ''}
                        onChange={(e) => updateField('recognition_clues', e.target.value)}
                        placeholder="What clues helped you recognize this pattern?"
                        className="w-full bg-transparent border-b border-border/60 py-1 text-xs text-foreground focus:outline-none focus:border-accent placeholder:text-muted"
                      />
                    </div>
                  </div>
                </div>

                {/* CARD 3: Key Points to Remember */}
                <div className="p-4 rounded-2xl border border-border bg-panel space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Key Points to Remember</span>
                  </div>

                  <textarea
                    rows={4}
                    value={formData.key_points || ''}
                    onChange={(e) => updateField('key_points', e.target.value)}
                    placeholder="Add important observations and things to remember..."
                    className="w-full bg-transparent text-xs text-foreground/90 font-sans leading-relaxed focus:outline-none resize-y placeholder:text-muted"
                  />
                </div>

                {/* CARD 4: Personal Notes with toolbar & Save button */}
                <div className="p-4 rounded-2xl border border-border bg-panel space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Personal Notes & Insights</span>
                  </div>

                  <textarea
                    rows={4}
                    value={formData.personal_notes || ''}
                    onChange={(e) => updateField('personal_notes', e.target.value)}
                    placeholder="Write your own understanding, intuition and observations..."
                    className="w-full bg-elevated/50 border border-border rounded-xl p-2.5 text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
                  />

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-muted">
                      <button
                        type="button"
                        className="p-1 rounded hover:bg-elevated hover:text-foreground"
                        title="Bold"
                        aria-label="Format Bold"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1 rounded hover:bg-elevated hover:text-foreground"
                        title="Italic"
                        aria-label="Format Italic"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1 rounded hover:bg-elevated hover:text-foreground"
                        title="Bullet list"
                        aria-label="Format Bullet list"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1 rounded hover:bg-elevated hover:text-foreground"
                        title="Numbered list"
                        aria-label="Format Numbered list"
                      >
                        <ListOrdered className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1 rounded hover:bg-elevated hover:text-foreground"
                        title="Code inline"
                        aria-label="Format Code inline"
                      >
                        <Code className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => persistProblem(formData)}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-accent text-accent-text hover:bg-accent-hover transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: APPROACHES & PATTERNS */}
            {activeTab === 'approach' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-border bg-panel space-y-2">
                  <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">
                    Optimised Approach & Algorithmic Intuition
                  </span>
                  <textarea
                    rows={5}
                    value={formData.optimised_approach}
                    onChange={(e) => updateField('optimised_approach', e.target.value)}
                    placeholder="Explain why this approach works, invariant preservation, and step-by-step logic..."
                    className="w-full bg-transparent text-xs text-foreground focus:outline-none resize-y"
                  />
                </div>

                <div className="p-4 rounded-2xl border border-border bg-panel space-y-2">
                  <span className="text-xs font-bold text-muted block uppercase tracking-wider">
                    Brute Force Approach
                  </span>
                  <textarea
                    rows={3}
                    value={formData.brute_force_approach}
                    onChange={(e) => updateField('brute_force_approach', e.target.value)}
                    placeholder="Describe the naive solution and why it is too slow..."
                    className="w-full bg-transparent text-xs text-foreground focus:outline-none resize-y"
                  />
                </div>
              </div>
            )}

            {/* TAB: COMPLEXITY & EDGE CASES */}
            {activeTab === 'complexity' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-border bg-panel space-y-2">
                    <span className="text-xs font-bold text-muted uppercase tracking-wider block">
                      Time Complexity
                    </span>
                    <input
                      type="text"
                      value={formData.time_complexity}
                      onChange={(e) => updateField('time_complexity', e.target.value)}
                      className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none"
                      placeholder="e.g. O(n²)"
                    />
                  </div>

                  <div className="p-4 rounded-2xl border border-border bg-panel space-y-2">
                    <span className="text-xs font-bold text-muted uppercase tracking-wider block">
                      Space Complexity
                    </span>
                    <input
                      type="text"
                      value={formData.space_complexity}
                      onChange={(e) => updateField('space_complexity', e.target.value)}
                      className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none"
                      placeholder="e.g. O(1) auxiliary"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-border bg-panel space-y-2">
                  <span className="text-xs font-bold text-muted uppercase tracking-wider block">
                    Common Mistakes & Pitfalls
                  </span>
                  <textarea
                    rows={3}
                    value={formData.common_mistakes || ''}
                    onChange={(e) => updateField('common_mistakes', e.target.value)}
                    placeholder="Add common mistakes or pitfalls to avoid..."
                    className="w-full bg-transparent text-xs text-foreground focus:outline-none resize-y placeholder:text-muted"
                  />
                </div>

                <div className="p-4 rounded-2xl border border-border bg-panel space-y-2">
                  <span className="text-xs font-bold text-muted uppercase tracking-wider block">
                    Critical Edge Cases
                  </span>
                  <textarea
                    rows={3}
                    value={formData.edge_cases || ''}
                    onChange={(e) => updateField('edge_cases', e.target.value)}
                    placeholder="Add critical edge cases to consider (e.g. empty array, duplicates, overflow)..."
                    className="w-full bg-transparent text-xs text-foreground focus:outline-none resize-y placeholder:text-muted"
                  />
                </div>
              </div>
            )}

            {/* TAB: REVISION & INFO */}
            {activeTab === 'revision' && (
              <div className="space-y-4">
                {/* Revision Widget */}
                <div className="p-4 rounded-2xl border border-border bg-panel space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span>Revision Schedule</span>
                    </div>

                    <button
                      type="button"
                      onClick={toggleLearned}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-accent text-accent-text hover:bg-accent-hover transition-colors cursor-pointer"
                    >
                      {formData.is_learned ? 'Mark as Done' : 'Schedule Review'}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl border border-border bg-elevated/50">
                      <span className="text-[10px] text-muted block mb-0.5">Next Review</span>
                      <span className="text-xs font-bold text-foreground">
                        {scheduleData?.next_review_at
                          ? new Date(scheduleData.next_review_at).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : '21 Oct 2026'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl border border-border bg-elevated/50">
                      <span className="text-[10px] text-muted block mb-0.5">Days Left</span>
                      <span className="text-xs font-bold text-foreground">
                        {scheduleData?.days_left || 3}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl border border-border bg-elevated/50">
                      <span className="text-[10px] text-muted block mb-0.5">Review Stage</span>
                      <span className="text-xs font-bold text-foreground">
                        {scheduleData?.stage || 1}/4
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="p-4 rounded-2xl border border-border bg-panel space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    <span>Additional Notes</span>
                  </div>

                  <textarea
                    rows={4}
                    value={formData.additional_notes || ''}
                    onChange={(e) => updateField('additional_notes', e.target.value)}
                    placeholder="• Can be extended to k-Sum problem.&#10;• Important to handle duplicates carefully.&#10;• Practice variations like 4Sum."
                    className="w-full bg-transparent text-xs text-foreground/80 leading-relaxed font-sans focus:outline-none resize-y placeholder:text-muted"
                  />
                </div>

                {/* Related Problems */}
                <div className="p-4 rounded-2xl border border-border bg-panel space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-foreground">
                      <Link2 className="w-4 h-4 text-amber-400" />
                      <span>Related Problems</span>
                    </div>
                    <Link
                      href="/problems"
                      className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="space-y-1 text-xs">
                    {relatedProblems.map((prob) => {
                      const badgeClass =
                        prob.difficulty === 'Easy'
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                          : prob.difficulty === 'Hard'
                          ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                          : 'bg-amber-400/15 border-amber-400/30 text-amber-400';

                      return (
                        <Link
                          key={prob.id}
                          href={`/problems/${prob.id}`}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-elevated/70 transition-colors group"
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <FileText className="w-3.5 h-3.5 text-muted shrink-0" />
                            <span className="text-foreground/90 group-hover:text-amber-400 truncate text-[11px] font-medium">
                              {prob.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeClass}`}
                            >
                              {prob.difficulty}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-muted opacity-40 group-hover:opacity-100" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Problem Stats */}
                <div className="p-4 rounded-2xl border border-border bg-panel space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span>Problem Stats</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-xl border border-border bg-elevated/50">
                      <span className="text-[10px] text-muted block mb-0.5">Solved</span>
                      <span className="text-xs font-bold text-foreground">24.8K</span>
                      <span className="text-[9px] text-muted block">Users</span>
                    </div>
                    <div className="p-2 rounded-xl border border-border bg-elevated/50">
                      <span className="text-[10px] text-muted block mb-0.5">Acceptance Rate</span>
                      <span className="text-xs font-bold text-foreground">42.3%</span>
                      <span className="text-[9px] text-muted block">LeetCode</span>
                    </div>
                    <div className="p-2 rounded-xl border border-border bg-elevated/50">
                      <span className="text-[10px] text-muted block mb-0.5">Difficulty</span>
                      <span className="text-xs font-bold text-amber-400">{formData.difficulty || 'Medium'}</span>
                      <span className="text-[9px] text-muted block">LeetCode</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Create Button when in isNew mode */}
            {isNew && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={isCreating}
                  className="w-full py-3 rounded-xl bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs tracking-wide shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isCreating ? 'Saving Note to Database...' : 'Save Problem Note to Workspace'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Persistent Solution Code Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-4 min-w-0">
            <div className="rounded-2xl border border-border bg-panel overflow-hidden sticky top-4 shadow-sm flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-elevated/40">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span>Persistent Solution Code</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted font-mono uppercase tracking-wider">
                    {formData.language || 'cpp'}
                  </span>
                </div>
              </div>

              <div className="p-0">
                <CodeEditor
                  value={formData.code}
                  onChange={(val) => updateField('code', val)}
                  language={formData.language || 'cpp'}
                  onLanguageChange={(lang) => updateField('language', lang)}
                  placeholder="Write your Code"
                  minHeight="540px"
                  className="border-0 rounded-none"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
