import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import striverA2ZData from '@/lib/curriculum/striver-a2z.json';

export async function GET(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ dueProblems: [], totalDue: 0, overdue: 0 });
    }

    const todayStr = new Date().toISOString().split('T')[0];

    const { data: schedules, error } = await supabase
      .from('user_curriculum_review_schedules')
      .select('problem_id, next_review_date, review_stage, interval_days')
      .eq('user_id', user.id)
      .lte('next_review_date', todayStr);

    if (error) {
      console.error('Error fetching due reviews:', error);
      return NextResponse.json({ dueProblems: [], totalDue: 0, overdue: 0 });
    }

    const dueMap = new Map();
    (schedules || []).forEach(s => dueMap.set(s.problem_id, s));

    const dueProblems = striverA2ZData.problems
      .filter(p => dueMap.has(p.id))
      .map(p => {
        const sched = dueMap.get(p.id);
        const isOverdue = sched.next_review_date < todayStr;
        return {
          ...p,
          next_review_date: sched.next_review_date,
          review_stage: sched.review_stage,
          interval_days: sched.interval_days,
          is_overdue: isOverdue,
        };
      });

    const overdueCount = dueProblems.filter(p => p.is_overdue).length;

    return NextResponse.json({
      dueProblems,
      totalDue: dueProblems.length,
      overdue: overdueCount,
    });
  } catch (error) {
    console.error('Curriculum revision API GET error:', error);
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
    const { problemId, rating, schedule, timeSpentSeconds = 0 } = body;

    if (!problemId || !rating) {
      return NextResponse.json({ error: 'problemId and rating are required' }, { status: 400 });
    }

    const now = new Date().toISOString();

    // 1. Insert review history record
    const { error: histError } = await supabase
      .from('user_curriculum_review_history')
      .insert({
        user_id: user.id,
        problem_id: problemId,
        recall_rating: rating,
        time_spent_seconds: timeSpentSeconds,
        review_date: now,
      });

    if (histError) {
      console.error('Error saving review history:', histError);
    }

    // 2. Update schedule record
    if (schedule) {
      await supabase
        .from('user_curriculum_review_schedules')
        .upsert({
          user_id: user.id,
          problem_id: problemId,
          next_review_date: schedule.next_review_date,
          review_stage: schedule.review_stage,
          ease_factor: schedule.ease_factor,
          interval_days: schedule.interval_days,
          repetitions: (schedule.repetitions || 0) + 1,
          last_reviewed_at: now,
          updated_at: now,
        }, { onConflict: 'user_id,problem_id' });
    }

    return NextResponse.json({ success: true, savedAt: now });
  } catch (error) {
    console.error('Curriculum revision API POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

