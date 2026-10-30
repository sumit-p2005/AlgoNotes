'use client';

import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Clock,
  RotateCcw,
  BookOpen,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ExternalLink,
  FileEdit,
  ArrowUpDown,
  SlidersHorizontal,
  Flame,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { createClient } from '@/lib/supabase/client';
import { getCurriculumNav, saveCurriculumNav } from '@/lib/utils/userStorage';
import { CurrentProgressWizard } from '@/components/onboarding/CurrentProgressWizard';

function StriverA2ZSheetContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTopicId = searchParams.get('topicId');

  const [curriculumData, setCurriculumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [lastVisitedProblemId, setLastVisitedProblemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [updatingProblemId, setUpdatingProblemId] = useState(null);

  useEffect(() => {
    async function loadAuth() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
          const savedNav = getCurriculumNav(user.id);
          if (savedNav?.lastProblemId) {
            setLastVisitedProblemId(savedNav.lastProblemId);
          }
        }
      } catch (err) {
        // Fallback gracefully
      }
    }
    loadAuth();
  }, []);

  const fetchCurriculum = useCallback(async () => {
    try {
      const res = await fetch('/api/curriculum');
      if (res.ok) {
        const data = await res.json();
        setCurriculumData(data);

        // Auto-expand topic: query param > saved user state > first topic
        let targetTopicId = initialTopicId;
        if (!targetTopicId && typeof window !== 'undefined') {
          try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.id) {
              setUserId(user.id);
              const savedNav = getCurriculumNav(user.id);
              if (savedNav?.lastStepId && data.topics?.some((t) => t.id === savedNav.lastStepId)) {
                targetTopicId = savedNav.lastStepId;
              }
              if (savedNav?.lastProblemId) {
                setLastVisitedProblemId(savedNav.lastProblemId);
              }
            }
          } catch (e) {
            // ignore
          }
        }

        if (targetTopicId) {
          setExpandedTopics(new Set([targetTopicId]));
        } else if (data.topics && data.topics.length > 0) {
          setExpandedTopics(new Set([data.topics[0].id]));
        }
      }
    } catch (err) {
      console.error('Failed to load curriculum:', err);
    } finally {
      setLoading(false);
    }
  }, [initialTopicId]);

  useEffect(() => {
    fetchCurriculum();
  }, [fetchCurriculum]);

  const toggleTopicExpand = (topicId) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      const isExpanding = !next.has(topicId);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);

      if (isExpanding && userId) {
        saveCurriculumNav(userId, { lastStepId: topicId });
      }
      return next;
    });
  };

  const expandAll = () => {
    if (curriculumData?.topics) {
      setExpandedTopics(new Set(curriculumData.topics.map((t) => t.id)));
    }
  };

  const collapseAll = () => {
    setExpandedTopics(new Set());
  };

  // Quick Problem Status Toggle
  const handleUpdateStatus = async (problemId, newStatus) => {
    try {
      setUpdatingProblemId(problemId);
      const res = await fetch('/api/curriculum/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_problem',
          problemId,
          status: newStatus,
        }),
      });

      if (res.ok) {
        // Optimistically update local state
        setCurriculumData((prev) => {
          if (!prev) return prev;
          const nextProblems = prev.problems.map((p) =>
            p.id === problemId ? { ...p, status: newStatus } : p
          );
          return { ...prev, problems: nextProblems };
        });
      }
    } catch (e) {
      console.error('Error updating status:', e);
    } finally {
      setUpdatingProblemId(null);
    }
  };

  // Toggle topic studied status
  const handleToggleTopicStudied = async (topicId, currentVal) => {
    try {
      const newVal = !currentVal;
      const res = await fetch('/api/curriculum/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_topic',
          topicId,
          isStudied: newVal,
        }),
      });

      if (res.ok) {
        setCurriculumData((prev) => {
          if (!prev) return prev;
          const nextTopics = prev.topics.map((t) =>
            t.id === topicId ? { ...t, is_studied: newVal } : t
          );
          return { ...prev, topics: nextTopics };
        });
      }
    } catch (e) {
      console.error('Error updating topic:', e);
    }
  };

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    if (!curriculumData?.problems) return [];
    let list = curriculumData.problems;

    if (difficultyFilter !== 'all') {
      list = list.filter(
        (p) => p.difficulty.toLowerCase() === difficultyFilter.toLowerCase()
      );
    }

    if (statusFilter !== 'all') {
      list = list.filter((p) => p.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          String(p.problem_number).includes(q)
      );
    }

    return list;
  }, [curriculumData, difficultyFilter, statusFilter, searchQuery]);

  const stats = curriculumData?.stats || {
    totalProblems: 463,
    totalSolved: 0,
    totalAttempted: 0,
    totalNeedsRevision: 0,
    completionPercent: 0,
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-page text-foreground overflow-y-auto">
      {/* Current Progress Setup Wizard */}
      <CurrentProgressWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        curriculumData={curriculumData}
        initialMode="wizard"
        onComplete={() => {
          fetchCurriculum();
        }}
      />

      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted">
              <Link href="/sheets" className="hover:text-foreground transition-colors">
                DSA Sheets
              </Link>
              <span>/</span>
              <span className="text-amber-400 font-semibold">Striver A2Z</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <span>Striver A2Z DSA Sheet</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold border border-amber-400/30">
                463 Questions
              </span>
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsWizardOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-amber-400/40 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Update My Progress</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search problem title or #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-panel border border-border text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-panel border border-border text-xs text-foreground focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy (Basic)</option>
              <option value="medium">Medium (Core)</option>
              <option value="hard">Hard (Pro)</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-panel border border-border text-xs text-foreground focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Not started">Not started</option>
              <option value="Attempted">Attempted</option>
              <option value="Solved">Solved</option>
              <option value="Needs revision">Needs revision</option>
            </select>
          </div>

          {/* Expand/Collapse Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="px-2.5 py-1 text-xs text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-muted">•</span>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1 text-xs text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Hierarchical Topic Tree */}
        <div className="space-y-4">
          {curriculumData?.topics?.map((topic) => {
            const isExpanded = expandedTopics.has(topic.id) || !!searchQuery.trim();
            const topicProblems = filteredProblems.filter((p) => p.topic_id === topic.id);
            const totalTopicProblems = curriculumData.problems.filter((p) => p.topic_id === topic.id);
            const topicSolvedCount = totalTopicProblems.filter((p) => p.status === 'Solved').length;
            const completionPercent = totalTopicProblems.length > 0
              ? Math.round((topicSolvedCount / totalTopicProblems.length) * 100)
              : 0;

            const topicSections = curriculumData.sections?.filter((s) => s.topic_id === topic.id) || [];

            // If filtering and this topic has no matching problems, hide it
            if ((searchQuery.trim() || difficultyFilter !== 'all' || statusFilter !== 'all') && topicProblems.length === 0) {
              return null;
            }

            return (
              <div
                key={topic.id}
                className="rounded-2xl border border-border bg-card overflow-hidden transition-all shadow-xs"
              >
                {/* Topic Header Bar */}
                <div
                  onClick={() => toggleTopicExpand(topic.id)}
                  className="flex items-center justify-between p-4 bg-card hover:bg-elevated cursor-pointer select-none transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <button className="text-muted hover:text-foreground">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-bold">
                          Step {topic.step_number}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">
                          {topic.title}
                        </h3>
                        {topic.is_studied && (
                          <span className="px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" />
                            Studied
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress & Studied Toggle */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex flex-col items-end gap-1 min-w-[120px]">
                      <span className="text-[11px] text-muted font-medium">
                        {topicSolvedCount} / {totalTopicProblems.length} ({completionPercent}%)
                      </span>
                      <div className="w-24 h-1.5 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${completionPercent}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleTopicStudied(topic.id, topic.is_studied);
                      }}
                      className={cn(
                        'px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-colors cursor-pointer',
                        topic.is_studied
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                          : 'bg-panel border-border text-muted hover:text-foreground'
                      )}
                      title="Toggle studied status for this topic"
                    >
                      {topic.is_studied ? 'Studied' : 'Mark Studied'}
                    </button>
                  </div>
                </div>

                {/* Expanded Sections & Problems */}
                {isExpanded && (
                  <div className="p-4 space-y-4 bg-panel/40 border-t border-border">
                    {topicSections.map((sec) => {
                      const secProblems = topicProblems.filter((p) => p.section_id === sec.id);
                      if (secProblems.length === 0) return null;

                      return (
                        <div key={sec.id} className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold text-amber-400/90 pl-1">
                            <span>{sec.title}</span>
                            <span className="text-[10px] text-muted font-normal">
                              {secProblems.length} questions
                            </span>
                          </div>

                          {/* Problem Rows Table */}
                          <div className="border border-border rounded-xl overflow-hidden bg-card divide-y divide-border">
                            {secProblems.map((prob) => {
                              const isSolved = prob.status === 'Solved';
                              const isAttempted = prob.status === 'Attempted';
                              const needsRev = prob.status === 'Needs revision';

                              return (
                                <div
                                  key={prob.id}
                                  className="flex items-center justify-between p-2.5 sm:px-4 sm:py-3 hover:bg-elevated transition-colors gap-3"
                                >
                                  {/* Problem Title & Details */}
                                  <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <span className="text-[11px] font-mono text-muted w-7 text-right">
                                      #{prob.problem_number}
                                    </span>

                                    <div className="min-w-0 flex-1">
                                      <Link
                                        href={`/sheets/striver-a2z/${prob.id}`}
                                        onClick={() => {
                                          if (userId) {
                                            saveCurriculumNav(userId, {
                                              lastStepId: topic.id,
                                              lastProblemId: prob.id,
                                            });
                                          }
                                        }}
                                        className="text-xs sm:text-sm font-medium text-foreground hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
                                      >
                                        {prob.title}
                                      </Link>
                                      <div className="flex items-center gap-2 mt-0.5">
                                        <span
                                          className={cn(
                                            'px-1.5 py-0.2 rounded text-[10px] font-semibold',
                                            prob.difficulty === 'Easy'
                                              ? 'text-emerald-400 bg-emerald-500/10'
                                              : prob.difficulty === 'Medium'
                                              ? 'text-amber-400 bg-amber-500/10'
                                              : 'text-rose-400 bg-rose-500/10'
                                          )}
                                        >
                                          {prob.difficulty}
                                        </span>
                                        {lastVisitedProblemId === prob.id && (
                                          <span className="text-[10px] text-accent font-semibold px-1.5 py-0.2 rounded bg-accent/10 border border-accent/20">
                                            Last opened
                                          </span>
                                        )}
                                        {prob.hasNotes && (
                                          <span className="text-[10px] text-muted flex items-center gap-1">
                                            <FileEdit className="w-3 h-3 text-amber-400" />
                                            Notes saved
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Quick Status Buttons & Action Link */}
                                  <div className="flex items-center gap-2 shrink-0">
                                    {/* Status Selector Dropdown */}
                                    <select
                                      value={prob.status}
                                      onChange={(e) => handleUpdateStatus(prob.id, e.target.value)}
                                      disabled={updatingProblemId === prob.id}
                                      className={cn(
                                        'px-2 py-1 rounded-md text-[11px] font-semibold border focus:outline-none transition-colors cursor-pointer',
                                        isSolved
                                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                                          : isAttempted
                                          ? 'bg-blue-500/15 border-blue-500/40 text-blue-400'
                                          : needsRev
                                          ? 'bg-amber-400/15 border-amber-400/40 text-amber-400'
                                          : 'bg-panel border-border text-muted hover:text-foreground'
                                      )}
                                    >
                                      <option value="Not started">Not started</option>
                                      <option value="Attempted">Attempted</option>
                                      <option value="Solved">Solved</option>
                                      <option value="Needs revision">Needs revision</option>
                                    </select>

                                    {/* Open Notebook Button */}
                                    <Link
                                      href={`/sheets/striver-a2z/${prob.id}`}
                                      className="p-1.5 rounded-lg bg-panel hover:bg-accent hover:text-accent-text border border-border text-muted transition-all cursor-pointer"
                                      title="Open Notebook & Code Editor"
                                    >
                                      <FileEdit className="w-3.5 h-3.5" />
                                    </Link>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default function StriverA2ZSheetPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-12 bg-page text-muted text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Loading Striver A2Z Curriculum...
          </div>
        </div>
      }
    >
      <StriverA2ZSheetContent />
    </Suspense>
  );
}
