export interface User {
  id: number;
  email: string;
  name?: string;
  displayName?: string;
  timezone?: string;
  wakeTime?: string;
  sleepTime?: string;
  workStartTime?: string;
  workEndTime?: string;
  pacePreference?: string;
  stylePreference?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface ChatSession {
  id: number;
  userId: number;
  title?: string | null;
  updatedAt: string;
  messages?: Message[];
}

export interface Message {
  id: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  hasPlanUpdate: boolean;
  createdAt: string;
}

export interface PlanBlock {
  id: number;
  startTime: string; // ISO Date string
  endTime: string;   // ISO Date string
  title: string;
  description?: string;
  notes?: string;
  category: 'work' | 'study' | 'health' | 'life' | 'other';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'done' | 'skipped' | 'overdue' | 'rescheduled';
}

export interface DayPlan {
  id: number;
  planDate: string;
  dayGoal?: string;
  overallAdvice?: string;
  status: string;
  blocks: PlanBlock[];
}
