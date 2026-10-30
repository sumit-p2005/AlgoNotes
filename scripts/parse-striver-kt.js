const fs = require('fs');

const content = fs.readFileSync('C:/Users/sumit/OneDrive/Desktop/StudentOS/app/src/main/java/com/studentos/data/local/StriverSheetData.kt', 'utf8');

// 1. Extract topics
const topicRegex = /DSATopicEntity\((\d+),\s*"([^"]+)",\s*(\d+),\s*(\d+)/g;
const topics = [];
let tm;
while ((tm = topicRegex.exec(content)) !== null) {
  topics.push({
    id: parseInt(tm[1]),
    title: tm[2],
    order: parseInt(tm[3]),
    expectedTotal: parseInt(tm[4])
  });
}

// 2. Extract problems
// Format: p(1, "1.1 Things to Know in a Language (C++/Java/Python)", "User Input / Output", "Easy", "https://...")
// or: p(1, "1.1 Things to Know in a Language (C++/Java/Python)", "User Input / Output", "Easy")
// or: p(1, "1.1 Things to Know in a Language (C++/Java/Python)", "User Input / Output")
const probRegex = /p\(\s*(\d+)\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"(?:\s*,\s*"([^"]+)")?(?:\s*,\s*"([^"]*)")?\s*\)/g;
const problems = [];
const sectionsMap = new Map(); // key: topicId_sectionTitle -> { topicId, sectionTitle, count }

let pm;
let probId = 1;
while ((pm = probRegex.exec(content)) !== null) {
  const topicId = parseInt(pm[1]);
  const sectionTitle = pm[2].trim();
  const title = pm[3].trim();
  const difficulty = pm[4] ? pm[4].trim() : 'Easy';
  const url = pm[5] ? pm[5].trim() : '';

  const sectionKey = `${topicId}:::${sectionTitle}`;
  if (!sectionsMap.has(sectionKey)) {
    sectionsMap.set(sectionKey, {
      topicId,
      title: sectionTitle,
      order: sectionsMap.size + 1,
      problemCount: 0
    });
  }
  sectionsMap.get(sectionKey).problemCount++;

  problems.push({
    id: probId++,
    topicId,
    sectionTitle,
    title,
    difficulty,
    url
  });
}

console.log('=== STRIVER A2Z CURRICULUM EXTRACTION REPORT ===');
console.log(`Topics Parsed: ${topics.length}`);
console.log(`Sections Parsed: ${sectionsMap.size}`);
console.log(`Problems Parsed: ${problems.length}`);

// Compare topic expected total vs actual parsed
console.log('\n--- TOPIC BREAKDOWN & VERIFICATION ---');
let discrepancies = 0;
topics.forEach(t => {
  const actualProblems = problems.filter(p => p.topicId === t.id);
  const diff = actualProblems.length - t.expectedTotal;
  const status = diff === 0 ? 'MATCH' : `DISCREPANCY (expected ${t.expectedTotal}, found ${actualProblems.length})`;
  if (diff !== 0) discrepancies++;
  console.log(`Step ${t.id} [${t.title}]: ${actualProblems.length} problems (${status})`);
});

console.log(`\nTotal Discrepancies between topic expected total and listed entries: ${discrepancies}`);

// Difficulty counts
const diffDist = {};
problems.forEach(p => diffDist[p.difficulty] = (diffDist[p.difficulty] || 0) + 1);
console.log('\nDifficulty distribution:', diffDist);

// Sample sections
console.log('\nSample 5 Sections:');
let sCount = 0;
for (const [key, sec] of sectionsMap) {
  if (sCount++ < 5) console.log(`  Topic ${sec.topicId} | Section: "${sec.title}" (${sec.problemCount} problems)`);
}

// Sample 5 problems
console.log('\nSample 5 Problems:');
problems.slice(0, 5).forEach(p => console.log(`  #${p.id} [${p.difficulty}] ${p.title} -> ${p.sectionTitle}`));

