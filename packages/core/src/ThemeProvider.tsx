import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ThemeContext,
  type ThemeMode,
  type ThemeProviderProps,
} from './ThemeContext';

export function ThemeProvider({
  children,
  defaultMode = 'light',
  theme,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // data-theme 속성 동기화
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  // 커스텀 테마 오버라이드를 inline CSS 변수로 주입
  const style = useMemo(() => {
    if (!theme) return undefined;
    const vars: Record<string, string> = {};
    for (const [key, value] of Object.entries(theme)) {
      const varName = key.startsWith('--') ? key : `--${key}`;
      vars[varName] = value;
    }
    return vars;
  }, [theme]);

  const value = useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode, toggleMode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div style={style}>{children}</div>
    </ThemeContext.Provider>
  );
}
