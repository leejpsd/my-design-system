import { createContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeOverride {
  [cssVariable: string]: string;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  theme?: ThemeOverride;
}

export interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
