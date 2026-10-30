'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { sanitizeRedirectUrl } from '@/lib/utils/security';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const nextParam = searchParams.get('next');
  const targetPath = sanitizeRedirectUrl(nextParam, '/dashboard');

  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project.supabase.co');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isSupabaseConfigured) {
      // In local mode without Supabase, proceed to target
      router.push(targetPath);
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
        router.push(targetPath);
        router.refresh();
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    setErrorMessage('');
    if (!isSupabaseConfigured) {
      router.push(targetPath);
      return;
    }

    try {
      const supabase = createClient();
      const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(targetPath)}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: callbackUrl,
        },
      });
      if (error) throw error;
    } catch (err) {
      setErrorMessage(err.message || `Failed to sign in with ${provider}`);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 text-foreground">
      {/* Logo at top */}
      <div className="flex flex-col items-center text-center">
        <div className="relative w-12 h-12 mb-3">
          <Image
            src="/algonotes-dark.png"
            alt="AlgoNotes"
            fill
            className="hidden dark:block object-contain"
            priority
          />
          <Image
            src="/algonotes-light.png"
            alt="AlgoNotes"
            fill
            className="block dark:hidden object-contain"
            priority
          />
        </div>

        <h1 className="text-xl font-bold tracking-tight text-foreground">
          Welcome Back
        </h1>
        <p className="text-xs text-muted mt-1">
          Continue your DSA journey
        </p>
      </div>

      {/* Sign In / Sign Up Pill Switcher */}
      <div className="flex p-1 rounded-full border border-border bg-panel text-xs font-semibold">
        <button
          type="button"
          className="flex-1 py-1.5 rounded-full bg-accent text-accent-text transition-all"
        >
          Sign In
        </button>
        <Link
          href="/register"
          className="flex-1 py-1.5 rounded-full text-center text-muted hover:text-foreground transition-all"
        >
          Sign Up
        </Link>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-500 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              autoComplete="email"
              aria-label="Email address"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-panel text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              aria-label="Password"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-panel text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="text-right mt-1.5">
            <Link
              href="/forgot-password"
              className="text-[11px] text-muted hover:text-foreground"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Big Yellow Sign In Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs tracking-wide shadow-xs transition-colors cursor-pointer"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Divider OR */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <span className="relative px-3 bg-page text-[10px] text-muted font-bold tracking-wider">
          OR
        </span>
      </div>

      {/* Social Buttons */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => handleOAuthSignIn('google')}
          className="w-full flex items-center justify-center gap-2.5 py-2 px-3 rounded-xl border border-border bg-panel hover:bg-elevated text-xs font-medium text-foreground transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <button
          type="button"
          onClick={() => handleOAuthSignIn('github')}
          className="w-full flex items-center justify-center gap-2.5 py-2 px-3 rounded-xl border border-border bg-panel hover:bg-elevated text-xs font-medium text-foreground transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span>Continue with GitHub</span>
        </button>
      </div>

      <div className="text-center text-xs text-muted">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-amber-400 font-semibold hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-sm mx-auto text-center py-12 text-xs text-muted">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
