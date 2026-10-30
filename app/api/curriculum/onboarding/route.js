import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ completedOnboarding: true }); // do not block guest users
    }

    const { data, error } = await supabase
      .from('user_onboarding_progress')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    return NextResponse.json({
      completedOnboarding: !!data?.completed_onboarding,
      mode: data?.mode || null,
      lastStep: data?.last_step || 0
    });
  } catch (error) {
    console.error('Error fetching onboarding status:', error);
    return NextResponse.json({ completedOnboarding: true });
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
    const { mode, completed = true, step = 0 } = body;

    const { data, error } = await supabase
      .from('user_onboarding_progress')
      .upsert({
        user_id: user.id,
        completed_onboarding: completed,
        mode: mode || 'beginning',
        last_step: step,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating onboarding status:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

