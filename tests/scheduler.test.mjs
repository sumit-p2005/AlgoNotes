import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateNextReview,
  initializeSchedule,
  categorizeReviews,
  RECALL_RATINGS,
  DEFAULT_STAGES,
} from '../lib/revision/scheduler.js';

test('Revision Scheduler - Initial schedule setup', () => {
  const base = new Date('2026-10-30T10:00:00Z');
  const schedule = initializeSchedule(base);
  assert.equal(schedule.stage, 0);
  assert.equal(schedule.reviewCount, 0);
  
  // Next review should be 1 day later (Day 1)
  const expectedNext = new Date('2026-10-31T10:00:00Z');
  assert.equal(schedule.nextReviewAt.toISOString(), expectedNext.toISOString());
});

test('Revision Scheduler - Forgot rating resets to stage 0 and 1 day interval', () => {
  const now = new Date('2026-10-30T10:00:00Z');
  const result = calculateNextReview({
    rating: RECALL_RATINGS.FORGOT,
    currentStage: 2,
    nowDate: now,
  });

  assert.equal(result.nextStage, 0);
  assert.equal(result.intervalDays, 1);
  assert.equal(result.nextReviewAt.toISOString(), '2026-10-31T10:00:00.000Z');
});

test('Revision Scheduler - Difficult rating keeps stage and gives 3 day interval', () => {
  const now = new Date('2026-10-30T10:00:00Z');
  const result = calculateNextReview({
    rating: RECALL_RATINGS.DIFFICULT,
    currentStage: 1,
    nowDate: now,
  });

  assert.equal(result.nextStage, 1);
  assert.equal(result.intervalDays, 3);
  assert.equal(result.nextReviewAt.toISOString(), '2026-11-02T10:00:00.000Z');
});

test('Revision Scheduler - Good rating advances stage and applies standard intervals', () => {
  const now = new Date('2026-10-30T10:00:00Z');
  
  // Stage 0 -> Stage 1 (interval 7 days)
  const res1 = calculateNextReview({
    rating: RECALL_RATINGS.GOOD,
    currentStage: 0,
    nowDate: now,
  });
  assert.equal(res1.nextStage, 1);
  assert.equal(res1.intervalDays, 7);
  assert.equal(res1.nextReviewAt.toISOString(), '2026-11-06T10:00:00.000Z');

  // Stage 1 -> Stage 2 (interval 21 days)
  const res2 = calculateNextReview({
    rating: RECALL_RATINGS.GOOD,
    currentStage: 1,
    nowDate: now,
  });
  assert.equal(res2.nextStage, 2);
  assert.equal(res2.intervalDays, 21);

  // Stage 2 -> Stage 3 (interval 45 days)
  const res3 = calculateNextReview({
    rating: RECALL_RATINGS.GOOD,
    currentStage: 2,
    nowDate: now,
  });
  assert.equal(res3.nextStage, 3);
  assert.equal(res3.intervalDays, 45);
});

test('Revision Scheduler - Easy rating accelerates progression', () => {
  const now = new Date('2026-10-30T10:00:00Z');
  
  // Stage 0 -> Stage 2 (jump 2 stages to day 21)
  const res = calculateNextReview({
    rating: RECALL_RATINGS.EASY,
    currentStage: 0,
    nowDate: now,
  });
  assert.equal(res.nextStage, 2);
  assert.equal(res.intervalDays, 21);
});

test('Revision Scheduler - Categorize Due, Overdue, and Upcoming accurately', () => {
  const ref = new Date('2026-10-30T12:00:00Z');
  const items = [
    { id: '1', next_review_at: '2026-10-28T12:00:00Z' }, // overdue
    { id: '2', next_review_at: '2026-10-30T09:00:00Z' }, // due today
    { id: '3', next_review_at: '2026-11-05T12:00:00Z' }, // upcoming
  ];

  const categorized = categorizeReviews(items, ref);
  assert.equal(categorized.overdue.length, 1);
  assert.equal(categorized.overdue[0].id, '1');
  assert.equal(categorized.dueToday.length, 1);
  assert.equal(categorized.dueToday[0].id, '2');
  assert.equal(categorized.upcoming.length, 1);
  assert.equal(categorized.upcoming[0].id, '3');
  assert.equal(categorized.totalActionable, 2);
});
