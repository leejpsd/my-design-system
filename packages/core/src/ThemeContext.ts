import { createContext } from 'react';

/** 'system'은 OS의 prefers-color-scheme 설정을 따라간다 */
export type ThemeMode = 'light' | 'dark' | 'system';

/** 실제로 화면에 적용되는 모드 ('system'이 해석된 결과) */
export type ResolvedThemeMode = 'light' | 'dark';

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
  resolvedMode: ResolvedThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
