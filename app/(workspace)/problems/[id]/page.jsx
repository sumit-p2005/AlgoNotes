'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ProblemNotebook } from '@/components/problems/ProblemNotebook';
import { createClient } from '@/lib/supabase/client';
import { saveTopicTreeNav } from '@/lib/utils/userStorage';
import striverA2ZData from '@/lib/curriculum/striver-a2z.json';

export default function ProblemDetailPage({ params }) {
  const unwrappedParams = use(params);
  const problemId = unwrappedParams.id;
  const router = useRouter();

  const [problem, setProblem] = useState(null);
  const [topics, setTopics] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProblemData() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        // Persist navigation location for current user
        if (user?.id) {
          saveTopicTreeNav(user.id, { lastProblemId: problemId });
        }

        // 1. Check if problem is in user's custom 'problems' table
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
            .maybeSingle();

          if (!error && data) probData = data;
        } else {
          // Fallback: search by title if slug was provided
          const cleanTitle = problemId.replace(/-/g, ' ');
          const { data } = await supabase
            .from('problems')
            .select('*')
            .ilike('title', cleanTitle)
            .maybeSingle();

          if (data) probData = data;
        }

        // Fetch topics and patterns
        const [{ data: tData }, { data: pData }] = await Promise.all([
          supabase.from('topics').select('id, name').order('order_index', { ascending: true }),
          supabase.from('patterns').select('id, name').order('name', { ascending: true }),
        ]);

        if (probData) {
          const [{ data: patLinks }, { data: schedData }] = await Promise.all([
            supabase.from('problem_patterns').select('pattern_id').eq('problem_id', probData.id),
            supabase.from('problem_review_schedules').select('*').eq('problem_id', probData.id).maybeSingle(),
          ]);

          probData.selected_pattern_ids = patLinks ? patLinks.map((p) => p.pattern_id) : [];
          probData.review_schedule = schedData || null;
          setProblem(probData);
        } else {
          // 2. Check if problem is in preinstalled Striver A2Z Curriculum
          const currProb = (striverA2ZData?.problems || []).find(
            (p) =>
              p.id === problemId ||
              String(p.problem_number) === String(problemId) ||
              p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === problemId
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
                  .maybeSingle(),
                supabase
                  .from('user_curriculum_progress')
                  .select('*')
                  .eq('user_id', user.id)
                  .eq('problem_id', currProb.id)
                  .maybeSingle(),
                supabase
                  .from('user_curriculum_review_schedules')
                  .select('*')
                  .eq('user_id', user.id)
                  .eq('problem_id', currProb.id)
                  .maybeSingle(),
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
          } else if (problemId === '3sum') {
            // Reference problem if visited directly
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
              topic_id: tData?.[0]?.id || null,
            });
          }
        }

        setTopics(tData || []);
        setPatterns(pData || []);
      } catch (err) {
        console.error('Failed to load problem:', err);
      } finally {
        setLoading(false);
      }
    }

    if (problemId) {
      loadProblemData();
    }
  }, [problemId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-muted text-sm">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping mr-2" />
        Loading problem note...
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
            onClick={() => router.push('/problems/new')}
            className="px-3.5 py-1.5 rounded-xl bg-accent text-accent-text text-xs font-bold cursor-pointer"
          >
            Create Blank Note
          </button>
          <button
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
      initialProblem={problem}
      topics={topics}
      patterns={patterns}
      isNew={false}
    />
  );
}
