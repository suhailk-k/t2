# HomeApp - Complete Project Documentation Report

**Generated:** 2026-06-11  
**Project Version:** 1.0.0  
**Framework:** Expo with React Native & TypeScript  

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Navigation Flow](#navigation-flow)
5. [Screen Descriptions](#screen-descriptions)
6. [Data Management](#data-management)
7. [Components Architecture](#components-architecture)
8. [Color & Theme System](#color--theme-system)
9. [Key Features](#key-features)
10. [File-Based Routing Details](#file-based-routing-details)

---

## 🎯 Project Overview

**HomeApp** is a **Learning Management System (LMS) Mobile Application** designed for ACCA (Association of Chartered Certified Accountants) students. It provides a comprehensive platform for:

- 📚 Accessing course materials
- 🎓 Tracking learning progress
- 📹 Watching video lectures
- 📝 Managing notes and materials
- 📢 Receiving announcements
- ❤️ Favoriting important content
- 👤 Managing user profile

The app supports **iOS, Android, and Web** platforms through Expo's universal app framework.

---

## 💻 Technology Stack

### Core Framework
- **Expo v56.0.11** - Universal app development platform
- **React v19.2.3** - UI framework
- **React Native v0.85.3** - Mobile framework
- **TypeScript v6.0.3** - Type safety

### Navigation
- **Expo Router v56.2.10** - File-based routing (similar to Next.js)
  - Tab navigation with 4 main screens
  - Dynamic parameter routing (`[id]`)
  - Stack navigation with animations

### UI & Styling
- **@expo/ui** - UI component library
- **@expo/vector-icons** - Icon library (Ionicons)
- **react-native-svg** - Vector graphics
- **expo-glass-effect** - Glass morphism effects
- **expo-linear-gradient** - Gradient backgrounds
- **react-native-reanimated v4.3.1** - Advanced animations

### Media
- **expo-video** - Video playback
- **expo-image** - Optimized image handling

### Other Libraries
- **react-native-gesture-handler** - Gesture handling
- **react-native-screens** - Native screen navigation
- **react-native-safe-area-context** - Safe area management

---

## 📁 Project Structure

```
HomeApp/
├── src/
│   ├── app/                          # Main app structure (Expo Router)
│   │   ├── _layout.tsx              # Root layout with Stack navigation
│   │   ├── index.tsx                # Home screen
│   │   ├── switch-course.tsx        # Course switcher screen
│   │   ├── (tabs)/                  # Tab-based navigation group
│   │   │   ├── _layout.tsx          # Tab configuration
│   │   │   ├── index.tsx            # Home tab
│   │   │   ├── my-learning.tsx      # My Learning tab
│   │   │   ├── favourites.tsx       # Favorites tab (empty state)
│   │   │   └── account.tsx          # Account tab
│   │   ├── lecture/
│   │   │   └── [id].tsx             # Dynamic lecture detail screen
│   │   └── announcement/
│   │       └── [id].tsx             # Dynamic announcement detail screen
│   │
│   ├── components/                   # Reusable components
│   │   ├── animated-icon.tsx        # Animated icon with web variant
│   │   ├── AnnouncementCard.tsx     # Card for displaying announcements
│   │   ├── app-tabs.tsx             # Tab component (web variant available)
│   │   ├── ChapterAccordion.tsx     # Expandable chapter with lectures
│   │   ├── CircularProgress.tsx     # Circular progress indicator
│   │   ├── ContinueWatchingCard.tsx # Featured video card
│   │   ├── CourseCard.tsx           # Course card (list & horizontal variants)
│   │   ├── external-link.tsx        # External link component
│   │   ├── hint-row.tsx             # Hint display component
│   │   ├── MaterialItem.tsx         # Material/document item
│   │   ├── NoteItem.tsx             # Note display item
│   │   ├── themed-text.tsx          # Themed text component
│   │   ├── themed-view.tsx          # Themed view component
│   │   ├── VideoPlayer.tsx          # Video player component
│   │   ├── web-badge.tsx            # Badge component
│   │   └── ui/
│   │       └── collapsible.tsx      # Collapsible UI element
│   │
│   ├── constants/                    # App constants
│   │   ├── colors.ts               # Color palette & theme colors
│   │   ├── data.ts                 # Mock data (courses, chapters, announcements)
│   │   └── theme.ts                # Typography, spacing, shadows, borders
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-color-scheme.ts      # Color scheme detection
│   │   ├── use-color-scheme.web.ts  # Web-specific implementation
│   │   └── use-theme.ts             # Theme management
│   │
│   ├── services/                     # API & external services
│   │   └── api.ts                   # API client (currently empty)
│   │
│   ├── types/                        # TypeScript interfaces
│   │   └── index.ts                # Type definitions
│   │
│   ├── utils/                        # Utility functions
│   │   └── helpers.ts              # Helper functions
│   │
│   └── global.css                    # Global styles
│
├── assets/
│   ├── expo.icon/                   # iOS app icon
│   ├── images/
│   │   └── tabIcons/               # Tab navigation icons
│   └── splash/                      # Splash screen assets
│
├── scripts/
│   └── reset-project.js            # Project reset utility
│
├── app.json                          # Expo configuration
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Basic setup documentation
```

---

## 🧭 Navigation Flow

### **Navigation Hierarchy**

```
Root Layout (Stack Navigation)
│
├─ (tabs) [Tab Navigation]
│   ├─ index (Home)
│   ├─ my-learning (My Learning)
│   ├─ favourites (Favorites)
│   └─ account (Account)
│
├─ switch-course [Card/Modal]
│   └─ Course selection screen
│
├─ lecture/[id] [Card/Modal]
│   └─ Dynamic lecture detail page
│
└─ announcement/[id] [Card/Modal]
    └─ Dynamic announcement detail page
```

### **Navigation Stack Details**

#### **Root Layout** (`src/app/_layout.tsx`)
- Uses Expo Router's `<Stack>` component
- Hides header globally with `headerShown: false`
- Status bar style set to "dark"
- Defines screen animations:
  - Main tabs: Default (no animation)
  - Switch Course: Slide from right (card presentation)
  - Lecture Detail: Slide from right (card presentation)
  - Announcement Detail: Slide from right (card presentation)

#### **Tab Navigation** (`src/app/(tabs)/_layout.tsx`)
- **4 Tabs** with custom icons:
  1. **Home** - `home-outline` (outline) / `home` (filled)
  2. **My Learning** - `school-outline` / `school`
  3. **Favorites** - `heart-outline` / `heart`
  4. **Account** - `person-outline` / `person`

- **Visual Styling:**
  - Active color: `#2563EB` (Primary Blue)
  - Inactive color: `#9CA3AF` (Gray)
  - iOS height: 84px, Android: 64px
  - Tab label font size: 11px

### **Navigation Triggers**

| From Screen | To Screen | Trigger | Method |
|-------------|-----------|---------|--------|
| Home | Switch Course | Course button | `router.push('/switch-course')` |
| Home | Announcement Detail | Announcement card | `router.push('/announcement/[id]')` |
| Home | Lecture Detail | Continue Watching | `router.push('/lecture/[id]')` |
| My Learning | Lecture Detail | Course card | `router.push('/lecture/[id]')` |
| All Screens | Back | Back button | `router.back()` |
| Any Tab | Any Tab | Tab bar | Automatic tab switching |

---

## 📱 Screen Descriptions

### **1. Home Screen** (`(tabs)/index.tsx`)
**Purpose:** Main dashboard showing learning progress and quick access

**Key Elements:**
- **Elance Logo** - SVG-based branding
- **Quick Actions Section:**
  - Downloads (with download arrow icon)
  - Analytics (trending chart icon)
  - Materials (document upload icon)
  
- **Continue Watching Card:**
  - Video thumbnail
  - Video title: "Straight-line vs Reducing Balance Depreciation"
  - Subtitle: "Non-Current Assets & Depreciation"
  - Course code: FA (Financial Accounting)
  - Last watched: "2 hours ago"
  - Time remaining: "3 min left"
  - Progress bar showing 85% completion
  - Tappable to navigate to lecture detail

- **Announcements Section:**
  - Multiple announcement cards (scrollable)
  - Shows announcement title, category (Academics/Resources), excerpt
  - Image with gradient overlay
  - Tappable to view full announcement

- **Popular Courses Section:**
  - Horizontal scrollable list of course cards
  - Shows course thumbnail, title, progress indicator

**Data Source:** Hardcoded in `constants/data.ts`

---

### **2. My Learning Screen** (`(tabs)/my-learning.tsx`)
**Purpose:** View all enrolled courses with progress tracking

**Key Elements:**
- **Header:** "My Learning" title
- **Course List View:**
  - Displays all 7 courses (FR, FA, LW, BT, MA, TX, AA)
  - Each course shows:
    - Colored course code thumbnail
    - Course title
    - Code badge
    - Completed chapters / Total chapters (e.g., "8/12")
    - Circular progress indicator (percentage)
  - Tappable course cards navigate to lecture detail

**Data Source:** `COURSES` array from `constants/data.ts`

**Navigation:** Course → Lecture Detail Screen

---

### **3. Announcements Detail** (`announcement/[id].tsx`)
**Purpose:** Display full announcement content

**Route Parameters:**
- `id` - Announcement ID from `ANNOUNCEMENTS` array

**Key Elements:**
- **Back Button:** Returns to previous screen with animation
- **Hero Image:** Full-width announcement image (220px height)
- **Announcement Meta:**
  - Post date
  - Category badge (Academics/Resources)
  - Full content text
  - "Go to Page" action button

**Data Fetching:**
```typescript
const { id } = useLocalSearchParams<{ id: string }>();
const announcement = ANNOUNCEMENTS.find((a) => a.id === id) ?? ANNOUNCEMENTS[0];
```

---

### **4. Lecture Detail Screen** (`lecture/[id].tsx`)
**Purpose:** Comprehensive learning hub with multiple content tabs

**Route Parameters:**
- `id` - Course ID

**Tab Navigation (4 Tabs):**

#### **Tab 1: Lectures**
- Search functionality to filter lessons
- **ChapterAccordion Components:**
  - Expandable chapters (start collapsed/expanded based on data)
  - Each chapter shows:
    - Chapter number
    - Chapter title
    - "Download All" button
  - Expandable lecture list with:
    - Lecture title
    - Duration (e.g., "9:47 min")
    - Checkmark indicator if completed
  - Example: Chapter 1 has 2 lectures, Chapter 2 has 4 lectures, etc.

#### **Tab 2: Overview**
Displays detailed course information in sections:

**Paper Info Section:**
- Paper: Financial Accounting (FA)
- Chapters Completed: 8/12
- Exam Weightage: 10-15%
- Updated: 25 days ago

**Statistics Section:**
- Total Paper Duration: 7 hr 30 min
- Difficulty Level: Beginner
- Student Completion Rate: 86%
- Engagement Score: 78/100
- Materials Available: 25

**Instructors Section:**
- Sarah William, FCCA
- John Tomy, ACCA

**Description Section:**
- Full course description text

**Skills Section:**
- 7 key skills students will gain

#### **Tab 3: Materials**
- **Topic Materials Subsection:**
  - Depreciation Formula Sheet (PDF)
  - Understanding Different Types of Organizations (PDF)

- **Chapter Resources Subsection:**
  - Organizational Structures (PDF)
  - Understanding Different Types of Organizations (PDF)
  - Multiple resource items with download capability

#### **Tab 4: Notes**
- List of timestamped notes
- Each note shows:
  - Timestamp (0:21 format)
  - Note title
  - Note content
- (Full note management UI in component)

**Data Source:**
- Chapters: `CHAPTERS` array
- Materials: `MATERIALS` object
- Course Info: `PAPER_INFO` object
- Notes: `NOTES` array

---

### **5. Switch Course Screen** (`switch-course.tsx`)
**Purpose:** Allow students to switch between different course programs

**Key Elements:**
- **Heading:** "What do you want to learn today?"
- **Course Options (3 choices):**
  1. **ACCA** - Association of Chartered Certified Accountants
  2. **CMA** - Cost & Management Accounting
  3. **CA** - Chartered Accountancy

- **Selection Mechanism:**
  - Radio button style cards
  - Selected option shows:
    - Light blue background (`#EFF6FF`)
    - Blue text and border (`#2563EB`)
    - Filled radio dot
  - Unselected options show gray border

**State Management:**
- Uses `useState` to track selected course
- No actual navigation on selection (placeholder for future integration)

---

### **6. Account Screen** (`(tabs)/account.tsx`)
**Purpose:** Display user profile information

**Key Elements:**
- **Header:** "Account" title
- **User Profile Section:**
  - Large person icon (72px, muted gray)
  - User name: "Student"
  - User email: "student@elance.com"
- **Current State:** Placeholder - ready for real user data integration

---

### **7. Favorites Screen** (`(tabs)/favourites.tsx`)
**Purpose:** View favorited content

**Key Elements:**
- **Header:** "Favorites" title
- **Empty State:**
  - Heart outline icon
  - "No Favourites Yet" message
  - Instruction text: "Items you favourite will appear here."

**Current State:** Empty placeholder - ready for favorite functionality implementation

---

## 📊 Data Management

### **Data Storage Strategy**
Currently, the app uses **hardcoded mock data** stored in `src/constants/data.ts`. This is suitable for:
- Development and testing
- Prototyping
- UI demonstration

### **Main Data Objects**

#### **1. Courses** (`COURSES` array)
```typescript
interface Course {
  id: string;           // 'fr', 'fa', 'lw', 'bt', 'ma', 'tx', 'aa'
  title: string;        // Full course name
  code: string;         // Course code (FR, FA, LW, etc.)
  thumbnail: string;    // Image URL
  totalChapters: number;
  completedChapters: number;
  progress: number;     // 0-100 percentage
}
```

**Available Courses (7 total):**
- FR (Financial Reporting) - 67% complete
- FA (Financial Accounting) - 67% complete
- LW (Business Law) - 100% complete
- BT (Business and Technology) - 100% complete
- MA (Management Accounting) - 100% complete
- TX (Taxation) - 100% complete
- AA (Audit and Assurance) - 100% complete

#### **2. Chapters** (`CHAPTERS` array)
```typescript
interface Chapter {
  id: string;
  number: number;
  title: string;
  expanded?: boolean;      // Initial expansion state
  lectures: Lecture[];
}
```

**Example Structure:**
- Chapter 1: "Business Organization & Structure" (2 lectures)
- Chapter 2: "Business Environment" (4 lectures)
- Chapter 3: "Organizational Culture & Leadership" (2+ lectures)

#### **3. Lectures** (nested in Chapters)
```typescript
interface Lecture {
  id: string;
  title: string;
  duration: string;       // e.g., "9:47 min"
  completed: boolean;
}
```

#### **4. Announcements** (`ANNOUNCEMENTS` array)
```typescript
interface Announcement {
  id: string;
  title: string;
  category: string;       // "Academics" or "Resources"
  excerpt: string;
  content: string;        // Full announcement text
  imageUrl: string;
  postDate: string;       // e.g., "12 December 2025"
}
```

**Example Data:**
- 2 announcements: "ACCA EXAM & ACADEMIC UPDATES", "New Study Materials Released"

#### **5. Materials** (`MATERIALS` object)
```typescript
interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'doc';
  section: 'topic' | 'chapter';
}
```

Organized by section:
- Topic materials (2 items)
- Chapter resources (3 items)

#### **6. Notes** (`NOTES` array)
```typescript
interface Note {
  id: string;
  timestamp: string;      // e.g., "0:21"
  title: string;
  content: string;
}
```

#### **7. Paper Info** (`PAPER_INFO` object)
Comprehensive course metadata including:
- Course name and code
- Progress metrics
- Instructor information
- Skills list
- Course description

#### **8. Continue Watching** (`CONTINUE_WATCHING` object)
Current video context:
- Course ID: "fa"
- Video title and subtitle
- Last watched timestamp
- Time remaining
- Progress percentage (85%)
- Video and thumbnail URLs

---

## 🧩 Components Architecture

### **Component Hierarchy**

```
App
├── Layout (Root Stack)
│   ├── Tabs Layout
│   │   ├── Home Screen
│   │   │   ├── ElanceLogo (SVG)
│   │   │   ├── QuickActions
│   │   │   │   ├── DownloadIcon (SVG)
│   │   │   │   ├── AnalyticsIcon (SVG)
│   │   │   │   └── MaterialsIcon (SVG)
│   │   │   ├── ContinueWatchingCard
│   │   │   │   └── VideoPlayer
│   │   │   ├── AnnouncementCard (multiple)
│   │   │   └── CourseCard (horizontal variant)
│   │   │
│   │   ├── My Learning Screen
│   │   │   └── CourseCard (list variant) [multiple]
│   │   │
│   │   ├── Favorites Screen
│   │   │   └── Empty state
│   │   │
│   │   └── Account Screen
│   │       └── User info placeholder
│   │
│   ├── Lecture Detail
│   │   ├── FABadge
│   │   ├── Tab Navigation
│   │   │   ├── Lectures Tab
│   │   │   │   ├── Search Input
│   │   │   │   └── ChapterAccordion [multiple]
│   │   │   │       └── Lecture Item [multiple]
│   │   │   ├── Overview Tab
│   │   │   │   ├── InfoRow [multiple]
│   │   │   │   └── Bullet lists
│   │   │   ├── Materials Tab
│   │   │   │   └── MaterialItem [multiple]
│   │   │   └── Notes Tab
│   │   │       └── NoteItem [multiple]
│   │   └── Back Button
│   │
│   ├── Announcement Detail
│   │   ├── Back Button
│   │   ├── Hero Image
│   │   ├── Category Badge
│   │   ├── Content Text
│   │   └── "Go to Page" Button
│   │
│   └── Switch Course
│       └── Course Selection Card [3 options]
│
└── Helper Components
    ├── ThemedText
    ├── ThemedView
    ├── ExternalLink
    ├── CircularProgress
    ├── VideoPlayer
    └── Collapsible
```

### **Reusable Components**

#### **1. CourseCard** (`components/CourseCard.tsx`)
**Props:**
- `course: Course`
- `variant?: 'horizontal' | 'list'`
- `onPress?: () => void`

**Variants:**
- **List:** Vertical layout with thumbnail, info, and progress circle
- **Horizontal:** Card layout with colored background and code display

**Features:**
- Dynamic color coding based on course code
- Progress indicator (circular)
- Responsive layout

#### **2. ChapterAccordion** (`components/ChapterAccordion.tsx`)
**Props:**
- `chapter: Chapter`

**Features:**
- Expandable/collapsible header
- Shows chapter number, title
- Download All button
- Lecture list with completion indicators
- Smooth expand/collapse animation

#### **3. CircularProgress** (`components/CircularProgress.tsx`)
**Props:**
- `progress: number` (0-100)
- `size?: number`
- `strokeWidth?: number`

**Features:**
- SVG-based circular progress
- Customizable size and stroke width
- Shows percentage in center

#### **4. VideoPlayer** (`components/VideoPlayer.tsx`)
**Purpose:** 
- Plays video with controls
- Uses `expo-video` library
- Responsive design

#### **5. MaterialItem** (`components/MaterialItem.tsx`)
**Props:**
- `material: Material`

**Features:**
- File type icon (PDF/DOC)
- Material title
- Download action

#### **6. NoteItem** (`components/NoteItem.tsx`)
**Props:**
- `note: Note`
- Likely handlers for edit/delete

**Features:**
- Timestamp display
- Note title and content
- Action buttons

#### **7. AnnouncementCard** (`components/AnnouncementCard.tsx`)
**Props:**
- `announcement: Announcement`

**Features:**
- Thumbnail image
- Title and excerpt
- Category badge
- Tappable for details

#### **8. Themed Components**
- **ThemedText** - Text with theme colors
- **ThemedView** - View with theme background
- Both adapt to light/dark mode

---

## 🎨 Color & Theme System

### **Color Palette** (`constants/colors.ts`)

**Primary Colors:**
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#2563EB` | Buttons, active tab, links |
| Primary Light | `#EFF6FF` | Light backgrounds, subtle highlights |
| Success Green | `#16A34A` | Success states, completed items |
| Success Light | `#DCFCE7` | Success backgrounds |
| Warning Orange | `#F59E0B` | Warnings, notifications |
| Warning Light | `#FEF3C7` | Warning backgrounds |
| Danger Red | `#EF4444` | Errors, destructive actions |
| Danger Light | `#FEE2E2` | Error backgrounds |

**Text Colors:**
| Color | Hex | Usage |
|-------|-----|-------|
| Text Primary | `#111827` | Main text, headings |
| Text Secondary | `#6B7280` | Subtext, labels |
| Text Tertiary | `#9CA3AF` | Hints, placeholders |
| Text Muted | `#D1D5DB` | Disabled, very light text |

**UI Colors:**
| Color | Hex | Usage |
|-------|-----|-------|
| White | `#FFFFFF` | Card backgrounds |
| Border | `#E5E7EB` | Dividers, borders |
| Border Light | `#F3F4F6` | Subtle dividers |
| Background | `#F9FAFB` | Page backgrounds |
| Input BG | `#F9FAFB` | Input fields |
| Tab Bar BG | `#FFFFFF` | Bottom tab bar |

**Course Code Colors:**
| Code | Color | Hex |
|------|-------|-----|
| FR | Cyan | `#0EA5E9` |
| FA | Indigo | `#6366F1` |
| LW | Green | `#10B981` |
| BT | Amber | `#F59E0B` |
| TX | Red | `#EF4444` |
| AA | Purple | `#8B5CF6` |
| MA | Pink | `#EC4899` |

### **Typography System** (`constants/theme.ts`)

**Text Styles:**
| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| h1 | 22px | 700 | Large headings |
| h2 | 18px | 700 | Section headers |
| h3 | 16px | 600 | Subsection headers |
| h4 | 15px | 600 | Card titles |
| bodyLarge | 15px | 400 | Large body text |
| body | 14px | 400 | Main body text |
| bodyMedium | 14px | 500 | Medium body (emphasized) |
| bodyBold | 14px | 700 | Bold body text |
| small | 12px | 400 | Small text, labels |
| smallMedium | 12px | 500 | Small emphasized text |
| caption | 11px | 400 | Very small captions |
| badge | 11px | 600 | Badge text |
| label | 13px | 500 | Form labels |

### **Spacing System** (`constants/theme.ts`)

**Spacing Scale (in pixels):**
```
xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, xxl: 32
```

**Aliases:**
```
one: 4, two: 8, three: 12, four: 16, five: 20, half: 2
```

### **Border Radius**

```
xs: 4px, sm: 6px, md: 8px, lg: 12px, xl: 16px, xxl: 20px, full: 999px
```

### **Shadow System**

**Card Shadow** (Subtle):
```
offset: 0, 2
opacity: 0.06
radius: 8
elevation: 3
```

**Header Shadow** (Very subtle):
```
offset: 0, 1
opacity: 0.05
radius: 4
elevation: 2
```

**Strong Shadow** (Prominent):
```
offset: 0, 4
opacity: 0.1
radius: 12
elevation: 5
```

---

## ✨ Key Features

### **1. Tab Navigation (4 Tabs)**
- **Home:** Dashboard with quick actions and continue watching
- **My Learning:** All enrolled courses with progress
- **Favorites:** Bookmarked content (empty placeholder)
- **Account:** User profile (placeholder)

### **2. Dynamic Routing**
- `lecture/[id]` - Dynamic course/lecture pages
- `announcement/[id]` - Dynamic announcement detail pages
- Route parameters handled with `useLocalSearchParams`

### **3. Course Tracking**
- Progress indicators (circular and linear)
- Chapter completion tracking
- Lecture status (completed/not completed)

### **4. Multi-Tab Interface** (Lecture Detail Screen)
- Lectures: Browse chapters and lessons
- Overview: Course details and information
- Materials: Download study resources
- Notes: Timestamped learning notes

### **5. Video Playback**
- Integrated video player with `expo-video`
- Progress tracking
- Duration display

### **6. Announcement System**
- Multiple announcements with categories
- Full-screen detail view
- Image attachments

### **7. Course Switching**
- Multiple course programs (ACCA, CMA, CA)
- Radio-button selection UI
- Visual feedback on selection

### **8. Search Functionality**
- Lecture search on the Lectures tab
- Real-time filtering

### **9. Animation & Transitions**
- Slide-from-right animation for detail screens
- Smooth tab transitions
- Accordion expand/collapse

### **10. Responsive Design**
- Works on iOS, Android, and Web
- Safe area handling
- Platform-specific optimizations

---

## 🛣️ File-Based Routing Details

### **Expo Router Overview**
The app uses **Expo Router** (v56.2.10), which provides **automatic file-based routing** similar to Next.js.

### **Route Mapping**

| File Path | Route | Screen Name |
|-----------|-------|-------------|
| `app/_layout.tsx` | `/` (root) | Root stack layout |
| `app/(tabs)/_layout.tsx` | `/` (tabs group) | Tab navigation container |
| `app/(tabs)/index.tsx` | `/(tabs)/` | Home tab |
| `app/(tabs)/my-learning.tsx` | `/(tabs)/my-learning` | My Learning tab |
| `app/(tabs)/favourites.tsx` | `/(tabs)/favourites` | Favorites tab |
| `app/(tabs)/account.tsx` | `/(tabs)/account` | Account tab |
| `app/switch-course.tsx` | `/switch-course` | Course switcher |
| `app/lecture/[id].tsx` | `/lecture/:id` | Lecture detail (dynamic) |
| `app/announcement/[id].tsx` | `/announcement/:id` | Announcement detail (dynamic) |

### **Route Groups**
- **(tabs)** - Grouped routes that share tab navigation without affecting URL structure

### **Dynamic Segments**
- `[id]` - Captured as route parameter
- Accessed via `useLocalSearchParams<{ id: string }>()`

### **Navigation API** (Expo Router)

**Push Navigation:**
```typescript
import { router } from 'expo-router';

// Simple navigation
router.push('/my-learning');

// With parameters
router.push({ pathname: '/lecture/[id]', params: { id: 'fa' } });

// Going back
router.back();
```

### **Configuration** (`app.json`)

```json
{
  "experiments": {
    "typedRoutes": true,      // Type-safe route definitions
    "reactCompiler": true      // React compiler optimization
  }
}
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────┐
│  Mock Data          │
│  (constants/data)   │
└──────────┬──────────┘
           │
           ├──► COURSES[] ──────────┐
           │                        │
           ├──► CHAPTERS[] ─────────┤
           │                        │
           ├──► ANNOUNCEMENTS[] ────┤
           │                        │
           ├──► MATERIALS{} ────────┤
           │                        │
           ├──► PAPER_INFO {} ──────┤
           │                        │
           └──► CONTINUE_WATCHING─→ Components ──► UI
                                    │
                          ┌─────────┴──────────┐
                          │                    │
                     Course Card        ChapterAccordion
                     Video Player       Announcement Card
                     Progress Indicators  Notes Display
```

---

## 🚀 How to Navigate the App

### **From Home Screen:**
1. **Tap "Continue Watching" card** → Goes to Lecture Detail screen (course: FA)
2. **Tap any announcement** → Goes to Announcement Detail screen
3. **Tap course in popular section** → Goes to Lecture Detail screen
4. **Tap quick action buttons** → Future functionality (downloads, analytics, materials)
5. **Tap "My Learning" tab** → Switches to My Learning screen

### **From My Learning Screen:**
1. **Tap any course card** → Goes to Lecture Detail screen for that course

### **From Lecture Detail:**
1. **Tap chapter header** → Expands/collapses lecture list
2. **Tap lecture item** → Future: Opens lesson player
3. **Tap "Download All"** → Future: Downloads chapter materials
4. **Tap different tab** → Switches between Lectures/Overview/Materials/Notes

### **From Announcement Detail:**
1. **Tap back button** → Returns to previous screen with animation
2. **Tap "Go to Page"** → Future: Opens external link

### **Tab Bar Navigation:**
- **Home icon** → Home screen
- **School icon** → My Learning screen
- **Heart icon** → Favorites screen
- **Person icon** → Account screen

---

## 📝 Current Implementation Status

### ✅ Completed
- [x] Tab navigation (4 tabs)
- [x] Course listing
- [x] Lecture detail screen with 4 tabs
- [x] Announcement display
- [x] Dynamic routing
- [x] UI components
- [x] Mock data setup
- [x] Color & theme system
- [x] SVG graphics
- [x] Progress indicators

### ⏳ Pending Implementation
- [ ] Real API integration (`services/api.ts`)
- [ ] User authentication
- [ ] Favorites functionality
- [ ] Note creation/editing
- [ ] Video playback controls
- [ ] Search functionality (backend)
- [ ] Real user profile data
- [ ] Course switching logic
- [ ] Material download feature
- [ ] Offline mode support

---

## 🔧 Development Tips

### **Adding a New Screen**
1. Create file in `src/app/` or `src/app/(tabs)/`
2. Export default component
3. Automatically available via routing

### **Adding Navigation**
```typescript
import { router } from 'expo-router';

// Push new route
router.push('/new-screen');

// With parameters
router.push({ pathname: '/lecture/[id]', params: { id: 'fa' } });

// Go back
router.back();
```

### **Adding Components**
1. Create in `src/components/`
2. Export and import where needed
3. Use TypeScript interfaces for props

### **Extending Color System**
Add new colors in `src/constants/colors.ts`:
```typescript
const palette = {
  // ... existing colors
  customColor: '#XXXXXX',
};
```

### **Adding Data**
Update `src/constants/data.ts` with new arrays/objects matching interfaces in `src/types/index.ts`

---

## 📊 Performance Optimizations

1. **React Compiler** - Enabled in `app.json`
2. **Reanimated** - For smooth animations
3. **SVG Graphics** - Lightweight vector rendering
4. **Lazy Loading** - Screens load on demand via Expo Router
5. **Memoization** - Components can use React.memo if needed

---

## 🔐 Security & Best Practices

1. **TypeScript** - Type safety throughout
2. **File-based routing** - Clear, organized structure
3. **Constants** - Centralized configuration
4. **Component isolation** - Reusable, testable components
5. **Safe navigation** - Route parameters validated

---

## 📱 Platform Support

- **iOS** - Native support with Expo
- **Android** - Native support with Expo
- **Web** - React Native Web support with platform-specific files (`.web.tsx`)
- **Expo Go** - Testable in Expo Go app during development

---

## 🎯 Next Steps for Enhancement

1. **API Integration** - Connect to real backend
2. **Authentication** - Add login/signup flow
3. **State Management** - Consider Redux/Zustand for complex state
4. **Local Storage** - Persist user preferences
5. **Push Notifications** - Announcement delivery
6. **Offline Support** - Cache course content
7. **Analytics** - Track user behavior
8. **Testing** - Unit & integration tests
9. **Error Handling** - Robust error boundaries
10. **Accessibility** - WCAG compliance

---

## 📚 Resources

- **Expo Docs:** https://docs.expo.dev/
- **Expo Router:** https://docs.expo.dev/router/introduction/
- **React Native Docs:** https://reactnative.dev/
- **TypeScript:** https://www.typescriptlang.org/

---

**Document Generated:** June 11, 2026  
**App Version:** 1.0.0  
**Last Updated:** 2026-06-11
