import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import striverA2ZData from '@/lib/curriculum/striver-a2z.json';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('topicId');
    const search = searchParams.get('search');
    const difficulty = searchParams.get('difficulty');
    const status = searchParams.get('status');

    let user = null;
    let userProgressMap = {};
    let userTopicProgressMap = {};
    let userNotesMap = {};

    try {
      const supabase = await createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      user = authUser;

      if (user) {
        // Fetch user progress
        const [progressRes, topicProgressRes, notesRes] = await Promise.all([
          supabase.from('user_curriculum_progress').select('problem_id, status, last_activity_at').eq('user_id', user.id),
          supabase.from('user_curriculum_topic_progress').select('topic_id, is_studied').eq('user_id', user.id),
          supabase.from('user_curriculum_notes').select('problem_id, updated_at').eq('user_id', user.id)
        ]);

        if (progressRes.data) {
          progressRes.data.forEach(item => {
            userProgressMap[item.problem_id] = item.status;
          });
        }
        if (topicProgressRes.data) {
          topicProgressRes.data.forEach(item => {
            userTopicProgressMap[item.topic_id] = item.is_studied;
          });
        }
        if (notesRes.data) {
          notesRes.data.forEach(item => {
            userNotesMap[item.problem_id] = true;
          });
        }
      }
    } catch (e) {
      // User may not be logged in or Supabase client error
    }

    // Attach user progress to problems
    let problems = striverA2ZData.problems.map(p => ({
      ...p,
      status: userProgressMap[p.id] || 'Not started',
      hasNotes: !!userNotesMap[p.id]
    }));

    // Filter problems
    if (topicId) {
      problems = problems.filter(p => p.topic_id === topicId);
    }
    if (difficulty && difficulty !== 'all') {
      problems = problems.filter(p => p.difficulty.toLowerCase() === difficulty.toLowerCase());
    }
    if (status && status !== 'all') {
      problems = problems.filter(p => p.status === status);
    }
    if (search) {
      const query = search.toLowerCase();
      problems = problems.filter(p => p.title.toLowerCase().includes(query));
    }

    // Attach topic stats
    const topicsWithStats = striverA2ZData.topics.map(t => {
      const topicProblems = striverA2ZData.problems.filter(p => p.topic_id === t.id);
      const solvedCount = topicProblems.filter(p => (userProgressMap[p.id] || 'Not started') === 'Solved').length;
      const attemptedCount = topicProblems.filter(p => (userProgressMap[p.id] || 'Not started') === 'Attempted').length;
      const needsRevisionCount = topicProblems.filter(p => (userProgressMap[p.id] || 'Not started') === 'Needs revision').length;

      return {
        ...t,
        is_studied: !!userTopicProgressMap[t.id],
        total: topicProblems.length,
        solved: solvedCount,
        attempted: attemptedCount,
        needs_revision: needsRevisionCount,
        completion_percent: topicProblems.length > 0 ? Math.round((solvedCount / topicProblems.length) * 100) : 0
      };
    });

    // Calculate overall stats
    const totalProblems = striverA2ZData.problems.length;
    const totalSolved = Object.values(userProgressMap).filter(s => s === 'Solved').length;
    const totalAttempted = Object.values(userProgressMap).filter(s => s === 'Attempted').length;
    const totalNeedsRevision = Object.values(userProgressMap).filter(s => s === 'Needs revision').length;
    const totalTopicsStudied = Object.values(userTopicProgressMap).filter(Boolean).length;

    return NextResponse.json({
      sheet: striverA2ZData.sheet,
      topics: topicsWithStats,
      sections: striverA2ZData.sections,
      problems,
      stats: {
        totalProblems,
        totalSolved,
        totalAttempted,
        totalNeedsRevision,
        totalTopicsStudied,
        totalTopics: striverA2ZData.topics.length,
        completionPercent: totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0
      }
    });
  } catch (error) {
    console.error('Curriculum API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
