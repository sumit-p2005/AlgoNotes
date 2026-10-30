import React from 'react';
import { notFound } from 'next/navigation';
import {
  getCurriculumProblemById,
  getAdjacentCurriculumProblems,
} from '@/lib/curriculum/service';
import { createClient } from '@/lib/supabase/server';
import { CurriculumQuestionNotebook } from '@/components/curriculum/CurriculumQuestionNotebook';

export const dynamic = 'force-dynamic';

export default async function StriverProblemPage({ params }) {
  const { problemId } = await params;

  const problem = await getCurriculumProblemById(problemId);
  if (!problem) {
    notFound();
  }

  const { prev, next } = await getAdjacentCurriculumProblems(problem.problem_number);

  let initialNotes = null;
  let initialProgress = null;
  let initialSchedule = null;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const [notesRes, progressRes, scheduleRes] = await Promise.all([
        supabase
          .from('user_curriculum_notes')
          .select('*')
          .eq('user_id', user.id)
          .eq('problem_id', problem.id)
          .maybeSingle(),
        supabase
          .from('user_curriculum_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('problem_id', problem.id)
          .maybeSingle(),
        supabase
          .from('user_curriculum_review_schedules')
          .select('*')
          .eq('user_id', user.id)
          .eq('problem_id', problem.id)
          .maybeSingle(),
      ]);

      initialNotes = notesRes.data || null;
      initialProgress = progressRes.data || null;
      initialSchedule = scheduleRes.data || null;
    }
  } catch (e) {
    // offline or guest mode
  }

  return (
    <CurriculumQuestionNotebook
      problem={problem}
      topic={problem.topic}
      section={problem.section}
      prevProblem={prev}
      nextProblem={next}
      initialNotes={initialNotes}
      initialProgress={initialProgress}
      initialSchedule={initialSchedule}
    />
  );
}

