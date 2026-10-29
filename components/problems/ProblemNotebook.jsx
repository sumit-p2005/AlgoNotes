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

export function ProblemNotebook({
  initialProblem,
  topics = [],
  patterns = [],
  isNew = false,
}) {
  const router = useRouter();

  // Problem State: Empty when isNew is true, otherwise uses initialProblem or sample
  const [formData, setFormData] = useState(() => {
    if (initialProblem) return initialProblem;
    if (isNew) {
      return {
        title: '',
        problem_number: '',
        external_url: '',
        difficulty: 'Medium',
        status: 'Attempted',
        summary: '',
        recognition_clues: '',
        key_points: '',
        brute_force_approach: '',
        optimised_approach: '',
        code: '// Write your optimal solution here\n\nfunction solution() {\n    \n}\n',
        language: 'javascript',
        time_complexity: 'O(N)',
        space_complexity: 'O(1)',
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
    }
    // Default fallback reference item
    return {
      title: '3Sum',
      problem_number: '15',
      external_url: 'https://leetcode.com/problems/3sum/',
      difficulty: 'Medium',
      status: 'Solved',
      summary:
        'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0.',
      recognition_clues:
        'Used when we need to find a pair/triplet in a sorted array.',
      key_points:
        '• Sort the array first.\n• Fix one element and use two pointers for the rest.\n• Skip duplicates to avoid repeated triplets.\n• Time Complexity: O(n²)',
      brute_force_approach:
        'Three nested loops checking all possible triplets O(n³).',
      optimised_approach:
        'Sort the array in O(n log n). Loop through index i, and for each i, maintain two pointers left = i+1 and right = n-1. Move pointers based on sum and skip identical adjacent values.',
      code: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;

        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = n - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
}`,
      language: 'java',
      time_complexity: 'O(n²)',
      space_complexity: 'O(1) auxiliary',
      common_mistakes: 'Not skipping duplicates, resulting in repeated triplets.',
      edge_cases: 'Array length < 3, all zeroes, no valid triplet.',
      additional_notes:
        '• Can be extended to k-Sum problem.\n• Important to handle duplicates carefully.\n• Practice variations like 4Sum.\n• Common mistake: not skipping duplicates.',
      personal_notes: '',
      confidence_rating: 4,
      is_bookmarked: true,
      is_learned: true,
      tags: ['array', 'two-pointers', 'sorting'],
      topic_id: topics[0]?.id || null,
    };
  });

  const [activeTab, setActiveTab] = useState('notes');
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [scheduleData, setScheduleData] = useState(
    initialProblem?.review_schedule || {
      stage: 1,
      next_review_at: new Date(Date.now() + 3 * 86400000).toISOString(),
      days_left: 3,
    }
  );
  const [copiedCode, setCopiedCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const saveTimeoutRef = useRef(null);

  // Autosave existing problem
  const persistProblem = useCallback(
    async (updated) => {
      if (isNew || !updated.id) return;
      setSaveStatus('Saving...');
      try {
        const supabase = createClient();
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
            language: updated.language,
            time_complexity: updated.time_complexity,
            space_complexity: updated.space_complexity,
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
                learning_date: new Date().toISOString(),
                next_review_at: new Date(Date.now() + 3 * 86400000).toISOString(),
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
          language: formData.language || 'javascript',
          time_complexity: formData.time_complexity || 'O(N)',
          space_complexity: formData.space_complexity || 'O(1)',
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
    <div className="flex flex-col 2xl:flex-row h-full min-h-0 bg-page text-foreground overflow-hidden">
      {/* ======================================================== */}
      {/* CENTRAL PROBLEM NOTEBOOK WORKSPACE                      */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border overflow-y-auto">
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
              placeholder="Enter Problem Title (e.g. 3Sum, LRU Cache)..."
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

          {/* Status selector pill */}
          <select
            value={formData.status}
            onChange={(e) => updateField('status', e.target.value)}
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-panel border border-border text-foreground/90 focus:outline-none cursor-pointer"
          >
            <option value="Saved">Saved</option>
            <option value="Attempted">Attempted</option>
            <option value="Solved">Solved</option>
          </select>

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

        {/* Tabs Bar */}
        <div className="px-6 mt-3 border-b border-border flex items-center gap-6 text-xs font-medium">
          {['Notes', 'Code', 'Approach', 'Complexity', 'Mistakes', 'Revision'].map((tab) => {
            const isSelected = activeTab === tab.toLowerCase();
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`pb-3 font-semibold transition-colors relative cursor-pointer ${
                  isSelected
                    ? 'text-amber-400'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <span>{tab}</span>
                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Notebook Main Body */}
        <div className="p-6 space-y-5">
          {/* TAB: NOTES & SUMMARY */}
          {activeTab === 'notes' && (
            <>
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
                  placeholder="Summarize the core problem requirements in your own words..."
                  className="w-full bg-transparent text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans focus:outline-none resize-y placeholder:text-muted"
                />
              </div>

              {/* CARD 2: Pattern Used */}
              <div className="p-4 rounded-2xl border border-border bg-panel space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Target className="w-4 h-4 text-amber-400" />
                  <span>Pattern Used</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-black">
                    Two Pointers
                  </span>
                  <input
                    type="text"
                    value={formData.recognition_clues}
                    onChange={(e) => updateField('recognition_clues', e.target.value)}
                    placeholder="Used when we need to find a pair/triplet in a sorted array..."
                    className="flex-1 bg-transparent text-xs text-muted focus:outline-none placeholder:text-muted"
                  />
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
                  value={formData.key_points}
                  onChange={(e) => updateField('key_points', e.target.value)}
                  placeholder="• Sort the array first.&#10;• Fix one element and use two pointers for the rest.&#10;• Skip duplicates to avoid repeated triplets.&#10;• Time Complexity: O(n²)"
                  className="w-full bg-transparent text-xs text-foreground/90 font-sans leading-relaxed focus:outline-none resize-y placeholder:text-muted"
                />
              </div>
            </>
          )}

          {/* TAB: CODE */}
          {(activeTab === 'code' || activeTab === 'notes') && (
            <div className="rounded-2xl border border-border bg-panel overflow-hidden space-y-0">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-elevated/40">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span>Code</span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={formData.language}
                    onChange={(e) => updateField('language', e.target.value)}
                    className="bg-elevated border border-border rounded-lg px-2.5 py-1 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
                  >
                    <option value="java">Java</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                  </select>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border bg-elevated text-xs font-medium text-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-1 rounded-lg border border-border bg-elevated text-muted hover:text-foreground"
                    title="Toggle fullscreen code"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-0">
                <CodeEditor
                  value={formData.code}
                  onChange={(val) => updateField('code', val)}
                  language={formData.language}
                  minHeight="380px"
                />
              </div>
            </div>
          )}

          {/* TAB: APPROACH */}
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

          {/* TAB: COMPLEXITY */}
          {activeTab === 'complexity' && (
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
          )}

          {/* TAB: MISTAKES & EDGE CASES */}
          {activeTab === 'mistakes' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-border bg-panel space-y-2">
                <span className="text-xs font-bold text-muted uppercase tracking-wider block">
                  Common Mistakes & Pitfalls
                </span>
                <textarea
                  rows={3}
                  value={formData.common_mistakes}
                  onChange={(e) => updateField('common_mistakes', e.target.value)}
                  className="w-full bg-transparent text-xs text-foreground focus:outline-none resize-y"
                />
              </div>

              <div className="p-4 rounded-2xl border border-border bg-panel space-y-2">
                <span className="text-xs font-bold text-muted uppercase tracking-wider block">
                  Critical Edge Cases
                </span>
                <textarea
                  rows={3}
                  value={formData.edge_cases}
                  onChange={(e) => updateField('edge_cases', e.target.value)}
                  className="w-full bg-transparent text-xs text-foreground focus:outline-none resize-y"
                />
              </div>
            </div>
          )}

          {/* TAB: REVISION HISTORY */}
          {activeTab === 'revision' && (
            <div className="p-4 rounded-2xl border border-border bg-panel space-y-3">
              <span className="text-xs font-bold text-foreground block">
                Active Recall Spaced Schedule
              </span>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-border bg-elevated/40">
                  <span className="text-muted block text-[11px]">Current Stage</span>
                  <span className="text-sm font-bold text-amber-400">
                    Stage {scheduleData?.stage || 1}/4
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-border bg-elevated/40">
                  <span className="text-muted block text-[11px]">Next Review</span>
                  <span className="text-sm font-bold text-foreground">
                    {scheduleData?.next_review_at
                      ? new Date(scheduleData.next_review_at).toLocaleDateString()
                      : '21 Oct 2026'}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-border bg-elevated/40">
                  <span className="text-muted block text-[11px]">Days Remaining</span>
                  <span className="text-sm font-bold text-foreground">
                    {scheduleData?.days_left || 3} days
                  </span>
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
      </div>

      {/* ======================================================== */}
      {/* RIGHT-SIDE REVISION & ADDITIONAL NOTES PANEL            */}
      {/* ======================================================== */}
      <div className="w-full 2xl:w-88 border-t 2xl:border-t-0 bg-page p-5 flex flex-col gap-5 overflow-y-auto shrink-0 select-none">
        {/* CARD 1: Revision Widget */}
        <div className="p-4 rounded-2xl border border-border bg-panel space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Revision</span>
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

        {/* CARD 2: Additional Notes */}
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

        {/* CARD 3: Related Problems */}
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

        {/* CARD 4: Problem Stats */}
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

        {/* CARD 5: Personal Notes with toolbar & Save button */}
        <div className="p-4 rounded-2xl border border-border bg-panel space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Personal Notes</span>
          </div>

          <textarea
            rows={3}
            value={formData.personal_notes || ''}
            onChange={(e) => updateField('personal_notes', e.target.value)}
            placeholder="Add your personal notes, insights, or key takeaways..."
            className="w-full bg-elevated/50 border border-border rounded-xl p-2.5 text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
          />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-muted">
              <button
                type="button"
                className="p-1 rounded hover:bg-elevated hover:text-foreground"
                title="Bold"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="p-1 rounded hover:bg-elevated hover:text-foreground"
                title="Italic"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="p-1 rounded hover:bg-elevated hover:text-foreground"
                title="Bullet list"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="p-1 rounded hover:bg-elevated hover:text-foreground"
                title="Numbered list"
              >
                <ListOrdered className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="p-1 rounded hover:bg-elevated hover:text-foreground"
                title="Code inline"
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

        {/* CARD 6: Tags */}
        <div className="p-4 rounded-2xl border border-border bg-panel space-y-2.5">
          <span className="text-xs font-bold text-foreground block">Tags</span>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {(formData.tags || []).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full bg-elevated border border-border text-foreground/80 flex items-center gap-1 text-[11px]"
              >
                {tag}{' '}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-red-400 ml-0.5"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={() => setShowTagInput(true)}
              className="px-2 py-0.5 rounded-full border border-dashed border-border text-[11px] text-muted hover:text-foreground flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add Tag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
