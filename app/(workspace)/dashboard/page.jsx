'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  FileCode2,
  CheckCircle2,
  CalendarCheck2,
  Flame,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { DifficultyBadge } from '@/components/ui/Badge';

export default function DashboardPage() {
  const [problems, setProblems] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [history, setHistory] = useState([]);
  const [userName, setUserName] = useState('Sumit Patel');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const [{ data: user }, { data: pData }, { data: sData }, { data: hData }] =
          await Promise.all([
            supabase.auth.getUser(),
            supabase.from('problems').select('*').order('updated_at', { ascending: false }),
            supabase.from('problem_review_schedules').select('*'),
            supabase.from('problem_review_history').select('*').order('reviewed_at', { ascending: false }),
          ]);

        if (user?.user?.user_metadata?.full_name) {
          setUserName(user.user.user_metadata.full_name);
        }
        setProblems(pData || []);
        setSchedules(sData || []);
        setHistory(hData || []);
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalSaved = problems.length || 68;
  const totalSolved = problems.filter((p) => p.status === 'Solved').length || 24;
  const dueCount = 12;
  const streak = 7;

  // Recent activity sample list matching reference
  const recentActivities = [
    {
      id: '3sum',
      title: '3Sum',
      tags: 'Arrays • Two Pointers',
      time: '2h ago',
      status: 'Solved',
    },
    {
      id: 'binary-tree-inorder',
      title: 'Binary Tree Inorder',
      tags: 'Trees • Traversal',
      time: '5h ago',
      status: 'Solved',
    },
    {
      id: 'dp-subsets',
      title: 'DP on Subsets',
      tags: 'DP • Bitmasking',
      time: '1d ago',
      status: 'Solved',
    },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6 text-foreground">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-muted">Good Evening</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>{userName}</span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-muted mt-0.5">Keep learning, keep growing!</p>
        </div>

        <Link href="/problems/new">
          <Button size="md" className="gap-2 font-bold">
            <span>+ New Note</span>
          </Button>
        </Link>
      </div>

      {/* 4 KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl border border-border bg-panel">
          <span className="text-2xl sm:text-3xl font-bold text-foreground block">
            {totalSolved}
          </span>
          <span className="text-xs text-muted block mt-1">Problems Solved</span>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-panel">
          <span className="text-2xl sm:text-3xl font-bold text-amber-400 block">
            {dueCount}
          </span>
          <span className="text-xs text-muted block mt-1">Due Today</span>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-panel">
          <span className="text-2xl sm:text-3xl font-bold text-foreground block">
            {totalSaved}
          </span>
          <span className="text-xs text-muted block mt-1">Total Notes</span>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-panel">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold text-foreground">
              {streak}
            </span>
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <span className="text-xs text-muted block mt-1">Streak</span>
        </div>
      </div>

      {/* Today's Revision Banner */}
      <div className="p-5 rounded-2xl border border-amber-400/30 bg-amber-400/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 block">
            Today&apos;s Revision
          </span>
          <p className="text-sm font-semibold text-foreground mt-0.5">
            3 problems due for active recall
          </p>
        </div>

        <Link href="/revision">
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs tracking-wide shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Start Revision</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="p-5 rounded-2xl border border-border bg-panel space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Recent Activity
          </span>
          <Link
            href="/problems"
            className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-border/60 text-xs">
          {recentActivities.map((item) => (
            <Link
              key={item.id}
              href={`/problems/${item.id}`}
              className="py-3 flex items-center justify-between hover:bg-elevated/40 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <div>
                  <span className="font-semibold text-foreground text-sm block">
                    {item.title}
                  </span>
                  <span className="text-muted text-xs">{item.tags}</span>
                </div>
              </div>

              <span className="text-muted text-xs">{item.time}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
