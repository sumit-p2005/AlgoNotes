/**
 * Activity & Study Streak Calculation Utility
 * Pure, deterministic functions based strictly on genuine user activity records.
 */

/**
 * Calculates current consecutive study streak from genuine activity timestamps.
 * If user has no activity today or yesterday, streak is 0.
 *
 * @param {string[]|Date[]} activityDates - Array of activity timestamps
 * @param {Date|string} [referenceDate=new Date()] - Reference today date
 * @returns {number} Active streak in days (>= 0)
 */
export function calculateStreak(activityDates = [], referenceDate = new Date()) {
  if (!Array.isArray(activityDates) || activityDates.length === 0) {
    return 0;
  }

  const ref = new Date(referenceDate);
  const todayStr = `${ref.getFullYear()}-${String(ref.getMonth() + 1).padStart(2, '0')}-${String(ref.getDate()).padStart(2, '0')}`;

  const yesterdayDate = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate() - 1, 12, 0, 0);
  const yesterdayStr = `${yesterdayDate.getFullYear()}-${String(yesterdayDate.getMonth() + 1).padStart(2, '0')}-${String(yesterdayDate.getDate()).padStart(2, '0')}`;

  // Extract unique valid YYYY-MM-DD dates
  const daySet = new Set();
  for (const raw of activityDates) {
    if (!raw) continue;
    let dStr = null;
    if (typeof raw === 'string') {
      const match = raw.match(/^\d{4}-\d{2}-\d{2}/);
      if (match) dStr = match[0];
    } else if (raw instanceof Date && !isNaN(raw.getTime())) {
      dStr = `${raw.getFullYear()}-${String(raw.getMonth() + 1).padStart(2, '0')}-${String(raw.getDate()).padStart(2, '0')}`;
    }
    if (dStr) daySet.add(dStr);
  }

  if (daySet.size === 0) return 0;

  const sortedDays = Array.from(daySet).sort().reverse();
  const mostRecent = sortedDays[0];

  // Must have activity today or yesterday to maintain an active streak
  if (mostRecent !== todayStr && mostRecent !== yesterdayStr) {
    return 0;
  }

  let streak = 1;
  const parseLocalDate = (str) => {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d, 12, 0, 0);
  };

  let curr = parseLocalDate(mostRecent);
  for (let i = 1; i < sortedDays.length; i++) {
    const prev = parseLocalDate(sortedDays[i]);
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      streak += 1;
      curr = prev;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Calculates activity status for the 7 days of the current calendar week (Sunday - Saturday).
 *
 * @param {string[]|Date[]} activityDates - Array of activity timestamps
 * @param {Date|string} [referenceDate=new Date()] - Reference date
 * @returns {Array<{ dayName: string, dateStr: string, isActive: boolean, isToday: boolean }>}
 */
export function calculateWeekActivity(activityDates = [], referenceDate = new Date()) {
  const ref = new Date(referenceDate);
  const dayOfWeek = ref.getDay(); // 0 is Sunday, 6 is Saturday

  // Calculate Sunday of current week
  const sunday = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate() - dayOfWeek, 12, 0, 0);

  const activeSet = new Set();
  for (const raw of activityDates || []) {
    if (!raw) continue;
    let dStr = null;
    if (typeof raw === 'string') {
      const match = raw.match(/^\d{4}-\d{2}-\d{2}/);
      if (match) dStr = match[0];
    } else if (raw instanceof Date && !isNaN(raw.getTime())) {
      dStr = `${raw.getFullYear()}-${String(raw.getMonth() + 1).padStart(2, '0')}-${String(raw.getDate()).padStart(2, '0')}`;
    }
    if (dStr) activeSet.add(dStr);
  }

  const todayStr = `${ref.getFullYear()}-${String(ref.getMonth() + 1).padStart(2, '0')}-${String(ref.getDate()).padStart(2, '0')}`;
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + i, 12, 0, 0);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    weekDays.push({
      dayName: dayNames[i],
      dateStr,
      isActive: activeSet.has(dateStr),
      isToday: dateStr === todayStr,
    });
  }

  return weekDays;
}

