import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeStatus, STATUS_OPTIONS } from '../lib/problems/status.js';

test('Problem Status - Canonical 4 options exist with required metadata', () => {
  assert.equal(STATUS_OPTIONS.length, 4);
  const ids = STATUS_OPTIONS.map((o) => o.id);
  assert.deepEqual(ids, ['Not started', 'Attempted', 'Solved', 'Needs revision']);

  STATUS_OPTIONS.forEach((opt) => {
    assert.ok(opt.label, 'Option must have a readable label');
    assert.ok(opt.iconName, 'Option must have an icon reference');
    assert.ok(opt.badgeClass, 'Option must have styling classes');
    assert.ok(opt.description, 'Option must have explanatory description');
  });
});

test('Problem Status - normalizeStatus normalizes mixed-case and legacy statuses', () => {
  // Solved
  assert.equal(normalizeStatus('Solved'), 'Solved');
  assert.equal(normalizeStatus('solved'), 'Solved');
  assert.equal(normalizeStatus('SOLVED'), 'Solved');

  // Attempted
  assert.equal(normalizeStatus('Attempted'), 'Attempted');
  assert.equal(normalizeStatus('attempted'), 'Attempted');

  // Needs revision
  assert.equal(normalizeStatus('Needs revision'), 'Needs revision');
  assert.equal(normalizeStatus('needs revision'), 'Needs revision');
  assert.equal(normalizeStatus('needs_revision'), 'Needs revision');

  // Not started & Legacy 'Saved'
  assert.equal(normalizeStatus('Not started'), 'Not started');
  assert.equal(normalizeStatus('not started'), 'Not started');
  assert.equal(normalizeStatus('not_started'), 'Not started');
  assert.equal(normalizeStatus('Saved'), 'Not started');
  assert.equal(normalizeStatus('saved'), 'Not started');
  assert.equal(normalizeStatus(''), 'Not started');
  assert.equal(normalizeStatus(null), 'Not started');
  assert.equal(normalizeStatus(undefined), 'Not started');
});

test('Problem Status - Distinction between Solved and Revised', () => {
  // Solved status represents completion, distinct from active recall revision
  const solvedStatus = normalizeStatus('Solved');
  const needsRevisionStatus = normalizeStatus('Needs revision');

  assert.notEqual(solvedStatus, needsRevisionStatus);
  assert.equal(solvedStatus, 'Solved');
  assert.equal(needsRevisionStatus, 'Needs revision');
});
