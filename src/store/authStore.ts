import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'email' | 'google';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

// Simulated delay for API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        await delay(1500);
        
        // Simulate authentication
        if (email && password.length >= 6) {
          const user: User = {
            id: crypto.randomUUID(),
            email,
            name: email.split('@')[0],
            provider: 'email',
          };
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });
        await delay(2000);
        
        // Simulate Google OAuth
        const user: User = {
          id: crypto.randomUUID(),
          email: 'user@gmail.com',
          name: 'Alex Thompson',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          provider: 'google',
        };
        set({ user, isAuthenticated: true, isLoading: false });
        return true;
      },

      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        await delay(1500);
        
        if (email && password.length >= 6 && name) {
          const user: User = {
            id: crypto.randomUUID(),
            email,
            name,
            provider: 'email',
          };
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
