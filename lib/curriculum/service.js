import striverA2ZData from './striver-a2z.json';
import { createClient } from '@/lib/supabase/server';

/**
 * AlgoNotes Curriculum Service
 * High-performance access to preinstalled curriculum and user progress.
 * Uses Supabase with local fallback for fast offline development.
 */

export async function getCurriculumSheet(slug = 'striver-a2z') {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('curriculum_sheets')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (data && !error) {
      return data;
    }
  } catch (e) {
    // fallback to static preinstalled data
  }
  return striverA2ZData.sheet;
}

export async function getCurriculumTopics(sheetId) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('curriculum_topics')
      .select('*')
      .order('order_index', { ascending: true });

    if (data && data.length > 0 && !error) {
      return data;
    }
  } catch (e) {}
  return striverA2ZData.topics;
}

export async function getCurriculumSections(topicId) {
  try {
    const supabase = await createClient();
    let query = supabase.from('curriculum_sections').select('*').order('order_index', { ascending: true });
    if (topicId) query = query.eq('topic_id', topicId);
    const { data, error } = await query;
    if (data && data.length > 0 && !error) return data;
  } catch (e) {}
  if (topicId) {
    return striverA2ZData.sections.filter(s => s.topic_id === topicId);
  }
  return striverA2ZData.sections;
}

export async function getCurriculumProblems(filters = {}) {
  const { topicId, sectionId, difficulty, status, userId } = filters;
  let problems = striverA2ZData.problems;

  if (topicId) {
    problems = problems.filter(p => p.topic_id === topicId);
  }
  if (sectionId) {
    problems = problems.filter(p => p.section_id === sectionId);
  }
  if (difficulty && difficulty !== 'all') {
    problems = problems.filter(p => p.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  return problems;
}

export async function getCurriculumProblemById(problemId) {
  // Check static or database
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('curriculum_problems')
      .select('*')
      .eq('id', problemId)
      .maybeSingle();
    if (data && !error) {
      const topic = striverA2ZData.topics.find(t => t.id === data.topic_id);
      const section = striverA2ZData.sections.find(s => s.id === data.section_id);
      return { ...data, topic, section };
    }
  } catch (e) {}

  const prob = striverA2ZData.problems.find(p => p.id === problemId || String(p.problem_number) === String(problemId));
  if (prob) {
    const topic = striverA2ZData.topics.find(t => t.id === prob.topic_id);
    const section = striverA2ZData.sections.find(s => s.id === prob.section_id);
    return { ...prob, topic, section };
  }
  return null;
}

export async function getAdjacentCurriculumProblems(currentProblemNumber) {
  const num = parseInt(currentProblemNumber);
  const prev = striverA2ZData.problems.find(p => p.problem_number === num - 1) || null;
  const next = striverA2ZData.problems.find(p => p.problem_number === num + 1) || null;
  return { prev, next };
}

