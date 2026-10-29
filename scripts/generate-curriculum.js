const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function deterministicUUID(namespace, name) {
  const hash = crypto.createHash('sha1').update(namespace + ':::' + name).digest('hex');
  // Format as UUID v5
  const part1 = hash.substring(0, 8);
  const part2 = hash.substring(8, 12);
  const part3 = '5' + hash.substring(13, 16); // version 5
  const part4 = ((parseInt(hash.substring(16, 18), 16) & 0x3f) | 0x80).toString(16).padStart(2, '0') + hash.substring(18, 20); // variant RFC 4122
  const part5 = hash.substring(20, 32);
  return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}

const SHEET_NS = 'c7e8e58a-3652-4f67-89df-15582e0e0a51';
const SHEET_ID = deterministicUUID(SHEET_NS, 'striver-a2z');

// Read Kotlin curriculum
const ktContent = fs.readFileSync('C:/Users/sumit/OneDrive/Desktop/StudentOS/app/src/main/java/com/studentos/data/local/StriverSheetData.kt', 'utf8');

// 1. Parse Topics
const topicRegex = /DSATopicEntity\((\d+),\s*"([^"]+)",\s*(\d+),\s*(\d+)/g;
const topics = [];
let tm;
while ((tm = topicRegex.exec(ktContent)) !== null) {
  const stepNum = parseInt(tm[1]);
  const title = tm[2];
  const order = parseInt(tm[3]);
  const expectedTotal = parseInt(tm[4]);
  const topicId = deterministicUUID(SHEET_ID, `topic_${stepNum}`);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  topics.push({
    id: topicId,
    sheet_id: SHEET_ID,
    step_number: stepNum,
    title,
    slug,
    order_index: order,
    expected_problems: expectedTotal
  });
}

// 2. Parse Problems & Sections
const probRegex = /p\(\s*(\d+)\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"(?:\s*,\s*"([^"]+)")?(?:\s*,\s*"([^"]*)")?\s*\)/g;
const sectionsMap = new Map();
const problems = [];

let pm;
let probNum = 1;

while ((pm = probRegex.exec(ktContent)) !== null) {
  const stepNum = parseInt(pm[1]);
  const sectionTitle = pm[2].trim();
  const title = pm[3].trim();
  const difficulty = pm[4] ? pm[4].trim() : 'Easy';
  const url = pm[5] ? pm[5].trim() : '';

  const topic = topics.find(t => t.step_number === stepNum);
  if (!topic) continue;

  const sectionKey = `${topic.id}:::${sectionTitle}`;
  if (!sectionsMap.has(sectionKey)) {
    const secOrder = sectionsMap.size + 1;
    const secId = deterministicUUID(topic.id, `section_${sectionTitle}`);
    const secSlug = sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    sectionsMap.set(sectionKey, {
      id: secId,
      topic_id: topic.id,
      title: sectionTitle,
      slug: secSlug,
      order_index: secOrder,
      problem_count: 0
    });
  }
  const section = sectionsMap.get(sectionKey);
  section.problem_count++;

  const probId = deterministicUUID(SHEET_ID, `problem_${probNum}`);
  problems.push({
    id: probId,
    sheet_id: SHEET_ID,
    topic_id: topic.id,
    section_id: section.id,
    problem_number: probNum,
    title,
    difficulty,
    external_url: url,
    order_index: probNum
  });
  probNum++;
}

const sections = Array.from(sectionsMap.values());

const sheetData = {
  sheet: {
    id: SHEET_ID,
    slug: 'striver-a2z',
    title: 'Striver A2Z DSA Sheet',
    description: 'Comprehensive step-by-step Data Structures & Algorithms learning path from basics to advanced topics.',
    total_topics: topics.length,
    total_sections: sections.length,
    total_problems: problems.length,
    is_published: true
  },
  topics,
  sections,
  problems
};

// Write JSON export for fast client & server access
const outDir = path.join(__dirname, '..', 'lib', 'curriculum');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.join(outDir, 'striver-a2z.json'), JSON.stringify(sheetData, null, 2), 'utf8');

// Also write idempotent SQL seed file
let sql = `-- Idempotent Seed for Striver A2Z DSA Sheet\n`;
sql += `INSERT INTO public.curriculum_sheets (id, slug, title, description, total_topics, total_sections, total_problems, is_published)\nVALUES ('${sheetData.sheet.id}', '${sheetData.sheet.slug}', '${sheetData.sheet.title.replace(/'/g, "''")}', '${sheetData.sheet.description.replace(/'/g, "''")}', ${sheetData.sheet.total_topics}, ${sheetData.sheet.total_sections}, ${sheetData.sheet.total_problems}, true)\nON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;\n\n`;

for (const t of topics) {
  sql += `INSERT INTO public.curriculum_topics (id, sheet_id, step_number, title, slug, order_index, expected_problems)\nVALUES ('${t.id}', '${t.sheet_id}', ${t.step_number}, '${t.title.replace(/'/g, "''")}', '${t.slug}', ${t.order_index}, ${t.expected_problems})\nON CONFLICT (sheet_id, step_number) DO UPDATE SET title = EXCLUDED.title, order_index = EXCLUDED.order_index;\n`;
}
sql += `\n`;

for (const s of sections) {
  sql += `INSERT INTO public.curriculum_sections (id, topic_id, title, slug, order_index, problem_count)\nVALUES ('${s.id}', '${s.topic_id}', '${s.title.replace(/'/g, "''")}', '${s.slug}', ${s.order_index}, ${s.problem_count})\nON CONFLICT (topic_id, title) DO UPDATE SET order_index = EXCLUDED.order_index, problem_count = EXCLUDED.problem_count;\n`;
}
sql += `\n`;

for (const p of problems) {
  sql += `INSERT INTO public.curriculum_problems (id, sheet_id, topic_id, section_id, problem_number, title, difficulty, external_url, order_index)\nVALUES ('${p.id}', '${p.sheet_id}', '${p.topic_id}', '${p.section_id}', ${p.problem_number}, '${p.title.replace(/'/g, "''")}', '${p.difficulty}', '${p.external_url.replace(/'/g, "''")}', ${p.order_index})\nON CONFLICT (sheet_id, problem_number) DO UPDATE SET title = EXCLUDED.title, difficulty = EXCLUDED.difficulty, external_url = EXCLUDED.external_url;\n`;
}

fs.writeFileSync(path.join(__dirname, '..', 'supabase', 'migrations', '003_seed_striver_curriculum.sql'), sql, 'utf8');

console.log('Seed generated successfully:');
console.log(`- Sheet ID: ${SHEET_ID}`);
console.log(`- Topics: ${topics.length}`);
console.log(`- Sections: ${sections.length}`);
console.log(`- Problems: ${problems.length}`);
console.log(`- JSON written to lib/curriculum/striver-a2z.json`);
console.log(`- SQL written to supabase/migrations/003_seed_striver_curriculum.sql`);
