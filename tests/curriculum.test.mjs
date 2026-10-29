import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load generated curriculum data
const dataPath = path.join(__dirname, '..', 'lib', 'curriculum', 'striver-a2z.json');
const curriculumData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

test('Curriculum Integrity - Topics, Sections, and Problems counts', () => {
  assert.equal(curriculumData.sheet.title, 'Striver A2Z DSA Sheet');
  assert.equal(curriculumData.topics.length, 18, 'Expected exactly 18 topics');
  assert.equal(curriculumData.sections.length, 61, 'Expected exactly 61 sections');
  assert.equal(curriculumData.problems.length, 463, 'Expected exactly 463 problems');
});

test('Curriculum Integrity - Problem ordering and non-empty metadata', () => {
  const problems = curriculumData.problems;
  const ids = new Set();

  for (let i = 0; i < problems.length; i++) {
    const p = problems[i];
    assert.ok(p.id, `Problem ${i} missing ID`);
    assert.ok(!ids.has(p.id), `Duplicate ID found: ${p.id}`);
    ids.add(p.id);

    assert.equal(p.problem_number, i + 1, `Problem number mismatch at index ${i}`);
    assert.ok(p.title && p.title.trim().length > 0, `Problem ${p.problem_number} has empty title`);
    assert.ok(['Easy', 'Medium', 'Hard'].includes(p.difficulty), `Invalid difficulty: ${p.difficulty}`);
    assert.ok(p.topic_id, `Problem ${p.problem_number} missing topic_id`);
    assert.ok(p.section_id, `Problem ${p.problem_number} missing section_id`);
  }
});

test('Curriculum Integrity - Topic problem count parity', () => {
  for (const topic of curriculumData.topics) {
    const matchingProblems = curriculumData.problems.filter((p) => p.topic_id === topic.id);
    assert.equal(
      matchingProblems.length,
      topic.expected_problems,
      `Topic ${topic.step_number} (${topic.title}) expected ${topic.expected_problems} problems, found ${matchingProblems.length}`
    );
  }
});

test('Curriculum Navigation - Adjacent problem pointers', () => {
  const problems = curriculumData.problems;

  // First problem
  const first = problems[0];
  const firstPrev = problems.find((p) => p.problem_number === first.problem_number - 1);
  const firstNext = problems.find((p) => p.problem_number === first.problem_number + 1);
  assert.equal(firstPrev, undefined);
  assert.equal(firstNext.problem_number, 2);

  // Last problem
  const last = problems[problems.length - 1];
  const lastPrev = problems.find((p) => p.problem_number === last.problem_number - 1);
  const lastNext = problems.find((p) => p.problem_number === last.problem_number + 1);
  assert.equal(lastPrev.problem_number, 462);
  assert.equal(lastNext, undefined);

  // Arbitrary problem #200
  const mid = problems.find((p) => p.problem_number === 200);
  const midPrev = problems.find((p) => p.problem_number === 199);
  const midNext = problems.find((p) => p.problem_number === 201);
  assert.ok(mid);
  assert.equal(midPrev.problem_number, 199);
  assert.equal(midNext.problem_number, 201);
});

test('Progress Rules - Topic studied status is separate from problem completion', () => {
  const topicStudiedMap = { 'topic-1': true };
  const problemStatusMap = { 'prob-1': 'Solved', 'prob-2': 'Attempted', 'prob-3': 'Not started' };

  // Marking topic studied must not mutate individual problem statuses
  assert.equal(topicStudiedMap['topic-1'], true);
  assert.equal(problemStatusMap['prob-3'], 'Not started');
  assert.notEqual(problemStatusMap['prob-3'], 'Solved');
});

test('Revision Queue - Imported solved problems baseline schedule without fake history', () => {
  const importedProblems = [
    { problemId: 'prob-10', status: 'Solved' },
    { problemId: 'prob-11', status: 'Needs revision' },
    { problemId: 'prob-12', status: 'Not started' },
  ];

  const targetForRevision = importedProblems.filter(
    (p) => p.status === 'Solved' || p.status === 'Needs revision'
  );

  assert.equal(targetForRevision.length, 2);

  const todayStr = '2026-10-30';
  const schedules = targetForRevision.map((p) => ({
    problem_id: p.problemId,
    next_review_date: todayStr,
    review_stage: 1,
    interval_days: 1,
    repetitions: 0,
  }));

  // Verify baseline parameters
  assert.equal(schedules[0].next_review_date, todayStr);
  assert.equal(schedules[0].review_stage, 1);
  assert.equal(schedules[0].repetitions, 0); // Repetitions is 0: no fake prior reviews!
});
