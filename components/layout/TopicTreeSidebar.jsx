'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  Plus,
  Search,
  FolderTree,
  CheckCircle2,
  FileText,
  Edit3,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getTopicTreeNav, saveTopicTreeNav } from '@/lib/utils/userStorage';
import striverA2ZData from '@/lib/curriculum/striver-a2z.json';
import { cn } from '@/lib/utils/cn';

export function TopicTreeSidebar() {
  const [search, setSearch] = useState('');
  const [userId, setUserId] = useState(null);
  const [expandedTopics, setExpandedTopics] = useState(() => {
    const firstId = striverA2ZData?.topics?.[0]?.id;
    return firstId ? { [firstId]: true } : {};
  });
  const [expandedSubtopics, setExpandedSubtopics] = useState({});
  const [userProgressMap, setUserProgressMap] = useState({});
  const [userNotesMap, setUserNotesMap] = useState({});
  const [customTopics, setCustomTopics] = useState([]);
  const [customProblems, setCustomProblems] = useState([]);
  const pathname = usePathname();

  // Load user data, custom problems, and progress
  useEffect(() => {
    async function loadUserData() {
      try {
        const supabase = createClient();
        const { data: authData } = await supabase.auth.getUser().catch(() => ({ data: {} }));
        const uId = authData?.user?.id || null;
        setUserId(uId);

        // Load saved folder expansion state from userStorage
        const savedNav = getTopicTreeNav(uId);
        if (savedNav?.expandedFolders) {
          setExpandedTopics((prev) => ({ ...prev, ...savedNav.expandedFolders }));
          setExpandedSubtopics((prev) => ({ ...prev, ...savedNav.expandedFolders }));
        }

        if (uId) {
          const [
            { data: progData },
            { data: notesData },
            { data: userTopics },
            { data: userProbs },
          ] = await Promise.all([
            supabase
              .from('user_curriculum_progress')
              .select('problem_id, status')
              .eq('user_id', uId)
              .catch(() => ({ data: [] })),
            supabase
              .from('user_curriculum_notes')
              .select('problem_id')
              .eq('user_id', uId)
              .catch(() => ({ data: [] })),
            supabase
              .from('topics')
              .select('*')
              .order('order_index', { ascending: true })
              .catch(() => ({ data: [] })),
            supabase
              .from('problems')
              .select('id, title, topic_id, difficulty, status')
              .order('title', { ascending: true })
              .catch(() => ({ data: [] })),
          ]);

          const pMap = {};
          (progData || []).forEach((p) => {
            if (p?.problem_id) pMap[p.problem_id] = p.status;
          });
          setUserProgressMap(pMap);

          const nMap = {};
          (notesData || []).forEach((n) => {
            if (n?.problem_id) nMap[n.problem_id] = true;
          });
          setUserNotesMap(nMap);

          setCustomTopics(userTopics || []);
          setCustomProblems(userProbs || []);
        }
      } catch (err) {
        console.error('TopicTreeSidebar data load error:', err);
      }
    }
    loadUserData();

    const handleStatusUpdate = (e) => {
      const { problemId, status, isCurriculum } = e.detail || {};
      if (!problemId) return;

      if (isCurriculum) {
        setUserProgressMap((prev) => ({
          ...prev,
          [problemId]: status,
        }));
      } else {
        setCustomProblems((prev) =>
          prev.map((p) => (p.id === problemId ? { ...p, status } : p))
        );
      }
    };

    window.addEventListener('problem-status-updated', handleStatusUpdate);
    return () => window.removeEventListener('problem-status-updated', handleStatusUpdate);
  }, []);

  // Construct the unified curriculum and custom tree
  const treeData = useMemo(() => {
    // 1. Build curriculum tree from striver-a2z.json
    const sectionsByTopic = {};
    (striverA2ZData?.sections || []).forEach((sec) => {
      if (!sec?.topic_id) return;
      if (!sectionsByTopic[sec.topic_id]) sectionsByTopic[sec.topic_id] = [];
      sectionsByTopic[sec.topic_id].push(sec);
    });

    const problemsBySection = {};
    (striverA2ZData?.problems || []).forEach((prob) => {
      if (!prob?.section_id) return;
      if (!problemsBySection[prob.section_id]) problemsBySection[prob.section_id] = [];
      problemsBySection[prob.section_id].push(prob);
    });

    const curriculumTree = (striverA2ZData?.topics || []).map((topic) => {
      const subtopics = (sectionsByTopic[topic.id] || []).map((sec) => ({
        id: sec.id,
        name: sec.title || 'Untitled Section',
        problems: (problemsBySection[sec.id] || []).map((p) => ({
          id: p.id,
          title: p.title || 'Untitled Problem',
          difficulty: p.difficulty || 'Medium',
          problemNumber: p.problem_number || '',
          isCurriculum: true,
          status: userProgressMap[p.id] || 'available',
          hasNote: !!userNotesMap[p.id],
        })),
      }));

      const totalProblems = subtopics.reduce((acc, s) => acc + s.problems.length, 0);

      return {
        id: topic.id,
        name: topic.title || 'Untitled Topic',
        subtopics,
        totalProblems,
        isCustom: false,
      };
    });

    // 2. If user has custom created topics & problems, add them
    if (customProblems.length > 0) {
      const customTreeItem = {
        id: 'custom-notes',
        name: 'My Custom Problem Notes',
        totalProblems: customProblems.length,
        isCustom: true,
        subtopics: [
          {
            id: 'custom-all',
            name: 'All Custom Notes',
            problems: customProblems.map((p) => ({
              id: p.id,
              title: p.title || 'Untitled Note',
              difficulty: p.difficulty || 'Medium',
              problemNumber: '',
              isCurriculum: false,
              status: (p.status || 'Saved').toLowerCase(),
              hasNote: true,
            })),
          },
        ],
      };
      curriculumTree.unshift(customTreeItem);
    }

    return curriculumTree;
  }, [userProgressMap, userNotesMap, customProblems]);

  // Toggle Topic folder
  const toggleTopic = (topicId) => {
    setExpandedTopics((prev) => {
      const nextVal = !prev[topicId];
      const updated = { ...prev, [topicId]: nextVal };
      if (userId) {
        saveTopicTreeNav(userId, { expandedFolders: { [topicId]: nextVal }, lastTopicId: topicId });
      }
      return updated;
    });
  };

  // Toggle Subtopic folder
  const toggleSubtopic = (subId, topicId) => {
    setExpandedSubtopics((prev) => {
      const nextVal = !prev[subId];
      const updated = { ...prev, [subId]: nextVal };
      if (userId) {
        saveTopicTreeNav(userId, {
          expandedFolders: { [subId]: nextVal },
          lastTopicId: topicId,
          lastSubtopicId: subId,
        });
      }
      return updated;
    });
  };

  const cleanQuery = search.trim().toLowerCase();

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-border bg-panel shrink-0 select-none text-xs h-full">
      {/* Header: DSA Problems + New Problem Note */}
      <div className="flex items-center justify-between h-13 px-3.5 border-b border-border bg-panel shrink-0">
        <div className="flex items-center gap-2 font-bold text-foreground">
          <FolderTree className="w-4 h-4 text-accent-icon" />
          <span className="tracking-wide">DSA Problems</span>
        </div>
        <Link
          href="/problems/new"
          className="p-1.5 rounded-lg border border-border bg-elevated/60 hover:bg-accent hover:text-accent-text text-secondary hover:text-foreground transition-colors flex items-center gap-1 font-semibold text-[11px] cursor-pointer"
          title="Create New Problem Note"
          aria-label="New Problem Note"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden lg:inline">New</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="p-2.5 border-b border-border bg-panel shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-icon" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problems, topics..."
            className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-border bg-elevated/50 text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent text-xs"
          />
        </div>
      </div>

      {/* Tree Hierarchy */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {treeData.map((topic) => {
          // Check if topic or any subtopic/problem matches search
          const topicMatches =
            !cleanQuery || (topic.name || '').toLowerCase().includes(cleanQuery);
          const matchingSubtopics = (topic.subtopics || [])
            .map((sub) => {
              const subMatches =
                !cleanQuery || (sub.name || '').toLowerCase().includes(cleanQuery);
              const filteredProbs = cleanQuery
                ? (sub.problems || []).filter(
                    (p) =>
                      (p.title || '').toLowerCase().includes(cleanQuery) ||
                      (p.problemNumber && String(p.problemNumber).includes(cleanQuery))
                  )
                : sub.problems || [];

              return {
                ...sub,
                hasMatchingProbs: filteredProbs.length > 0,
                problems: filteredProbs,
                shouldShow: subMatches || filteredProbs.length > 0,
              };
            })
            .filter((s) => s.shouldShow);

          if (!topicMatches && matchingSubtopics.length === 0) return null;

          // Auto-expand if active search query exists
          const isTopicExpanded = cleanQuery ? true : !!expandedTopics[topic.id];

          return (
            <div key={topic.id} className="space-y-0.5">
              {/* Topic Folder Row */}
              <button
                type="button"
                onClick={() => toggleTopic(topic.id)}
                className="w-full flex items-center justify-between gap-1.5 px-2 py-1.5 rounded-lg hover:bg-elevated text-foreground transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  {isTopicExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-icon group-hover:text-foreground shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-icon group-hover:text-foreground shrink-0" />
                  )}
                  {isTopicExpanded ? (
                    <FolderOpen className="w-3.5 h-3.5 text-accent-icon shrink-0" />
                  ) : (
                    <Folder className="w-3.5 h-3.5 text-accent-icon shrink-0" />
                  )}
                  <span className="truncate font-semibold text-xs text-foreground">{topic.name}</span>
                </div>
                <span className="text-[10px] text-secondary font-mono px-1.5 py-0.2 rounded bg-elevated shrink-0">
                  {topic.totalProblems}
                </span>
              </button>

              {/* Subtopics List */}
              {isTopicExpanded && (
                <div className="pl-3 space-y-0.5">
                  {matchingSubtopics.map((sub) => {
                    const isSubExpanded = cleanQuery ? true : !!expandedSubtopics[sub.id];

                    return (
                      <div key={sub.id} className="space-y-0.5">
                        {/* Subtopic Header */}
                        <button
                          type="button"
                          onClick={() => toggleSubtopic(sub.id, topic.id)}
                          className="w-full flex items-center justify-between gap-1.5 px-2 py-1 rounded-md hover:bg-elevated text-secondary hover:text-foreground transition-colors text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            {sub.problems && sub.problems.length > 0 ? (
                              isSubExpanded ? (
                                <ChevronDown className="w-3 h-3 text-icon shrink-0" />
                              ) : (
                                <ChevronRight className="w-3 h-3 text-icon shrink-0" />
                              )
                            ) : (
                              <span className="w-3 shrink-0" />
                            )}
                            <span className="truncate text-[11px] font-medium">{sub.name}</span>
                          </div>
                          <span className="text-[9px] text-muted font-mono">
                            {sub.problems ? sub.problems.length : 0}
                          </span>
                        </button>

                        {/* Problems List under this Subtopic */}
                        {isSubExpanded && sub.problems && sub.problems.length > 0 && (
                          <div className="pl-4 space-y-0.5 border-l border-border/60 ml-2 my-0.5">
                            {sub.problems.map((prob) => {
                              const isCurrent =
                                pathname === `/problems/${prob.id}` ||
                                pathname.endsWith(`/${prob.id}`);

                              return (
                                <Link
                                  key={prob.id}
                                  href={`/problems/${prob.id}`}
                                  onClick={() => {
                                    if (userId) {
                                      saveTopicTreeNav(userId, {
                                        lastTopicId: topic.id,
                                        lastSubtopicId: sub.id,
                                        lastProblemId: prob.id,
                                      });
                                    }
                                  }}
                                  className={cn(
                                    'w-full flex items-center justify-between gap-1.5 px-2 py-1 rounded-md text-[11px] transition-colors group cursor-pointer',
                                    isCurrent
                                      ? 'bg-accent-subtle dark:bg-accent/15 text-accent-selected-text font-bold border-l-2 border-accent-border pl-1.5 shadow-xs'
                                      : 'text-secondary hover:text-foreground hover:bg-elevated'
                                  )}
                                  title={prob.title}
                                >
                                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                    {/* Real Status Indicator */}
                                    {prob.status === 'solved' ? (
                                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                                    ) : prob.status === 'attempted' ? (
                                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                    ) : prob.status === 'needs revision' ? (
                                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                                    ) : prob.hasNote ? (
                                      <FileText className="w-3 h-3 text-sky-500 shrink-0" />
                                    ) : (
                                      <span className="w-1.5 h-1.5 rounded-full bg-muted/40 shrink-0" />
                                    )}

                                    <span className="truncate">{prob.title}</span>
                                  </div>

                                  <div className="flex items-center gap-1 shrink-0">
                                    {prob.hasNote && (
                                      <Edit3
                                        className="w-2.5 h-2.5 text-amber-400/80"
                                        title="Notes created"
                                      />
                                    )}
                                    {prob.difficulty && (
                                      <span
                                        className={cn(
                                          'text-[9px] px-1 py-0.2 rounded font-mono font-semibold',
                                          prob.difficulty === 'Easy'
                                            ? 'text-emerald-400 bg-emerald-400/10'
                                            : prob.difficulty === 'Medium'
                                            ? 'text-amber-400 bg-amber-400/10'
                                            : 'text-rose-400 bg-rose-400/10'
                                        )}
                                      >
                                        {prob.difficulty[0]}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
