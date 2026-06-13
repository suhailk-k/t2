# HomeApp - Complete Implementation Guide

---

## 📚 Table of Contents
1. [Quick Start Navigation Examples](#quick-start-navigation-examples)
2. [Feature Breakdown](#feature-breakdown)
3. [Data Models & Interfaces](#data-models--interfaces)
4. [Component Usage Guide](#component-usage-guide)
5. [Navigation Examples](#navigation-examples)
6. [Styling & Theme Application](#styling--theme-application)
7. [Future API Integration](#future-api-integration)

---

## 🚀 Quick Start Navigation Examples

### Example 1: Navigate to Course Lecture
```typescript
// From: Home Screen (index.tsx)
import { router } from 'expo-router';
import { COURSES } from '../../constants/data';

export default function HomeScreen() {
  const handleCoursePress = (courseId: string) => {
    router.push({
      pathname: '/lecture/[id]',
      params: { id: courseId }
    });
  };

  return (
    <TouchableOpacity 
      onPress={() => handleCoursePress('fa')}
    >
      <Text>Open Financial Accounting</Text>
    </TouchableOpacity>
  );
}
```

### Example 2: Navigate to Announcement Detail
```typescript
// From: Home Screen or Announcement Card
import { router } from 'expo-router';

const handleAnnouncementPress = (announcementId: string) => {
  router.push({
    pathname: '/announcement/[id]',
    params: { id: announcementId }
  });
};

// Usage
<TouchableOpacity onPress={() => handleAnnouncementPress('a1')}>
  <Text>View Announcement</Text>
</TouchableOpacity>
```

### Example 3: Go Back
```typescript
import { router } from 'expo-router';

<TouchableOpacity onPress={() => router.back()}>
  <Ionicons name="chevron-back" size={22} color={Colors.textPrimary} />
</TouchableOpacity>
```

### Example 4: Switch Between Tabs
```typescript
// Automatic - User taps tab in navigation
// All tab switching is handled by Expo Router's <Tabs> component
// No manual navigation needed - just ensure tab files exist:
// - src/app/(tabs)/index.tsx
// - src/app/(tabs)/my-learning.tsx
// - src/app/(tabs)/favourites.tsx
// - src/app/(tabs)/account.tsx
```

---

## 🎯 Feature Breakdown

### Feature 1: Course Discovery & Tracking
**Location:** Home Screen & My Learning Screen

**What it does:**
- Displays all available courses
- Shows progress percentage for each course
- Lists completed chapters vs total chapters
- Color-coded by course type (FR, FA, LW, etc.)

**Data Source:** `COURSES` array in `constants/data.ts`

**Components Used:**
- `CourseCard` (horizontal variant on Home, list variant on My Learning)
- `CircularProgress`

**Implementation:**
```typescript
// Display course with progress
{COURSES.map((course) => (
  <CourseCard
    key={course.id}
    course={course}
    variant="list"
    onPress={() => router.push({
      pathname: '/lecture/[id]',
      params: { id: course.id }
    })}
  />
))}
```

---

### Feature 2: Video Playback & Continue Watching
**Location:** Home Screen (Continue Watching Card)

**What it does:**
- Shows featured video (last watched lecture)
- Displays progress bar (85% complete)
- Shows time remaining (3 min left)
- Indicates when last watched (2 hours ago)
- Clickable to resume lecture

**Data Source:** `CONTINUE_WATCHING` in `constants/data.ts`

**Components Used:**
- `ContinueWatchingCard`
- `VideoPlayer`
- Progress indicators

**Video Specifications:**
```typescript
videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
progress: 0.85 // 85% complete
timeLeft: '3 min left'
lastWatched: '2 hours ago'
```

---

### Feature 3: Multi-Tab Learning Interface
**Location:** Lecture Detail Screen (`lecture/[id]`)

**What it does:**
- 4 tabs: Lectures, Overview, Materials, Notes
- Search functionality in Lectures tab
- Expandable chapters with lectures
- Course information and statistics
- Downloadable materials
- Timestamped notes

**Data Sources:**
- `CHAPTERS` - For Lectures tab
- `PAPER_INFO` - For Overview tab
- `MATERIALS` - For Materials tab
- `NOTES` - For Notes tab

**Tab Structure:**
```typescript
const TABS: TabName[] = ['Lectures', 'Overview', 'Materials', 'Notes'];

// Each tab has different content renderer
const renderTabContent = (tabName: TabName) => {
  switch(tabName) {
    case 'Lectures': return <LecturesTab />;
    case 'Overview': return <OverviewTab />;
    case 'Materials': return <MaterialsTab />;
    case 'Notes': return <NotesTab />;
  }
};
```

**Lectures Tab Details:**
```typescript
// Shows chapters that expand to reveal lectures
CHAPTERS = [
  {
    id: 'ch1',
    number: 1,
    title: 'Business Organization & Structure',
    expanded: false,
    lectures: [
      { id: 'l1', title: 'Introduction', duration: '9:47 min', completed: false },
      { id: 'l2', title: 'Business Types', duration: '9:47 min', completed: false }
    ]
  },
  // ... more chapters
]
```

---

### Feature 4: Announcement System
**Location:** Home Screen + Announcement Detail

**What it does:**
- Displays multiple announcements
- Shows categories (Academics, Resources, etc.)
- Full-screen detail view with hero image
- Post date and content
- Call-to-action button

**Data Source:** `ANNOUNCEMENTS` array

**Sample Announcement:**
```typescript
{
  id: 'a1',
  title: 'ACCA EXAM & ACADEMIC UPDATES',
  category: 'Academics',
  excerpt: 'Dear Students, We are pleased to...',
  content: 'Full announcement text...',
  imageUrl: 'https://images.unsplash.com/...',
  postDate: '12 December 2025'
}
```

**Navigation:**
```typescript
// Tap announcement card
router.push({
  pathname: '/announcement/[id]',
  params: { id: announcement.id }
});

// In detail screen, retrieve with:
const { id } = useLocalSearchParams<{ id: string }>();
const announcement = ANNOUNCEMENTS.find((a) => a.id === id);
```

---

### Feature 5: Course Program Switching
**Location:** Switch Course Screen

**What it does:**
- Select between different course programs
- Radio button UI for selection
- Visual feedback on selection
- Three options: ACCA, CMA, CA

**Implementation:**
```typescript
interface CourseOption {
  id: string;
  label: string;
  description: string;
}

const OPTIONS: CourseOption[] = [
  { 
    id: 'acca', 
    label: 'ACCA', 
    description: 'Association of Chartered Certified Accountants' 
  },
  { 
    id: 'cma', 
    label: 'CMA', 
    description: 'Cost & Management Accounting' 
  },
  { 
    id: 'ca', 
    label: 'CA', 
    description: 'Chartered Accountancy' 
  },
];

// State management
const [selected, setSelected] = useState('acca');
```

**Navigation:**
```typescript
// Access from Home screen with quick action or header button
router.push('/switch-course');

// Go back
router.back();
```

---

### Feature 6: Quick Actions
**Location:** Home Screen

**What it does:**
- Three action buttons with icons
- Downloads, Analytics, Materials
- Placeholder for future functionality

**Components:**
- `DownloadIcon` (SVG)
- `AnalyticsIcon` (SVG) - trending chart
- `MaterialsIcon` (SVG) - document

**Implementation:**
```typescript
const QuickActionButtons = [
  { id: 'downloads', title: 'Downloads', icon: DownloadIcon },
  { id: 'analytics', title: 'Analytics', icon: AnalyticsIcon },
  { id: 'materials', title: 'Materials', icon: MaterialsIcon },
];

// Future: Add onPress handlers for each
```

---

### Feature 7: User Profile (Placeholder)
**Location:** Account Tab

**What it does:**
- Displays user profile information
- Name and email
- Ready for real user data integration

**Current Implementation:**
```typescript
export default function AccountScreen() {
  return (
    <View style={styles.empty}>
      <Ionicons name="person-circle-outline" size={72} />
      <Text style={styles.name}>Student</Text>
      <Text style={styles.email}>student@elance.com</Text>
    </View>
  );
}
```

**Future Enhancement:**
```typescript
// Will integrate with auth system
const user = useAuth()?.user;
<Text>{user?.name || 'Student'}</Text>
<Text>{user?.email || 'student@elance.com'}</Text>
```

---

### Feature 8: Favorites (Placeholder)
**Location:** Favorites Tab

**What it does:**
- Shows favorited content
- Currently empty state
- Ready for bookmark functionality

**Current Implementation:**
```typescript
<View style={styles.empty}>
  <Ionicons name="heart-outline" size={56} />
  <Text>No Favourites Yet</Text>
  <Text>Items you favourite will appear here.</Text>
</View>
```

---

## 📊 Data Models & Interfaces

### Course Interface
```typescript
interface Course {
  id: string;              // Unique identifier ('fa', 'fr', 'lw')
  title: string;           // "Financial Accounting"
  code: string;            // "FA" - used for color mapping
  thumbnail: string;       // Image URL
  totalChapters: number;   // e.g., 12
  completedChapters: number; // e.g., 8
  progress: number;        // 0-100 percentage (67)
}

// Example
const course: Course = {
  id: 'fa',
  title: 'Financial Accounting',
  code: 'FA',
  thumbnail: 'https://images.unsplash.com/...',
  totalChapters: 12,
  completedChapters: 8,
  progress: 67
};
```

### Chapter Interface
```typescript
interface Chapter {
  id: string;              // 'ch1'
  number: number;          // 1
  title: string;           // 'Business Organization & Structure'
  lectures: Lecture[];     // Array of lectures
  expanded?: boolean;      // Initial expansion state
}

// Example
const chapter: Chapter = {
  id: 'ch1',
  number: 1,
  title: 'Business Organization & Structure',
  expanded: false,
  lectures: [
    { 
      id: 'l1', 
      title: 'Introduction to Organizations', 
      duration: '9:47 min', 
      completed: false 
    },
    // ... more lectures
  ]
};
```

### Lecture Interface
```typescript
interface Lecture {
  id: string;              // 'l1'
  title: string;           // 'Introduction to Organizations'
  duration: string;        // '9:47 min'
  completed: boolean;      // false | true
}
```

### Announcement Interface
```typescript
interface Announcement {
  id: string;              // 'a1'
  title: string;           // 'ACCA EXAM & ACADEMIC UPDATES'
  category: string;        // 'Academics' or 'Resources'
  excerpt: string;         // Short preview
  content: string;         // Full announcement text
  imageUrl: string;        // Hero image URL
  postDate: string;        // '12 December 2025'
}
```

### Material Interface
```typescript
interface Material {
  id: string;              // 'm1'
  title: string;           // 'Depreciation Formula Sheet'
  type: 'pdf' | 'doc';     // File type
  section: 'topic' | 'chapter'; // Where it appears
}

// Usage in data
const MATERIALS = {
  topic: [Material, Material],
  chapter: [Material, Material, Material]
};
```

### Note Interface
```typescript
interface Note {
  id: string;              // 'n1'
  timestamp: string;       // '0:21' (video timestamp)
  title: string;           // 'Depreciation Formula Sheet'
  content: string;         // Full note content
}
```

### PaperInfo Interface
```typescript
interface PaperInfo {
  paper: string;           // 'Financial Accounting (FA)'
  chaptersCompleted: string; // '8/12'
  examWeightage: string;   // '10 - 15%'
  updated: string;         // '25 days ago'
  totalDuration: string;   // '7 hr 30 min'
  difficulty: string;      // 'Beginner'
  completionRate: string;  // '86%'
  engagementScore: string; // '78/100'
  materialsAvailable: number; // 25
  instructors: string[];   // ['Sarah William, FCCA', ...]
  description: string;     // Full course description
  skills: string[];        // Array of skills learned
}
```

---

## 🧩 Component Usage Guide

### CourseCard Component

**Props:**
```typescript
interface CourseCardProps {
  course: Course;                      // Required
  variant?: 'horizontal' | 'list';     // Optional (default: 'horizontal')
  onPress?: () => void;                // Optional callback
}
```

**Horizontal Variant** (Home screen):
```typescript
<CourseCard
  course={COURSES[0]}
  variant="horizontal"
  onPress={() => router.push({...})}
/>

// Output:
// ┌─────────────────────┐
// │ [Color] Code: FA ✦  │
// │ Financial Account...│
// │ [Badge] [Progress]  │
// │ 8/12 Chapters       │
// └─────────────────────┘
```

**List Variant** (My Learning screen):
```typescript
<CourseCard
  course={COURSES[0]}
  variant="list"
  onPress={() => router.push({...})}
/>

// Output:
// ┌──────────────────────────┐
// │ [Thumb] Title  8/12 [🔄] │
// │         FA          67%  │
// └──────────────────────────┘
```

---

### ChapterAccordion Component

**Props:**
```typescript
interface ChapterAccordionProps {
  chapter: Chapter;
}
```

**Usage:**
```typescript
import { ChapterAccordion } from '../components/ChapterAccordion';

{CHAPTERS.map((chapter) => (
  <ChapterAccordion key={chapter.id} chapter={chapter} />
))}

// Output when collapsed:
// ┌─────────────────────────────────────┐
// │ Chapter 1: Business Organization    │ ▼
// │                  [Download All]     │
// └─────────────────────────────────────┘

// When expanded:
// ┌─────────────────────────────────────┐
// │ Chapter 1: Business Organization    │ △
// │                  [Download All]     │
// ├─────────────────────────────────────┤
// │ • Introduction to Organizations     │
// │   9:47 min                          │
// │ • Types of Business Structures      │
// │   9:47 min                      ✓   │
// └─────────────────────────────────────┘
```

---

### CircularProgress Component

**Props:**
```typescript
interface CircularProgressProps {
  progress: number;        // 0-100 percentage
  size?: number;          // Width/height in pixels
  strokeWidth?: number;   // Border width
}
```

**Usage:**
```typescript
import { CircularProgress } from '../components/CircularProgress';

<CircularProgress progress={67} size={44} strokeWidth={3} />

// Shows: ⭕ with 67% filled
```

---

### VideoPlayer Component

**Props:**
```typescript
interface VideoPlayerProps {
  source: string;         // Video URL
  thumbnailUrl?: string;  // Poster image
  title?: string;         // Video title
  controls?: boolean;     // Show controls
}
```

**Usage:**
```typescript
<VideoPlayer
  source={CONTINUE_WATCHING.videoUrl}
  thumbnailUrl={CONTINUE_WATCHING.thumbnailUrl}
  title={CONTINUE_WATCHING.title}
/>
```

---

## 🧭 Navigation Examples

### Complete Navigation Flow Example

```typescript
// 1. HOME SCREEN - User viewing home
export default function HomeScreen() {
  return (
    <ScrollView>
      {/* Continue Watching Card */}
      <TouchableOpacity
        onPress={() => router.push({
          pathname: '/lecture/[id]',
          params: { id: CONTINUE_WATCHING.courseId } // 'fa'
        })}
      >
        <ContinueWatchingCard data={CONTINUE_WATCHING} />
      </TouchableOpacity>

      {/* Announcement Card */}
      {ANNOUNCEMENTS.map(ann => (
        <TouchableOpacity
          key={ann.id}
          onPress={() => router.push({
            pathname: '/announcement/[id]',
            params: { id: ann.id }
          })}
        >
          <AnnouncementCard announcement={ann} />
        </TouchableOpacity>
      ))}

      {/* Course Card */}
      {COURSES.slice(0, 5).map(course => (
        <TouchableOpacity
          key={course.id}
          onPress={() => router.push({
            pathname: '/lecture/[id]',
            params: { id: course.id }
          })}
        >
          <CourseCard course={course} variant="horizontal" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// 2. LECTURE DETAIL - User opens 'fa' course
export default function LectureDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabName>('Lectures');

  // id === 'fa'
  const courseData = PAPER_INFO; // Retrieved by course id
  const chapters = CHAPTERS; // Retrieved by course id

  return (
    <>
      <TabNavigation
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === 'Lectures' && (
        <ScrollView>
          <SearchInput />
          {chapters.map(ch => (
            <ChapterAccordion key={ch.id} chapter={ch} />
          ))}
        </ScrollView>
      )}

      {activeTab === 'Overview' && (
        <ScrollView>
          <PaperInfoDisplay data={courseData} />
          <InstructorsDisplay instructors={courseData.instructors} />
        </ScrollView>
      )}

      {/* ... other tabs */}

      <BackButton onPress={() => router.back()} />
    </>
  );
}

// 3. ANNOUNCEMENT DETAIL - User views full announcement
export default function AnnouncementDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // id === 'a1'
  const announcement = ANNOUNCEMENTS.find(a => a.id === id);

  return (
    <>
      <ScrollView>
        <Image source={{ uri: announcement.imageUrl }} />
        <Text>{announcement.postDate}</Text>
        <Badge>{announcement.category}</Badge>
        <Text>{announcement.content}</Text>
        <Button>Go to Page</Button>
      </ScrollView>
      <BackButton onPress={() => router.back()} />
    </>
  );
}

// 4. MY LEARNING - User views all courses
export default function MyLearningScreen() {
  return (
    <ScrollView>
      {COURSES.map(course => (
        <TouchableOpacity
          key={course.id}
          onPress={() => router.push({
            pathname: '/lecture/[id]',
            params: { id: course.id }
          })}
        >
          <CourseCard course={course} variant="list" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
```

---

## 🎨 Styling & Theme Application

### Using Colors

```typescript
import { Colors } from '../../constants/colors';

// Text colors
<Text style={{ color: Colors.textPrimary }}>Main text</Text>
<Text style={{ color: Colors.textSecondary }}>Secondary text</Text>
<Text style={{ color: Colors.textTertiary }}>Hint text</Text>
<Text style={{ color: Colors.textMuted }}>Very light text</Text>

// Component colors
<TouchableOpacity style={{ backgroundColor: Colors.primary }}>
  <Text style={{ color: Colors.white }}>Primary Button</Text>
</TouchableOpacity>

// Status colors
<View style={{ backgroundColor: Colors.successLight }}>
  <Text style={{ color: Colors.success }}>Success!</Text>
</View>

// Course code colors
import { getCodeColor } from '../../utils/helpers';

const bgColor = getCodeColor('FA'); // Returns '#6366F1'
<View style={{ backgroundColor: bgColor }}>
  <Text>FA</Text>
</View>
```

### Using Typography

```typescript
import { Typography } from '../../constants/theme';

<Text style={Typography.h1}>Large Heading</Text>
<Text style={Typography.h2}>Section Header</Text>
<Text style={Typography.h3}>Subsection</Text>
<Text style={Typography.body}>Normal text</Text>
<Text style={Typography.small}>Small text</Text>
<Text style={Typography.caption}>Tiny text</Text>

// Custom styling
<Text style={[Typography.bodyBold, { color: Colors.primary }]}>
  Bold Primary Text
</Text>
```

### Using Spacing

```typescript
import { Spacing } from '../../constants/theme';

<View style={{ padding: Spacing.base }}>          {/* 16px */}
  <View style={{ marginBottom: Spacing.md }}>    {/* 12px */}
    <Text>Spaced content</Text>
  </View>
</View>

// All spacing values
// xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, xxl: 32
```

### Using Shadows

```typescript
import { Shadow } from '../../constants/theme';

<View style={[styles.card, Shadow.card]}>       {/* Subtle */}
  <Text>Card content</Text>
</View>

<View style={[styles.header, Shadow.header]}>   {/* Very subtle */}
  <Text>Header</Text>
</View>

<View style={[styles.prominent, Shadow.strong]}> {/* Prominent */}
  <Text>Important element</Text>
</View>
```

### Using Border Radius

```typescript
import { BorderRadius } from '../../constants/theme';

<View style={{ borderRadius: BorderRadius.xs }}>     {/* 4px */}
  <Text>Slightly rounded</Text>
</View>

<View style={{ borderRadius: BorderRadius.lg }}>     {/* 12px */}
  <Text>Rounded card</Text>
</View>

<View style={{ borderRadius: BorderRadius.full }}>   {/* Circle */}
  <Text>Circular button</Text>
</View>
```

---

## 🔄 Future API Integration

### Current State (Mock Data)
```typescript
// src/constants/data.ts
export const COURSES: Course[] = [
  { id: 'fa', title: 'Financial Accounting', ... },
  // ... hardcoded data
];
```

### Future State (API Integration)

**Step 1: Create API Service**
```typescript
// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'https://api.homeapp.com/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Courses API
export const coursesAPI = {
  getAll: () => apiClient.get<Course[]>('/courses'),
  getById: (id: string) => apiClient.get<Course>(`/courses/${id}`),
  getProgress: (courseId: string) => apiClient.get(`/courses/${courseId}/progress`),
};

// Lectures API
export const lecturesAPI = {
  getChapters: (courseId: string) => apiClient.get<Chapter[]>(`/courses/${courseId}/chapters`),
  getLecture: (lectureId: string) => apiClient.get(`/lectures/${lectureId}`),
  markComplete: (lectureId: string) => apiClient.post(`/lectures/${lectureId}/complete`),
};

// Announcements API
export const announcementsAPI = {
  getAll: () => apiClient.get<Announcement[]>('/announcements'),
  getById: (id: string) => apiClient.get<Announcement>(`/announcements/${id}`),
};

// Materials API
export const materialsAPI = {
  getByChapter: (chapterId: string) => apiClient.get(`/chapters/${chapterId}/materials`),
  download: (materialId: string) => apiClient.post(`/materials/${materialId}/download`),
};
```

**Step 2: Create Custom Hooks**
```typescript
// src/hooks/useCourses.ts
import { useEffect, useState } from 'react';
import { coursesAPI } from '../services/api';
import { Course } from '../types';

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getAll();
      setCourses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { courses, loading, error, refetch: fetchCourses };
};
```

**Step 3: Update Components**
```typescript
// Before (using mock data)
import { COURSES } from '../../constants/data';

export default function MyLearningScreen() {
  return (
    <ScrollView>
      {COURSES.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </ScrollView>
  );
}

// After (using API)
import { useCourses } from '../../hooks/useCourses';
import { CircularProgress } from '../CircularProgress';

export default function MyLearningScreen() {
  const { courses, loading, error, refetch } = useCourses();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorScreen error={error} onRetry={refetch} />;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refetch} />
      }
    >
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </ScrollView>
  );
}
```

**Step 4: Add State Management (if needed)**
```typescript
// src/store/coursesSlice.ts (using Redux Toolkit)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { coursesAPI } from '../services/api';
import { Course } from '../types';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await coursesAPI.getAll();
    return response.data;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [] as Course[],
    loading: false,
    error: null as string | null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch';
        state.loading = false;
      });
  },
});

export default coursesSlice.reducer;
```

---

## 🎓 Learning Path for New Developers

### Day 1: Understand the App Structure
1. Read [PROJECT_REPORT.md](PROJECT_REPORT.md)
2. Read [NAVIGATION_ARCHITECTURE.md](NAVIGATION_ARCHITECTURE.md)
3. Explore folder structure in VS Code

### Day 2: Study Navigation
1. Learn Expo Router basics
2. Understand file-based routing
3. Review all route files in `src/app/`
4. Test navigation between screens

### Day 3: Understand Data Flow
1. Review `constants/data.ts`
2. Study `types/index.ts`
3. Understand how data flows to components
4. Trace a complete user journey

### Day 4: Component Development
1. Study existing components
2. Create a new test component
3. Add it to a screen
4. Style it using the theme system

### Day 5: API Integration
1. Set up API service (`services/api.ts`)
2. Create custom hooks
3. Replace mock data with API calls
4. Add loading/error states

---

**Complete Implementation Guide**  
**Version:** 1.0  
**Created:** June 11, 2026
