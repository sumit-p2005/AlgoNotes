'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock,
  RotateCcw,
  Flame,
  ChevronRight,
  ChevronDown,
  Layers,
  ArrowRight,
  SlidersHorizontal,
  FolderTree,
  FileCode2,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { CurrentProgressWizard } from '@/components/onboarding/CurrentProgressWizard';

export default function SheetsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [curriculumData, setCurriculumData] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardMode, setWizardMode] = useState('wizard');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchCurriculum = useCallback(async () => {
    try {
      const res = await fetch('/api/curriculum');
      if (res.ok) {
        const data = await res.json();
        setCurriculumData(data);
      }
    } catch (err) {
      console.error('Failed to load curriculum:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurriculum();
  }, [fetchCurriculum]);

  const stats = curriculumData?.stats || {
    totalProblems: 463,
    totalSolved: 0,
    totalAttempted: 0,
    totalNeedsRevision: 0,
    totalTopicsStudied: 0,
    totalTopics: 18,
    completionPercent: 0,
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#000000] text-[#F5F5F0] overflow-y-auto">
      {/* Onboarding / Progress Wizard Modal */}
      <CurrentProgressWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        curriculumData={curriculumData}
        initialMode={wizardMode}
        onComplete={() => {
          fetchCurriculum();
        }}
      />

      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Page Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C221D] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-bold tracking-wider uppercase">
                Curated Learning Paths
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              DSA Sheets & Roadmaps
            </h1>
            <p className="text-xs text-muted">
              Preinstalled industry curricula structured for active recall and spaced repetition notes.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setWizardMode('wizard');
                setIsWizardOpen(true);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-amber-400/40 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start From My Current Progress</span>
            </button>

            <Link
              href="/sheets/striver-a2z"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-accent-text hover:bg-accent-hover text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <span>Explore Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Featured Card: Striver A2Z DSA Sheet */}
        <div className="relative overflow-hidden rounded-2xl border border-[#232924] bg-gradient-to-br from-[#0E120F] via-[#090B0A] to-[#0A0D0B] p-6 lg:p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-black text-sm shadow-md">
                  A2Z
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Striver A2Z DSA Sheet
                  </h2>
                  <span className="text-[11px] text-muted">
                    Preinstalled • 18 Steps • 61 Subtopics • 463 Questions
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                The gold standard DSA preparation roadmap covering everything from basic syntax, recursion, and sorting to advanced dynamic programming, graphs, and tries. Track your notes, code, and spaced repetition directly on each problem.
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Personal Progress</span>
                  <span className="font-bold text-amber-400">
                    {stats.totalSolved} / {stats.totalProblems} Solved ({stats.completionPercent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#181D19] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(stats.completionPercent, 2))}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 min-w-[280px]">
              <div className="p-3.5 rounded-xl border border-[#1C221D] bg-[#0A0D0B]/70">
                <div className="text-xs text-muted mb-0.5">Topics Studied</div>
                <div className="text-lg font-bold text-foreground">
                  {stats.totalTopicsStudied} / {stats.totalTopics}
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-[#1C221D] bg-[#0A0D0B]/70">
                <div className="text-xs text-muted mb-0.5">Attempted</div>
                <div className="text-lg font-bold text-blue-400">
                  {stats.totalAttempted}
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-[#1C221D] bg-[#0A0D0B]/70">
                <div className="text-xs text-muted mb-0.5">Solved</div>
                <div className="text-lg font-bold text-emerald-400">
                  {stats.totalSolved}
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-[#1C221D] bg-[#0A0D0B]/70">
                <div className="text-xs text-muted mb-0.5">Needs Revision</div>
                <div className="text-lg font-bold text-amber-400">
                  {stats.totalNeedsRevision}
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-5 border-t border-[#1C221D] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                155 Easy (Basic)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                243 Medium (Core)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                65 Hard (Pro)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/sheets/striver-a2z"
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all flex items-center gap-2"
              >
                <span>Open Striver A2Z Sheet</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Steps Preview Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">
              Curriculum Roadmap Breakdown (18 Steps)
            </h3>
            <Link
              href="/sheets/striver-a2z"
              className="text-xs text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View full questions tree</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {curriculumData?.topics?.map((topic) => (
              <Link
                key={topic.id}
                href={`/sheets/striver-a2z?topicId=${topic.id}`}
                className="group p-4 rounded-xl border border-[#1C221D] bg-[#0E120F] hover:border-amber-400/40 hover:bg-[#121613] transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400/80 px-1.5 py-0.2 rounded bg-amber-400/10 border border-amber-400/20">
                      Step {topic.step_number}
                    </span>
                    {topic.is_studied && (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Studied
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-amber-400 transition-colors line-clamp-1">
                    {topic.title}
                  </h4>
                  <div className="text-[11px] text-muted">
                    {topic.expected_problems || topic.total} problems
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#171B17] flex items-center justify-between text-[11px]">
                  <span className="text-muted">
                    {topic.solved || 0} / {topic.expected_problems || topic.total} solved
                  </span>
                  <div className="flex items-center gap-1 text-muted group-hover:text-amber-400 font-semibold transition-colors">
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

