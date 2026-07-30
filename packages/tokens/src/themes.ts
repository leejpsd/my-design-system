/**
 * Theme Tokens — 모드(light/dark)별 시맨틱 값 매핑
 *
 * 이 파일이 테마 CSS 변수의 단일 소스다.
 * scripts/generate-css.ts가 이 매핑을 읽어 themes/light.css, themes/dark.css를
 * 생성하므로, 값 수정은 반드시 여기서 하고 `pnpm generate`로 CSS를 재생성한다.
 *
 * 키는 CSS 변수 이름(`--` 제외)과 1:1 대응하고,
 * 값은 primitive 토큰(colors.ts 등)을 참조한다.
 */
import { amber, blue, gray, green, red } from './colors';
import { shadow } from './shadow';

export const lightTheme = {
  /* Primary */
  'color-primary-50': blue[50],
  'color-primary-100': blue[100],
  'color-primary-200': blue[200],
  'color-primary-300': blue[300],
  'color-primary-400': blue[400],
  'color-primary-500': blue[500],
  'color-primary-600': blue[600],
  'color-primary-700': blue[700],
  'color-primary-800': blue[800],
  'color-primary-900': blue[900],

  /* Neutral */
  'color-neutral-50': gray[50],
  'color-neutral-100': gray[100],
  'color-neutral-200': gray[200],
  'color-neutral-300': gray[300],
  'color-neutral-400': gray[400],
  'color-neutral-500': gray[500],
  'color-neutral-600': gray[600],
  'color-neutral-700': gray[700],
  'color-neutral-800': gray[800],
  'color-neutral-900': gray[900],

  /* Semantic */
  'color-success': green[500],
  'color-error': red[500],
  'color-warning': amber[500],
  'color-info': blue[500],

  /* Surface & Text */
  'color-bg-primary': '#ffffff',
  'color-bg-secondary': gray[50],
  'color-bg-tertiary': gray[100],
  'color-text-primary': gray[900],
  'color-text-secondary': gray[600],
  'color-text-tertiary': gray[400],
  'color-text-inverse': '#ffffff',
  'color-border': gray[200],
  'color-border-focus': blue[500],

  /* Shadow */
  'shadow-none': shadow.none,
  'shadow-sm': shadow.sm,
  'shadow-md': shadow.md,
  'shadow-lg': shadow.lg,
  'shadow-xl': shadow.xl,
} as const;

export type ThemeTokenName = keyof typeof lightTheme;

/**
 * 다크 모드 오버라이드 — light에 존재하는 키만 재정의할 수 있다.
 * (spacing/typography/radius 등 모드 불변 토큰은 여기 두지 않는다)
 */
export const darkTheme = {
  /* Primary — 스케일 반전으로 어두운 배경에서 가독성 확보 */
  'color-primary-50': blue[950],
  'color-primary-100': blue[900],
  'color-primary-200': blue[800],
  'color-primary-300': blue[700],
  'color-primary-400': blue[600],
  'color-primary-500': blue[400],
  'color-primary-600': blue[300],
  'color-primary-700': blue[200],
  'color-primary-800': blue[100],
  'color-primary-900': blue[50],

  /* Neutral — 반전 */
  'color-neutral-50': gray[950],
  'color-neutral-100': gray[900],
  'color-neutral-200': gray[800],
  'color-neutral-300': gray[700],
  'color-neutral-400': gray[600],
  'color-neutral-500': gray[500],
  'color-neutral-600': gray[400],
  'color-neutral-700': gray[300],
  'color-neutral-800': gray[200],
  'color-neutral-900': gray[50],

  /* Semantic — 한 단계 밝게 */
  'color-success': green[400],
  'color-error': red[400],
  'color-warning': amber[400],
  'color-info': blue[400],

  /* Surface & Text — 반전 */
  'color-bg-primary': gray[900],
  'color-bg-secondary': gray[800],
  'color-bg-tertiary': gray[700],
  'color-text-primary': gray[50],
  'color-text-secondary': gray[300],
  'color-text-tertiary': gray[500],
  'color-text-inverse': gray[900],
  'color-border': gray[700],
  'color-border-focus': blue[400],

  /* Shadow — 어두운 배경에서 더 강하게 */
  'shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.2)',
  'shadow-md':
    '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
  'shadow-lg':
    '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.2)',
  'shadow-xl':
    '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.2)',
} as const satisfies Partial<Record<ThemeTokenName, string>>;
