'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  Filter,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  ChevronRight,
  ArrowUpDown,
  CalendarCheck2,
  FileCode2,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { DifficultyBadge, StatusBadge } from '@/components/ui/Badge';

export default function AllProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [topics, setTopics] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [sortField, setSortField] = useState('updated_at'); // 'title' | 'difficulty' | 'updated_at'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'

  useEffect(() => {
    async function fetchAll() {
      try {
        const supabase = createClient();
        const [{ data: pData }, { data: tData }, { data: patData }, { data: schedData }] =
          await Promise.all([
            supabase.from('problems').select('*').order('created_at', { ascending: false }),
            supabase.from('topics').select('id, name'),
            supabase.from('patterns').select('id, name'),
            supabase.from('problem_review_schedules').select('problem_id, next_review_at, stage'),
          ]);

        const schedMap = {};
        if (schedData) {
          schedData.forEach((s) => {
            schedMap[s.problem_id] = s;
          });
        }

        const enriched = (pData || []).map((p) => ({
          ...p,
          schedule: schedMap[p.id] || null,
        }));

        setProblems(enriched);
        setTopics(tData || []);
        setPatterns(patData || []);
      } catch (err) {
        console.error('Failed to load problems:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const toggleBookmark = async (id, currentVal) => {
    const nextVal = !currentVal;
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_bookmarked: nextVal } : p))
    );

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('problems').update({ is_bookmarked: nextVal }).eq('id', id);
      if (user) {
        if (nextVal) {
          await supabase.from('bookmarks').upsert(
            { user_id: user.id, problem_id: id },
            { onConflict: 'user_id,problem_id' }
          );
        } else {
          await supabase.from('bookmarks').delete().match({ user_id: user.id, problem_id: id });
        }
      }
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  };

  // Filtered and sorted problems
  const filteredProblems = useMemo(() => {
    return problems
      .filter((p) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title?.toLowerCase().includes(q);
          const matchSummary = p.summary?.toLowerCase().includes(q);
          const matchClues = p.recognition_clues?.toLowerCase().includes(q);
          if (!matchTitle && !matchSummary && !matchClues) return false;
        }

        // Difficulty filter
        if (selectedDifficulty !== 'ALL' && p.difficulty !== selectedDifficulty) {
          return false;
        }

        // Status filter
        if (selectedStatus !== 'ALL' && p.status !== selectedStatus) {
          return false;
        }

        // Topic filter
        if (selectedTopic !== 'ALL' && p.topic_id !== selectedTopic) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (sortField === 'title') {
          valA = (valA || '').toLowerCase();
          valB = (valB || '').toLowerCase();
          return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        if (sortField === 'updated_at') {
          const dateA = new Date(valA || 0).getTime();
          const dateB = new Date(valB || 0).getTime();
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }

        return 0;
      });
  }, [problems, searchQuery, selectedDifficulty, selectedStatus, selectedTopic, sortField, sortOrder]);

  const topicNameMap = useMemo(() => {
    const map = {};
    topics.forEach((t) => {
      map[t.id] = t.name;
    });
    return map;
  }, [topics]);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FileCode2 className="w-6 h-6 text-accent" />
            All DSA Problems
          </h1>
          <p className="text-xs text-muted mt-1">
            Browse, filter, and revise your saved algorithmic problem notes ({filteredProblems.length} notes).
          </p>
        </div>

        <Link href="/problems/new">
          <Button size="md" className="gap-2">
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Problem Note</span>
          </Button>
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-xl border border-border bg-panel flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by problem title, clue, intuition..."
            className="w-full bg-elevated/60 pl-9 pr-3 py-1.5 rounded-lg border border-border text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Difficulty */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-elevated/60 border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
          >
            <option value="ALL">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-elevated/60 border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Saved">Saved</option>
            <option value="Attempted">Attempted</option>
            <option value="Solved">Solved</option>
          </select>

          {/* Topic */}
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="bg-elevated/60 border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
          >
            <option value="ALL">All Topics</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Problems Table / List */}
      <div className="rounded-xl border border-border bg-panel overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-muted flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            Loading saved problems...
          </div>
        ) : filteredProblems.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-sm text-foreground font-semibold">No problems found</p>
            <p className="text-xs text-muted max-w-sm mx-auto">
              {searchQuery || selectedDifficulty !== 'ALL' || selectedStatus !== 'ALL'
                ? 'Try adjusting your search or filters to find what you are looking for.'
                : 'Start documenting your interview preparation by creating your first problem note.'}
            </p>
            <Link href="/problems/new" className="inline-block mt-2">
              <Button size="sm">Create First Problem</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-elevated/50 text-[11px] font-semibold text-muted uppercase tracking-wider">
                  <th className="py-3 px-4 w-10"></th>
                  <th className="py-3 px-4">Problem</th>
                  <th className="py-3 px-4">Topic</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Next Revision</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredProblems.map((problem) => (
                  <tr
                    key={problem.id}
                    className="hover:bg-elevated/40 transition-colors group"
                  >
                    {/* Bookmark */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleBookmark(problem.id, problem.is_bookmarked)}
                        className="text-muted hover:text-amber-400 p-1"
                        title={problem.is_bookmarked ? 'Bookmarked' : 'Add bookmark'}
                      >
                        {problem.is_bookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                        ) : (
                          <Bookmark className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                        )}
                      </button>
                    </td>

                    {/* Title */}
                    <td className="py-3 px-4">
                      <Link
                        href={`/problems/${problem.id}`}
                        className="font-medium text-foreground hover:text-amber-400 flex items-center gap-2"
                      >
                        {problem.problem_number && (
                          <span className="font-mono text-muted text-[11px]">
                            #{problem.problem_number}
                          </span>
                        )}
                        <span className="font-semibold">{problem.title}</span>
                      </Link>
                      {problem.summary && (
                        <p className="text-[11px] text-muted line-clamp-1 mt-0.5 max-w-md">
                          {problem.summary}
                        </p>
                      )}
                    </td>

                    {/* Topic */}
                    <td className="py-3 px-4 text-muted">
                      {topicNameMap[problem.topic_id] || 'General'}
                    </td>

                    {/* Difficulty */}
                    <td className="py-3 px-4">
                      <DifficultyBadge difficulty={problem.difficulty} />
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <StatusBadge status={problem.status} />
                    </td>

                    {/* Next Revision */}
                    <td className="py-3 px-4 text-muted">
                      {problem.schedule ? (
                        <div className="flex items-center gap-1.5">
                          <CalendarCheck2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>
                            {new Date(problem.schedule.next_review_at).toLocaleDateString()}
                          </span>
                          <span className="text-[10px] px-1 rounded bg-elevated border border-border">
                            S{problem.schedule.stage}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted italic">Not scheduled</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/problems/${problem.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/80 hover:text-amber-400"
                      >
                        <span>Open Note</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

