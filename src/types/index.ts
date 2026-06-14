export interface Course {
  id: string;
  title: string;
  code: string;
  thumbnail: string;
  totalChapters: number;
  completedChapters: number;
  progress: number;
}

export interface Lecture {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoId?: string;
  thumbnailUrl?: string;
  isFavourite?: boolean;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  lectures: Lecture[];
  expanded?: boolean;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'doc';
  section: 'topic' | 'chapter';
  url?: string;
  size?: string;
}

export interface Note {
  id: string;
  timestamp: string;
  title: string;
  content: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  postDate: string;
}

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
}

export interface PaperInfo {
  paper: string;
  chaptersCompleted: string;
  examWeightage: string;
  updated: string;
  totalDuration: string;
  difficulty: string;
  completionRate: string;
  engagementScore: string;
  materialsAvailable: number;
  instructors: string[];
  description: string;
  skills: string[];
}

export type TabName = 'Lectures' | 'Overview' | 'Materials' | 'Notes';
