'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ProblemNotebook } from '@/components/problems/ProblemNotebook';
import { createClient } from '@/lib/supabase/client';

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

        // Check if problemId is a valid UUID
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
          // Fallback: search by title if a slug was provided
          const cleanTitle = problemId.replace(/-/g, ' ');
          const { data } = await supabase
            .from('problems')
            .select('*')
            .ilike('title', cleanTitle)
            .maybeSingle();

          if (data) probData = data;
        }

        // Fetch topics, patterns, links, and schedules
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
        } else if (problemId === '3sum') {
          // If 3sum is visited as demo reference when not yet seeded in DB
          setProblem({
            id: null,
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
            topic_id: tData?.[0]?.id || null,
          });
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
          No problem matching &quot;{problemId}&quot; exists in your private workspace.
        </p>
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => router.push('/problems/new')}
            className="px-3.5 py-1.5 rounded-xl bg-accent text-accent-text text-xs font-bold"
          >
            Create New Note
          </button>
          <button
            onClick={() => router.push('/problems')}
            className="px-3.5 py-1.5 rounded-xl border border-border bg-panel text-xs text-foreground"
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
