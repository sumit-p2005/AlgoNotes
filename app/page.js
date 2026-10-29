'use client';

import React from 'react';
import Link from 'next/link';
import {
  Brain,
  CalendarCheck2,
  Code2,
  FolderTree,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { AlgoLogo } from '@/components/ui/AlgoLogo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-page text-foreground">
      {/* Navbar */}
      <header className="border-b border-border bg-panel/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <AlgoLogo size={32} />

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="gap-1.5">
                <span>Open Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-xs font-semibold text-amber-500">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full-Stack DSA Revision & Recall Platform</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
          Master interview patterns.<br />
          <span className="text-amber-400">Never forget algorithmic intuition.</span>
        </h1>

        <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
          AlgoNotes combines a developer notebook, syntax-highlighted code editor, pattern taxonomies, and deterministic spaced repetition (Day 1 → 7 → 21 → 45) to build lasting recall.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-sm">
              <span>Launch AlgoNotes Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm">
              Create Free Account
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-12 text-left">
          <div className="p-5 rounded-2xl border border-border bg-panel space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-500 flex items-center justify-center">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-foreground">Spaced Repetition Engine</h2>
            <p className="text-xs text-muted leading-relaxed">
              Deterministic active-recall intervals at Day 1, 7, 21, and 45. Rating feedback deterministically guides your next review.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-panel space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-foreground">CodeMirror Notebook</h2>
            <p className="text-xs text-muted leading-relaxed">
              Syntax highlighting for JavaScript, Python, C++, and Java with copy controls, approach documentation, and complexity trade-offs.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-panel space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-500 flex items-center justify-center">
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
