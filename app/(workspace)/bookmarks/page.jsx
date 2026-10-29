'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, BookmarkCheck, ChevronRight, FileCode2, ExternalLink } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { DifficultyBadge, StatusBadge } from '@/components/ui/Badge';

export default function BookmarksPage() {
  const [bookmarkedProblems, setBookmarkedProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookmarks() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('problems')
          .select('*')
          .eq('is_bookmarked', true)
          .order('updated_at', { ascending: false });

        setBookmarkedProblems(data || []);
      } catch (err) {
        console.error('Bookmarks load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBookmarks();
  }, []);

  const handleRemoveBookmark = async (id) => {
    setBookmarkedProblems((prev) => prev.filter((p) => p.id !== id));
    try {
      const supabase = createClient();
      await supabase.from('problems').update({ is_bookmarked: false }).eq('id', id);
    } catch (err) {
      console.error('Failed to remove bookmark:', err);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-accent fill-accent/20" />
          Bookmarked Problems
        </h1>
        <p className="text-xs text-muted mt-1">
          Quick-access list of problems saved for rapid reference and interview drills.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-panel overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-muted flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            Loading bookmarks...
          </div>
        ) : bookmarkedProblems.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <Bookmark className="w-8 h-8 text-muted mx-auto stroke-1" />
            <p className="text-sm font-semibold text-foreground">No bookmarked problems</p>
            <p className="text-xs text-muted max-w-sm mx-auto">
              Click the bookmark icon on any problem note to pin it here for immediate study.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/60 text-xs">
            {bookmarkedProblems.map((prob) => (
              <div
                key={prob.id}
                className="p-4 flex items-center justify-between hover:bg-elevated/40 transition-colors"
              >
                <div className="flex items-center gap-3 truncate pr-4">
                  <button
                    type="button"
                    onClick={() => handleRemoveBookmark(prob.id)}
                    className="text-amber-400 hover:text-muted p-1"
                    title="Remove from bookmarks"
                  >
                    <BookmarkCheck className="w-4 h-4 fill-amber-400/20" />
                  </button>

                  <div className="truncate space-y-0.5">
                    <Link
                      href={`/problems/${prob.id}`}
                      className="font-semibold text-foreground hover:text-amber-400 truncate block text-sm"
                    >
                      {prob.problem_number ? `#${prob.problem_number} ` : ''}
                      {prob.title}
                    </Link>
                    {prob.summary && (
                      <p className="text-muted text-[11px] line-clamp-1">{prob.summary}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <DifficultyBadge difficulty={prob.difficulty} size="sm" />
                  <StatusBadge status={prob.status} size="sm" />
                  <Link
                    href={`/problems/${prob.id}`}
                    className="p-1 rounded text-muted hover:text-foreground hover:bg-elevated ml-2"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
