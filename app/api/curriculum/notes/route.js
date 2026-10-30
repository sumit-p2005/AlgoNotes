import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const problemId = searchParams.get('problemId');

    if (!problemId) {
      return NextResponse.json({ error: 'problemId is required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ notes: null, progress: null, schedule: null });
    }

    const [notesRes, progressRes, scheduleRes] = await Promise.all([
      supabase.from('user_curriculum_notes').select('*').eq('user_id', user.id).eq('problem_id', problemId).maybeSingle(),
      supabase.from('user_curriculum_progress').select('*').eq('user_id', user.id).eq('problem_id', problemId).maybeSingle(),
      supabase.from('user_curriculum_review_schedules').select('*').eq('user_id', user.id).eq('problem_id', problemId).maybeSingle()
    ]);

    return NextResponse.json({
      notes: notesRes.data || null,
      progress: progressRes.data || null,
      schedule: scheduleRes.data || null
    });
  } catch (error) {
    console.error('Error fetching curriculum notes:', error);
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
    const { problemId, notesData, status } = body;

    if (!problemId) {
      return NextResponse.json({ error: 'problemId is required' }, { status: 400 });
    }

    const now = new Date().toISOString();

    // 1. Save Notes
    if (notesData) {
      const { data: savedNotes, error: notesError } = await supabase
        .from('user_curriculum_notes')
        .upsert({
          user_id: user.id,
          problem_id: problemId,
          code: notesData.code ?? '',
          language: notesData.language ?? 'javascript',
          pattern_used: notesData.pattern_used ?? '',
          pattern_cues: notesData.pattern_cues ?? '',
          key_points: notesData.key_points ?? '',
          brute_force_approach: notesData.brute_force_approach ?? '',
          optimized_approach: notesData.optimized_approach ?? '',
          intuition: notesData.intuition ?? '',
          time_complexity: notesData.time_complexity ?? '',
          space_complexity: notesData.space_complexity ?? '',
          mistakes: notesData.mistakes ?? '',
          edge_cases: notesData.edge_cases ?? '',
          personal_notes: notesData.personal_notes ?? '',
          confidence_rating: notesData.confidence_rating ?? 3,
          tags: notesData.tags ?? [],
          updated_at: now
        }, { onConflict: 'user_id,problem_id' })
        .select()
        .single();

      if (notesError) {
        console.error('Error saving notes:', notesError);
        return NextResponse.json({ error: notesError.message }, { status: 500 });
      }
    }

    // 2. Update status if provided
    if (status) {
      const updateData = {
        user_id: user.id,
        problem_id: problemId,
        status,
        last_activity_at: now
      };
      if (status === 'Solved') updateData.solved_at = now;
      if (status === 'Attempted') updateData.first_attempted_at = now;

      await supabase
        .from('user_curriculum_progress')
        .upsert(updateData, { onConflict: 'user_id,problem_id' });
    }

    return NextResponse.json({ success: true, savedAt: now });
  } catch (error) {
    console.error('Error autosaving curriculum notes:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

