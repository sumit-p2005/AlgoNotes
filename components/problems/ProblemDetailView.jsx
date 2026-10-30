'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProblemNotebook } from '@/components/problems/ProblemNotebook';
import { createClient } from '@/lib/supabase/client';
import { saveTopicTreeNav } from '@/lib/utils/userStorage';
import striverA2ZData from '@/lib/curriculum/striver-a2z.json';

export function ProblemDetailView({ problemId }) {
  const router = useRouter();
  const [problem, setProblem] = useState(null);
  const [topics, setTopics] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProblemData() {
      if (!problemId) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const supabase = createClient();
        const { data: authData } = await supabase.auth.getUser().catch(() => ({ data: {} }));
        const user = authData?.user || null;

        // Persist navigation location for current user
        if (user?.id) {
          saveTopicTreeNav(user.id, { lastProblemId: problemId });
        }

        // 1. Fetch topics and patterns with graceful fallbacks
        const [{ data: tData }, { data: pData }] = await Promise.all([
          supabase
            .from('topics')
            .select('id, name')
            .order('order_index', { ascending: true })
            .catch(() => ({ data: [] })),
          supabase
            .from('patterns')
            .select('id, name')
            .order('name', { ascending: true })
            .catch(() => ({ data: [] })),
        ]);

        const loadedTopics = tData || [];
        const loadedPatterns = pData || [];
        setTopics(loadedTopics);
        setPatterns(loadedPatterns);

        // 2. Check if problem is in user's custom 'problems' table
        const isUUID =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            problemId
          );

        let probData = null;
        if (isUUID) {
          const { data, error } = await supabase
            .from('problems')
            .select('*')
            .eq('id', problemId)
            .maybeSingle()
            .catch(() => ({ data: null }));

          if (!error && data) probData = data;
        } else {
          // Fallback: search by title if a slug was provided
          const cleanTitle = problemId.replace(/-/g, ' ');
          const { data } = await supabase
            .from('problems')
            .select('*')
            .ilike('title', cleanTitle)
            .maybeSingle()
            .catch(() => ({ data: null }));

          if (data) probData = data;
        }

        if (probData) {
          const [{ data: patLinks }, { data: schedData }] = await Promise.all([
            supabase
              .from('problem_patterns')
              .select('pattern_id')
              .eq('problem_id', probData.id)
              .catch(() => ({ data: [] })),
            supabase
              .from('problem_review_schedules')
              .select('*')
              .eq('problem_id', probData.id)
              .maybeSingle()
              .catch(() => ({ data: null })),
          ]);

          probData.selected_pattern_ids = patLinks ? patLinks.map((p) => p.pattern_id) : [];
          probData.review_schedule = schedData || null;
          setProblem(probData);
        } else {
          // 3. Check if problem is in preinstalled Striver A2Z Curriculum
          const currProb = (striverA2ZData?.problems || []).find(
            (p) =>
              p.id === problemId ||
              String(p.problem_number) === String(problemId) ||
              (p.title &&
                p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') ===
                  problemId.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
          );

          if (currProb) {
            let userNotes = null;
            let userProgress = null;
            let userSched = null;

            if (user?.id) {
              const [{ data: nData }, { data: prData }, { data: scData }] = await Promise.all([
                supabase
                  .from('user_curriculum_notes')
                  .select('*')
                  .eq('user_id', user.id)
                  .eq('problem_id', currProb.id)
                  .maybeSingle()
                  .catch(() => ({ data: null })),
                supabase
                  .from('user_curriculum_progress')
                  .select('*')
                  .eq('user_id', user.id)
                  .eq('problem_id', currProb.id)
                  .maybeSingle()
                  .catch(() => ({ data: null })),
                supabase
                  .from('user_curriculum_review_schedules')
                  .select('*')
                  .eq('user_id', user.id)
                  .eq('problem_id', currProb.id)
                  .maybeSingle()
                  .catch(() => ({ data: null })),
              ]);

              userNotes = nData;
              userProgress = prData;
              userSched = scData;
            }

            // Genuinely empty notebook if user has not yet written personal notes
            setProblem({
              id: currProb.id,
              is_curriculum: true,
              sheet_id: currProb.sheet_id,
              title: currProb.title,
              problem_number: String(currProb.problem_number || ''),
              external_url: currProb.external_url || '',
              difficulty: currProb.difficulty || 'Medium',
              status:
                userProgress?.status === 'solved'
                  ? 'Solved'
                  : userProgress?.status === 'attempted'
                  ? 'Attempted'
                  : 'Saved',
              summary: userNotes?.intuition || '',
              pattern_used: userNotes?.pattern_used || '',
              recognition_clues: userNotes?.pattern_cues || '',
              key_points: userNotes?.key_points || '',
              brute_force_approach: userNotes?.brute_force_approach || '',
              optimised_approach: userNotes?.optimized_approach || '',
              code: userNotes?.code || '',
              language: userNotes?.language || 'cpp',
              time_complexity: userNotes?.time_complexity || '',
              space_complexity: userNotes?.space_complexity || '',
              common_mistakes: userNotes?.mistakes || '',
              edge_cases: userNotes?.edge_cases || '',
              additional_notes: '',
              personal_notes: userNotes?.personal_notes || '',
              confidence_rating: userNotes?.confidence_rating || 3,
              is_bookmarked: false,
              is_learned: userProgress?.status === 'solved',
              tags: userNotes?.tags || [],
              topic_id: currProb.topic_id,
              review_schedule: userSched || null,
            });
          } else {
            // 4. Default fallback: 3Sum reference
            setProblem({
              id: null,
              title: '3Sum',
              problem_number: '15',
              external_url: 'https://leetcode.com/problems/3sum/',
              difficulty: 'Medium',
              status: 'Solved',
              summary:
                'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0.',
              pattern_used: 'Two Pointers',
              recognition_clues: 'Used when we need to find a pair/triplet in a sorted array.',
              key_points:
                '• Sort the array first.\n• Fix one element and use two pointers for the rest.\n• Skip duplicates to avoid repeated triplets.',
              brute_force_approach:
                'Three nested loops checking all possible triplets O(n³).',
              optimised_approach:
                'Sort array in O(n log n). Loop through index i, and maintain left = i+1, right = n-1. Move pointers based on sum and skip duplicates.',
              code: '',
              language: 'cpp',
              time_complexity: 'O(n²)',
              space_complexity: 'O(1)',
              common_mistakes: 'Not skipping duplicates, resulting in repeated triplets.',
              edge_cases: 'Array length < 3, all zeroes, no valid triplet.',
              personal_notes: '',
              confidence_rating: 4,
              is_bookmarked: false,
              is_learned: false,
              tags: ['array', 'two-pointers', 'sorting'],
              topic_id: loadedTopics[0]?.id || null,
            });
          }
        }
      } catch (err) {
        console.error('Failed to load problem:', err);
        // Fallback so the page never breaks
        setProblem({
          id: null,
          title: '3Sum',
          problem_number: '15',
          difficulty: 'Medium',
          status: 'Solved',
          summary: '',
          pattern_used: '',
          code: '',
          language: 'cpp',
          tags: ['array'],
        });
      } finally {
        setLoading(false);
      }
    }

    loadProblemData();
  }, [problemId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-muted text-xs">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping mr-2" />
        <span>Loading problem note...</span>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-3">
        <h2 className="text-lg font-bold text-foreground">Problem Note Not Found</h2>
        <p className="text-xs text-muted max-w-sm">
          No problem matching &quot;{problemId}&quot; exists in your workspace.
        </p>
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => router.push('/problems/new')}
            className="px-3.5 py-1.5 rounded-xl bg-accent text-accent-text text-xs font-bold cursor-pointer"
          >
            Create Blank Note
          </button>
          <button
            type="button"
            onClick={() => router.push('/problems')}
            className="px-3.5 py-1.5 rounded-xl border border-border bg-panel text-xs text-foreground cursor-pointer"
          >
            All Problems
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProblemNotebook
      key={problem.id || problemId || 'problem-notebook'}
      initialProblem={problem}
      topics={topics}
      patterns={patterns}
      isNew={false}
    />
  );
}
