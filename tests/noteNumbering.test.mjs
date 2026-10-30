import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBlockNumbers } from '../lib/utils/noteNumbering.js';

test('Note Numbering - Sequential headings are numbered 1, 2, 3', () => {
  const blocks = [
    { id: 'h1', block_type: 'heading', content: { text: 'Introduction' } },
    { id: 't1', block_type: 'text', content: { text: 'Paragraph one' } },
    { id: 'h2', block_type: 'heading', content: { text: 'Sorting Algorithms' } },
    { id: 'h3', block_type: 'heading', content: { text: 'Searching Algorithms' } },
  ];

  const numbers = calculateBlockNumbers(blocks);
  assert.equal(numbers.get('h1'), '1');
  assert.equal(numbers.get('h2'), '2');
  assert.equal(numbers.get('h3'), '3');
  assert.equal(numbers.has('t1'), false, 'Text blocks must not receive heading numbers');
});

test('Note Numbering - Subheadings are numbered under parent heading (1.1, 1.2, 2.1)', () => {
  const blocks = [
    { id: 'h1', block_type: 'heading', content: { text: 'Introduction' } },
    { id: 's1', block_type: 'subheading', content: { text: 'Overview' } },
    { id: 's2', block_type: 'subheading', content: { text: 'Basic Concepts' } },
    { id: 'h2', block_type: 'heading', content: { text: 'Sorting Algorithms' } },
    { id: 's3', block_type: 'subheading', content: { text: 'Bubble Sort' } },
    { id: 's4', block_type: 'subheading', content: { text: 'Selection Sort' } },
    { id: 's5', block_type: 'subheading', content: { text: 'Merge Sort' } },
    { id: 'h3', block_type: 'heading', content: { text: 'Searching Algorithms' } },
    { id: 's6', block_type: 'subheading', content: { text: 'Linear Search' } },
    { id: 's7', block_type: 'subheading', content: { text: 'Binary Search' } },
  ];

  const numbers = calculateBlockNumbers(blocks);
  assert.equal(numbers.get('h1'), '1');
  assert.equal(numbers.get('s1'), '1.1');
  assert.equal(numbers.get('s2'), '1.2');
  assert.equal(numbers.get('h2'), '2');
  assert.equal(numbers.get('s3'), '2.1');
  assert.equal(numbers.get('s4'), '2.2');
  assert.equal(numbers.get('s5'), '2.3');
  assert.equal(numbers.get('h3'), '3');
  assert.equal(numbers.get('s6'), '3.1');
  assert.equal(numbers.get('s7'), '3.2');
});

test('Note Numbering - Deleting a heading dynamically reindexes remaining headings and subheadings', () => {
  const blocks = [
    // Originally h1: Introduction with s1: Overview
    { id: 'h2', block_type: 'heading', content: { text: 'Sorting Algorithms' } },
    { id: 's3', block_type: 'subheading', content: { text: 'Bubble Sort' } },
    { id: 's4', block_type: 'subheading', content: { text: 'Merge Sort' } },
  ];

  const numbers = calculateBlockNumbers(blocks);
  assert.equal(numbers.get('h2'), '1', 'Former second heading must become #1');
  assert.equal(numbers.get('s3'), '1.1');
  assert.equal(numbers.get('s4'), '1.2');
});

test('Note Numbering - Reordering headings and subheadings recalculates positions', () => {
  const blocks = [
    { id: 'h-sorting', block_type: 'heading', content: { text: 'Sorting' } },
    { id: 'sub-merge', block_type: 'subheading', content: { text: 'Merge Sort' } },
    { id: 'h-intro', block_type: 'heading', content: { text: 'Introduction' } },
    { id: 'sub-overview', block_type: 'subheading', content: { text: 'Overview' } },
  ];

  const numbers = calculateBlockNumbers(blocks);
  assert.equal(numbers.get('h-sorting'), '1');
  assert.equal(numbers.get('sub-merge'), '1.1');
  assert.equal(numbers.get('h-intro'), '2');
  assert.equal(numbers.get('sub-overview'), '2.1');
});

test('Note Numbering - Subheadings before any H1 gracefully fall back to parent 1', () => {
  const blocks = [
    { id: 'orphan-sub', block_type: 'subheading', content: { text: 'Preliminaries' } },
    { id: 'h1', block_type: 'heading', content: { text: 'Main Content' } },
    { id: 'sub1', block_type: 'subheading', content: { text: 'Details' } },
  ];

  const numbers = calculateBlockNumbers(blocks);
  assert.equal(numbers.get('orphan-sub'), '1.1');
  assert.equal(numbers.get('h1'), '1');
  assert.equal(numbers.get('sub1'), '1.1');
});

test('Note Numbering - Does not modify or mutate user content text', () => {
  const blocks = [
    { id: 'h1', block_type: 'heading', content: { text: 'Dynamic Programming' } },
  ];

  calculateBlockNumbers(blocks);
  assert.equal(blocks[0].content.text, 'Dynamic Programming', 'Content text must remain un-mutated');
});
