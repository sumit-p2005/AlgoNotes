'use client';

import React, { useState } from 'react';
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

const DEFAULT_TREE = [
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

export function TopicTreeSidebar({ activeProblemId = '3sum' }) {
  const [tree, setTree] = useState(DEFAULT_TREE);
  const [search, setSearch] = useState('');
  const pathname = usePathname();

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
            title="Add topic"
          >
            <Plus className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            className="p-1 rounded hover:bg-elevated hover:text-foreground"
            title="Topic actions"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
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
          return (
            <div key={topic.id} className="space-y-0.5">
              {/* Topic Root Header */}
              <button
                type="button"
                onClick={() => toggleFolder(topic.id)}
                className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-elevated text-muted hover:text-foreground transition-colors text-left"
              >
                {hasSubs ? (
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

              {/* Subtopics */}
              {hasSubs && topic.isExpanded && (
                <div className="pl-4 space-y-0.5">
                  {topic.subtopics.map((sub) => {
                    const hasProblems = sub.problems && sub.problems.length > 0;
                    return (
                      <div key={sub.id} className="space-y-0.5">
                        <button
                          type="button"
                          onClick={() => toggleSubfolder(topic.id, sub.id)}
                          className="w-full flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-elevated text-muted hover:text-foreground transition-colors text-left"
                        >
                          {hasProblems ? (
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
                        {hasProblems && sub.isExpanded && (
                          <div className="pl-4 space-y-0.5">
                            {sub.problems.map((prob) => {
                              const isCurrent =
                                prob.isCurrent ||
                                activeProblemId === prob.id ||
                                pathname.includes(prob.id);
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
