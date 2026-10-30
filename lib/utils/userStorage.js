/**
 * User-isolated client storage utility for AlgoNotes
 * Safely persists and restores navigation, curriculum resume position, and editor preferences.
 */

const STORAGE_PREFIX = 'algonotes';

function isClient() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function getSafeUserId(userId) {
  if (!userId || typeof userId !== 'string') return 'guest';
  return userId.trim().replace(/[^a-zA-Z0-9_-]/g, '_');
}

/**
 * Persist curriculum navigation state (last opened step and question)
 */
export function saveCurriculumNav(userId, { lastStepId, lastProblemId, expandedSteps } = {}) {
  if (!isClient()) return;
  try {
    const uid = getSafeUserId(userId);
    const key = `${STORAGE_PREFIX}_curr_nav_${uid}`;
    const existing = getCurriculumNav(userId);
    const data = {
      lastStepId: lastStepId !== undefined ? lastStepId : existing.lastStepId,
      lastProblemId: lastProblemId !== undefined ? lastProblemId : existing.lastProblemId,
      expandedSteps: expandedSteps !== undefined ? expandedSteps : existing.expandedSteps,
      updatedAt: Date.now(),
    };
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Quota or private mode fallback
  }
}

/**
 * Retrieve curriculum navigation state
 */
export function getCurriculumNav(userId) {
  if (!isClient()) return { lastStepId: null, lastProblemId: null, expandedSteps: [] };
  try {
    const uid = getSafeUserId(userId);
    const key = `${STORAGE_PREFIX}_curr_nav_${uid}`;
    const raw = window.localStorage.getItem(key);
    if (!raw) return { lastStepId: null, lastProblemId: null, expandedSteps: [] };
    const parsed = JSON.parse(raw);
    return {
      lastStepId: parsed.lastStepId || null,
      lastProblemId: parsed.lastProblemId || null,
      expandedSteps: Array.isArray(parsed.expandedSteps) ? parsed.expandedSteps : [],
    };
  } catch {
    return { lastStepId: null, lastProblemId: null, expandedSteps: [] };
  }
}

/**
 * Persist Topic Tree navigation state (expanded folders, last selected item)
 */
export function saveTopicTreeNav(userId, { lastTopicId, lastSubtopicId, lastProblemId, expandedFolders } = {}) {
  if (!isClient()) return;
  try {
    const uid = getSafeUserId(userId);
    const key = `${STORAGE_PREFIX}_tree_nav_${uid}`;
    const existing = getTopicTreeNav(userId);
    const data = {
      lastTopicId: lastTopicId !== undefined ? lastTopicId : existing.lastTopicId,
      lastSubtopicId: lastSubtopicId !== undefined ? lastSubtopicId : existing.lastSubtopicId,
      lastProblemId: lastProblemId !== undefined ? lastProblemId : existing.lastProblemId,
      expandedFolders: expandedFolders !== undefined ? expandedFolders : existing.expandedFolders,
      updatedAt: Date.now(),
    };
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Quota or private mode fallback
  }
}

/**
 * Retrieve Topic Tree navigation state
 */
export function getTopicTreeNav(userId) {
  if (!isClient()) return { lastTopicId: null, lastSubtopicId: null, lastProblemId: null, expandedFolders: null };
  try {
    const uid = getSafeUserId(userId);
    const key = `${STORAGE_PREFIX}_tree_nav_${uid}`;
    const raw = window.localStorage.getItem(key);
    if (!raw) return { lastTopicId: null, lastSubtopicId: null, lastProblemId: null, expandedFolders: null };
    const parsed = JSON.parse(raw);
    return {
      lastTopicId: parsed.lastTopicId || null,
      lastSubtopicId: parsed.lastSubtopicId || null,
      lastProblemId: parsed.lastProblemId || null,
      expandedFolders: parsed.expandedFolders && typeof parsed.expandedFolders === 'object' ? parsed.expandedFolders : null,
    };
  } catch {
    return { lastTopicId: null, lastSubtopicId: null, lastProblemId: null, expandedFolders: null };
  }
}

/**
 * Persist Topics Page navigation state
 */
export function saveTopicsPageNav(userId, { selectedTopicId, expandedTopics } = {}) {
  if (!isClient()) return;
  try {
    const uid = getSafeUserId(userId);
    const key = `${STORAGE_PREFIX}_topics_page_${uid}`;
    const data = {
      selectedTopicId: selectedTopicId || null,
      expandedTopics: expandedTopics || {},
      updatedAt: Date.now(),
    };
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Quota fallback
  }
}

/**
 * Retrieve Topics Page navigation state
 */
export function getTopicsPageNav(userId) {
  if (!isClient()) return { selectedTopicId: null, expandedTopics: {} };
  try {
    const uid = getSafeUserId(userId);
    const key = `${STORAGE_PREFIX}_topics_page_${uid}`;
    const raw = window.localStorage.getItem(key);
    if (!raw) return { selectedTopicId: null, expandedTopics: {} };
    const parsed = JSON.parse(raw);
    return {
      selectedTopicId: parsed.selectedTopicId || null,
      expandedTopics: parsed.expandedTopics || {},
    };
  } catch {
    return { selectedTopicId: null, expandedTopics: {} };
  }
}

