'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Circle,
  Clock,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  X,
  Check,
  AlertCircle,
  Layers,
  Filter,
  Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function CurrentProgressWizard({
  isOpen = false,
  onClose,
  onComplete,
  curriculumData,
  initialMode = 'choice', // 'choice' | 'wizard'
}) {
  const [mode, setMode] = useState(initialMode); // 'choice' | 'wizard'
  const [currentStep, setCurrentStep] = useState(1); // 1, 2, 3, 4

  // State selections
  // Set of topic IDs marked as studied
  const [selectedTopics, setSelectedTopics] = useState(() => {
    const set = new Set();
    if (curriculumData?.topics) {
      curriculumData.topics.forEach((t) => {
        if (t.is_studied || t.completion_percent === 100) set.add(t.id);
      });
    }
    return set;
  });
  // Set of section IDs marked as completed
  const [selectedSections, setSelectedSections] = useState(new Set());
  // Map of problemId -> status ('Not started' | 'Attempted' | 'Solved' | 'Needs revision')
  const [problemStatuses, setProblemStatuses] = useState(() => {
    const statuses = {};
    if (curriculumData?.problems) {
      curriculumData.problems.forEach((p) => {
        if (p.status && p.status !== 'Not started') statuses[p.id] = p.status;
      });
    }
    return statuses;
  });
  // Optional revision schedule toggle
  const [reviseExisting, setReviseExisting] = useState(true);
  const [revisionStartDate, setRevisionStartDate] = useState(() =>
    new Date().toISOString().split('T')[0]
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [activeStep3TopicId, setActiveStep3TopicId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync when curriculumData loads if initially empty
  useEffect(() => {
    if (!curriculumData) return;
    const initialTopicSet = new Set();
    const initialStatuses = {};

    if (curriculumData.topics) {
      curriculumData.topics.forEach((t) => {
        if (t.is_studied || t.completion_percent === 100) {
          initialTopicSet.add(t.id);
        }
      });
    }

    if (curriculumData.problems) {
      curriculumData.problems.forEach((p) => {
        if (p.status && p.status !== 'Not started') {
          initialStatuses[p.id] = p.status;
        }
      });
    }

    const timer = setTimeout(() => {
      setSelectedTopics((prev) => (prev.size === 0 ? initialTopicSet : prev));
      setProblemStatuses((prev) => (Object.keys(prev).length === 0 ? initialStatuses : prev));
    }, 0);

    return () => clearTimeout(timer);
  }, [curriculumData]);

  const topics = useMemo(() => curriculumData?.topics || [], [curriculumData]);
  const sections = useMemo(() => curriculumData?.sections || [], [curriculumData]);
  const problems = useMemo(() => curriculumData?.problems || [], [curriculumData]);

  // Step 1: Topics Toggling
  const toggleTopic = (topicId) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  const selectAllTopics = () => {
    setSelectedTopics(new Set(topics.map((t) => t.id)));
  };

  const clearAllTopics = () => {
    setSelectedTopics(new Set());
  };

  // Step 2: Sections Toggling
  const availableSections = useMemo(() => {
    if (selectedTopics.size === 0) return sections;
    return sections.filter((s) => selectedTopics.has(s.topic_id));
  }, [sections, selectedTopics]);

  const toggleSection = (sectionId) => {
    setSelectedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const selectAllSections = () => {
    setSelectedSections(new Set(availableSections.map((s) => s.id)));
  };

  const clearAllSections = () => {
    setSelectedSections(new Set());
  };

  // Step 3: Problems in view
  const step3Problems = useMemo(() => {
    let list = problems;
    if (selectedTopics.size > 0) {
      list = list.filter((p) => selectedTopics.has(p.topic_id));
    }
    if (selectedSections.size > 0) {
      list = list.filter((p) => selectedSections.has(p.section_id));
    }
    if (activeStep3TopicId) {
      list = list.filter((p) => p.topic_id === activeStep3TopicId);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    return list;
  }, [problems, selectedTopics, selectedSections, activeStep3TopicId, searchQuery]);

  if (!isOpen) return null;

  const setProblemStatus = (problemId, status) => {
    setProblemStatuses((prev) => ({
      ...prev,
      [problemId]: status,
    }));
  };

  // Bulk actions for visible problems in Step 3
  const bulkSetStatus = (status) => {
    setProblemStatuses((prev) => {
      const next = { ...prev };
      step3Problems.forEach((p) => {
        next[p.id] = status;
      });
      return next;
    });
  };

  // Stats calculation
  const solvedCount = Object.values(problemStatuses).filter((s) => s === 'Solved').length;
  const attemptedCount = Object.values(problemStatuses).filter((s) => s === 'Attempted').length;
  const needsRevisionCount = Object.values(problemStatuses).filter((s) => s === 'Needs revision').length;

  // Handle Save
  const handleSaveAndConfirm = async () => {
    setIsSubmitting(true);
    try {
      // 1. Prepare topic updates
      const topicUpdates = topics.map((t) => ({
        topicId: t.id,
        isStudied: selectedTopics.has(t.id),
      }));

      // 2. Prepare problem updates
      const problemUpdates = Object.entries(problemStatuses).map(([problemId, status]) => ({
        problemId,
        status,
      }));

      // 3. Send bulk update request
      const response = await fetch('/api/curriculum/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'bulk_update',
          bulkUpdates: {
            topicProgress: topicUpdates,
            problemProgress: problemUpdates,
            reviseExisting,
            revisionStartDate,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save progress');
      }

      setSaveSuccess(true);
      if (onComplete) {
        onComplete({
          selectedTopicsCount: selectedTopics.size,
          solvedCount,
          attemptedCount,
          needsRevisionCount,
        });
      }

      setTimeout(() => {
        if (onClose) onClose();
      }, 1200);
    } catch (err) {
      console.error('Error saving progress:', err);
      alert('Error saving progress: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartFromBeginning = async () => {
    setIsSubmitting(true);
    try {
      await fetch('/api/curriculum/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'beginning', completed: true }),
      });
      if (onComplete) onComplete({ mode: 'beginning' });
      if (onClose) onClose();
    } catch (e) {
      if (onClose) onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    try {
      await fetch('/api/curriculum/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'skipped', completed: true }),
      });
    } catch (e) {}
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Progress Setup Wizard"
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-[#232924] bg-[#0A0D0B] text-[#F5F5F0] shadow-2xl overflow-hidden"
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C221D] bg-[#090B0A]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                {mode === 'choice'
                  ? 'Welcome to AlgoNotes'
                  : 'Start From My Current Progress'}
              </h2>
              <p className="text-xs text-muted">
                {mode === 'choice'
                  ? 'Configure your Striver A2Z DSA journey'
                  : `Step ${currentStep} of 4 — Setup your existing knowledge`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSkip}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-[#141815] transition-colors"
            title="Skip for now"
            aria-label="Skip onboarding for now"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {mode === 'choice' ? (
          /* CHOICE SCREEN */
          <div className="p-8 space-y-6">
            <div className="text-center max-w-lg mx-auto space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                How would you like to begin?
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                AlgoNotes comes preloaded with the complete 463-problem Striver A2Z DSA Sheet.
                Whether you are starting fresh or already halfway through, we’ve got you covered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2">
              {/* Option 1: Start from Beginning */}
              <button
                type="button"
                onClick={handleStartFromBeginning}
                disabled={isSubmitting}
                className="group flex flex-col text-left p-6 rounded-2xl border border-[#1C221D] bg-[#0E120F] hover:border-amber-400/40 hover:bg-[#121713] transition-all cursor-pointer relative"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800/80 flex items-center justify-center text-neutral-300 group-hover:text-amber-400 group-hover:bg-amber-400/10 transition-colors mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-amber-400 transition-colors">
                  Start From the Beginning
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  I am new to DSA or want to study the curriculum step-by-step from Step 1: Basics to Step 18: Advanced.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-muted group-hover:text-amber-400 font-semibold transition-colors">
                  <span>Begin Day 1</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Option 2: Start from Current Progress */}
              <button
                type="button"
                onClick={() => setMode('wizard')}
                className="group flex flex-col text-left p-6 rounded-2xl border border-amber-400/30 bg-amber-400/5 hover:border-amber-400 hover:bg-amber-400/10 transition-all cursor-pointer relative"
              >
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 text-[10px] font-bold border border-amber-400/30">
                  Recommended for ongoing students
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400 mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-amber-400 mb-1">
                  Start From My Current Progress
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  I’ve already studied some topics. Let me mark what I know, select solved problems, and setup active recall revision.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                  <span>Open Setup Wizard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs text-muted hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Skip for now (you can configure your progress anytime in DSA Sheets)
              </button>
            </div>
          </div>
        ) : (
          /* 4-STEP WIZARD */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Step Indicator Bar */}
            <div className="px-6 py-3 border-b border-[#1C221D] bg-[#0E120F]/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
                {[
                  { step: 1, label: 'Studied Topics' },
                  { step: 2, label: 'Subtopics' },
                  { step: 3, label: 'Question Status' },
                  { step: 4, label: 'Confirm & Save' },
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setCurrentStep(s.step)}
                    className={cn(
                      'flex items-center gap-2 px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap',
                      currentStep === s.step
                        ? 'bg-amber-400/15 text-amber-400 font-bold border border-amber-400/20'
                        : currentStep > s.step
                        ? 'text-foreground hover:bg-[#141815]'
                        : 'text-muted hover:text-foreground'
                    )}
                  >
                    <span
                      className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold',
                        currentStep === s.step
                          ? 'bg-amber-400 text-black'
                          : currentStep > s.step
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-[#181D19] text-muted'
                      )}
                    >
                      {currentStep > s.step ? <Check className="w-3 h-3 stroke-[3]" /> : s.step}
                    </span>
                    <span className="text-[11px]">{s.label}</span>
                  </button>
                ))}
              </div>

              {/* Live Count Pill */}
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-muted">
                <span>{selectedTopics.size} Topics</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">{solvedCount} Solved</span>
              </div>
            </div>

            {/* Step Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* STEP 1: SELECT STUDIED TOPICS */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">
                        Step 1: Which main topics have you already studied?
                      </h3>
                      <p className="text-xs text-muted">
                        Check the topics you’ve completed lectures or notes for. (Marking a topic as studied does NOT assume every problem is solved).
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={selectAllTopics}
                        className="px-2.5 py-1 rounded-md text-[11px] bg-[#141815] hover:bg-[#1C221D] border border-border text-foreground transition-colors"
                      >
                        Select All (18)
                      </button>
                      <button
                        onClick={clearAllTopics}
                        className="px-2.5 py-1 rounded-md text-[11px] bg-[#141815] hover:bg-[#1C221D] border border-border text-muted hover:text-foreground transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
                    {topics.map((topic) => {
                      const isSelected = selectedTopics.has(topic.id);
                      return (
                        <div
                          key={topic.id}
                          onClick={() => toggleTopic(topic.id)}
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none',
                            isSelected
                              ? 'bg-amber-400/10 border-amber-400/40 text-foreground'
                              : 'bg-[#0E120F] border-[#1C221D] text-muted hover:border-[#2C352E] hover:text-foreground'
                          )}
                        >
                          <div
                            className={cn(
                              'w-5 h-5 rounded flex items-center justify-center transition-colors',
                              isSelected
                                ? 'bg-amber-400 text-black'
                                : 'border border-[#2C352E] bg-[#141815]'
                            )}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold truncate">
                              {topic.title}
                            </div>
                            <div className="text-[10px] text-muted">
                              {topic.expected_problems || topic.total} problems
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT COMPLETED SUBTOPICS */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">
                        Step 2: Narrow down specific subtopics/sections
                      </h3>
                      <p className="text-xs text-muted">
                        Select completed sections. You can pick individual subtopics even if the parent topic wasn’t marked complete.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={selectAllSections}
                        className="px-2.5 py-1 rounded-md text-[11px] bg-[#141815] hover:bg-[#1C221D] border border-border text-foreground transition-colors"
                      >
                        Select All Visible
                      </button>
                      <button
                        onClick={clearAllSections}
                        className="px-2.5 py-1 rounded-md text-[11px] bg-[#141815] hover:bg-[#1C221D] border border-border text-muted hover:text-foreground transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-1">
                    {topics
                      .filter((t) => selectedTopics.size === 0 || selectedTopics.has(t.id))
                      .map((topic) => {
                        const topicSections = sections.filter((s) => s.topic_id === topic.id);
                        if (topicSections.length === 0) return null;

                        return (
                          <div
                            key={topic.id}
                            className="p-3.5 rounded-xl border border-[#1C221D] bg-[#0E120F] space-y-2.5"
                          >
                            <div className="text-xs font-bold text-amber-400">
                              {topic.title}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {topicSections.map((sec) => {
                                const isSecSelected = selectedSections.has(sec.id);
                                return (
                                  <div
                                    key={sec.id}
                                    onClick={() => toggleSection(sec.id)}
                                    className={cn(
                                      'flex items-center gap-2.5 p-2 rounded-lg border text-xs cursor-pointer select-none transition-all',
                                      isSecSelected
                                        ? 'bg-amber-400/10 border-amber-400/40 text-foreground font-semibold'
                                        : 'bg-[#121613] border-[#1C221D] text-muted hover:text-foreground hover:border-[#2C352E]'
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        'w-4 h-4 rounded flex items-center justify-center text-[10px]',
                                        isSecSelected
                                          ? 'bg-amber-400 text-black'
                                          : 'border border-[#2C352E] bg-[#171B17]'
                                      )}
                                    >
                                      {isSecSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                    <span className="truncate flex-1">{sec.title}</span>
                                    <span className="text-[10px] text-muted">
                                      {sec.problem_count} q
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* STEP 3: REVIEW INDIVIDUAL QUESTIONS */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">
                        Step 3: Review individual question statuses
                      </h3>
                      <p className="text-xs text-muted">
                        Mark problems as Solved, Attempted, or Needing Revision. Use bulk buttons for fast tagging.
                      </p>
                    </div>

                    {/* Bulk Action Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => bulkSetStatus('Solved')}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors cursor-pointer"
                        title="Mark all matching questions as Solved"
                      >
                        Mark All Solved
                      </button>
                      <button
                        onClick={() => bulkSetStatus('Attempted')}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30 hover:bg-blue-500/25 transition-colors cursor-pointer"
                      >
                        Mark Attempted
                      </button>
                      <button
                        onClick={() => bulkSetStatus('Needs revision')}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-colors cursor-pointer"
                      >
                        Needs Revision
                      </button>
                      <button
                        onClick={() => bulkSetStatus('Not started')}
                        className="px-2.5 py-1 rounded-md text-[11px] bg-[#141815] text-muted hover:text-foreground border border-border transition-colors cursor-pointer"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Filter / Search Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      placeholder="Filter questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 min-w-[180px] px-3 py-1.5 rounded-lg bg-[#0E120F] border border-[#1C221D] text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-amber-400"
                    />
                    <select
                      value={activeStep3TopicId || ''}
                      onChange={(e) => setActiveStep3TopicId(e.target.value || null)}
                      className="px-3 py-1.5 rounded-lg bg-[#0E120F] border border-[#1C221D] text-xs text-foreground focus:outline-none focus:border-amber-400"
                    >
                      <option value="">All Selected Topics ({topics.length})</option>
                      {topics.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Problem Table / List */}
                  <div className="border border-[#1C221D] rounded-xl overflow-hidden bg-[#0A0D0B] divide-y divide-[#171B17] max-h-[420px] overflow-y-auto">
                    {step3Problems.length === 0 ? (
                      <div className="p-8 text-center text-xs text-muted">
                        No questions match your current topic or filter selection.
                      </div>
                    ) : (
                      step3Problems.map((prob) => {
                        const currentStatus = problemStatuses[prob.id] || 'Not started';
                        return (
                          <div
                            key={prob.id}
                            className="flex items-center justify-between p-2.5 hover:bg-[#0E120F] transition-colors gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <span className="text-[10px] text-muted w-7 text-right">
                                #{prob.problem_number}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-medium text-foreground truncate">
                                  {prob.title}
                                </div>
                                <div className="text-[10px] text-muted flex items-center gap-2">
                                  <span
                                    className={cn(
                                      'px-1.5 py-0.2 rounded font-semibold',
                                      prob.difficulty === 'Easy'
                                        ? 'text-emerald-400 bg-emerald-500/10'
                                        : prob.difficulty === 'Medium'
                                        ? 'text-amber-400 bg-amber-500/10'
                                        : 'text-rose-400 bg-rose-500/10'
                                    )}
                                  >
                                    {prob.difficulty}
                                  </span>
                                  <span className="truncate">{prob.sectionTitle}</span>
                                </div>
                              </div>
                            </div>

                            {/* Status Buttons */}
                            <div className="flex items-center gap-1 shrink-0">
                              {[
                                { id: 'Not started', label: 'Not started', color: 'text-muted' },
                                { id: 'Attempted', label: 'Attempted', color: 'text-blue-400' },
                                { id: 'Solved', label: 'Solved', color: 'text-emerald-400' },
                                { id: 'Needs revision', label: 'Revise', color: 'text-amber-400' },
                              ].map((st) => (
                                <button
                                  key={st.id}
                                  onClick={() => setProblemStatus(prob.id, st.id)}
                                  className={cn(
                                    'px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer',
                                    currentStatus === st.id
                                      ? st.id === 'Solved'
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                        : st.id === 'Attempted'
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                                        : st.id === 'Needs revision'
                                        ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40'
                                        : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                                      : 'text-muted hover:text-foreground hover:bg-[#141815]'
                                  )}
                                >
                                  {st.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: CONFIRM AND SAVE */}
              {currentStep === 4 && (
                <div className="space-y-6 max-w-xl mx-auto py-2">
                  <div className="text-center space-y-1">
                    <h3 className="text-base font-bold text-foreground">
                      Step 4: Confirm Your DSA Progress
                    </h3>
                    <p className="text-xs text-muted">
                      Review your summary before saving to your personal dashboard.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-5 rounded-2xl border border-[#1C221D] bg-[#0E120F] space-y-4">
                    <div className="text-xs font-bold text-foreground border-b border-[#1C221D] pb-2">
                      Progress Import Summary
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-[#090B0A] border border-[#171B17]">
                        <div className="text-lg font-extrabold text-foreground">
                          {selectedTopics.size}
                        </div>
                        <div className="text-[10px] text-muted">Topics Studied</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#090B0A] border border-[#171B17]">
                        <div className="text-lg font-extrabold text-emerald-400">
                          {solvedCount}
                        </div>
                        <div className="text-[10px] text-muted">Solved Problems</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#090B0A] border border-[#171B17]">
                        <div className="text-lg font-extrabold text-blue-400">
                          {attemptedCount}
                        </div>
                        <div className="text-[10px] text-muted">Attempted</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#090B0A] border border-[#171B17]">
                        <div className="text-lg font-extrabold text-amber-400">
                          {needsRevisionCount}
                        </div>
                        <div className="text-[10px] text-muted">Needs Revision</div>
                      </div>
                    </div>

                    {/* Revision Queue Option */}
                    <div className="pt-3 border-t border-[#1C221D] space-y-2">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={reviseExisting}
                          onChange={(e) => setReviseExisting(e.target.checked)}
                          className="mt-0.5 rounded border-[#2C352E] text-amber-400 focus:ring-0 bg-[#141815]"
                        />
                        <div className="text-xs">
                          <span className="font-semibold text-foreground">
                            Add solved questions to Spaced Repetition queue
                          </span>
                          <p className="text-[11px] text-muted leading-relaxed mt-0.5">
                            Initializes a fresh baseline recall review queue starting today without generating fake historical logs. Questions will follow the Day 1, 7, 21, 45 spaced intervals.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Safety Assurance Alert */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-400/5 border border-amber-400/20 text-xs text-muted">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-amber-400 font-semibold">Your existing work is safe: </span>
                      Any personal code, notes, or bookmarks you’ve already created will be preserved and never overwritten. You can update this progress anytime in DSA Sheets.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Modal Navigation */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#1C221D] bg-[#090B0A]">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-[#141815] text-xs font-semibold text-foreground hover:bg-[#1C221D] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-3 py-1.5 rounded-lg text-xs text-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-accent text-accent-text hover:bg-accent-hover text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSaveAndConfirm}
                    disabled={isSubmitting || saveSuccess}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-accent text-accent-text hover:bg-accent-hover text-xs font-bold shadow-md transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving Progress...</span>
                      </>
                    ) : saveSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Progress Saved!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Confirm & Save Progress</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

