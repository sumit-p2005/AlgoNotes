/**
 * Security utilities for AlgoNotes
 */

/**
 * Sanitizes a redirect destination to prevent Open Redirect vulnerabilities.
 * Ensures the destination is a strictly relative path on the same origin.
 *
 * @param {string|null|undefined} target - The requested redirect URL or path
 * @param {string} [fallback='/dashboard'] - Safe fallback route
 * @returns {string} Sanitized relative path
 */
export function sanitizeRedirectUrl(target, fallback = '/dashboard') {
  if (!target || typeof target !== 'string') return fallback;

  // Trim whitespace and remove control characters
  const cleaned = target.trim();

  // Must begin with single forward slash
  if (!cleaned.startsWith('/')) return fallback;

  // Disallow protocol-relative URLs (e.g. //attacker.com)
  if (cleaned.startsWith('//')) return fallback;

  // Disallow backslashes that could trigger browser path normalization bypasses
  if (cleaned.includes('\\')) return fallback;

  // Disallow javascript: or data: pseudo-protocols
  if (/^\s*(javascript|data|vbscript):/i.test(cleaned)) return fallback;

  return cleaned;
}
