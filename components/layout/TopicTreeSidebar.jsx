'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  Plus,
  MoreVertical,
  Search,
  GitFork,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const STARTER_TREE = [
  {
    id: 'arrays',
    name: 'Arrays',
    isExpanded: true,
    subtopics: [
      {
        id: 'two-pointers',
        name: 'Two Pointers',
        isExpanded: true,
        problems: [
          { id: 'two-sum-ii', title: 'Two Sum II' },
          { id: '3sum', title: '3Sum', isCurrent: true },
          { id: 'container-water', title: 'Container With Most Water' },
          { id: 'trapping-rain', title: 'Trapping Rain Water' },
        ],
      },
      { id: 'sliding-window', name: 'Sliding Window', problems: [] },
      { id: 'prefix-sum', name: 'Prefix Sum', problems: [] },
      { id: 'sorting', name: 'Sorting', problems: [] },
      { id: 'searching', name: 'Searching', problems: [] },
    ],
  },
  { id: 'strings', name: 'Strings', subtopics: [] },
  { id: 'linked-list', name: 'Linked List', subtopics: [] },
  { id: 'stack-queue', name: 'Stack & Queue', subtopics: [] },
  { id: 'trees', name: 'Trees', subtopics: [] },
  { id: 'graphs', name: 'Graphs', subtopics: [] },
  { id: 'binary-search', name: 'Binary Search', subtopics: [] },
  { id: 'recursion-backtracking', name: 'Recursion & Backtracking', subtopics: [] },
  { id: 'dynamic-programming', name: 'Dynamic Programming', subtopics: [] },
  { id: 'greedy', name: 'Greedy', subtopics: [] },
  { id: 'hashing', name: 'Hashing', subtopics: [] },
  { id: 'math', name: 'Math', subtopics: [] },
  { id: 'bit-manipulation', name: 'Bit Manipulation', subtopics: [] },
];

export function TopicTreeSidebar() {
  const [tree, setTree] = useState(STARTER_TREE);
  const [search, setSearch] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    async function loadTreeData() {
      try {
        const supabase = createClient();
        const [{ data: topicsData }, { data: problemsData }] = await Promise.all([
          supabase.from('topics').select('*').order('order_index', { ascending: true }),
          supabase.from('problems').select('id, title, topic_id').order('title', { ascending: true }),
        ]);

        if (topicsData && topicsData.length > 0) {
          const rootTopics = topicsData.filter((t) => !t.parent_id);
          const subMap = {};
          topicsData.forEach((t) => {
            if (t.parent_id) {
              if (!subMap[t.parent_id]) subMap[t.parent_id] = [];
              subMap[t.parent_id].push(t);
            }
          });

          const probMap = {};
          (problemsData || []).forEach((p) => {
            if (p.topic_id) {
              if (!probMap[p.topic_id]) probMap[p.topic_id] = [];
              probMap[p.topic_id].push(p);
            }
          });

          const constructed = rootTopics.map((rt) => ({
            id: rt.id,
            name: rt.name,
            isExpanded: true,
            problems: probMap[rt.id] || [],
            subtopics: (subMap[rt.id] || []).map((sub) => ({
              id: sub.id,
              name: sub.name,
              isExpanded: true,
              problems: probMap[sub.id] || [],
            })),
          }));

          setTree(constructed);
        }
      } catch {
        // Retain starter taxonomy if table is empty
      }
    }
    loadTreeData();
  }, [pathname]);

  const toggleFolder = (topicId) => {
    setTree((prev) =>
      prev.map((t) => (t.id === topicId ? { ...t, isExpanded: !t.isExpanded } : t))
    );
  };

  const toggleSubfolder = (topicId, subId) => {
    setTree((prev) =>
      prev.map((t) => {
        if (t.id !== topicId) return t;
        return {
          ...t,
          subtopics: (t.subtopics || []).map((s) =>
            s.id === subId ? { ...s, isExpanded: !s.isExpanded } : s
          ),
        };
      })
    );
  };

  return (
    <div className="hidden xl:flex flex-col w-60 border-r border-border bg-panel shrink-0 select-none text-xs">
      {/* Header: DSA with branch icon and + and ⋮ */}
      <div className="flex items-center justify-between h-13 px-3.5 border-b border-border">
        <div className="flex items-center gap-2 font-bold text-foreground">
          <GitFork className="w-4 h-4 text-amber-400" />
          <span className="tracking-wide">DSA</span>
        </div>
        <div className="flex items-center gap-1 text-muted">
          <Link
            href="/topics"
            className="p-1 rounded hover:bg-elevated hover:text-foreground"
            title="Manage topics"
          >
            <Plus className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/topics"
            className="p-1 rounded hover:bg-elevated hover:text-foreground"
            title="Topic actions"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-2.5 border-b border-border">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics..."
            className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-border bg-elevated/50 text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent text-xs"
          />
        </div>
      </div>

      {/* Tree View */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {tree.map((topic) => {
          const hasSubs = topic.subtopics && topic.subtopics.length > 0;
          const hasDirectProblems = topic.problems && topic.problems.length > 0;
          const matchSearch =
            !search.trim() ||
            topic.name.toLowerCase().includes(search.toLowerCase());

          if (!matchSearch && !hasSubs) return null;

          return (
            <div key={topic.id} className="space-y-0.5">
              {/* Topic Root Header */}
              <button
                type="button"
                onClick={() => toggleFolder(topic.id)}
                className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-elevated text-muted hover:text-foreground transition-colors text-left"
              >
                {hasSubs || hasDirectProblems ? (
                  topic.isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-muted shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-muted shrink-0" />
                  )
                ) : (
                  <span className="w-3.5 shrink-0" />
                )}
                {topic.isExpanded ? (
                  <FolderOpen className="w-3.5 h-3.5 text-amber-400/90 shrink-0" />
                ) : (
                  <Folder className="w-3.5 h-3.5 text-amber-400/90 shrink-0" />
                )}
                <span className="truncate font-medium">{topic.name}</span>
              </button>

              {/* Direct Problems in this topic */}
              {hasDirectProblems && topic.isExpanded && (
                <div className="pl-6 space-y-0.5">
                  {topic.problems.map((prob) => {
                    const isCurrent = pathname.includes(prob.id);
                    return (
                      <Link
                        key={prob.id}
                        href={`/problems/${prob.id}`}
                        className={`w-full flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                          isCurrent
                            ? 'bg-amber-400/15 text-amber-400 font-semibold'
                            : 'text-muted hover:text-foreground hover:bg-elevated'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isCurrent ? 'bg-amber-400' : 'bg-muted/60'
                          }`}
                        />
                        <span className="truncate">{prob.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Subtopics */}
              {hasSubs && topic.isExpanded && (
                <div className="pl-4 space-y-0.5">
                  {topic.subtopics.map((sub) => {
                    const hasSubProblems = sub.problems && sub.problems.length > 0;
                    return (
                      <div key={sub.id} className="space-y-0.5">
                        <button
                          type="button"
                          onClick={() => toggleSubfolder(topic.id, sub.id)}
                          className="w-full flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-elevated text-muted hover:text-foreground transition-colors text-left"
                        >
                          {hasSubProblems ? (
                            sub.isExpanded ? (
                              <ChevronDown className="w-3 h-3 text-muted shrink-0" />
                            ) : (
                              <ChevronRight className="w-3 h-3 text-muted shrink-0" />
                            )
                          ) : (
                            <span className="w-3 shrink-0" />
                          )}
                          <Folder className="w-3 h-3 text-amber-400/70 shrink-0" />
                          <span className="truncate">{sub.name}</span>
                        </button>

                        {/* Problems inside subtopic */}
                        {hasSubProblems && sub.isExpanded && (
                          <div className="pl-4 space-y-0.5">
                            {sub.problems.map((prob) => {
                              const isCurrent = pathname.includes(prob.id);
                              return (
                                <Link
                                  key={prob.id}
                                  href={`/problems/${prob.id}`}
                                  className={`w-full flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                                    isCurrent
                                      ? 'bg-amber-400/15 text-amber-400 font-semibold'
                                      : 'text-muted hover:text-foreground hover:bg-elevated'
                                  }`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      isCurrent ? 'bg-amber-400' : 'bg-muted/60'
                                    }`}
                                  />
                                  <span className="truncate">{prob.title}</span>
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
    </div>
  );
}
