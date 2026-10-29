import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import striverA2ZData from '@/lib/curriculum/striver-a2z.json';

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, problemId, status, topicId, isStudied, bulkUpdates, initRevision } = body;

    const now = new Date().toISOString();

    // 1. Single Problem Status Update
    if (action === 'update_problem' || (!action && problemId && status)) {
      const validStatuses = ['Not started', 'Attempted', 'Solved', 'Needs revision'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
      }

      const updateData = {
        user_id: user.id,
        problem_id: problemId,
        status,
        last_activity_at: now
      };

      if (status === 'Attempted') {
        updateData.first_attempted_at = now;
      } else if (status === 'Solved') {
        updateData.solved_at = now;
      }

      const { data, error } = await supabase
        .from('user_curriculum_progress')
        .upsert(updateData, { onConflict: 'user_id,problem_id' })
        .select()
        .single();

      if (error) {
        console.error('Error updating problem status:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // If status is "Needs revision", optionally ensure a revision schedule exists
      if (status === 'Needs revision') {
        await supabase
          .from('user_curriculum_review_schedules')
          .upsert({
            user_id: user.id,
            problem_id: problemId,
            next_review_date: new Date().toISOString().split('T')[0],
            review_stage: 1,
            ease_factor: 2.5,
            interval_days: 1
          }, { onConflict: 'user_id,problem_id' });
      }

      return NextResponse.json({ success: true, data });
    }

    // 2. Single Topic Studied Toggle
    if (action === 'update_topic' || (topicId && typeof isStudied === 'boolean')) {
      const { data, error } = await supabase
        .from('user_curriculum_topic_progress')
        .upsert({
          user_id: user.id,
          topic_id: topicId,
          is_studied: isStudied,
          studied_at: isStudied ? now : null,
          updated_at: now
        }, { onConflict: 'user_id,topic_id' })
        .select()
        .single();

      if (error) {
        console.error('Error updating topic progress:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, data });
    }

    // 3. Bulk Updates from Onboarding / Progress Wizard
    if (action === 'bulk_update' && bulkUpdates) {
      const { topicProgress = [], problemProgress = [], reviseExisting = false, revisionStartDate } = bulkUpdates;

      // Upsert topic progress
      if (topicProgress.length > 0) {
        const topicRows = topicProgress.map(tp => ({
          user_id: user.id,
          topic_id: tp.topicId,
          is_studied: tp.isStudied,
          studied_at: tp.isStudied ? now : null,
          updated_at: now
        }));

        await supabase
          .from('user_curriculum_topic_progress')
          .upsert(topicRows, { onConflict: 'user_id,topic_id' });
      }

      // Upsert problem progress (preserving existing records where untouched)
      if (problemProgress.length > 0) {
        const problemRows = problemProgress.map(pp => ({
          user_id: user.id,
          problem_id: pp.problemId,
          status: pp.status,
          solved_at: pp.status === 'Solved' ? now : null,
          first_attempted_at: (pp.status === 'Attempted' || pp.status === 'Solved') ? now : null,
          last_activity_at: now,
          updated_at: now
        }));

        await supabase
          .from('user_curriculum_progress')
          .upsert(problemRows, { onConflict: 'user_id,problem_id' });
      }

      // Optional: Schedule baseline revision queue for imported solved/needs-revision problems
      if (reviseExisting) {
        const targetProblems = problemProgress.filter(p => p.status === 'Solved' || p.status === 'Needs revision');
        const startDateStr = revisionStartDate || new Date().toISOString().split('T')[0];

        if (targetProblems.length > 0) {
          const scheduleRows = targetProblems.map((p, idx) => ({
            user_id: user.id,
            problem_id: p.problemId,
            next_review_date: startDateStr,
            review_stage: 1,
            ease_factor: 2.5,
            interval_days: 1,
            repetitions: 0
          }));

          // Chunk upserts if large
          for (let i = 0; i < scheduleRows.length; i += 50) {
            const chunk = scheduleRows.slice(i, i + 50);
            await supabase
              .from('user_curriculum_review_schedules')
              .upsert(chunk, { onConflict: 'user_id,problem_id' });
          }
        }
      }

      // Mark user onboarding complete
      await supabase
        .from('user_onboarding_progress')
        .upsert({
          user_id: user.id,
          completed_onboarding: true,
          mode: 'current_progress',
          updated_at: now
        }, { onConflict: 'user_id' });

      return NextResponse.json({
        success: true,
        message: 'Progress successfully imported and saved',
        updatedTopics: topicProgress.length,
        updatedProblems: problemProgress.length
      });
    }

    return NextResponse.json({ error: 'Unrecognized action' }, { status: 400 });
  } catch (error) {
    console.error('Curriculum progress API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
