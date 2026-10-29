/**
 * Spaced Repetition Revision Engine for AlgoNotes
 * Configurable, deterministic scheduling based on active recall ratings.
 */

export const RECALL_RATINGS = {
  FORGOT: 'Forgot',
  DIFFICULT: 'Difficult',
  GOOD: 'Good',
  EASY: 'Easy',
};

// Default interval stages in days
export const DEFAULT_STAGES = [1, 7, 21, 45];
export const EXTENDED_STAGE_DAYS = 90; // Once mastered past stage 3 (Day 45)

/**
 * Calculates the next review date and stage based on the user's recall rating.
 * 
 * @param {Object} params
 * @param {string} params.rating - 'Forgot' | 'Difficult' | 'Good' | 'Easy'
 * @param {number} params.currentStage - Current review stage index (0, 1, 2, 3...)
 * @param {Date|string|number} [params.nowDate] - Reference date for review (defaults to new Date())
 * @param {number[]} [params.customStages] - Optional custom stage intervals
 * @returns {{ nextReviewAt: Date, nextStage: number, intervalDays: number }}
 */
export function calculateNextReview({
  rating,
  currentStage = 0,
  nowDate = new Date(),
  customStages = DEFAULT_STAGES,
}) {
  const baseDate = new Date(nowDate);
  const stages = customStages && customStages.length > 0 ? customStages : DEFAULT_STAGES;

  let nextStage = currentStage;
  let intervalDays = 1;

  switch (rating) {
    case RECALL_RATINGS.FORGOT:
      // Reset back to stage 0, review again in 1 day
      nextStage = 0;
      intervalDays = 1;
      break;

    case RECALL_RATINGS.DIFFICULT:
      // Keep same stage or advance slightly, review in 3 days
      nextStage = Math.max(0, currentStage);
      intervalDays = 3;
      break;

    case RECALL_RATINGS.GOOD:
      // Normal progression to next stage
      if (currentStage < stages.length - 1) {
        nextStage = currentStage + 1;
        intervalDays = stages[nextStage];
      } else {
        // Already at or past stage 45, push further
        nextStage = currentStage + 1;
        intervalDays = EXTENDED_STAGE_DAYS;
      }
      break;

    case RECALL_RATINGS.EASY:
      // Accelerated progression (+2 stages if possible, or straight to extended)
      if (currentStage + 2 < stages.length) {
        nextStage = currentStage + 2;
        intervalDays = stages[nextStage];
      } else {
        nextStage = stages.length;
        intervalDays = EXTENDED_STAGE_DAYS;
      }
      break;

    default:
      // Fallback safe default
      intervalDays = 1;
      nextStage = 0;
      break;
  }

  // Calculate exact UTC timestamp
  const nextReviewAt = new Date(baseDate.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  return {
    nextReviewAt,
    nextStage,
    intervalDays,
  };
}

/**
 * Initializes a new review schedule when a problem is first marked as learned.
 *
 * @param {Date|string} [learningDate]
 * @param {number[]} [customStages]
 * @returns {{ stage: number, learningDate: Date, nextReviewAt: Date, reviewCount: number }}
 */
export function initializeSchedule(learningDate = new Date(), customStages = DEFAULT_STAGES) {
  const baseDate = new Date(learningDate);
  const stages = customStages && customStages.length > 0 ? customStages : DEFAULT_STAGES;
  const initialDays = stages[0] || 1;

  const nextReviewAt = new Date(baseDate.getTime() + initialDays * 24 * 60 * 60 * 1000);

  return {
    stage: 0,
    learningDate: baseDate,
    nextReviewAt,
    reviewCount: 0,
  };
}

/**
 * Categorizes a list of review schedules into Due Today, Overdue, and Upcoming.
 *
 * @param {Array} schedules
 * @param {Date} [referenceDate]
 */
export function categorizeReviews(schedules = [], referenceDate = new Date()) {
  const ref = new Date(referenceDate);
  const startOfToday = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate(), 0, 0, 0, 0);
  const endOfToday = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate(), 23, 59, 59, 999);

  const overdue = [];
  const dueToday = [];
  const upcoming = [];

  for (const item of schedules) {
    const nextDate = new Date(item.next_review_at);
    if (isNaN(nextDate.getTime())) continue;

    if (nextDate < startOfToday) {
      overdue.push(item);
    } else if (nextDate >= startOfToday && nextDate <= endOfToday) {
      dueToday.push(item);
    } else {
      upcoming.push(item);
    }
  }

  return {
    overdue,
    dueToday,
    upcoming,
    totalActionable: overdue.length + dueToday.length,
  };
}
