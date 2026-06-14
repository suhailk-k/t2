import { Announcement, Course, Material } from '../types';
import { getToken } from '../utils/auth';

const BASE_URL = 'https://lmsb.elancelearning.com';
const TPSTREAMS_ORG_ID = '87r52e';

function unwrapData(res: any) {
  return res?.data?.data ?? res?.data ?? res;
}

function normalizeProgress(value: any) {
  const numeric = Number(value) || 0;
  if (numeric > 0 && numeric <= 1) {
    return Math.round(numeric * 100);
  }
  return Math.round(numeric);
}

function normalizeProgressRatio(value: any) {
  const numeric = Number(value) || 0;
  if (numeric > 1) {
    return Math.max(0, Math.min(1, numeric / 100));
  }
  return Math.max(0, Math.min(1, numeric));
}

function secondsToLabel(value: any) {
  const totalSeconds = Number(value);
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return typeof value === 'string' ? value : '';
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.ceil((totalSeconds % 3600) / 60);
  if (hours > 0) {
    return `${hours} hr ${minutes} min left`;
  }
  return `${minutes} min left`;
}

function mapCourse(c: any): Course {
  return {
    id: c.subject_id || c.paper_id || c.id || c._id || '',
    title: c.title || c.name || c.subject || '',
    code: c.paper_code || c.code || '',
    thumbnail: c.image_url || c.icon_url || c.thumbnail_url || c.thumbnail || c.image || '',
    totalChapters: c.total_chapters ?? c.totalChapters ?? 0,
    completedChapters: c.completed_chapters ?? c.completedChapters ?? 0,
    progress: normalizeProgress(c.progress_percentage ?? c.progress_percent ?? c.progress ?? 0),
  };
}

function mapAnnouncement(a: any): Announcement {
  const description = a.description || a.content || '';
  return {
    id: a.announcement_id || a.id || a._id || '',
    title: a.title || '',
    category: a.category || 'General',
    excerpt: a.excerpt || description.slice(0, 80),
    content: description,
    imageUrl: a.image_url || a.imageUrl || a.image || '',
    postDate: a.published_at || a.postDate || a.post_date || a.createdAt || '',
  };
}

function mapMaterial(m: any): Material {
  return {
    id: m.material_id || m.id || m._id || '',
    title: m.title || '',
    type: (m.file_type || m.type) === 'doc' ? 'doc' : 'pdf',
    section: (m.type === 'topic' || m.section === 'topic') ? 'topic' : 'chapter',
    url: m.file_url || m.url || '',
    size: m.file_size || m.size || '',
  };
}

async function getTpStreamsPlaybackUrl(videoId: string, accessToken: string) {
  if (!videoId || !accessToken) return '';

  try {
    const response = await fetch(
      `https://app.tpstreams.com/api/v1/${TPSTREAMS_ORG_ID}/assets/${encodeURIComponent(videoId)}/?access_token=${encodeURIComponent(accessToken)}`
    );
    if (!response.ok) return '';

    const data = await response.json();
    return (
      data?.video?.playback_url ||
      data?.video?.output_urls?.h264?.hls_url ||
      data?.video?.hls_url ||
      ''
    );
  } catch (error) {
    console.warn('Failed to fetch TPStreams playback URL:', error);
    return '';
  }
}

async function request<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<T> {
  const token = await getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const url = `${BASE_URL}${path}`;
  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    let errorDetails = '';
    try {
      const errorJson = await response.json();
      errorDetails = ` - Details: ${JSON.stringify(errorJson)}`;
      console.log('ERROR DETAILS:', errorJson);
    } catch (_) {
      try {
        const errorText = await response.text();
        errorDetails = ` - Text: ${errorText}`;
        console.log('ERROR TEXT:', errorText);
      } catch (__) { }
    }
    throw new Error(`API Error: ${response.status} ${response.statusText}${errorDetails}`);
  }

  const responseData = await response.json();
  return responseData as T;
}

export const api = {
  getHome: async () => {
    const res = await request<any>('/student/home');
    const root = unwrapData(res);
    const myLearning = Array.isArray(root?.my_learning) ? root.my_learning : [];

    return {
      ...root,
      continueWatching: root?.continue_watching
        ? {
            courseId: root.continue_watching.paper_id || '',
            title: root.continue_watching.title || '',
            subtitle: root.continue_watching.subject || '',
            code: root.continue_watching.paper_code || '',
            lastWatched: root.continue_watching.last_watched_label || '',
            timeLeft: secondsToLabel(root.continue_watching.remaining_time_label),
            progress: normalizeProgressRatio(root.continue_watching.progress_percent),
            thumbnailUrl: root.continue_watching.thumbnail_url || '',
            resumeVideoId: root.continue_watching.topic_id || '',
            chapterId: root.continue_watching.chapter_id || '',
          }
        : null,
      recentLearning: myLearning.map(mapCourse),
      announcements: Array.isArray(root?.announcements) ? root.announcements.map(mapAnnouncement) : [],
      availablePrograms: Array.isArray(root?.available_programs) ? root.available_programs : [],
      selectedProgram: root?.selected_program || null,
    };
  },

  getMyLearning: async () => {
    const res = await request<any>('/student/home/my-learning');
    const root = unwrapData(res);
    const subjects = Array.isArray(root?.subjects) ? root.subjects : (Array.isArray(root) ? root : []);
    return subjects.map(mapCourse);
  },

  getPapers: async () => {
    const res = await request<any>('/student/paper');
    const root = unwrapData(res);
    const papers = Array.isArray(root?.subjects) ? root.subjects : (Array.isArray(root) ? root : []);
    return papers.map(mapCourse);
  },

  getChapters: async () => {
    const res = await request<any>('/student/chapter');
    return unwrapData(res) || [];
  },

  switchCourse: async (programId: string) => {
    return request<{ success: boolean; message?: string }>('/student/course/switch', 'POST', {
      program_id: programId,
    });
  },

  getVideoByLecture: async (lectureId: string) => {
    const res = await request<any>(`/student/course/video-by-lecture?lecture_id=${encodeURIComponent(lectureId)}`);
    const innerData = unwrapData(res);
    const videoId = innerData?.video_id || innerData?.videoId || '';
    const accessToken = innerData?.access_token || innerData?.accessToken || '';
    const videoUrl = innerData?.videoUrl || innerData?.video_url || await getTpStreamsPlaybackUrl(videoId, accessToken);

    return {
      videoId,
      accessToken,
      videoUrl,
      title: innerData?.topic_name || innerData?.title || '',
      thumbnailUrl: innerData?.thumbnail_url || innerData?.thumbnailUrl || '',
    };
  },

  getLectureByPaper: async (paperId: string) => {
    const res = await request<any>(`/student/course/lecture-by-paper?paper_id=${encodeURIComponent(paperId)}`);
    const root = unwrapData(res);
    return Array.isArray(root) ? root : [];
  },

  getPaperDetails: async (paperId: string) => {
    const res = await request<any>(`/student/course/paper-details?paper_id=${encodeURIComponent(paperId)}`);
    const innerData = unwrapData(res);
    
    const info = innerData?.paper_info;
    const stats = innerData?.statistics;
    
    return {
      paper: info?.paper_title || (innerData?.meta ? `${innerData.meta.paper_name} (${innerData.meta.paper_code})` : '') || '',
      chaptersCompleted: info ? `${info.chapters_completed}/${info.total_chapters}` : '0/0',
      examWeightage: innerData?.examWeightage || '10 - 15%',
      updated: info?.last_updated || '',
      totalDuration: stats?.total_paper_duration || '',
      difficulty: innerData?.difficulty || 'Beginner',
      completionRate: stats ? `${stats.student_completion_rate}%` : '0%',
      engagementScore: innerData?.engagementScore || '78/100',
      materialsAvailable: stats?.materials_available ?? 0,
      instructors: Array.isArray(innerData?.instructors)
        ? innerData.instructors.map((inst: any) => inst.name || String(inst))
        : [],
      description: innerData?.description || '',
      skills: Array.isArray(innerData?.skills) ? innerData.skills : [],
    };
  },

  getMaterialByLecture: async (lectureId: string) => {
    const res = await request<any>(`/student/course/material-by-lecture?lecture_id=${encodeURIComponent(lectureId)}`);
    const root = unwrapData(res);
    const rawList = Array.isArray(root) ? root : [];
    
    const topic: Material[] = [];
    const chapter: Material[] = [];
    
    rawList.forEach((m: any) => {
      const mapped = mapMaterial(m);
      
      if (mapped.section === 'topic') {
        topic.push(mapped);
      } else {
        chapter.push(mapped);
      }
    });
    
    return { topic, chapter };
  },

  getNotes: async (videoId: string) => {
    const res = await request<any>(`/student/note?video_id=${encodeURIComponent(videoId)}`);
    const innerData = unwrapData(res);
    return Array.isArray(innerData) ? innerData : [];
  },

  createNote: async (note: { video_id: string; time: string; content: string }) => {
    return request<any>('/student/note', 'POST', note);
  },

  updateNote: async (note: { _id: string; video_id: string; time: string; content: string }) => {
    return request<any>('/student/note', 'PUT', note);
  },

  deleteNote: async (id: string) => {
    return request<any>('/student/note', 'DELETE', { _id: id });
  },
};
