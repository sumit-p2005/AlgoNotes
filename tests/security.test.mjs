import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeRedirectUrl } from '../lib/utils/security.js';

test('Security - sanitizeRedirectUrl allows legitimate relative paths', () => {
  assert.equal(sanitizeRedirectUrl('/dashboard'), '/dashboard');
  assert.equal(sanitizeRedirectUrl('/sheets'), '/sheets');
  assert.equal(sanitizeRedirectUrl('/sheets/striver-a2z'), '/sheets/striver-a2z');
  assert.equal(sanitizeRedirectUrl('/problems/two-sum?tab=code'), '/problems/two-sum?tab=code');
});

test('Security - sanitizeRedirectUrl blocks open redirects to external domains', () => {
  assert.equal(sanitizeRedirectUrl('https://evil.com'), '/dashboard');
  assert.equal(sanitizeRedirectUrl('http://malicious.org/phish'), '/dashboard');
  assert.equal(sanitizeRedirectUrl('//evil.com/login'), '/dashboard');
  assert.equal(sanitizeRedirectUrl('///evil.com'), '/dashboard');
});

test('Security - sanitizeRedirectUrl blocks backslash normalization exploits', () => {
  assert.equal(sanitizeRedirectUrl('/\\evil.com'), '/dashboard');
  assert.equal(sanitizeRedirectUrl('\\evil.com'), '/dashboard');
});

test('Security - sanitizeRedirectUrl blocks pseudo-protocols', () => {
  assert.equal(sanitizeRedirectUrl('javascript:alert(1)'), '/dashboard');
  assert.equal(sanitizeRedirectUrl('data:text/html,<script>alert(1)</script>'), '/dashboard');
});

test('Security - sanitizeRedirectUrl falls back gracefully on empty or non-string inputs', () => {
  assert.equal(sanitizeRedirectUrl(''), '/dashboard');
  assert.equal(sanitizeRedirectUrl(null), '/dashboard');
  assert.equal(sanitizeRedirectUrl(undefined), '/dashboard');
  assert.equal(sanitizeRedirectUrl(null, '/revision'), '/revision');
});
