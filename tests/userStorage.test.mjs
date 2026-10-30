import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import {
  saveCurriculumNav,
  getCurriculumNav,
  saveTopicTreeNav,
  getTopicTreeNav,
  saveTopicsPageNav,
  getTopicsPageNav,
} from '../lib/utils/userStorage.js';

describe('User-isolated Navigation Storage', () => {
  // Mock localStorage in Node test environment
  const store = new Map();
  globalThis.window = {
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
      clear: () => store.clear(),
    },
  };

  beforeEach(() => {
    store.clear();
  });

  test('Curriculum nav - saves and restores last step and problem for user', () => {
    saveCurriculumNav('user-123', {
      lastStepId: 'step-7-recursion',
      lastProblemId: 'prob-45-subset-sums',
      expandedSteps: ['step-7-recursion'],
    });

    const nav = getCurriculumNav('user-123');
    assert.strictEqual(nav.lastStepId, 'step-7-recursion');
    assert.strictEqual(nav.lastProblemId, 'prob-45-subset-sums');
    assert.deepStrictEqual(nav.expandedSteps, ['step-7-recursion']);

    // Isolated from another user
    const otherNav = getCurriculumNav('user-999');
    assert.strictEqual(otherNav.lastStepId, null);
  });

  test('Topic Tree nav - saves and restores expanded folders per user', () => {
    saveTopicTreeNav('user-abc', {
      lastTopicId: 'graphs',
      lastSubtopicId: 'bfs-dfs',
      lastProblemId: 'clone-graph',
      expandedFolders: { graphs: true, 'graphs:bfs-dfs': true },
    });

    const treeNav = getTopicTreeNav('user-abc');
    assert.strictEqual(treeNav.lastTopicId, 'graphs');
    assert.strictEqual(treeNav.lastSubtopicId, 'bfs-dfs');
    assert.strictEqual(treeNav.lastProblemId, 'clone-graph');
    assert.strictEqual(treeNav.expandedFolders['graphs'], true);
  });

  test('Topics Page nav - restores selected topic and expanded map', () => {
    saveTopicsPageNav('user-456', {
      selectedTopicId: 'dynamic-programming',
      expandedTopics: { dp: true },
    });

    const res = getTopicsPageNav('user-456');
    assert.strictEqual(res.selectedTopicId, 'dynamic-programming');
    assert.strictEqual(res.expandedTopics['dp'], true);
  });
});

