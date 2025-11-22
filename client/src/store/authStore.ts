import { create } from 'zustand';
import { authApi } from '../api/client';
import type { AuthState, User } from '../types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const data = await authApi.login(email, password);
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, user: null, token: null });
      return;
    }

    try {
      const user = await authApi.getMe();
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  updateProfile: async (data: Partial<User>) => {
    try {
      const updatedProfile = await authApi.updateProfile(data);
      set((state) => ({
        user: state.user ? { ...state.user, ...updatedProfile } : null,
      }));
    } catch (error) {
      console.error('Update profile failed:', error);
      throw error;
    }
  },
}));
