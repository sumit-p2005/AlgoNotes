'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileCode2, BookOpen, Layers, X, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { DifficultyBadge } from '@/components/ui/Badge';

export function CommandSearchModal({ isOpen, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ problems: [], topics: [], patterns: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults({ problems: [], topics: [], patterns: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent('open-command-search'));
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults({ problems: [], topics: [], patterns: [] });
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        const trimmed = query.trim();

        // Search problems
        const { data: problems } = await supabase
          .from('problems')
          .select('id, title, difficulty, problem_number')
          .ilike('title', `%${trimmed}%`)
          .limit(5);

        // Search topics
        const { data: topics } = await supabase
          .from('topics')
          .select('id, name')
          .ilike('name', `%${trimmed}%`)
          .limit(5);

        // Search patterns
        const { data: patterns } = await supabase
          .from('patterns')
          .select('id, name')
          .ilike('name', `%${trimmed}%`)
          .limit(5);

        setResults({
          problems: problems || [],
          topics: topics || [],
          patterns: patterns || [],
        });
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const navigateTo = (path) => {
    router.push(path);
    onClose();
  };

  const totalResults =
    results.problems.length + results.topics.length + results.patterns.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl rounded-xl border border-border bg-panel shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-elevated/40">
          <Search className="w-5 h-5 text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems, topics, patterns, or notes... (Esc to close)"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-muted hover:text-foreground p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-border/40">
          {loading && (
            <div className="p-4 text-center text-xs text-muted flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              Searching workspace...
            </div>
          )}

          {!loading && query && totalResults === 0 && (
            <div className="p-8 text-center text-sm text-muted">
              No matching problems, topics, or patterns found for &quot;{query}&quot;.
            </div>
          )}

          {!loading && !query && (
            <div className="p-6 text-center text-xs text-muted">
              Type to quickly navigate anywhere in your AlgoNotes notebook.
            </div>
          )}

          {/* Problems */}
          {results.problems.length > 0 && (
            <div className="py-2">
              <div className="text-[11px] font-semibold tracking-wider text-muted uppercase px-3 pb-1.5 flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-accent" /> Problems
              </div>
              {results.problems.map((prob) => (
                <button
                  key={prob.id}
                  onClick={() => navigateTo(`/problems/${prob.id}`)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg hover:bg-elevated text-sm transition-colors group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {prob.problem_number && (
                      <span className="text-xs font-mono text-muted">
                        #{prob.problem_number}
                      </span>
                    )}
                    <span className="font-medium text-foreground group-hover:text-amber-400 truncate">
                      {prob.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <DifficultyBadge difficulty={prob.difficulty} />
                    <ArrowRight className="w-3.5 h-3.5 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Topics */}
          {results.topics.length > 0 && (
            <div className="py-2">
              <div className="text-[11px] font-semibold tracking-wider text-muted uppercase px-3 pb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Topics
              </div>
              {results.topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => navigateTo(`/topics?id=${t.id}`)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg hover:bg-elevated text-sm transition-colors group"
                >
                  <span className="font-medium text-foreground group-hover:text-blue-400">
                    {t.name}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}

          {/* Patterns */}
          {results.patterns.length > 0 && (
            <div className="py-2">
              <div className="text-[11px] font-semibold tracking-wider text-muted uppercase px-3 pb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" /> Patterns
              </div>
              {results.patterns.map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigateTo(`/patterns?id=${p.id}`)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg hover:bg-elevated text-sm transition-colors group"
                >
                  <span className="font-medium text-foreground group-hover:text-purple-400">
                    {p.name}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-border bg-elevated/20 flex items-center justify-between text-[11px] text-muted">
          <span>Press <kbd className="px-1.5 py-0.5 rounded border border-border bg-panel font-mono text-[10px]">Esc</kbd> to close</span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded border border-border bg-panel font-mono text-[10px]">Ctrl+K</kbd> anywhere</span>
        </div>
      </div>
    </div>
  );
}

