import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateStreak, calculateWeekActivity } from '../lib/revision/activity.js';

test('Study Streak - Empty activity records returns 0 days', () => {
  assert.equal(calculateStreak([]), 0);
  assert.equal(calculateStreak(null), 0);
  assert.equal(calculateStreak(undefined), 0);
});

test('Study Streak - Activity only 3 days ago returns 0 (broken streak)', () => {
  const ref = new Date('2026-10-30T12:00:00Z');
  const activity = ['2026-10-27T10:00:00Z'];
  assert.equal(calculateStreak(activity, ref), 0);
});

test('Study Streak - Activity today returns at least 1 day streak', () => {
  const ref = new Date('2026-10-30T12:00:00Z');
  const activity = ['2026-10-30T09:00:00Z'];
  assert.equal(calculateStreak(activity, ref), 1);
});

test('Study Streak - Activity yesterday but not yet today retains active streak', () => {
  const ref = new Date('2026-10-30T12:00:00Z');
  const activity = ['2026-10-29T18:00:00Z'];
  assert.equal(calculateStreak(activity, ref), 1);
});

test('Study Streak - Multi-day continuous streak calculation', () => {
  const ref = new Date('2026-10-30T12:00:00Z');
  const activity = [
    '2026-10-30T10:00:00Z',
    '2026-10-29T14:30:00Z',
    '2026-10-28T19:00:00Z',
    '2026-10-27T08:15:00Z',
    '2026-10-25T11:00:00Z', // gap on 26th
  ];
  // Active continuous streak is 4 days (30, 29, 28, 27)
  assert.equal(calculateStreak(activity, ref), 4);
});

test('Week Activity - Accurately highlights active days of the week', () => {
  // Friday Oct 30, 2026
  const ref = new Date('2026-10-30T12:00:00Z');
  const activity = [
    '2026-10-26T10:00:00Z', // Monday
    '2026-10-30T09:00:00Z', // Friday (today)
  ];

  const week = calculateWeekActivity(activity, ref);
  assert.equal(week.length, 7);

  // Sunday (index 0) = not active
  assert.equal(week[0].isActive, false);
  // Monday (index 1) = active
  assert.equal(week[1].isActive, true);
  // Tuesday (index 2) = not active
  assert.equal(week[2].isActive, false);
  // Friday (index 5) = active and isToday
  assert.equal(week[5].isActive, true);
  assert.equal(week[5].isToday, true);
});

