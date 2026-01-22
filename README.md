# <img src="./public/favicon-32x32.png" width="30" height="30" alt="Typing Speed Test Icon"> Typing Speed Test

[![Live Demo](https://img.shields.io/badge/Live%20Demo-blue?style=for-the-badge&logo=vercel&logoColor=white)](https://typing-speed-test-iota-flame.vercel.app/)
[![Frontend Mentor](https://img.shields.io/badge/Frontend%20Mentor-Challenge-brightgreen?style=for-the-badge&logo=frontendmentor)](https://www.frontendmentor.io/challenges/typing-speed-test)

A modern typing speed test with real-time WPM tracking, personal best records, and global leaderboards. Built with React, TypeScript, Tailwind CSS, and Supabase for the Frontend Mentor hackathon challenge.

🎮 **[Try it Live](https://typing-speed-test-iota-flame.vercel.app/)**

![Typing Speed Test Screenshot](./screenshots/desktop-screenshot.png)

## 📚 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎯 The Challenge](#-the-challenge)
- [💡 Key Learnings](#-key-learnings)
- [📸 Screenshots](#-screenshots)
- [🚀 Installation](#-installation)
- [👨‍💻 Author](#-author)

## ✨ Features

### Core Functionality
- ⚡ **Real-time WPM & Accuracy Tracking** - Live statistics update as you type
- 🎯 **Three Difficulty Levels** - Easy, Medium, and Hard passages
- ⏱️ **Multiple Test Modes** - Choose from 15s, 30s, 45s, 60s, 120s, or Passage mode
- 📝 **5 Text Categories** - Passages, Quotes, Poems, Lyrics, and Speeches
- 🎨 **Responsive Design** - Seamless experience from mobile to desktop
- ♿ **Accessibility First** - Full screen reader support with ARIA live regions

### Enhanced Features
- 🏆 **Global Leaderboard** - Compete with typists worldwide (powered by Supabase)
  - Real-time updates when new scores are submitted
  - One entry per nickname with auto-updating personal bests
  - No authentication required - just pick a nickname!
- 📊 **Test History & Analytics** - Track your progress with detailed charts
  - Performance trend visualization with Recharts
  - Last 50 tests saved locally
  - WPM progression over time
- 🎊 **Personal Best Celebrations** - Confetti animations when you beat your high score
- 📤 **Shareable Results** - Share your achievements on social media
  - Pre-filled share text with WPM and accuracy
  - Multiple platforms: Twitter, Facebook, WhatsApp, LinkedIn, etc.
  - Direct copy-to-clipboard functionality
- ⚙️ **Test Configuration Dialog** - Unified settings panel on mobile
- 🎨 **Smooth Animations** - Polished UI with Framer Motion transitions

![Features Collage](./screenshots/features-collage.png)

## 🛠️ Tech Stack

### Frontend
- **React 19** + **TypeScript** - Modern, type-safe development
- **Zustand** - Lightweight state management with localStorage persistence
- **Tailwind CSS v4** - Utility-first styling with custom design tokens
- **Vite** - Lightning-fast dev server and optimized builds

### UI Components & Libraries
- **shadcn/ui** (Radix UI) - Accessible, unstyled component primitives
- **Recharts** - Composable charting library for performance graphs
- **Framer Motion** - Smooth animations and transitions
- **Canvas Confetti** - Celebration effects for personal bests
- **Lucide React** - Beautiful, consistent icon set
- **date-fns** - Modern date utility library

### Backend & Database
- **Supabase** - PostgreSQL database with real-time subscriptions
  - Row Level Security (RLS) for public read/write access
  - UPSERT operations for conflict-free score updates
  - Real-time leaderboard updates via WebSocket channels

### Data & Content
- **Custom JSON dataset** - 150+ curated passages across 5 categories
  - 30 passages per category (Passages, Quotes, Poems, Lyrics, Speeches)
  - 10 passages per difficulty level
  - Normalized text for consistent typing experience

## 🎯 The Challenge

This project was built for the [Frontend Mentor Typing Speed Test challenge](https://www.frontendmentor.io/challenges/typing-speed-test). 

### Requirements
Users should be able to:
- ✅ View optimal layout for their device screen size
- ✅ See hover and focus states for all interactive elements
- ✅ Type passages and receive real-time feedback
- ✅ Track WPM, accuracy, and time remaining
- ✅ Configure difficulty and test duration
- ✅ View test results with detailed statistics

### Extra Features Added
Beyond the requirements, I implemented:
- 🏆 **Global leaderboard** with real-time updates
- 📊 **Test history** with performance charts
- 📝 **5 text categories** with 150+ passages
- 🎊 **Personal best tracking** with celebrations
- 📤 **Social sharing** functionality
- ⏱️ **5 timing modes** instead of just one
- ♿ **Screen reader support** for accessibility

## 💡 Key Learnings

### 1. Real-time Input Handling on Mobile
**Challenge:** Mobile keyboards don't consistently fire `onKeyDown` events, making traditional keystroke tracking unreliable.

**Solution:** Implemented a hybrid approach using `onChange` to detect input changes and calculate the delta:
```typescript
onChange={(e) => {
  const newValue = e.target.value
  if (newValue.length > userInput.length) {
    const added = newValue.slice(userInput.length)
    for (const char of added) {
      handleKeyPress(char)
    }
  }
}
```

This ensures consistent behavior across desktop keyboards, mobile keyboards, and even paste events.

### 2. Text Normalization for Em Dashes
**Challenge:** Source passages contained various Unicode dash characters (em dash `—`, en dash `–`, minus sign `−`) that don't match the standard hyphen `-` on keyboards.

**Solution:** Normalized all dash variants to standard hyphens during passage loading:
```typescript
const normalized = passage.replace(/[\u2010-\u2015\u2043\uFE63\uFF0D\u2212]/g, '-')
```

This prevents false errors when users type hyphens for em dashes.

### 3. Supabase Leaderboard with UPSERT
**Challenge:** Multiple submissions from the same nickname would create duplicate entries or fail due to unique constraints.

**Solution:** Implemented PostgreSQL's UPSERT operation:
```typescript
.upsert(
  { nickname, wpm, accuracy },
  { onConflict: 'nickname' }
)
```

This ensures one entry per nickname that automatically updates when users beat their personal best.

### 4. State Management with Zustand
**Why Zustand?** Cleaner than Context API, lighter than Redux.

**Implementation:**
- Separated concerns (typing state, history, settings)
- Persisted user preferences and test history
- Handled complex timer logic for countdown/countup modes
```typescript
export const useTypingStore = create<TypingState>()(
  persist(
    (set, get) => ({
      // State and actions
    }),
    {
      name: 'typing-test-storage',
      partialize: (state) => ({
        personalBest: state.personalBest,
        testHistory: state.testHistory,
        nickname: state.nickname,
      }),
    }
  )
)
```

### 5. Accessibility with ARIA Live Regions
Implemented screen reader support that announces:
- Test configuration changes
- Real-time progress updates (WPM, accuracy, time)
- Test completion results
- Error states
```typescript
<AssistiveTechInfo
  message={`${wpm} WPM, ${accuracy}% accuracy, ${elapsedTime} seconds remaining`}
  type="polite"
  debounceMs={1500}
/>
```

### 6. Mobile-First Responsive Design
**Challenges:**
- Virtual keyboard covering the typing area
- Touch vs. click event handling
- Limited screen real estate for controls

**Solutions:**
- Unified test configuration dialog on mobile
- Auto-scroll to keep current character visible
- Conditional UI based on viewport size
- Touch-optimized button sizes

### 7. Font Ligature Nightmare: The "ff" Bug
**Challenges:**
- The Bug: For days, a mysterious bug caused the second 'f' in words like "coffee" to appear green when it shouldn't be, or to disappear entirely. The issue only affected double 'f's, not other repeated letters.

- Root Cause: Font ligatures in the Sora font were rendering "ff" as a single glyph (ﬃ), causing the second <span> element to have 0 width. This meant:

- The second 'f' was invisible to users and error highlighting didn't work correctly for ligatured characters

**Debug Journey:**

- Initially suspected React state timing issues

- Debugged with extensive console logging

- Discovered via DOM inspection that second 'f' span had width 0

- Tested multiple font rendering solutions

**Solution:** Disabled ligatures specifically in the typing area:

```css
font-variant-ligatures: none;
font-feature-settings: "liga" 0, "clig" 0;
-webkit-font-feature-settings: "liga" 0, "clig" 0;
```

- Lesson Learned: Always disable ligatures in typing interfaces and test with common ligature sequences early in development.

## 📸 Screenshots

### Desktop Experience
![Desktop View](./screenshots/desktop-screenshot.png)

### Mobile Experience
<div style="display: flex; gap: 1rem;">
  <img src="./screenshots/mobile-screenshot.png" alt="Mobile typing" width="300">
  <img src="./screenshots/mobile-settings.png" alt="Mobile settings" width="300">
</div>

### Test History & Analytics
![Test History with Chart](./screenshots/test-history.png)

### Leaderboard
![Global Leaderboard](./screenshots/leaderboard.png)

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Akiz-Ivanov/typing-speed-test
cd typing-speed-test
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup** (optional - only needed for leaderboard)

Create `.env` in the project root:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 👨‍💻 Author

- **Frontend Mentor** - [@Akiz97](https://www.frontendmentor.io/profile/Akiz97)
- **GitHub** - [@Akiz-Ivanov](https://github.com/Akiz-Ivanov)

---

**Acknowledgments:**
- Frontend Mentor for the challenge and design
- Supabase for the backend infrastructure
- The open-source community for amazing tools and libraries