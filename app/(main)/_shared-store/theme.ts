import { create } from 'zustand';
import {persist} from 'zustand/middleware'
import { type Theme } from '@/app/(main)/lib/types';

interface ThemeState {
  mode: Theme;
  changeMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    ((set, get) => ({
      mode: 'light',
      changeMode() {
        set((state) => {
          const currentMode = get().mode
          const newTheme = currentMode === 'light' ? 'dark' : 'light'
          if (typeof window !== 'undefined') {
            document.documentElement.classList.toggle('dark', newTheme === 'dark')
          }
          return ({ mode: state.mode === 'light' ? 'dark' : 'light' })
        });
      },
    })),
    {
      name: "theme-storage"
    }
  )
);
