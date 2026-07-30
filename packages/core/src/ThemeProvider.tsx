import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  ThemeContext,
  type ResolvedThemeMode,
  type ThemeMode,
  type ThemeProviderProps,
} from './ThemeContext';

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

function subscribeSystemScheme(onChange: () => void) {
  const mql = window.matchMedia(DARK_SCHEME_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

const getSystemPrefersDark = () => window.matchMedia(DARK_SCHEME_QUERY).matches;
// SSR에서는 시스템 설정을 알 수 없으므로 light로 간주
const getServerPrefersDark = () => false;

export function ThemeProvider({
  children,
  defaultMode = 'light',
  theme,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  const systemPrefersDark = useSyncExternalStore(
    subscribeSystemScheme,
    getSystemPrefersDark,
    getServerPrefersDark,
  );

  const resolvedMode: ResolvedThemeMode =
    mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : mode;

  // 'system' 상태에서 토글하면 현재 표시 모드의 반대로 명시 전환된다
  const toggleMode = useCallback(() => {
    setMode(resolvedMode === 'light' ? 'dark' : 'light');
  }, [resolvedMode]);

  // data-theme 속성 동기화
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedMode);
  }, [resolvedMode]);

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
    () => ({ mode, resolvedMode, setMode, toggleMode }),
    [mode, resolvedMode, toggleMode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div style={style}>{children}</div>
    </ThemeContext.Provider>
  );
}
