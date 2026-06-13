import { Announcement, Chapter, Course, Material } from '../types';
import { getToken } from '../utils/auth';

const BASE_URL = 'https://lmsb.elancelearning.com';

async function request<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<T> {
  const token = await getToken();
  console.log('TOKEN:', token);

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
  console.log('STATUS:', response.status);
  console.log('HEADERS:', response.headers);

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
  console.log('RESPONSE DATA:', responseData);
  return responseData as T;
}

export const api = {
  getHome: async () => {
    const res = await request<any>('/student/home');
    return res?.data || res;
  },

  getMyLearning: async () => {
    const res = await request<any>('/student/home/my-learning');
    return res?.data || res || [];
  },

  getPapers: async () => {
    const res = await request<any>('/student/paper');
    return res?.data || res || [];
  },

  getChapters: async () => {
    const res = await request<any>('/student/chapter');
    return res?.data || res || [];
  },

  switchCourse: async (programId: string) => {
    return request<{ success: boolean; message?: string }>('/student/course/switch', 'POST', {
      program_id: programId,
    });
  },

  getVideoByLecture: async (lectureId: string) => {
    const res = await request<any>(`/student/course/video-by-lecture?lecture_id=${lectureId}`);
    const innerData = res?.data?.data || res?.data || res;
    return {
      videoId: innerData?.video_id || innerData?.videoId || '',
      accessToken: innerData?.access_token || innerData?.accessToken || '',
      videoUrl: innerData?.videoUrl || innerData?.video_url || '',
      title: innerData?.topic_name || innerData?.title || '',
    };
  },

  getLectureByPaper: async (paperId: string) => {
    const res = await request<any>(`/student/course/lecture-by-paper?paper_id=${paperId}`);
    return res?.data || res || [];
  },

  getPaperDetails: async (paperId: string) => {
    const res = await request<any>(`/student/course/paper-details?paper_id=${paperId}`);
    const innerData = res?.data?.data || res?.data || res;
    
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
    const res = await request<any>(`/student/course/material-by-lecture?lecture_id=${lectureId}`);
    const rawList = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
    
    const topic: Material[] = [];
    const chapter: Material[] = [];
    
    rawList.forEach((m: any) => {
      const mapped: Material = {
        id: m.material_id || m.id || String(Math.random()),
        title: m.title || '',
        type: 'pdf',
        section: (m.type === 'topic' || m.section === 'topic') ? 'topic' : 'chapter',
        url: m.file_url || m.url || '',
        size: m.file_size || m.size || '',
      };
      
      if (mapped.section === 'topic') {
        topic.push(mapped);
      } else {
        chapter.push(mapped);
      }
    });
    
    return { topic, chapter };
  },

  getNotes: async (videoId: string) => {
    const res = await request<any>(`/student/note?video_id=${videoId}`);
    const innerData = res?.data?.data || res?.data || res;
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
