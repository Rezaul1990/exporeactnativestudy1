import { AuthState } from '@/model/AuthState';
import { combinedData } from '@/model/combinedData';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CombinedDataState } from '@/model/combinedDataState';

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  clubId: null,
  email: '',
  password: '',
  pin: '',
  setCredentials: (email, password, pin) => set({ email, password, pin }),
  setAuthData: (userId, clubId, email) => set({ userId, clubId, email }),
  resetAuthData: () => set({ userId: null, clubId: null, email: '' }),
  setSelectedUser: (userId, clubId) => set({ userId, clubId }),
  logout: () => {
    set({ userId: null, clubId: null, email: '', password: '', pin: '' });  // Clear all credentials
    set({ email: '', password: '', pin: '' });  // Ensure credentials are cleared
  },
}));

export const useCombinedDataStore = create<CombinedDataState>()(
  persist(
    (set) => ({
      combinedData: null,
      setCombinedData: (data) => set({ combinedData: data }),
      resetCombinedData: () => set({ combinedData: null }),  // Reset combined data on logout
    }),
    {
      name: 'combined-data-storage', // Name for persistence
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);