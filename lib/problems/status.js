/**
 * Problem Status Management for AlgoNotes
 * Canonical 4-state lifecycle: 'Not started', 'Attempted', 'Solved', 'Needs revision'
 */

export const STATUS_CANONICAL = {
  NOT_STARTED: 'Not started',
  ATTEMPTED: 'Attempted',
  SOLVED: 'Solved',
  NEEDS_REVISION: 'Needs revision',
};

export const STATUS_OPTIONS = [
  {
    id: 'Not started',
    label: 'Not Started',
    iconName: 'Circle',
    iconClass: 'text-muted',
    dotClass: 'bg-muted',
    badgeClass:
      'bg-elevated text-secondary border-border hover:border-muted/50',
    description: 'Unstarted problem note',
  },
  {
    id: 'Attempted',
    label: 'Attempted',
    iconName: 'Clock',
    iconClass: 'text-blue-500',
    dotClass: 'bg-blue-500',
    badgeClass:
      'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 hover:border-blue-500/50',
    description: 'Work in progress or partial solution',
  },
  {
    id: 'Solved',
    label: 'Solved',
    iconName: 'CheckCircle2',
    iconClass: 'text-emerald-500',
    dotClass: 'bg-emerald-500',
    badgeClass:
      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:border-emerald-500/50',
    description: 'Accepted solution written and understood',
  },
  {
    id: 'Needs revision',
    label: 'Needs Revision',
    iconName: 'RotateCcw',
    iconClass: 'text-amber-500',
    dotClass: 'bg-amber-500',
    badgeClass:
      'bg-accent-subtle/80 text-amber-700 dark:text-amber-400 border-accent-border/50 hover:border-accent-border',
    description: 'Flagged to revisit concepts or re-solve',
  },
];

/**
 * Normalizes legacy, null, or case-variant status strings into one of the 4 canonical states.
 * 
 * @param {string|null|undefined} raw
 * @returns {'Not started' | 'Attempted' | 'Solved' | 'Needs revision'}
 */
export function normalizeStatus(raw) {
  if (!raw) return 'Not started';
  const str = String(raw).trim().toLowerCase();
  if (str === 'solved') return 'Solved';
  if (str === 'attempted') return 'Attempted';
  if (str === 'needs revision' || str === 'needs_revision') return 'Needs revision';
  if (str === 'not started' || str === 'not_started' || str === 'saved') return 'Not started';
  return 'Not started';
}

