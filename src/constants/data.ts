import { Course, Chapter, Announcement, QuickAction } from '../types';

export const COURSES: Course[] = [
  {
    id: 'fr',
    title: 'Financial Reporting',
    code: 'FR',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80',
    totalChapters: 12,
    completedChapters: 8,
    progress: 67,
  },
  {
    id: 'fa',
    title: 'Financial Accounting',
    code: 'FA',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80',
    totalChapters: 12,
    completedChapters: 8,
    progress: 67,
  },
  {
    id: 'lw',
    title: 'Business Law',
    code: 'LW',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80',
    totalChapters: 12,
    completedChapters: 12,
    progress: 100,
  },
  {
    id: 'bt',
    title: 'Business and Technology',
    code: 'BT',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80',
    totalChapters: 12,
    completedChapters: 12,
    progress: 100,
  },
  {
    id: 'ma',
    title: 'Management Accounting',
    code: 'FA',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80',
    totalChapters: 12,
    completedChapters: 12,
    progress: 100,
  },
  {
    id: 'tx',
    title: 'Taxation',
    code: 'TX',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80',
    totalChapters: 12,
    completedChapters: 12,
    progress: 100,
  },
  {
    id: 'aa',
    title: 'Audit and Assurance',
    code: 'AA',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80',
    totalChapters: 12,
    completedChapters: 12,
    progress: 100,
  },
];

export const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    number: 1,
    title: 'Business Organization & Structure',
    expanded: false,
    lectures: [
      { id: '69eb60e8b82e27dddadd2947', title: 'Introduction to Organizations', duration: '9:47 min', completed: false },
      { id: 'l2', title: 'Types of Business Structures', duration: '9:47 min', completed: false },
    ],
  },
  {
    id: 'ch2',
    number: 2,
    title: 'Business Environment',
    expanded: true,
    lectures: [
      { id: 'l3', title: 'HR functions', duration: '9:47 min', completed: true },
      { id: 'l4', title: 'Marketing functions', duration: '9:47 min', completed: true },
      { id: 'l5', title: 'Operation functions', duration: '9:47 min', completed: false },
      { id: 'l6', title: 'Finance functions', duration: '9:47 min', completed: false },
    ],
  },
  {
    id: 'ch3',
    number: 3,
    title: 'Organizational Culture & Leadership',
    expanded: true,
    lectures: [
      { id: 'l7', title: 'HR functions', duration: '9:47 min', completed: true },
      { id: 'l8', title: 'Marketing functions', duration: '9:47 min', completed: true },
      { id: 'l9', title: 'Operation functions', duration: '9:47 min', completed: false },
      { id: 'l10', title: 'Finance functions', duration: '9:47 min', completed: false },
    ],
  },
];

export const MATERIALS = {
  topic: [
    { id: 'm1', title: 'Depreciation Formula Sheet', type: 'pdf' as const, section: 'topic' as const },
    { id: 'm2', title: 'Understanding Different Types of Organizations', type: 'pdf' as const, section: 'topic' as const },
  ],
  chapter: [
    { id: 'm3', title: 'Organizational Structures', type: 'pdf' as const, section: 'chapter' as const },
    { id: 'm4', title: 'Understanding Different Types of Organizations', type: 'pdf' as const, section: 'chapter' as const },
    { id: 'm5', title: 'Understanding Different Types of...', type: 'pdf' as const, section: 'chapter' as const },
  ],
};

export const NOTES = [
  { id: 'n1', timestamp: '0:21', title: 'Depreciation Formula Sheet', content: 'Depreciation Formula Sheet' },
  { id: 'n2', timestamp: '0:21', title: 'Depreciation Formula Sheet', content: 'Depreciation Formula Sheet' },
  { id: 'n3', timestamp: '0:21', title: 'Depreciation Formula Sheet', content: 'Depreciation Formula Sheet' },
  { id: 'n4', timestamp: '0:21', title: 'Depreciation Formula Sheet', content: 'Depreciation Formula Sheet' },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'ACCA EXAM & ACADEMIC UPDATES',
    category: 'Academics',
    excerpt: 'Dear Students, We are pleased to...',
    content: 'Dear Students,\nWe are pleased to share the latest updates regarding the upcoming ACCA examination cycle and academic activities within the LMS:\n\nFor support or clarifications, visit the site',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
    postDate: '12 December 2025',
  },
  {
    id: 'a2',
    title: 'New Study Materials Released',
    category: 'Resources',
    excerpt: 'New study materials have been added...',
    content: 'Dear Students,\nNew study materials have been added to the portal. Please check the materials section.',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
    postDate: '5 January 2026',
  },
];

export const QUICK_ACTIONS: QuickAction[] = [
  { id: 'downloads', title: 'Downloads', icon: 'arrow.down.to.line' },
  { id: 'analytics', title: 'Analytics', icon: 'chart.line.uptrend.xyaxis' },
  { id: 'materials', title: 'Materials', icon: 'arrow.up.doc' },
];

export const CONTINUE_WATCHING = {
  courseId: 'fa',
  title: 'Straight-line vs Reducing Balance Depreciation',
  subtitle: 'Non-Current Assets & Depreciation',
  code: 'FA',
  lastWatched: '2 hours ago',
  timeLeft: '3 min left',
  progress: 0.85,
  videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  thumbnailUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
};

export const PAPER_INFO = {
  paper: 'Financial Accounting (FA)',
  chaptersCompleted: '8/12',
  examWeightage: '10 - 15%',
  updated: '25 days ago',
  totalDuration: '7 hr 30 min',
  difficulty: 'Beginner',
  completionRate: '86%',
  engagementScore: '78/100',
  materialsAvailable: 25,
  instructors: ['Sarah William, FCCA', 'John Tomy, ACCA'],
  description: 'Financial Accounting (FA) introduces the foundational principles of bookkeeping, double-entry, preparation of financial statements, and basic interpretation skills required for ACCA exams. This paper builds essential knowledge for advanced financial reporting subjects.',
  skills: [
    'Understand and apply double-entry bookkeeping principles',
    'Record transactions and adjustments accurately',
    'Prepare financial statements for sole traders',
    'Apply basic measurement principles for assets, liabilities & income',
    'Compute and reconcile balances using control accounts',
    'Interpret financial information for decision-making',
    'Apply foundational accounting standards (IAS-based concepts)',
  ],
};
