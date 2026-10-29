'use client';

import React, { useState, useEffect, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
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

        // Fetch problem
        const { data: probData, error: probError } = await supabase
          .from('problems')
          .select('*')
          .eq('id', problemId)
          .single();

        if (probError || !probData) {
          setLoading(false);
          return;
        }

        // Fetch topics and patterns
        const [{ data: tData }, { data: pData }, { data: patLinks }, { data: schedData }] =
          await Promise.all([
            supabase.from('topics').select('id, name').order('order_index', { ascending: true }),
            supabase.from('patterns').select('id, name').order('name', { ascending: true }),
            supabase.from('problem_patterns').select('pattern_id').eq('problem_id', problemId),
            supabase.from('problem_review_schedules').select('*').eq('problem_id', problemId).maybeSingle(),
          ]);

        probData.selected_pattern_ids = patLinks ? patLinks.map((p) => p.pattern_id) : [];
        probData.review_schedule = schedData || null;

        setProblem(probData);
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
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h2 className="text-lg font-bold text-foreground">Problem Note Not Found</h2>
        <p className="text-xs text-muted mt-1 max-w-sm">
          This problem note might have been removed or belongs to another private account.
        </p>
        <button
          onClick={() => router.push('/problems')}
          className="mt-4 px-3 py-1.5 rounded-lg bg-accent text-accent-text text-xs font-semibold"
        >
          Back to All Problems
        </button>
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
