'use client';

import React, { useState, useEffect } from 'react';
import { ProblemNotebook } from '@/components/problems/ProblemNotebook';
import { createClient } from '@/lib/supabase/client';

export default function NewProblemPage() {
  const [topics, setTopics] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const [{ data: tData }, { data: pData }] = await Promise.all([
          supabase.from('topics').select('id, name').order('order_index', { ascending: true }),
          supabase.from('patterns').select('id, name').order('name', { ascending: true }),
        ]);

        setTopics(tData || [
          { id: 'arrays', name: 'Arrays & Two Pointers' },
          { id: 'sliding-window', name: 'Sliding Window' },
          { id: 'strings', name: 'Strings' },
          { id: 'linked-lists', name: 'Linked Lists' },
          { id: 'trees', name: 'Trees' },
          { id: 'dp', name: 'Dynamic Programming' },
        ]);

        setPatterns(pData || [
          { id: 'two-pointers', name: 'Two Pointers' },
          { id: 'sliding-window-p', name: 'Sliding Window' },
          { id: 'binary-search', name: 'Binary Search' },
          { id: 'fast-slow', name: 'Fast & Slow Pointers' },
          { id: 'monotonic-stack', name: 'Monotonic Stack' },
          { id: 'bfs-dfs', name: 'BFS & DFS' },
          { id: 'dynamic-prog', name: 'Dynamic Programming' },
        ]);
      } catch (err) {
        console.error('Failed to load topics/patterns:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-muted text-sm">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping mr-2" />
        Loading notebook workspace...
      </div>
    );
  }

  return <ProblemNotebook isNew={true} topics={topics} patterns={patterns} />;
}
