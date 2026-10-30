# AlgoNotes — Full-Stack DSA Learning & Revision Platform

**AlgoNotes** is a production-grade developer workspace built for students and software engineering interview candidates. It empowers developers to document problem intuitions, categorize algorithmic patterns, practice active recall, track comprehensive curriculum sheets (including the full 463-problem **Striver A2Z DSA Sheet**), and combat forgetting curves through deterministic spaced repetition.

---

## 🌟 Key Features

1. **Preinstalled Striver A2Z DSA Sheet**
   - Complete 18-step, 61-section, 463-problem curriculum preloaded out of the box.
   - Preserves exact Striver topics, section groupings, problem numbering (#1 to #463), and difficulty tiers (Easy, Medium, Hard).
   - "Start From My Current Progress" 4-step onboarding wizard for experienced students to mark existing knowledge without starting from scratch.
   - Individual question notebooks with adjacent problem navigation, difficulty badges, and external LeetCode/GeeksforGeeks links.

2. **Structured DSA Problem Notebook**
   - Syntax-highlighted **CodeMirror** editor supporting JavaScript, Python, C++, Java, and C.
   - Separate structured tabs for Notes & Summary, Code, Approaches & Intuition, Complexity Trade-offs, Common Pitfalls & Edge Cases, and Revision History.
   - Debounced autosave with live status indicator (`Saved`, `Saving...`, `Unsaved`, `Save failed`).
   - Safe Markdown rendering with script sanitization (`rehype-sanitize`).

3. **Deterministic Spaced-Repetition Engine**
   - Active recall review schedules automatically triggered on marking a problem as *Learned* or *Solved*.
   - Standard review intervals: **Day 1 → Day 7 → Day 21 → Day 45**.
   - Active recall ratings:
     - **Forgot**: Resets to Stage 0 with next review in 1 day.
     - **Difficult**: Retains current stage with review in 3 days.
     - **Good**: Advances to the next interval stage.
     - **Easy**: Fast-tracks progression (+2 stages or extended interval).
   - Dedicated active recall test mode (Problem statement presented first, mental walkthrough & clue reveal, followed by recall rating).
   - Persistent review history logs with stage tracking.

4. **Curated Pattern Library**
   - Dedicated patterns taxonomy (Two Pointers, Sliding Window, Monotonic Stack, Binary Search, BFS/DFS, DP, etc.).
   - Pattern metadata: Recognition clues, when to use, when unsuitable, algorithmic invariants, and common pitfalls.
   - Many-to-many relationship linking problems with multiple pattern techniques.

5. **Hierarchical Topic Explorer**
   - Relational nested topic tree with folder cycle prevention (`check_topic_circular_dependency`).
   - Create, edit, and safely delete topics.

6. **Real Database Metrics & Analytics**
   - Solved vs. saved completion tracking.
   - Recall accuracy metrics derived from actual database review history.
   - Study streak calculation and difficulty distribution.

7. **Design System & Theme Engine**
   - Ultra-dark black (`#000000`) and yellow/gold (`#FACC15`) visual identity matching developer IDEs:
     - Dark background: `#000000` | Surface/Panel: `#0A0D0B` / `#111512` | Accent: `#FACC15`
     - Light background: `#FAFAF8` | Panel: `#FFFFFF`
   - True light/dark mode support with **zero flash** on initial page load.
   - Adaptive brand logo switching displaying the dark logo in dark mode and light logo in light mode.

---

## 🛠️ Tech Stack (100% JavaScript)

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript & JSX (`.js`, `.jsx` exclusively — no TypeScript)
- **Styling**: Tailwind CSS
- **Code Editor**: CodeMirror (`@uiw/react-codemirror`)
- **Database & Auth**: Supabase PostgreSQL with strict Row Level Security (RLS)
- **Markdown**: `react-markdown` + `rehype-sanitize` + `remark-gfm`
- **Icons**: `lucide-react`
- **Testing**: Built-in Node test runner (`node:test`)

---

## 🗄️ Database Setup & Supabase Migrations

Execute the following migrations in your Supabase SQL Editor in exact chronological order:

1. `supabase/migrations/001_initial_schema.sql`
   - Creates `profiles`, `user_settings`, `topics`, `patterns`, `problems`, `problem_patterns`, `problem_review_schedules`, `problem_review_history`, `bookmarks`, `activity_events`.
   - Enables Row Level Security (RLS) and attaches isolation policies.
   - Creates triggers for automatic profile creation and circular dependency checks.
2. `supabase/migrations/002_striver_curriculum_and_progress.sql`
   - Creates `curriculum_sheets`, `curriculum_topics`, `curriculum_sections`, `curriculum_problems`.
   - Creates user progress tables: `user_curriculum_topic_progress`, `user_curriculum_section_progress`, `user_curriculum_problem_progress`, `user_curriculum_problem_notes`.
   - Creates helper procedures: `upsert_topic_progress_bulk`, `upsert_problem_progress_bulk`.
3. `supabase/migrations/003_seed_striver_curriculum.sql`
   - Populates the complete 463-problem Striver A2Z DSA curriculum with deterministic UUIDs and idempotent `ON CONFLICT` clauses.
4. `supabase/migrations/004_my_notes_blocks.sql`
   - Creates `user_note_folders`, `user_notes`, and `note_blocks` with cascade relationships and Row Level Security.
   - Creates atomic RPC procedure `sync_note_blocks`.
   - Creates Supabase Storage bucket `user-note-images` with user-folder upload policies.

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd AlgoNotes
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase project keys:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key # Optional for seed scripts
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Linter & Test Suite
```bash
# Run ESLint (Flat Config)
npm run lint

# Run Unit Tests (20/20 test cases passing)
npm test
```

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🌐 Production Deployment Requirements (Vercel)

1. **Framework Preset**: Next.js
2. **Node.js Version**: 20.x or 22.x
3. **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.vercel.app`)
4. **Build Command**: `next build`
5. **Output Directory**: `.next`
