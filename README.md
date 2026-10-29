# AlgoNotes — Full-Stack DSA Learning & Revision Platform

**AlgoNotes** is a production-minded developer workspace for students and software engineering interview candidates. It empowers developers to document problem intuitions, categorize algorithmic patterns, practice active recall, and combat forgetting curves through deterministic spaced repetition.

---

## 🌟 Key Features

1. **Structured DSA Problem Notebook**
   - Syntax-highlighted **CodeMirror** editor supporting JavaScript, Python, C++, Java, and C.
   - Separate structured tabs for Notes & Summary, Code, Approaches & Intuition, Complexity Trade-offs, Common Pitfalls & Edge Cases, and Revision History.
   - Debounced autosave with live status indicator (`Saved`, `Saving...`, `Failed`).
   - Safe Markdown rendering with script sanitization (`rehype-sanitize`).

2. **Deterministic Spaced-Repetition Engine**
   - Active recall review schedules automatically triggered on marking a problem as *Learned*.
   - Standard review intervals: **Day 1 → Day 7 → Day 21 → Day 45**.
   - Active recall ratings:
     - **Forgot**: Resets to Stage 0 with next review in 1 day.
     - **Difficult**: Retains current stage with review in 3 days.
     - **Good**: Advances to the next interval stage.
     - **Easy**: Fast-tracks progression (+2 stages or extended interval).
   - Dedicated active recall test mode (Problem statement presented first, mental walkthrough & clue reveal, followed by recall rating).
   - Persistent review history logs with stage tracking.

3. **Curated Pattern Library**
   - Dedicated patterns taxonomy (Two Pointers, Sliding Window, Monotonic Stack, Binary Search, BFS/DFS, DP, etc.).
   - Pattern metadata: Recognition clues, when to use, when unsuitable, algorithmic invariants, and common pitfalls.
   - Many-to-many relationship linking problems with multiple pattern techniques.

4. **Hierarchical Topic Explorer**
   - Relational nested topic tree with folder cycle prevention (`check_topic_circular_dependency`).
   - Create, edit, and safely delete topics.

5. **Real Database Metrics & Analytics**
   - Solved vs. saved completion tracking.
   - Recall accuracy metrics derived from actual database review history.
   - Study streak calculation and difficulty distribution.

6. **Design System & Theme Engine**
   - Charcoal & Yellow visual identity matching developer IDEs:
     - Dark background: `#090B0A` | Surface: `#111512` | Accent: `#FACC15`
     - Light background: `#FAFAF8` | Panel: `#FFFFFF`
   - True light/dark mode support with **zero flash** on initial page load.
   - Adaptive logo switching displaying the dark logo in dark mode and light logo in light mode.

---

## 🛠️ Tech Stack (100% JavaScript)

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript & JSX (`.js`, `.jsx` exclusively)
- **Styling**: Tailwind CSS
- **Code Editor**: CodeMirror (`@uiw/react-codemirror`)
- **Database & Auth**: Supabase PostgreSQL with strict Row Level Security (RLS)
- **Markdown**: `react-markdown` + `rehype-sanitize` + `remark-gfm`
- **Icons**: `lucide-react`
- **Testing**: Built-in Node test runner (`node:test`)

---

## 🗄️ Database Setup & Supabase Migration

1. Create a project at [supabase.com](https://supabase.com).
2. Navigate to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/migrations/001_initial_schema.sql` and run the script. This creates:
   - `profiles` with automatic trigger on `auth.users`
   - `user_settings`
   - `topics` (with circular dependency prevention trigger)
   - `patterns`
   - `problems`
   - `problem_patterns` (many-to-many)
   - `problem_review_schedules`
   - `problem_review_history`
   - `bookmarks`
   - `activity_events`
   - Strict Row Level Security (RLS) policies on all tables so users only read and mutate their own records.
   - Starter pattern seed function `seed_user_starter_data`.

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
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Tests
```bash
npm test
```

### 5. Production Build
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
AlgoNotes/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (workspace)/
│   │   ├── dashboard/
│   │   ├── revision/
│   │   ├── problems/
│   │   │   ├── [id]/
│   │   │   └── new/
│   │   ├── topics/
│   │   ├── patterns/
│   │   ├── analytics/
│   │   ├── bookmarks/
│   │   └── settings/
│   ├── auth/callback/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── editor/
│   │   ├── CodeEditor.jsx
│   │   └── MarkdownRenderer.jsx
│   ├── layout/
│   │   ├── AppSidebar.jsx
│   │   ├── TopBar.jsx
│   │   ├── CommandSearchModal.jsx
│   │   └── WorkspaceShell.jsx
│   ├── problems/
│   │   └── ProblemNotebook.jsx
│   ├── revision/
│   │   ├── ActiveRecallSession.jsx
│   │   └── DailyReviewModal.jsx
│   ├── theme/
│   │   ├── ThemeProvider.jsx
│   │   └── ThemeToggle.jsx
│   └── ui/
│       ├── AlgoLogo.jsx
│       ├── Badge.jsx
│       ├── Button.jsx
│       └── Input.jsx
├── lib/
│   ├── revision/
│   │   └── scheduler.js
│   ├── supabase/
│   │   ├── client.js
│   │   ├── server.js
│   │   └── middleware.js
│   └── utils/
│       └── cn.js
├── public/
│   ├── algonotes-dark.png
│   └── algonotes-light.png
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
└── tests/
    └── scheduler.test.mjs
```
