import { create } from "zustand";
import { ThemeState } from "./types/types";

//creación y exportción directo del estado global del tema
export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}))