import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { sanitizeRedirectUrl } from '@/lib/utils/security';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const rawNext = requestUrl.searchParams.get('next');
  const next = sanitizeRedirectUrl(rawNext, '/dashboard');

  if (code) {
    try {
      const supabase = await createClient();
      await supabase.auth.exchangeCodeForSession(code);
    } catch (e) {
      console.error('Auth code exchange error:', e);
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}

