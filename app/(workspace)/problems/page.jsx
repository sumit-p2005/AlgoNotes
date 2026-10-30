'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getTopicTreeNav, getCurriculumNav } from '@/lib/utils/userStorage';
import striverA2ZData from '@/lib/curriculum/striver-a2z.json';
import { ProblemDetailView } from '@/components/problems/ProblemDetailView';

export default function AllProblemsWorkspacePage() {
  const [activeProblemId, setActiveProblemId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function determineActiveProblem() {
      try {
        const supabase = createClient();
        const { data: authData } = await supabase.auth.getUser().catch(() => ({ data: {} }));
        const uId = authData?.user?.id || null;

        // 1. Check user navigation preferences
        const nav = getTopicTreeNav(uId);
        const currNav = getCurriculumNav(uId);
        const candidateId = nav?.lastProblemId || currNav?.lastProblemId;

        if (candidateId) {
          setActiveProblemId(candidateId);
          setLoading(false);
          return;
        }

        // 2. Check if user has personal problem notes
        if (uId) {
          const { data: userProbs } = await supabase
            .from('problems')
            .select('id')
            .eq('user_id', uId)
            .limit(1)
            .catch(() => ({ data: [] }));

          if (userProbs && userProbs.length > 0) {
            setActiveProblemId(userProbs[0].id);
            setLoading(false);
            return;
          }
        }

        // 3. Fallback to first problem in curriculum or 3Sum
        const firstProblem = striverA2ZData?.problems?.[0];
        setActiveProblemId(firstProblem?.id || '3sum');
      } catch (err) {
        console.error('Failed to resolve active problem:', err);
        setActiveProblemId('3sum');
      } finally {
        setLoading(false);
      }
    }

    determineActiveProblem();
  }, []);

  if (loading || !activeProblemId) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-muted text-xs">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping mr-2" />
        <span>Loading DSA problem workspace...</span>
      </div>
    );
  }

  // Render active problem notebook directly with plain string id (no inline promise)
  return <ProblemDetailView problemId={activeProblemId} />;
}
