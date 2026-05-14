import { create } from 'zustand';
import type { CursorVariant } from '@/types';

interface AppStore {
  isLoading:         boolean;
  cursorVariant:     CursorVariant;
  cursorLabel:       string;
  setCursorVariant:  (v: CursorVariant) => void;
  setCursorLabel:    (label: string) => void;
  setLoading:        (v: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isLoading:        true,
  cursorVariant:    'default',
  cursorLabel:      '',
  setCursorVariant: (v) => set({ cursorVariant: v }),
  setCursorLabel:   (label) => set({ cursorLabel: label }),
  setLoading:       (v) => set({ isLoading: v }),
}));
