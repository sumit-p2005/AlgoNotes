'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LogIn, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project.supabase.co');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isSupabaseConfigured) {
      setErrorMessage(
        'Supabase is not configured yet. Please copy .env.example to .env.local and set your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
      );
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-panel p-6 sm:p-8 shadow-xl">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          Welcome back to AlgoNotes
        </h1>
        <p className="text-xs text-muted mt-1.5">
          Sign in to your private DSA revision notebook & spaced repetition engine.
        </p>
      </div>

      {!isSupabaseConfigured && (
        <div className="mb-5 p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-600 dark:text-amber-400 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Supabase Setup Notice</p>
            <p className="mt-0.5 text-[11px] leading-relaxed">
              Create a Supabase project, execute <code className="font-mono bg-amber-500/20 px-1 py-0.5 rounded">supabase/migrations/001_initial_schema.sql</code>, and paste your credentials into <code className="font-mono bg-amber-500/20 px-1 py-0.5 rounded">.env.local</code>.
            </p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-500 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-foreground mb-1.5">
            Email Address
          </label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            autoComplete="email"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-foreground">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-amber-500 hover:text-amber-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            autoComplete="current-password"
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full mt-2"
          size="md"
        >
          <LogIn className="w-4 h-4 mr-2" />
          <span>Sign In to Notebook</span>
        </Button>
      </form>

      <div className="mt-6 text-center text-xs text-muted">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
        >
          Create one now
        </Link>
      </div>
    </div>
  );
}
