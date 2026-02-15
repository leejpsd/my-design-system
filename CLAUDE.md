# 디자인 시스템 포트폴리오 제작 로드맵

> 프론트엔드 이직 시 "디자인 시스템(예: Storybook) 또는 확장 가능한 공통 UI 컴포넌트 개발 경험"을 어필하기 위한 포트폴리오 제작 가이드

---

## 핵심 원칙

- **"넓게 얕게" 말고 "좁게 깊게"** — 컴포넌트 10개를 대충 만드는 것보다 5개를 접근성, 테스트, 문서화까지 완벽하게
- **매 Phase 끝날 때마다 동작하는 상태 유지** — Phase 3만 끝내도 포트폴리오로 쓸 수 있어야 한다
- **커밋 히스토리도 포트폴리오** — 의미 단위로 커밋을 남기기 (면접관이 커밋 로그를 보는 경우 꽤 있음)
- **기술 구현보다 의사결정 과정**을 설명할 수 있어야 한다
- **"확장 가능한"을 증명** — 라이브러리로 빌드되고, 테마를 커스터마이징할 수 있고, 실제로 소비할 수 있는 구조

---

## 기술 스택

| 영역              | 선택                       | 이유                                        |
| ----------------- | -------------------------- | ------------------------------------------- |
| 프레임워크        | React + TypeScript         | 가장 수요 많음                              |
| 스타일링          | CSS Modules                | runtime overhead 없음, 서버 컴포넌트 호환   |
| 번들러            | Vite (lib mode)            | 빠른 DX + 라이브러리 빌드 지원              |
| 타입 생성         | vite-plugin-dts            | 빌드 시 .d.ts 자동 생성                     |
| 문서화            | Storybook 8                | 업계 표준                                   |
| 테스트            | Storybook Interaction Test | 문서화 + 테스트 동시 해결, 별도 세팅 불필요 |
| Visual Regression | Chromatic                  | Storybook 연동, PR마다 시각적 변경 감지     |
| 버저닝            | Changesets                 | CHANGELOG 자동화, 시맨틱 버저닝             |
| CI                | GitHub Actions             | 무료, 접근성 좋음                           |

---

## Phase 1: 프로젝트 기반 세팅 (2~3일)

### 목표

개발 환경 + **라이브러리 빌드 구조**를 한 번에 잡아두기

### 폴더 구조

```
my-design-system/
├── src/
│   ├── tokens/          # 디자인 토큰
│   ├── components/      # UI 컴포넌트
│   ├── providers/       # ThemeProvider 등
│   ├── hooks/           # 공용 훅 (useClickOutside 등)
│   ├── utils/           # 유틸 함수
│   └── index.ts         # 라이브러리 barrel export (공개 API)
├── example/             # 실사용 데모 앱 (Phase 5에서 구현)
├── .storybook/          # Storybook 설정
├── tsconfig.json
├── tsconfig.lib.json    # 라이브러리 빌드용 (stories 제외)
├── vite.config.ts
└── package.json
```

### 1-1. 기본 세팅

- [ ] Storybook 8 설치 (`npx storybook@latest init`)
- [ ] `@storybook/addon-interactions` 설치 (Storybook 내 테스트용)
- [ ] ESLint + Prettier 설정 (`eslint-config-prettier` 통합)
- [ ] CSS Modules 세팅 확인 (Vite 기본 지원)
- [ ] 폴더 구조 생성 (`src/tokens/`, `src/components/`, `src/providers/`, `src/hooks/`, `src/utils/`)
- [ ] GitHub 레포 생성 + 초기 커밋

### 1-2. 라이브러리 빌드 구조

> 이 부분이 "확장 가능한 공통 UI 컴포넌트"를 증명하는 핵심. 처음부터 잡아두면 이후 Phase에서 자연스럽게 쌓인다.

- [ ] `src/index.ts` barrel export 파일 생성
- [ ] `vite.config.ts`에 lib mode 설정
- [ ] `vite-plugin-dts` 설치 및 설정 (`.d.ts` 자동 생성)
- [ ] `tsconfig.lib.json` 생성 (빌드용 — stories, example 제외)
- [ ] `package.json` 라이브러리 필드 설정

#### vite.config.ts 라이브러리 설정 예시

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), dts({ tsconfigPath: './tsconfig.lib.json' })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
});
```

#### package.json 라이브러리 필드 예시

```json
{
  "name": "@my/design-system",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.cjs",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/style.css"
  },
  "files": ["dist"],
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "vite build",
    "build:storybook": "storybook build",
    "lint": "eslint .",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  }
}
```

#### src/index.ts (barrel export) 예시

```typescript
// 토큰
export * from './tokens';

// 프로바이더
export { ThemeProvider, useTheme } from './providers/ThemeProvider';

// 컴포넌트 (Phase 3~4에서 점진적으로 추가)
export { Button } from './components/Button';
export { TextField } from './components/TextField';
```

### 면접 어필 포인트

> "처음부터 라이브러리로 소비 가능한 구조를 설계했습니다. `exports` 필드로 ESM/CJS 듀얼 패키지를 지원하고, `peerDependencies`로 React 버전 호환성을 관리합니다. `vite-plugin-dts`로 타입 정의도 자동 생성됩니다."

### 주의사항

> 모노레포는 이 단계에서 안 해도 된다. 컴포넌트가 충분히 쌓인 뒤에 분리해도 늦지 않음. 초반에 구조에 시간 쓰다가 지치는 경우가 많다.

---

## Phase 2: 디자인 토큰 + ThemeProvider (2~3일)

### 목표

컴포넌트의 기반이 되는 토큰 체계 + **소비자가 커스터마이징 가능한 테마 구조** 만들기

### 2-1. 디자인 토큰 정의

1. **Color** — primitive(gray-100 등) + semantic(primary, error 등)
2. **Spacing** — 4px 단위 스케일 (4, 8, 12, 16, 24, 32, 48)
3. **Typography** — heading 3단계, body 2단계
4. **Radius, Shadow** — sm, md, lg 3단계
5. **CSS 변수로 export** — 다크모드 대응 구조 포함

#### 토큰 예시

```typescript
// tokens/colors.ts
export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a',
  },
  semantic: {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
  },
} as const;

// tokens/spacing.ts
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
} as const;
```

#### 다크모드 구조

```css
/* themes/light.css */
:root {
  --color-primary-500: #3b82f6;
  --color-bg-primary: #ffffff;
  --color-text-primary: #111827;
}

/* themes/dark.css */
[data-theme='dark'] {
  --color-primary-500: #60a5fa;
  --color-bg-primary: #111827;
  --color-text-primary: #f9fafb;
}
```

#### 체크리스트

- [ ] Color 토큰 (primitive + semantic)
- [ ] Spacing 토큰
- [ ] Typography 토큰
- [ ] Radius, Shadow 토큰
- [ ] CSS 변수 export + 다크모드 구조
- [ ] Storybook에 토큰 시각화 페이지 추가

### 2-2. ThemeProvider — 테마 커스터마이징 구조

> "확장 가능한"의 핵심. 소비하는 팀이 토큰을 오버라이드하고 다크모드를 전환할 수 있어야 한다.

#### 사용 API

```tsx
// 기본 사용 — 별도 설정 없이 바로 동작
import { ThemeProvider, Button } from '@my/design-system';

function App() {
  return (
    <ThemeProvider>
      <Button>기본 테마</Button>
    </ThemeProvider>
  );
}

// 커스텀 테마 오버라이드
const customTheme = {
  colors: {
    primary: { 500: '#8b5cf6', 600: '#7c3aed' },
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme} defaultMode="dark">
      <Button>커스텀 테마</Button>
    </ThemeProvider>
  );
}

// useTheme 훅으로 모드 전환
function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  return <button onClick={toggleMode}>{mode}</button>;
}
```

#### 핵심 구현 포인트

- Context + Provider 패턴
- CSS 변수를 `data-theme` 속성으로 주입 (CSS Modules와 호환)
- `useTheme()` 훅: 현재 모드 읽기 + 전환 함수
- 커스텀 토큰은 CSS 변수를 inline style로 오버라이드
- ThemeProvider 없이도 기본 CSS 변수로 동작 (zero-config)

#### 체크리스트

- [ ] ThemeProvider 컴포넌트 (Context + Provider)
- [ ] useTheme 훅 (mode, setMode, toggleMode)
- [ ] 커스텀 테마 오버라이드 지원
- [ ] ThemeProvider 없이도 기본 동작 보장
- [ ] Storybook에 테마 전환 데모 추가

### 면접 어필 포인트

> "토큰을 primitive → semantic → component 3계층으로 설계했고, ThemeProvider를 통해 소비자가 토큰을 오버라이드할 수 있는 구조입니다. CSS 변수 기반이라 런타임 오버헤드 없이 테마가 전환됩니다. 또한 ThemeProvider 없이도 기본 CSS 변수로 동작하므로 점진적 도입이 가능합니다."

---

## Phase 3: 핵심 컴포넌트 1차 — Button, Input (5~7일)

### 목표

2개의 컴포넌트를 "완성도 높게" 만들기

> ⚠️ **이 Phase가 가장 중요하다.** 이 2개만 제대로 만들어도 포트폴리오로 쓸 수 있다. 여기서 퀄리티를 타협하지 말 것.

---

### 3-1. Button (2~3일)

#### 만드는 순서

1. 타입 정의 — Props 인터페이스 설계
2. 기본 렌더링 — variant(solid, outline, ghost), size(sm, md, lg)
3. 상태 처리 — loading, disabled
4. 아이콘 슬롯 — leftIcon, rightIcon
5. 다형성 — `as` prop으로 `<a>` 태그 전환 지원
6. 접근성 — aria-busy, aria-disabled, 키보드 포커스 스타일
7. Storybook — Default, AllVariants, Loading, WithIcon, Playground
8. Storybook Interaction Test — play 함수로 클릭, loading 비활성화 등 핵심 동작 검증
9. **barrel export** — `src/index.ts`에 Button export 추가

#### Props 설계

```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'primary' | 'danger' | 'neutral';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  as?: React.ElementType;
}
```

#### 구현 코드

```typescript
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Spinner } from '../Spinner';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      colorScheme = 'primary',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className,
      as: Component = 'button',
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <Component
        ref={ref}
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          styles[colorScheme],
          fullWidth && styles.fullWidth,
          isLoading && styles.loading,
          className
        )}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...rest}
      >
        {isLoading && <Spinner size="sm" className={styles.spinner} />}
        {!isLoading && leftIcon && (
          <span className={styles.icon}>{leftIcon}</span>
        )}
        <span className={styles.label}>{children}</span>
        {!isLoading && rightIcon && (
          <span className={styles.icon}>{rightIcon}</span>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';
```

#### 면접관이 주목하는 포인트

- `forwardRef` 사용 (외부에서 ref 접근 가능)
- `as` prop으로 다형성 지원 (button → a 태그 전환)
- `aria-busy` 같은 접근성 속성
- loading 상태에서 레이아웃 시프트 방지
- prop 기본값 설정으로 zero-config 사용 가능

#### 체크리스트

- [ ] Props 타입 정의
- [ ] variant (solid, outline, ghost, link)
- [ ] size (sm, md, lg)
- [ ] colorScheme (primary, danger, neutral)
- [ ] loading 상태 + Spinner
- [ ] leftIcon / rightIcon 슬롯
- [ ] `as` prop 다형성
- [ ] 접근성 (aria-busy, 포커스 스타일)
- [ ] Storybook stories (5개 이상)
- [ ] Storybook Interaction Test (play 함수로 핵심 동작 검증)
- [ ] `src/index.ts`에 export 추가

---

### 3-2. Input / TextField (2~3일)

#### 만드는 순서

1. 타입 정의 — label, helperText, errorMessage, 상태들
2. 기본 렌더링 — label + input + helper text 구조
3. 상태 처리 — error, disabled, readonly
4. 접근성 — label-input 연결(`htmlFor`/`id`), `aria-describedby`, `aria-invalid`
5. 부가 요소 — prefix/suffix 슬롯 (검색 아이콘, 단위 텍스트 등)
6. Storybook stories + Interaction Test
7. **barrel export** — `src/index.ts`에 TextField export 추가

#### 완성된 사용 예시

```tsx
<TextField
  label="이메일"
  placeholder="example@email.com"
  errorMessage="올바른 이메일 형식이 아닙니다"
  isError
  leftSlot={<MailIcon />}
/>
```

#### 체크리스트

- [ ] Props 타입 정의
- [ ] label + input + helperText 구조
- [ ] error, disabled, readonly 상태
- [ ] 접근성 (htmlFor/id 연결, aria-describedby, aria-invalid)
- [ ] prefix/suffix 슬롯
- [ ] Storybook stories
- [ ] Storybook Interaction Test
- [ ] `src/index.ts`에 export 추가

---

## Phase 4: 핵심 컴포넌트 2차 — Modal, Tabs, Toast (5~7일)

### 목표

다양한 설계 패턴 보여주기

> 이 3개를 고른 이유: 각각 **다른 설계 패턴**을 보여준다. Portal, Compound Component, 명령형 API — "다양한 패턴을 이해하고 상황에 맞게 선택할 수 있다"는 것을 증명.

---

### 4-1. Modal / Dialog (2~3일) — Portal 패턴

#### 핵심 구현 포인트

- `createPortal`로 DOM 트리 외부 렌더링
- 포커스 트랩 (열리면 모달 안에서만 Tab 이동)
- ESC 키로 닫기
- 배경 스크롤 잠금 (`body overflow: hidden`)
- mount/unmount 애니메이션

#### 체크리스트

- [ ] createPortal 렌더링
- [ ] 포커스 트랩
- [ ] ESC 키 닫기
- [ ] 배경 스크롤 잠금
- [ ] 진입/퇴장 애니메이션
- [ ] Storybook stories + Interaction Test
- [ ] `src/index.ts`에 export 추가

---

### 4-2. Tabs (2일) — Compound Component 패턴

#### 사용 API

```tsx
<Tabs defaultValue="tab1" onChange={handleChange}>
  <Tabs.List>
    <Tabs.Trigger value="tab1">프로필</Tabs.Trigger>
    <Tabs.Trigger value="tab2">설정</Tabs.Trigger>
    <Tabs.Trigger value="tab3" disabled>
      알림
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">프로필 내용</Tabs.Content>
  <Tabs.Content value="tab2">설정 내용</Tabs.Content>
</Tabs>
```

#### 핵심 구현 포인트

- `Tabs`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content` 구조
- Context API로 내부 상태 공유
- 키보드 내비게이션 (← → 화살표로 탭 이동)
- WAI-ARIA Tabs 패턴 준수

#### 면접 대비

> "왜 props 나열 방식 대신 compound pattern을 선택했나요?" → 확장성과 유연성. 사용하는 개발자에게 선언적 API를 제공하면서, 내부적으로는 Context로 상태를 공유.

#### 체크리스트

- [ ] Compound Component 구조
- [ ] Context API 상태 공유
- [ ] 키보드 내비게이션 (화살표)
- [ ] WAI-ARIA 패턴 준수
- [ ] Storybook stories + Interaction Test
- [ ] `src/index.ts`에 export 추가

---

### 4-3. Toast (2일) — 명령형 API 패턴

#### 사용 API

```typescript
toast.success('저장 완료');
toast.error('오류가 발생했습니다');
```

#### 핵심 구현 포인트

- 컴포넌트 외부에서 호출 가능한 API
- 자동 dismiss + 수동 닫기
- 스택 관리 (여러 개 동시 표시)
- 진입/퇴장 애니메이션

#### 체크리스트

- [ ] 외부 호출 API (toast.success 등)
- [ ] 자동 dismiss + 수동 닫기
- [ ] 스택 관리
- [ ] 애니메이션
- [ ] Storybook stories + Interaction Test
- [ ] `src/index.ts`에 export 추가

---

## Phase 5: 문서화 + Example App (3~4일)

### 목표

"쓰는 사람 입장"에서 문서 완성 + **실제 사용 데모**로 설득력 강화

### 5-1. Storybook 문서화

- [ ] **Storybook autodocs 설정** — ArgTypes 자동 생성으로 Props 문서화 자동화
- [ ] **Storybook MDX 가이드**
  - [ ] Getting Started (설치, 테마 적용법)
  - [ ] 디자인 토큰 가이드 (색상 팔레트, 타이포 스케일 시각화)
  - [ ] 각 컴포넌트별 Do / Don't 예시
- [ ] **Storybook 애드온**
  - [ ] `@storybook/addon-a11y` — 접근성 자동 검사 패널
  - [ ] `@storybook/addon-interactions` — 인터랙션 테스트

### 5-2. Storybook 조합 레시피 (Recipes)

> 컴포넌트를 개별로만 보여주면 "이걸 조합하면 어떻게 되나?"가 안 보인다. Storybook 안에서 조합 패턴을 보여주는 것.

- [ ] **로그인 폼** — TextField + Button 조합
- [ ] **설정 페이지** — Tabs 안에 TextField + Button 배치
- [ ] **알림 시나리오** — Button 클릭 → Toast 표시 + Modal 확인

### 5-3. Example App (별도 Vite 앱)

> Storybook 레시피와 다른 목적. **라이브러리를 실제로 import해서 사용하는 소비자 관점**을 보여준다.

```
example/
├── src/
│   ├── App.tsx           # 메인 앱 — 테마 전환 + 라우팅
│   ├── pages/
│   │   ├── LoginPage.tsx  # 로그인 폼 데모
│   │   └── SettingsPage.tsx  # 설정 페이지 데모
│   └── main.tsx
├── package.json          # @my/design-system을 의존성으로
└── vite.config.ts
```

#### 핵심 포인트

- `@my/design-system`을 패키지처럼 import
- ThemeProvider로 다크모드 전환 데모
- 커스텀 테마 오버라이드 시연
- "이 라이브러리를 실제로 쓰면 이렇게 된다"를 한눈에 보여줌

#### 체크리스트

- [ ] `example/` 프로젝트 세팅 (Vite + React)
- [ ] 라이브러리 로컬 링크 (`workspace:*` 또는 `file:..`)
- [ ] 로그인 페이지 데모
- [ ] 설정 페이지 데모
- [ ] 다크모드 전환 데모
- [ ] 커스텀 테마 오버라이드 데모

### 5-4. GitHub README

- [ ] 프로젝트 소개 + 스크린샷
- [ ] 설계 원칙 (3~4줄)
- [ ] 아키텍처 다이어그램
- [ ] 로컬 실행 방법
- [ ] 설치 + 사용법 (npm install → ThemeProvider 감싸기 → 컴포넌트 사용)

---

## Phase 6: 배포 + CI + 버저닝 (2~3일)

### 목표

누구나 바로 볼 수 있게 만들기 + **프로덕션 수준의 워크플로우** 구축

### 6-1. Storybook 배포

- Chromatic (추천, 무료 플랜 있음) 또는 GitHub Pages
- PR마다 자동 배포되면 베스트

### 6-2. Chromatic Visual Regression Test

> 디자인 시스템의 핵심 워크플로우. "컴포넌트 스타일이 의도치 않게 바뀌었는지"를 PR마다 자동 검사.

```yaml
# .github/workflows/chromatic.yml
name: Chromatic
on: pull_request

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v4
      - run: pnpm install
      - uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

### 6-3. GitHub Actions CI

```yaml
# 최소 파이프라인
- lint
- type-check
- build (라이브러리 빌드)
- storybook build
```

### 6-4. Changesets — 버저닝 + CHANGELOG 자동화

> 있으면 확실한 가점. "API가 변경될 때 어떻게 관리하나요?"라는 질문에 대답할 수 있다.

```bash
# 설치
pnpm add -D @changesets/cli
pnpm changeset init

# 워크플로우
pnpm changeset        # 변경사항 기록
pnpm changeset version  # 버전 올리기 + CHANGELOG 생성
pnpm changeset publish  # npm 배포 (선택)
```

### 6-5. npm 배포 (선택)

- 있으면 가점, 없어도 감점은 아님
- 라이브러리 빌드 구조(Phase 1)가 잡혀있으므로 `npm publish`만 하면 됨

### 체크리스트

- [ ] Storybook 배포 (Chromatic 또는 GitHub Pages)
- [ ] Chromatic Visual Regression 설정
- [ ] GitHub Actions CI 세팅 (lint + type-check + build + storybook build)
- [ ] Changesets 설치 + 초기 설정
- [ ] README에 배지 추가 (CI 상태, Storybook 링크)
- [ ] npm 배포 (선택)

---

## 타임라인 요약

| Phase | 내용                            | 기간  | 산출물                                    |
| ----- | ------------------------------- | ----- | ----------------------------------------- |
| 1     | 프로젝트 세팅 + 라이브러리 빌드 | 2~3일 | 개발 환경 + 빌드 구조 완성                |
| 2     | 디자인 토큰 + ThemeProvider     | 2~3일 | 토큰 체계 + 다크모드 + 테마 커스터마이징  |
| 3     | Button, Input                   | 5~7일 | 고퀄리티 컴포넌트 2개                     |
| 4     | Modal, Tabs, Toast              | 5~7일 | 다양한 패턴 3개                           |
| 5     | 문서화 + Example App            | 3~4일 | Storybook 배포판 + 실사용 데모            |
| 6     | 배포 + CI + 버저닝              | 2~3일 | 공개 링크 + Visual Regression + CHANGELOG |

**총 약 3~4주** (퇴근 후 + 주말 기준)

---

## 면접 대비 — 자주 나오는 질문

| 질문                                      | 답변 방향                                                                                                                        |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 왜 CSS Modules을 선택했나요?              | runtime overhead 없이 스코핑 가능, 서버 컴포넌트 호환성                                                                          |
| 라이브러리 빌드는 어떻게 하나요?          | Vite lib mode + vite-plugin-dts, ESM/CJS 듀얼 패키지, exports 필드로 진입점 관리                                                 |
| 테마 커스터마이징은 어떻게 지원하나요?    | CSS 변수 기반 ThemeProvider, 소비자가 토큰을 오버라이드 가능, ThemeProvider 없이도 기본 동작                                     |
| 컴포넌트 스타일 변경을 어떻게 감지하나요? | Chromatic Visual Regression — PR마다 스냅샷 비교, 의도치 않은 변경 방지                                                          |
| API 변경은 어떻게 관리하나요?             | Changesets로 시맨틱 버저닝, CHANGELOG 자동 생성                                                                                  |
| headless vs styled 방식?                  | 우리 시스템은 특정 디자인을 강제하므로 styled 선택, 단 내부적으로 로직/스타일 레이어 분리                                        |
| 컴포넌트 API 설계 기준은?                 | forwardRef 지원, zero-config 사용 가능, 접근성 내장                                                                              |
| compound pattern을 왜 선택?               | 확장성, 선언적 API, 사용하는 개발자의 DX                                                                                         |
| 왜 모노레포 구조가 아닌가요?              | 컴포넌트가 충분히 쌓이기 전에 모노레포를 도입하면 구조에 시간을 빼앗김. 현재는 단일 패키지로 충분하고, 필요 시 마이그레이션 가능 |

---

## 우선순위 가이드

면접관이 보는 순서:

1. **Storybook 배포 링크** — 가장 중요. 클릭 한 번에 컴포넌트를 직접 만져볼 수 있음
2. **GitHub 코드 퀄리티** — 설계 구조, 타입, 테스트, 커밋 히스토리
3. **라이브러리 빌드 + 테마 구조** — "확장 가능한 공통 UI"의 핵심 증거
4. **Example App** — 실제로 쓸 수 있는 시스템이라는 인상
5. **Visual Regression + CI** — 프로덕션 수준의 워크플로우
6. **npm 배포** — 있으면 가점, 없어도 감점은 아님

> 컴포넌트 2개를 대충 만들고 npm까지 올리는 것보다, 컴포넌트 5개를 접근성·테스트·문서화까지 탄탄하게 만드는 게 훨씬 인상적이다.
