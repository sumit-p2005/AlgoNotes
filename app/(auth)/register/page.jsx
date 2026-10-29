'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project.supabase.co');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify and try again.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (!isSupabaseConfigured) {
      setErrorMessage(
        'Supabase is not configured yet. Please configure your .env.local credentials to enable real registration.'
      );
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        if (data?.session) {
          // If auto-confirm is enabled in Supabase, seed starter data and redirect
          try {
            await supabase.rpc('seed_user_starter_data', { target_user_id: data.user.id });
          } catch {
            // ignore
          }
          router.push('/dashboard');
          router.refresh();
        } else {
          setSuccessMessage(
            'Account created successfully! Please check your email to verify your address before signing in.'
          );
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-panel p-6 sm:p-8 shadow-xl">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          Create your AlgoNotes account
        </h1>
        <p className="text-xs text-muted mt-1.5">
          Join candidates retaining DSA intuition with active recall.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-500 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-500 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-foreground mb-1.5">
            Full Name
          </label>
          <Input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            autoComplete="name"
          />
        </div>

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
          <label className="block text-xs font-medium text-foreground mb-1.5">
            Password (min 6 characters)
          </label>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground mb-1.5">
            Confirm Password
          </label>
          <Input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••••••"
            autoComplete="new-password"
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full mt-2"
          size="md"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          <span>Create Private Notebook</span>
        </Button>
      </form>

      <div className="mt-6 text-center text-xs text-muted">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
