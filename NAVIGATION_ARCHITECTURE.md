# HomeApp - Navigation & Architecture Visualizations

---

## 🗺️ Complete Navigation Map

### Navigation Flow Chart

```
┌──────────────────────────────────────────────────────────────────┐
│                        ROOT STACK LAYOUT                         │
│  (src/app/_layout.tsx - Hidden header, dark status bar)          │
└──────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
         ┌──────────▼──────────┐   │   ┌───────────▼────────┐
         │  (TABS) GROUP      │   │   │ MODAL SCREENS      │
         │  Tab Navigation    │   │   │ (slide_from_right) │
         └──────────┬──────────┘   │   └───────────┬────────┘
                    │              │               │
        ┌───────────┼───────────┐  │  ┌────────────┼────────────┐
        │           │           │  │  │            │            │
    ┌───▼───┐  ┌───▼───┐  ┌───▼───┐  │  ┌────────▼─┐  ┌────────▼─┐
    │ HOME  │  │  MY   │  │FAVS   │  │  │SWITCH   │  │LECTURE   │
    │ (Hot) │  │LEARN  │  │(Empty)│  │  │COURSE   │  │[id]      │
    │─────────────────────────────┤  │  ├─────────┤  ├────────────┤
    │ • Continue Watching      │  │  │ • Options│  │ • Tabs    │
    │ • Quick Actions          │  │  │ (ACCA,   │  │ • Back    │
    │   ○ Downloads            │  │  │  CMA, CA)│  │ • Dynamic │
    │   ○ Analytics            │  │  └─────────┘  └────────────┘
    │   ○ Materials            │  │
    │ • Announcements          │  │   ┌────────────────────┐
    │ • Popular Courses        │  │   │ANNOUNCEMENT [id]   │
    └─────────────────────────────┘   │─────────────────────┤
                    │                 │ • Hero Image        │
                    │                 │ • Post Date         │
        ┌───────────▼──────────┐      │ • Category Badge   │
        │ ACCOUNT (Placeholder)│      │ • Content          │
        │─────────────────────────┐  │ • "Go to Page" btn  │
        │ • Profile info          │  │ • Back Button       │
        │ • Student credentials   │  └────────────────────┘
        └─────────────────────────┘
```

---

## 🎯 Screen Interaction Flow

```
                        ┌─────────────┐
                        │  App Start  │
                        └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │  Home Tab   │
                        │ (Default)   │
                        └──────┬──────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
    ┌────▼────┐            ┌──▼──┐              ┌──▼──┐
    │Switch   │            │View │              │View │
    │Course   │            │Ann- │              │Lect-│
    │         │            │ounce│              │ure  │
    │    │    │            │     │              │[id] │
    │    └────┼────────────┘     │              │     │
    │         │                  │              │  │  │
    │    ┌────▼─────────────────────────────────▼──┼──┐
    │    │  Lecture Detail Screen [id]             │  │
    │    │  ┌──────────────────────────────────┐   │  │
    │    │  │  Tabs: Lect|Overv|Mater|Notes   │   │  │
    │    │  ├──────────────────────────────────┤   │  │
    │    │  │ Lectures Tab:                    │   │  │
    │    │  │ ├─ Chapter 1 (expanded)         │   │  │
    │    │  │ │ ├─ Lecture 1 (unchecked)     │   │  │
    │    │  │ │ └─ Lecture 2 (checked ✓)     │   │  │
    │    │  │ └─ Chapter 2 (collapsed)        │   │  │
    │    │  │                                 │   │  │
    │    │  │ Overview Tab:                   │   │  │
    │    │  │ ├─ Paper Info                  │   │  │
    │    │  │ ├─ Statistics                  │   │  │
    │    │  │ ├─ Instructors                 │   │  │
    │    │  │ ├─ Description                 │   │  │
    │    │  │ └─ Skills                      │   │  │
    │    │  │                                 │   │  │
    │    │  │ Materials Tab:                  │   │  │
    │    │  │ ├─ Topic Materials (2)         │   │  │
    │    │  │ └─ Chapter Resources (3)       │   │  │
    │    │  │                                 │   │  │
    │    │  │ Notes Tab:                      │   │  │
    │    │  │ ├─ Note 1 (0:21)               │   │  │
    │    │  │ ├─ Note 2 (0:21)               │   │  │
    │    │  │ └─ Note 3 (0:21)               │   │  │
    │    │  └──────────────────────────────────┘   │  │
    │    │  [Back Button] ◄──────────────────────┘  │  │
    │    │                                          │  │
    │    │  [All navigations lead back]             │  │
    │    └──────────────────────────────────────────┘  │
    │                                                    │
    │    ┌────────────────────────────────────────────┐ │
    │    │  Announcement Detail [id]                 │ │
    │    │  ├─────────────────────────────────────┐  │ │
    │    │  │ [Back Button]                       │  │ │
    │    │  ├─────────────────────────────────────┤  │ │
    │    │  │ [Hero Image - 220px]               │  │ │
    │    │  ├─────────────────────────────────────┤  │ │
    │    │  │ Post Date: 12 December 2025         │  │ │
    │    │  │ [Academics Badge]                   │  │ │
    │    │  │ Full announcement content...         │  │ │
    │    │  │ Lorem ipsum dolor sit amet...       │  │ │
    │    │  │ [Go to Page Button]                 │  │ │
    │    │  └─────────────────────────────────────┘  │ │
    │    │                                            │ │
    │    │  [Back Button] ◄──────────────────────────┘ │
    │    └──────────────────────────────────────────────┘
    │
    └─────► Tab Bar Navigation ─────┐
                                    │
        ┌───────────────────────────┼──────────────────┐
        │                           │                  │
    ┌───▼────────────┐          ┌───▼────────────┐  ┌─▼──────────┐
    │ Home Tab       │ ◄────────┤ My Learning    │  │ Favs/Acct  │
    │                │          │                │  │            │
    │ (This leads    │          │ ├─ Course 1   │  │ Placeheld  │
    │  to all other  │          │ ├─ Course 2   │  │ for future │
    │  screens)      │          │ ├─ Course 3   │  │            │
    │                │          │ └─ Course 7   │  └────────────┘
    │                │          │ (All courses   │
    └────────────────┘          │  clickable)    │
                                └────────────────┘
```

---

## 📱 Tab Navigation Structure

```
┌────────────────────────────────────────────────────────────┐
│                    TAB NAVIGATION                          │
│          (src/app/(tabs)/_layout.tsx)                      │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Height: iOS 84px | Android 64px                          │
│  Background: White (#FFFFFF)                              │
│  Border top: 1px #E5E7EB                                  │
│                                                             │
│  [Home]        [My Learning]    [Favs]      [Account]    │
│   🏠            📚 (active→✓)    ❤️           👤          │
│ Outline→Filled                                            │
│  Color: Active #2563EB | Inactive #9CA3AF                │
│  Label size: 11px                                         │
│                                                             │
└────────────────────────────────────────────────────────────┘
         │            │              │           │
         ▼            ▼              ▼           ▼
    ┌────────┐  ┌──────────────┐ ┌──────┐  ┌────────┐
    │ Home   │  │ My Learning  │ │Favs  │  │Account │
    └────────┘  └──────────────┘ └──────┘  └────────┘
```

---

## 🔀 Component Composition Tree

```
<RootLayout>
│
├─ <StatusBar>
│
└─ <Stack screenOptions={{headerShown: false}}>
   │
   ├─ (tabs) - TAB STACK
   │  │
   │  └─ <Tabs screenOptions={{...}}>
   │     │
   │     ├─ Home Screen
   │     │  │
   │     │  ├─ ElanceLogo (SVG)
   │     │  │
   │     │  ├─ QuickActions Container
   │     │  │  ├─ DownloadIcon (SVG)
   │     │  │  ├─ AnalyticsIcon (SVG)
   │     │  │  └─ MaterialsIcon (SVG)
   │     │  │
   │     │  ├─ ContinueWatchingCard
   │     │  │  ├─ Image
   │     │  │  ├─ VideoMetadata
   │     │  │  └─ ProgressBar
   │     │  │
   │     │  ├─ AnnouncementsSection
   │     │  │  └─ AnnouncementCard[] (ScrollView)
   │     │  │     ├─ Image
   │     │  │     ├─ Title
   │     │  │     └─ Excerpt
   │     │  │
   │     │  └─ PopularCoursesSection
   │     │     └─ CourseCard[] (horizontal, ScrollView)
   │     │        ├─ CourseThumbnail
   │     │        ├─ CourseInfo
   │     │        └─ CircularProgress
   │     │
   │     ├─ My Learning Screen
   │     │  └─ CourseCard[] (list variant, ScrollView)
   │     │     ├─ CourseThumbnail
   │     │     ├─ CourseInfo
   │     │     └─ CircularProgress
   │     │
   │     ├─ Favorites Screen
   │     │  └─ EmptyState
   │     │     ├─ HeartIcon
   │     │     ├─ Title
   │     │     └─ Description
   │     │
   │     └─ Account Screen
   │        └─ UserProfile
   │           ├─ PersonIcon
   │           ├─ Name
   │           └─ Email
   │
   ├─ switch-course
   │  │
   │  ├─ BackButton
   │  │
   │  ├─ Heading
   │  │
   │  └─ OptionCard[] (ScrollView)
   │     ├─ OptionText
   │     └─ RadioButton
   │
   ├─ lecture/[id]
   │  │
   │  ├─ FABadge
   │  │
   │  ├─ TabNavigation
   │  │  ├─ LecturesTab
   │  │  │  ├─ SearchInput
   │  │  │  └─ ChapterAccordion[]
   │  │  │     ├─ ChapterHeader
   │  │  │     │  ├─ ChapterInfo
   │  │  │     │  ├─ DownloadAllBtn
   │  │  │     │  └─ ExpandIcon
   │  │  │     │
   │  │  │     └─ LecturesList (when expanded)
   │  │  │        └─ LectureRow[]
   │  │  │           ├─ LectureInfo
   │  │  │           └─ CompletionBadge (conditional)
   │  │  │
   │  │  ├─ OverviewTab
   │  │  │  ├─ PaperInfoSection
   │  │  │  │  └─ InfoRow[]
   │  │  │  ├─ StatisticsSection
   │  │  │  │  └─ InfoRow[]
   │  │  │  ├─ InstructorsSection
   │  │  │  │  └─ BulletList
   │  │  │  ├─ DescriptionSection
   │  │  │  │  └─ Text
   │  │  │  └─ SkillsSection
   │  │  │     └─ BulletList
   │  │  │
   │  │  ├─ MaterialsTab
   │  │  │  ├─ TopicMaterialsSection
   │  │  │  │  └─ MaterialItem[]
   │  │  │  │     ├─ FileIcon
   │  │  │  │     ├─ FileName
   │  │  │  │     └─ DownloadBtn
   │  │  │  │
   │  │  │  └─ ChapterResourcesSection
   │  │  │     └─ MaterialItem[]
   │  │  │
   │  │  └─ NotesTab
   │  │     └─ NoteItem[]
   │  │        ├─ Timestamp
   │  │        ├─ Title
   │  │        ├─ Content
   │  │        └─ ActionBtns (edit/delete)
   │  │
   │  └─ BackButton
   │
   └─ announcement/[id]
      │
      ├─ BackButton
      │
      ├─ ScrollView
      │  ├─ HeroImage
      │  └─ Content
      │     ├─ PostDate
      │     ├─ CategoryBadge
      │     ├─ ContentText
      │     └─ GoToPageButton
```

---

## 🎯 Data Flow Architecture

```
                    ┌─────────────────┐
                    │  app.json       │
                    │  Configuration  │
                    └────────┬────────┘
                             │
    ┌────────────────────────┼────────────────────────┐
    │                        │                        │
    ▼                        ▼                        ▼
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│ Expo Router │      │ React Native │      │ Color Scheme │
│ (v56.2.10)  │      │ Components   │      │ System       │
└──────┬──────┘      └──────────────┘      └──────────────┘
       │
       └────────────────┬─────────────────┐
                        │                 │
                        ▼                 ▼
              ┌────────────────┐   ┌──────────────────┐
              │ File-based     │   │ Navigation API   │
              │ Routing        │   │ (router.push,    │
              │                │   │  router.back)    │
              └────────┬───────┘   └──────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    ┌──────────┐  ┌──────────┐  ┌─────────────┐
    │ Tab      │  │ Stack    │  │ Dynamic     │
    │ Routes   │  │ Routes   │  │ Routes      │
    │ (Group)  │  │          │  │ ([id])      │
    └──────┬───┘  └──────┬───┘  └──────┬──────┘
           │             │             │
        ┌──▼─────────────▼─────────────▼──┐
        │                                  │
        │     Component Rendering         │
        │                                  │
        │  ┌────────────────────────────┐ │
        │  │ Constants/Data Layer       │ │
        │  │ ├─ COURSES                 │ │
        │  │ ├─ CHAPTERS                │ │
        │  │ ├─ ANNOUNCEMENTS           │ │
        │  │ ├─ MATERIALS               │ │
        │  │ ├─ PAPER_INFO              │ │
        │  │ ├─ CONTINUE_WATCHING       │ │
        │  │ └─ QUICK_ACTIONS           │ │
        │  └────────┬───────────────────┘ │
        │           │                      │
        │  ┌────────▼──────────────────┐  │
        │  │ TypeScript Types          │  │
        │  │ ├─ Course                 │  │
        │  │ ├─ Chapter                │  │
        │  │ ├─ Lecture                │  │
        │  │ ├─ Announcement           │  │
        │  │ ├─ Material               │  │
        │  │ ├─ Note                   │  │
        │  │ └─ PaperInfo              │  │
        │  └───────────────────────────┘  │
        │                                  │
        │  ┌────────────────────────────┐ │
        │  │ Components                 │ │
        │  │ ├─ CourseCard              │ │
        │  │ ├─ ChapterAccordion        │ │
        │  │ ├─ CircularProgress        │ │
        │  │ ├─ VideoPlayer             │ │
        │  │ ├─ MaterialItem            │ │
        │  │ ├─ NoteItem                │ │
        │  │ └─ AnnouncementCard        │ │
        │  └───────────────────────────┘  │
        │                                  │
        │  ┌────────────────────────────┐ │
        │  │ Theme & Styling            │ │
        │  │ ├─ Colors                  │ │
        │  │ ├─ Typography              │ │
        │  │ ├─ Spacing                 │ │
        │  │ ├─ Shadows                 │ │
        │  │ └─ BorderRadius            │ │
        │  └───────────────────────────┘  │
        │                                  │
        └──────────────┬───────────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  UI Rendered         │
            │  on Screen           │
            └──────────────────────┘
```

---

## 🎨 Component State Management

```
Screen Component (Home)
│
├─ Props: None (Tab screen)
├─ State: None (static data display)
└─ Data Source: COURSES, ANNOUNCEMENTS, CONTINUE_WATCHING

Screen Component (Lecture Detail)
│
├─ Route Params: { id: string }
├─ State:
│  ├─ activeTab: TabName (useState)
│  ├─ selectedTab: 'Lectures'|'Overview'|'Materials'|'Notes'
│  └─ search: string (in LecturesTab)
└─ Data Sources:
   ├─ CHAPTERS (for Lectures tab)
   ├─ PAPER_INFO (for Overview tab)
   ├─ MATERIALS (for Materials tab)
   └─ NOTES (for Notes tab)

Component (ChapterAccordion)
│
├─ Props: chapter: Chapter
├─ State: expanded: boolean (useState)
└─ Event Handlers:
   ├─ onPress → toggleExpanded
   ├─ Download All → future handler
   └─ Lecture tap → future handler

Component (CourseCard)
│
├─ Props:
│  ├─ course: Course
│  ├─ variant?: 'horizontal' | 'list'
│  └─ onPress?: () => void
├─ State: None (presentational)
└─ Computed:
   ├─ bgColor: getCodeColor(course.code)
   └─ Progress percentage display

Component (Switch Course)
│
├─ Props: None
├─ State: selected: string (useState)
└─ Options: ACCA, CMA, CA (radio selection UI)
```

---

## 🔗 Route Parameter Usage

### Lecture Detail Route

**Route Definition:**
```
/lecture/[id]
```

**Parameter Extraction:**
```typescript
const { id } = useLocalSearchParams<{ id: string }>();
```

**Navigation:**
```typescript
// From Home
router.push({ pathname: '/lecture/[id]', params: { id: 'fa' } });

// From My Learning
router.push({ pathname: '/lecture/[id]', params: { id: course.id } });
```

**Data Lookup:**
```typescript
const course = COURSES.find(c => c.id === id);
const courseData = PAPER_INFO; // Could be indexed by id in future
```

### Announcement Detail Route

**Route Definition:**
```
/announcement/[id]
```

**Parameter Extraction:**
```typescript
const { id } = useLocalSearchParams<{ id: string }>();
```

**Navigation:**
```typescript
router.push({ pathname: '/announcement/[id]', params: { id: announcement.id } });
```

**Data Lookup:**
```typescript
const announcement = ANNOUNCEMENTS.find(a => a.id === id) ?? ANNOUNCEMENTS[0];
```

---

## 📊 Data Relationships

```
Course
├─ id ─────► (primary key)
├─ code ───► Maps to color in getThumbnailColor()
├─ progress ─► Displayed in CircularProgress
└─ title ───► Displayed in CourseCard

         │
         ▼ Clicking opens

Lecture Detail [courseId]
├─ Chapters (related to course)
│  ├─ Chapter
│  │  ├─ id
│  │  ├─ number
│  │  └─ lectures[]
│  │     └─ Lecture
│  │        ├─ id
│  │        ├─ title
│  │        ├─ duration
│  │        └─ completed (boolean)
│  │
│  └─ Paper Info (static, same for all)
│     ├─ instructors[]
│     ├─ skills[]
│     └─ description
│
├─ Materials
│  ├─ topic materials[]
│  └─ chapter materials[]
│
└─ Notes
   └─ timestamped notes[]

Announcements (independent)
├─ id ─────► Dynamic route parameter
├─ title
├─ category
├─ content
└─ imageUrl
```

---

## 🎬 Screen Transition Animations

```
Tab Navigation ──────────────► Instant transition
├─ Home ↔ My Learning
├─ My Learning ↔ Favorites
└─ Favorites ↔ Account

Card Navigation (Modal) ──────► slide_from_right animation
├─ Home → Announcement/[id]
├─ Home → Lecture/[id]
├─ My Learning → Lecture/[id]
├─ Any → Switch Course
└─ All → Back (slide_to_left)

Accordion Expansion ──────────► Smooth expand/collapse
└─ ChapterAccordion when tapped

Tab Content Switch ───────────► Instant (within Lecture screen)
├─ Lectures → Overview
├─ Overview → Materials
└─ Materials → Notes
```

---

## 🔍 Search & Filter Flows

### Lectures Tab Search
```
User Input
    │
    └──► LecturesTab component
         │
         └──► useState(search string)
              │
              └──► Real-time search through CHAPTERS[].lectures[]
                   │
                   └──► Filter matching lectures displayed
```

**Future Enhancement:**
```
Search Input
    │
    ├──► Debounce API call to backend
    │
    └──► Display filtered results
         ├─ Loading state
         ├─ Results
         └─ No results message
```

---

## 📝 Notes: Current vs Future Architecture

### Current Architecture
- ✅ File-based routing with Expo Router
- ✅ Static mock data in constants
- ✅ Component composition with props drilling
- ✅ Local component state (useState)
- ✅ TypeScript types defined

### Future Architecture
- 🔄 API integration layer (services/api.ts)
- 🔄 Global state management (Redux/Zustand)
- 🔄 Context API for auth/user data
- 🔄 Local persistence (AsyncStorage)
- 🔄 Error boundaries
- 🔄 Loading states
- 🔄 Caching strategies

---

**Document Version:** 1.0  
**Created:** June 11, 2026
