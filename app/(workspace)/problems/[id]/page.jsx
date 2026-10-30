'use client';

import React, { use } from 'react';
import { ProblemDetailView } from '@/components/problems/ProblemDetailView';

export default function ProblemDetailPage({ params }) {
  const unwrappedParams = params && typeof params.then === 'function' ? use(params) : params;
  const problemId = unwrappedParams?.id || '3sum';

  return <ProblemDetailView problemId={problemId} />;
}
