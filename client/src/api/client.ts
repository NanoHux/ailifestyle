import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token if we had one (Mock for now)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
  updateProfile: async (data: any) => {
    const response = await apiClient.put('/auth/profile', data);
    return response.data;
  },
};

export const chatApi = {
  getSessions: async () => {
    const response = await apiClient.get('/chat/sessions');
    return response.data;
  },
  createSession: async (title?: string) => {
    const response = await apiClient.post('/chat/sessions', { title });
    return response.data;
  },
  getMessages: async (sessionId: number) => {
    const response = await apiClient.get(`/chat/sessions/${sessionId}/messages`);
    return response.data;
  },
  sendMessage: async (sessionId: number, content: string) => {
    const response = await apiClient.post('/chat/send', { sessionId, content });
    return response.data;
  },
};

export const planningApi = {
  getDayPlan: async (date: string) => {
    const response = await apiClient.get(`/planning/day-plan?date=${date}`);
    return response.data;
  },
};

export const trackingApi = {
  updateBlockStatus: async (blockId: number, status: string) => {
    const response = await apiClient.patch(`/tracking/plan-block/${blockId}`, { status });
    return response.data;
  },
};

export const reflectionApi = {
  submitReflection: async (date: string, selfRating: number, userNotes: string) => {
    const response = await apiClient.post('/reflection/finish', { date, selfRating, userNotes });
    return response.data;
  },
};
