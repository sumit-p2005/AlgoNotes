import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculateNextReview, categorizeReviews, RECALL_RATINGS } from '@/lib/revision/scheduler';
import striverA2ZData from '@/lib/curriculum/striver-a2z.json';

// Pre-index curriculum problems and topics for fast O(1) lookups
const striverProblemsMap = new Map();
(striverA2ZData.problems || []).forEach((p) => {
  striverProblemsMap.set(p.id, p);
});

const striverTopicsMap = new Map();
(striverA2ZData.topics || []).forEach((t) => {
  striverTopicsMap.set(t.id, t);
});

function normalizeRating(raw) {
  const str = typeof raw === 'string' ? raw.trim().toLowerCase() : '';
  if (str === 'forgot') return { standard: RECALL_RATINGS.FORGOT, lower: 'forgot', upper: 'Forgot' };
  if (str === 'difficult') return { standard: RECALL_RATINGS.DIFFICULT, lower: 'difficult', upper: 'Difficult' };
  if (str === 'easy') return { standard: RECALL_RATINGS.EASY, lower: 'easy', upper: 'Easy' };
  return { standard: RECALL_RATINGS.GOOD, lower: 'good', upper: 'Good' };
}

export async function GET(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({
        summary: { dueToday: 0, overdue: 0, upcoming: 0, totalInSystem: 0, totalActionable: 0 },
        dueToday: [],
        overdue: [],
        upcoming: [],
        allSchedules: [],
        history: [],
        completedToday: [],
      });
    }

    // 1. Fetch all schedules and histories in parallel
    const [
      { data: customSchedules },
      { data: currSchedules },
      { data: customProblems },
      { data: customTopics },
      { data: customHistory },
      { data: currHistory },
    ] = await Promise.all([
      supabase
        .from('problem_review_schedules')
        .select('*')
        .eq('user_id', user.id)
        .order('next_review_at', { ascending: true }),
      supabase
        .from('user_curriculum_review_schedules')
        .select('*')
        .eq('user_id', user.id)
        .order('next_review_date', { ascending: true }),
      supabase
        .from('problems')
        .select('id, title, difficulty, problem_number, topic_id')
        .eq('user_id', user.id),
      supabase
        .from('topics')
        .select('id, title')
        .eq('user_id', user.id),
      supabase
        .from('problem_review_history')
        .select('*')
        .eq('user_id', user.id)
        .order('reviewed_at', { ascending: false })
        .limit(50),
      supabase
        .from('user_curriculum_review_history')
        .select('*')
        .eq('user_id', user.id)
        .order('review_date', { ascending: false })
        .limit(50),
    ]);

    // Build lookup maps for custom entities
    const customProbMap = new Map();
    (customProblems || []).forEach((p) => customProbMap.set(p.id, p));

    const customTopicMap = new Map();
    (customTopics || []).forEach((t) => customTopicMap.set(t.id, t.title));

    // 2. Unify schedules from both sources
    const unifiedSchedules = [];

    // Custom problems
    (customSchedules || []).forEach((s) => {
      const prob = customProbMap.get(s.problem_id);
      const stageIdx = typeof s.stage === 'number' ? s.stage : 0;
      unifiedSchedules.push({
        id: s.id,
        schedule_id: s.id,
        problem_id: s.problem_id,
        is_curriculum: false,
        title: prob?.title || 'Custom Problem',
        problem_number: prob?.problem_number || null,
        difficulty: prob?.difficulty || 'Medium',
        topic_name: prob?.topic_id ? customTopicMap.get(prob.topic_id) || 'My Notes' : 'My Notes',
        url: `/problems/${s.problem_id}`,
        stage: stageIdx,
        display_stage: stageIdx + 1,
        next_review_at: s.next_review_at,
        next_review_date: s.next_review_at ? s.next_review_at.split('T')[0] : null,
        review_count: s.review_count || 0,
        last_rating: s.last_rating || null,
        last_reviewed_at: s.last_reviewed_at || null,
      });
    });

    // Curriculum problems
    (currSchedules || []).forEach((s) => {
      const currProb = striverProblemsMap.get(s.problem_id);
      const currTopic = currProb ? striverTopicsMap.get(currProb.topic_id) : null;
      const stage = typeof s.review_stage === 'number' ? s.review_stage : 1;
      const stageIdx = Math.max(0, stage - 1);

      unifiedSchedules.push({
        id: s.id,
        schedule_id: s.id,
        problem_id: s.problem_id,
        is_curriculum: true,
        title: currProb?.title || 'Curriculum Problem',
        problem_number: currProb?.problem_number || null,
        difficulty: currProb?.difficulty || 'Medium',
        topic_name: currTopic?.title || 'Striver A2Z Sheet',
        url: `/sheets/striver-a2z/${s.problem_id}`,
        stage: stageIdx,
        display_stage: stage,
        next_review_at: s.next_review_date ? `${s.next_review_date}T12:00:00.000Z` : null,
        next_review_date: s.next_review_date,
        review_count: s.repetitions || 0,
        last_rating: s.last_rating || null,
        last_reviewed_at: s.last_reviewed_at || null,
      });
    });

    // 3. Categorize reviews with user local calendar boundaries
    const categorized = categorizeReviews(unifiedSchedules, new Date());

    // 4. Unify history
    const unifiedHistory = [];

    (customHistory || []).forEach((h) => {
      const prob = customProbMap.get(h.problem_id);
      unifiedHistory.push({
        id: h.id,
        is_curriculum: false,
        problem_id: h.problem_id,
        title: prob?.title || 'Custom Problem',
        problem_number: prob?.problem_number || null,
        difficulty: prob?.difficulty || 'Medium',
        url: `/problems/${h.problem_id}`,
        rating: h.rating || 'Good',
        stage_before: typeof h.stage_before === 'number' ? h.stage_before + 1 : 1,
        stage_after: typeof h.stage_after === 'number' ? h.stage_after + 1 : 2,
        reviewed_at: h.reviewed_at,
      });
    });

    (currHistory || []).forEach((h) => {
      const currProb = striverProblemsMap.get(h.problem_id);
      const ratingUpper = h.recall_rating
        ? h.recall_rating.charAt(0).toUpperCase() + h.recall_rating.slice(1).toLowerCase()
        : 'Good';

      unifiedHistory.push({
        id: h.id,
        is_curriculum: true,
        problem_id: h.problem_id,
        title: currProb?.title || 'Curriculum Problem',
        problem_number: currProb?.problem_number || null,
        difficulty: currProb?.difficulty || 'Medium',
        url: `/sheets/striver-a2z/${h.problem_id}`,
        rating: ratingUpper,
        stage_before: 1,
        stage_after: 2,
        reviewed_at: h.review_date || h.created_at,
      });
    });

    // Sort history by reviewed_at descending
    unifiedHistory.sort((a, b) => new Date(b.reviewed_at).getTime() - new Date(a.reviewed_at).getTime());

    // 5. Determine reviews completed today
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const completedToday = unifiedHistory.filter((h) => {
      const d = new Date(h.reviewed_at);
      return !isNaN(d.getTime()) && d >= startOfToday && d <= endOfToday;
    });

    return NextResponse.json({
      summary: {
        dueToday: categorized.dueToday.length,
        overdue: categorized.overdue.length,
        upcoming: categorized.upcoming.length,
        totalInSystem: unifiedSchedules.length,
        totalActionable: categorized.totalActionable,
      },
      dueToday: categorized.dueToday,
      overdue: categorized.overdue,
      upcoming: categorized.upcoming,
      allSchedules: unifiedSchedules,
      history: unifiedHistory,
      completedToday,
    });
  } catch (error) {
    console.error('Revision API GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      problemId,
      isCurriculum = false,
      rating = 'Good',
      currentStage = 0,
      timeSpentSeconds = 0,
      notes = '',
      recalledPattern = '',
    } = body;

    if (!problemId) {
      return NextResponse.json({ error: 'problemId is required' }, { status: 400 });
    }

    const { standard: stdRating, lower: lowerRating, upper: upperRating } = normalizeRating(rating);
    const now = new Date();
    const nowIso = now.toISOString();

    // Calculate next review intervals
    const reviewResult = calculateNextReview({
      rating: stdRating,
      currentStage: typeof currentStage === 'number' ? currentStage : 0,
      nowDate: now,
    });

    if (isCurriculum) {
      // 1. Insert curriculum review history (check constraint: recall_rating in ('forgot', 'difficult', 'good', 'easy'))
      const { error: histError } = await supabase
        .from('user_curriculum_review_history')
        .insert({
          user_id: user.id,
          problem_id: problemId,
          recall_rating: lowerRating,
          time_spent_seconds: timeSpentSeconds,
          review_date: nowIso,
          notes_recalled: notes,
          pattern_recalled: Boolean(recalledPattern),
        });

      if (histError) console.error('Curriculum review history error:', histError);

      // 2. Fetch existing repetitions
      const { data: existingSched } = await supabase
        .from('user_curriculum_review_schedules')
        .select('repetitions')
        .eq('user_id', user.id)
        .eq('problem_id', problemId)
        .maybeSingle();

      const nextReps = (existingSched?.repetitions || 0) + 1;
      const nextReviewDateStr = reviewResult.nextReviewAt.toISOString().split('T')[0];

      // 3. Upsert curriculum schedule
      const { error: schedError } = await supabase
        .from('user_curriculum_review_schedules')
        .upsert({
          user_id: user.id,
          problem_id: problemId,
          next_review_date: nextReviewDateStr,
          review_stage: reviewResult.displayStage,
          interval_days: reviewResult.intervalDays,
          repetitions: nextReps,
          last_reviewed_at: nowIso,
          updated_at: nowIso,
        }, { onConflict: 'user_id,problem_id' });

      if (schedError) console.error('Curriculum review schedule error:', schedError);
    } else {
      // 1. Insert custom problem review history (check constraint: rating in ('Forgot', 'Difficult', 'Good', 'Easy'))
      const { error: histError } = await supabase
        .from('problem_review_history')
        .insert({
          user_id: user.id,
          problem_id: problemId,
          rating: upperRating,
          stage_before: currentStage,
          stage_after: reviewResult.nextStage,
          reviewed_at: nowIso,
          notes,
          recalled_pattern: recalledPattern,
        });

      if (histError) console.error('Custom review history error:', histError);

      // 2. Fetch existing review_count
      const { data: existingSched } = await supabase
        .from('problem_review_schedules')
        .select('review_count')
        .eq('user_id', user.id)
        .eq('problem_id', problemId)
        .maybeSingle();

      const nextCount = (existingSched?.review_count || 0) + 1;

      // 3. Upsert custom schedule
      const { error: schedError } = await supabase
        .from('problem_review_schedules')
        .upsert({
          user_id: user.id,
          problem_id: problemId,
          stage: reviewResult.nextStage,
          next_review_at: reviewResult.nextReviewAt.toISOString(),
          review_count: nextCount,
          last_rating: upperRating,
          last_reviewed_at: nowIso,
          updated_at: nowIso,
        }, { onConflict: 'problem_id' });

      if (schedError) console.error('Custom review schedule error:', schedError);
    }

    // Log study activity event for streak calculations
    await supabase.from('activity_events').insert({
      user_id: user.id,
      event_type: 'review_completed',
      problem_id: isCurriculum ? null : problemId,
      metadata: {
        problem_id: problemId,
        is_curriculum: isCurriculum,
        rating: upperRating,
        stage: reviewResult.displayStage,
        interval_days: reviewResult.intervalDays,
      },
    });

    return NextResponse.json({
      success: true,
      reviewResult: {
        ...reviewResult,
        rating: upperRating,
        reviewedAt: nowIso,
      },
    });
  } catch (error) {
    console.error('Revision API POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const problemId = searchParams.get('problemId');
    const isCurriculum = searchParams.get('isCurriculum') === 'true';

    if (!problemId) {
      return NextResponse.json({ error: 'problemId is required' }, { status: 400 });
    }

    if (isCurriculum) {
      await supabase
        .from('user_curriculum_review_schedules')
        .delete()
        .eq('user_id', user.id)
        .eq('problem_id', problemId);
    } else {
      await supabase
        .from('problem_review_schedules')
        .delete()
        .eq('user_id', user.id)
        .eq('problem_id', problemId);
    }

    return NextResponse.json({ success: true, removedProblemId: problemId });
  } catch (error) {
    console.error('Revision API DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { problemId, isCurriculum = false, daysToAdd = 1 } = body;

    if (!problemId) {
      return NextResponse.json({ error: 'problemId is required' }, { status: 400 });
    }

    const snoozeDays = Math.max(1, Number(daysToAdd) || 1);
    const newDate = new Date(Date.now() + snoozeDays * 24 * 60 * 60 * 1000);
    const newDateStr = newDate.toISOString().split('T')[0];

    if (isCurriculum) {
      await supabase
        .from('user_curriculum_review_schedules')
        .update({
          next_review_date: newDateStr,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .eq('problem_id', problemId);
    } else {
      await supabase
        .from('problem_review_schedules')
        .update({
          next_review_at: newDate.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .eq('problem_id', problemId);
    }

    return NextResponse.json({ success: true, snoozedUntil: newDate.toISOString() });
  } catch (error) {
    console.error('Revision API PATCH error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
