/**
 * Utility to calculate dynamic hierarchical numbering for document headings and subheadings.
 *
 * Rules:
 * - Headings (H1) are numbered sequentially: 1, 2, 3...
 * - Subheadings (H2) are numbered under their preceding parent heading: 1.1, 1.2, 2.1...
 * - If a subheading appears before any H1, it gracefully falls back to parent 1: 1.1, 1.2...
 * - Numbering is purely dynamic and is NEVER stored in block content.
 *
 * @param {Array} blocks - Array of note block objects
 * @returns {Map<string, string>} Map of blockId -> formatted number string (e.g. "1", "1.1")
 */
export function calculateBlockNumbers(blocks = []) {
  const numberMap = new Map();
  let h1Count = 0;
  let h2Count = 0;

  for (const block of blocks) {
    if (!block || !block.id) continue;

    if (block.block_type === 'heading') {
      h1Count += 1;
      h2Count = 0; // reset subheadings counter for the new heading
      numberMap.set(block.id, `${h1Count}`);
    } else if (block.block_type === 'subheading') {
      h2Count += 1;
      const parentNum = h1Count > 0 ? h1Count : 1;
      numberMap.set(block.id, `${parentNum}.${h2Count}`);
    }
  }

  return numberMap;
}

/**
 * Extracts hierarchical table of contents items from document blocks.
 *
 * @param {Array} blocks - Array of note block objects
 * @returns {Array<{ id: string, anchorId: string, type: string, number: string, text: string, level: number }>}
 */
export function generateTableOfContents(blocks = []) {
  const numberMap = calculateBlockNumbers(blocks);
  const items = [];

  for (const block of blocks) {
    if (!block || !block.id) continue;
    if (block.block_type === 'heading' || block.block_type === 'subheading') {
      const number = numberMap.get(block.id) || '';
      const text = (block.content?.text || '').trim();
      items.push({
        id: block.id,
        anchorId: `block-${block.id}`,
        type: block.block_type,
        number,
        text,
        level: block.block_type === 'heading' ? 1 : 2,
      });
    }
  }

  return items;
}
