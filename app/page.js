'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CalendarCheck2,
  Code2,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-page text-foreground">
      {/* Top Navbar */}
      <header className="border-b border-border bg-page/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
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
            <span className="font-bold text-base tracking-tight text-foreground">
              Algo<span className="text-amber-400">Notes</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <button
                type="button"
                className="px-3 py-1.5 rounded-xl bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Open Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-xs font-semibold text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full-Stack DSA Revision & Active Recall Platform</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
          Master interview patterns.<br />
          <span className="text-amber-400">Never forget algorithmic intuition.</span>
        </h1>

        <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
          AlgoNotes combines a developer notebook, syntax-highlighted code editor, pattern taxonomies, and deterministic spaced repetition (Day 1 → 7 → 21 → 45) to build permanent recall.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/dashboard">
            <button
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs tracking-wide shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Launch AlgoNotes Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-xs rounded-xl">
              Create Account
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-12 text-left">
          <div className="p-5 rounded-2xl border border-border bg-panel space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-foreground">Spaced Repetition Engine</h2>
            <p className="text-xs text-muted leading-relaxed">
              Deterministic active-recall intervals at Day 1, 7, 21, and 45. Rating feedback deterministically guides your next review.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-panel space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-foreground">CodeMirror Notebook</h2>
            <p className="text-xs text-muted leading-relaxed">
              Syntax highlighting for Java, JavaScript, Python, and C++ with clipboard controls, approach documentation, and complexity trade-offs.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-panel space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-foreground">Algorithmic Patterns</h2>
            <p className="text-xs text-muted leading-relaxed">
              Link problems to core techniques: Two Pointers, Sliding Window, Monotonic Stack, DP, and track your pattern intuition over time.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted bg-panel/40">
        © {new Date().getFullYear()} AlgoNotes. The developer notebook built for interview recall.
      </footer>
    </div>
  );
}
