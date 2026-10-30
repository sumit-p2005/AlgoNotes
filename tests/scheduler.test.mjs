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

test('Revision Scheduler - Year boundary date crossing calculation', () => {
  const endOfYear = new Date('2026-12-31T12:00:00Z');
  const result = calculateNextReview({
    rating: RECALL_RATINGS.DIFFICULT,
    currentStage: 1,
    nowDate: endOfYear,
  });

  assert.equal(result.intervalDays, 3);
  assert.equal(result.nextReviewAt.toISOString(), '2027-01-03T12:00:00.000Z');
});

test('Revision Scheduler - Leap year February date handling', () => {
  // 2028 is a leap year (Feb 29 exists)
  const feb28Leap = new Date('2028-02-28T12:00:00Z');
  const resultLeap = calculateNextReview({
    rating: RECALL_RATINGS.FORGOT,
    currentStage: 1,
    nowDate: feb28Leap,
  });
  assert.equal(resultLeap.intervalDays, 1);
  assert.equal(resultLeap.nextReviewAt.toISOString(), '2028-02-29T12:00:00.000Z');

  // 2027 is a non-leap year (Feb 28 + 1 day rolls to March 1)
  const feb28NonLeap = new Date('2027-02-28T12:00:00Z');
  const resultNonLeap = calculateNextReview({
    rating: RECALL_RATINGS.FORGOT,
    currentStage: 1,
    nowDate: feb28NonLeap,
  });
  assert.equal(resultNonLeap.intervalDays, 1);
  assert.equal(resultNonLeap.nextReviewAt.toISOString(), '2027-03-01T12:00:00.000Z');
});

test('Revision Scheduler - Categorize Due, Overdue, and Upcoming accurately (including date-only strings)', () => {
  const ref = new Date('2026-10-30T12:00:00Z');
  const items = [
    { id: '1', next_review_at: '2026-10-28T12:00:00Z' }, // overdue timestamp
    { id: '2', next_review_at: '2026-10-30T09:00:00Z' }, // due today timestamp
    { id: '3', next_review_at: '2026-11-05T12:00:00Z' }, // upcoming timestamp
    { id: '4', next_review_date: '2026-10-30' },          // due today date-only string
    { id: '5', next_review_date: '2026-10-25' },          // overdue date-only string
    { id: '6', next_review_date: '2026-11-10' },          // upcoming date-only string
    { id: '7', next_review_at: 'invalid-date' },         // invalid date ignored safely
  ];

  const categorized = categorizeReviews(items, ref);
  assert.equal(categorized.overdue.length, 2);
  assert.deepEqual(categorized.overdue.map((i) => i.id), ['5', '1']); // Sorted oldest first (Oct 25 before Oct 28)
  assert.equal(categorized.dueToday.length, 2);
  assert.deepEqual(categorized.dueToday.map((i) => i.id), ['2', '4']);
  assert.equal(categorized.upcoming.length, 2);
  assert.deepEqual(categorized.upcoming.map((i) => i.id), ['3', '6']);
  assert.equal(categorized.totalActionable, 4);
});

test('Revision Scheduler - Empty list handling', () => {
  const categorized = categorizeReviews([], new Date());
  assert.equal(categorized.overdue.length, 0);
  assert.equal(categorized.dueToday.length, 0);
  assert.equal(categorized.upcoming.length, 0);
  assert.equal(categorized.totalActionable, 0);
  assert.equal(categorized.totalInSystem, 0);
});

test('Revision Scheduler - Case-insensitive recall rating input', () => {
  const now = new Date('2026-10-30T10:00:00Z');
  
  // Lowercase 'forgot'
  const resForgot = calculateNextReview({
    rating: 'forgot',
    currentStage: 2,
    nowDate: now,
  });
  assert.equal(resForgot.nextStage, 0);
  assert.equal(resForgot.displayStage, 1);
  assert.equal(resForgot.intervalDays, 1);

  // Mixed case 'DiffiCULt'
  const resDiff = calculateNextReview({
    rating: 'DiffiCULt',
    currentStage: 1,
    nowDate: now,
  });
  assert.equal(resDiff.nextStage, 1);
  assert.equal(resDiff.displayStage, 2);
  assert.equal(resDiff.intervalDays, 3);

  // Lowercase 'good'
  const resGood = calculateNextReview({
    rating: 'good',
    currentStage: 1,
    nowDate: now,
  });
  assert.equal(resGood.nextStage, 2);
  assert.equal(resGood.displayStage, 3);
  assert.equal(resGood.intervalDays, 21);

  // Uppercase 'EASY'
  const resEasy = calculateNextReview({
    rating: 'EASY',
    currentStage: 0,
    nowDate: now,
  });
  assert.equal(resEasy.nextStage, 2);
  assert.equal(resEasy.displayStage, 3);
  assert.equal(resEasy.intervalDays, 21);
});
