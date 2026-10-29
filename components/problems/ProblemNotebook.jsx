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

  // Problem State
  const [formData, setFormData] = useState(
    initialProblem || {
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
    }
  );

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
  const saveTimeoutRef = useRef(null);

  // Autosave problem
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
            is_bookmarked: updated.is_bookmarked,
            is_learned: updated.is_learned,
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

  const toggleLearned = async () => {
    const nextState = !formData.is_learned;
    updateField('is_learned', nextState);

    if (formData.id) {
      try {
        const supabase = createClient();
        const { data: user } = await supabase.auth.getUser();
        if (user?.user) {
          const sched = initializeSchedule();
          await supabase.from('problem_review_schedules').upsert({
            problem_id: formData.id,
            user_id: user.user.id,
            stage: 1,
            learning_date: new Date().toISOString(),
            next_review_at: new Date(Date.now() + 3 * 86400000).toISOString(),
            review_count: 1,
            last_rating: 'Good',
          });
          setScheduleData({
            stage: 1,
            next_review_at: new Date(Date.now() + 3 * 86400000).toISOString(),
            days_left: 3,
          });
        }
      } catch (err) {
        console.error('Revision schedule error:', err);
      }
    }
  };

  // Related Problems data matching reference
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
          <div className="flex items-center gap-2 text-muted">
            <Link href="/topics" className="hover:text-foreground">DSA</Link>
            <span>&gt;</span>
            <Link href="/topics" className="hover:text-foreground">Arrays</Link>
            <span>&gt;</span>
            <Link href="/topics" className="hover:text-foreground">Two Pointers</Link>
            <span>&gt;</span>
            <span className="text-foreground font-semibold">{formData.title}</span>
          </div>

          <span className="text-[11px] text-muted font-mono">{saveStatus}</span>
        </div>

        {/* Problem Title & Actions */}
        <div className="px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {formData.title}
            </h1>
            {formData.external_url && (
              <a
                href={formData.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground p-1 rounded transition-colors"
                title="Open LeetCode problem"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateField('is_bookmarked', !formData.is_bookmarked)}
              className="p-1.5 rounded-lg border border-border bg-panel hover:bg-elevated transition-colors"
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
            <button
              type="button"
              className="p-1.5 rounded-lg border border-border bg-panel hover:bg-elevated text-muted hover:text-foreground"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tags Row */}
        <div className="px-6 py-2 flex items-center gap-2 flex-wrap text-xs">
          {/* Difficulty pill */}
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/15 border border-amber-400/30 text-amber-400">
            {formData.difficulty || 'Medium'}
          </span>

          {/* Pattern / Topic Pills */}
          <span className="px-3 py-1 rounded-full text-xs bg-panel border border-border text-foreground/90 font-medium">
            Arrays
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-panel border border-border text-foreground/90 font-medium">
            Two Pointers
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-panel border border-border text-foreground/90 font-medium">
            Sorting
          </span>

          <button
            type="button"
            className="px-2.5 py-1 rounded-full text-xs border border-dashed border-border text-muted hover:text-foreground hover:border-muted transition-colors flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>Add Tag</span>
          </button>
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
                className={`pb-3 font-semibold transition-colors relative ${
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
          {/* CARD 1: Problem Statement */}
          <div className="p-4 rounded-2xl border border-border bg-panel space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Problem Statement</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
              {formData.summary}
            </p>
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
              <span className="text-xs text-muted">
                {formData.recognition_clues ||
                  'Used when we need to find a pair/triplet in a sorted array.'}
              </span>
            </div>
          </div>

          {/* CARD 3: Key Points to Remember */}
          <div className="p-4 rounded-2xl border border-border bg-panel space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Key Points to Remember</span>
            </div>

            <div className="space-y-2 text-xs text-foreground/90 font-sans">
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-400 text-black font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span>Sort the array first.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-400 text-black font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span>Fix one element and use two pointers for the rest.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-400 text-black font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span>Skip duplicates to avoid repeated triplets.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-400 text-black font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span>Time Complexity: O(n²)</span>
              </div>
            </div>
          </div>

          {/* CARD 4: Code Section */}
          <div className="rounded-2xl border border-border bg-panel overflow-hidden space-y-0">
            {/* Code Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-elevated/40">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>Code</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Language Pill Selector */}
                <select
                  value={formData.language}
                  onChange={(e) => updateField('language', e.target.value)}
                  className="bg-elevated border border-border rounded-lg px-2.5 py-1 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="java">Java</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="c">C</option>
                </select>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border bg-elevated text-xs font-medium text-muted hover:text-foreground transition-colors"
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

                {/* Fullscreen Button */}
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

            {/* Code Editor Surface */}
            <div className="p-0">
              <CodeEditor
                value={formData.code}
                onChange={(val) => updateField('code', val)}
                language={formData.language}
                minHeight="380px"
              />
            </div>
          </div>
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
              className="px-3 py-1 rounded-lg text-xs font-bold bg-accent text-accent-text hover:bg-accent-hover transition-colors"
            >
              {formData.is_learned ? 'Mark as Done' : 'Schedule Review'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl border border-border bg-elevated/50">
              <span className="text-[10px] text-muted block mb-0.5">Next Review</span>
              <span className="text-xs font-bold text-foreground">21 Oct 2026</span>
            </div>
            <div className="p-2.5 rounded-xl border border-border bg-elevated/50">
              <span className="text-[10px] text-muted block mb-0.5">Days Left</span>
              <span className="text-xs font-bold text-foreground">3</span>
            </div>
            <div className="p-2.5 rounded-xl border border-border bg-elevated/50">
              <span className="text-[10px] text-muted block mb-0.5">Review Stage</span>
              <span className="text-xs font-bold text-foreground">1/4</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Additional Notes */}
        <div className="p-4 rounded-2xl border border-border bg-panel space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <Edit3 className="w-4 h-4 text-amber-400" />
            <span>Additional Notes</span>
          </div>

          <ul className="text-xs text-foreground/80 space-y-1.5 leading-relaxed font-sans">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Can be extended to k-Sum problem.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Important to handle duplicates carefully.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Practice variations like 4Sum.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Common mistake: not skipping duplicates.</span>
            </li>
          </ul>
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
              <span className="text-xs font-bold text-amber-400">Medium</span>
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
              className="px-3 py-1 rounded-lg text-xs font-bold bg-accent text-accent-text hover:bg-accent-hover transition-colors"
            >
              Save
            </button>
          </div>
        </div>

        {/* CARD 6: Tags */}
        <div className="p-4 rounded-2xl border border-border bg-panel space-y-2.5">
          <span className="text-xs font-bold text-foreground block">Tags</span>
          <div className="flex flex-wrap gap-1.5 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-elevated border border-border text-foreground/80 flex items-center gap-1 text-[11px]">
              array <button className="hover:text-red-400">×</button>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-elevated border border-border text-foreground/80 flex items-center gap-1 text-[11px]">
              two-pointers <button className="hover:text-red-400">×</button>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-elevated border border-border text-foreground/80 flex items-center gap-1 text-[11px]">
              sorting <button className="hover:text-red-400">×</button>
            </span>
            <button
              type="button"
              className="px-2 py-0.5 rounded-full border border-dashed border-border text-[11px] text-muted hover:text-foreground flex items-center gap-1"
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
