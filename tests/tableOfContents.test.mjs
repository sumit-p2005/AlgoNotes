import { describe, it } from 'node:test';
import assert from 'node:assert';
import { generateTableOfContents } from '../lib/utils/noteNumbering.js';

describe('Table of Contents Generator', () => {
  it('returns empty array when there are no blocks or no headings', () => {
    assert.deepStrictEqual(generateTableOfContents([]), []);
    assert.deepStrictEqual(
      generateTableOfContents([
        { id: '1', block_type: 'text', content: { text: 'Paragraph' } },
        { id: '2', block_type: 'code', content: { code: 'int x = 1;' } },
      ]),
      []
    );
  });

  it('generates sequential headings with 1, 2, 3 and anchors', () => {
    const blocks = [
      { id: 'h-1', block_type: 'heading', content: { text: 'Introduction' } },
      { id: 't-1', block_type: 'text', content: { text: 'Some text' } },
      { id: 'h-2', block_type: 'heading', content: { text: 'Algorithms' } },
    ];

    const toc = generateTableOfContents(blocks);
    assert.strictEqual(toc.length, 2);
    assert.strictEqual(toc[0].id, 'h-1');
    assert.strictEqual(toc[0].anchorId, 'block-h-1');
    assert.strictEqual(toc[0].number, '1');
    assert.strictEqual(toc[0].text, 'Introduction');
    assert.strictEqual(toc[0].level, 1);

    assert.strictEqual(toc[1].id, 'h-2');
    assert.strictEqual(toc[1].anchorId, 'block-h-2');
    assert.strictEqual(toc[1].number, '2');
    assert.strictEqual(toc[1].text, 'Algorithms');
    assert.strictEqual(toc[1].level, 1);
  });

  it('generates nested subheadings with 1.1, 1.2, 2.1 and anchors', () => {
    const blocks = [
      { id: 'h-1', block_type: 'heading', content: { text: 'Sorting' } },
      { id: 's-1', block_type: 'subheading', content: { text: 'Bubble Sort' } },
      { id: 's-2', block_type: 'subheading', content: { text: 'Merge Sort' } },
      { id: 'h-2', block_type: 'heading', content: { text: 'Searching' } },
      { id: 's-3', block_type: 'subheading', content: { text: 'Binary Search' } },
    ];

    const toc = generateTableOfContents(blocks);
    assert.strictEqual(toc.length, 5);
    assert.strictEqual(toc[0].number, '1');
    assert.strictEqual(toc[1].number, '1.1');
    assert.strictEqual(toc[1].text, 'Bubble Sort');
    assert.strictEqual(toc[1].anchorId, 'block-s-1');
    assert.strictEqual(toc[1].level, 2);

    assert.strictEqual(toc[2].number, '1.2');
    assert.strictEqual(toc[2].text, 'Merge Sort');

    assert.strictEqual(toc[3].number, '2');
    assert.strictEqual(toc[3].text, 'Searching');

    assert.strictEqual(toc[4].number, '2.1');
    assert.strictEqual(toc[4].text, 'Binary Search');
  });

  it('handles reordering dynamically', () => {
    const blocks = [
      { id: 'h-2', block_type: 'heading', content: { text: 'Searching' } },
      { id: 'h-1', block_type: 'heading', content: { text: 'Sorting' } },
    ];

    const toc = generateTableOfContents(blocks);
    assert.strictEqual(toc[0].id, 'h-2');
    assert.strictEqual(toc[0].number, '1');
    assert.strictEqual(toc[1].id, 'h-1');
    assert.strictEqual(toc[1].number, '2');
  });

  it('handles empty heading text gracefully', () => {
    const blocks = [
      { id: 'h-1', block_type: 'heading', content: { text: '' } },
      { id: 's-1', block_type: 'subheading', content: { text: '   ' } },
    ];

    const toc = generateTableOfContents(blocks);
    assert.strictEqual(toc.length, 2);
    assert.strictEqual(toc[0].text, '');
    assert.strictEqual(toc[1].text, '');
  });
});
