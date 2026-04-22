import { create } from 'zustand';
import type { User, Transaction } from '../engines/types';
import { mockUser } from '../data/mockUser';
import { mockTransactions } from '../data/mockTransactions';

interface AppState {
  user: User;
  transactions: Transaction[];
  isOnboarded: boolean;
  isLoading: boolean;
  setOnboarded: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: mockUser,
  transactions: mockTransactions,
  isOnboarded: false,
  isLoading: true,
  setOnboarded: (value) => set({ isOnboarded: value }),
  setLoading: (value) => set({ isLoading: value }),
}));
