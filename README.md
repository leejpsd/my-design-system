# @my/design-system

[![CI](https://github.com/leejpsd/my-design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/leejpsd/my-design-system/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/Storybook-deployed-ff4785?logo=storybook)](https://leejpsd.github.io/my-design-system)

React + TypeScript 기반의 디자인 시스템 모노레포.
접근성, 테스트, 문서화를 갖춘 프로덕션 레벨 UI 컴포넌트를 제공합니다.

## 설계 원칙

- **접근성 내장** — WAI-ARIA 패턴 준수, 키보드 내비게이션, 스크린리더 지원
- **Zero-config** — 기본값만으로 바로 사용 가능, 필요시 커스터마이징
- **CSS 변수 기반 테마** — 런타임 오버헤드 없이 라이트/다크 모드 전환
- **타입 안전** — 모든 Props에 TypeScript 타입 제공

## 기술 스택

| 영역 | 선택 |
|------|------|
| 프레임워크 | React 19 + TypeScript 5.9 |
| 스타일링 | CSS Modules + CSS Variables |
| 번들러 | Vite 7 (Library Mode) |
| 모노레포 | pnpm Workspace + Turborepo |
| 버저닝 | Changesets |
| 문서화 | Storybook 10 |
| 테스트 | Storybook Interaction Test |
| 접근성 | @storybook/addon-a11y |
| CI/CD | GitHub Actions + GitHub Pages |

## 패키지 구조

| 패키지 | 설명 | 의존성 |
|--------|------|--------|
| **@my/tokens** | 디자인 토큰 (색상, 간격, 타이포) + CSS 변수 | 없음 |
| **@my/core** | ThemeProvider, useTheme, useFocusTrap 등 | @my/tokens |
| **@my/react** | UI 컴포넌트 (Button, TextField, Modal, Tabs, Toast, Spinner) | @my/tokens, @my/core |

## 컴포넌트

| 컴포넌트 | 패턴 | 핵심 기능 |
|----------|------|-----------|
| **Button** | 다형성 (`as` prop) | 4 variants, 3 sizes, 3 colorSchemes, 로딩, 아이콘 슬롯 |
| **TextField** | forwardRef + useId | label 연결, 에러/헬퍼 텍스트, prefix/suffix 슬롯 |
| **Modal** | Portal | 포커스 트랩, ESC 닫기, 스크롤 잠금, 진입/퇴장 애니메이션 |
| **Tabs** | Compound Component | Context API, 화살표 키보드 내비게이션, WAI-ARIA |
| **Toast** | 명령형 API | `toast.success()` 외부 호출, 자동 dismiss, 스택 관리 |

## 아키텍처

```
┌─────────────────────────────────────────────────────┐
│                   Consumer App                       │
│        import { Button } from '@my/react'            │
│        import '@my/react/styles'                     │
└────────────────────────┬────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────┐
│                    @my/react                         │
│  ┌──────────────────────────────────────────────┐   │
│  │   Button  TextField  Modal  Tabs  Toast       │   │
│  │   Spinner                                     │   │
│  └────────────────────┬─────────────────────────┘   │
│                       │                              │
│  ┌────────────────────▼─────────────────────────┐   │
│  │                 @my/core                      │   │
│  │   ThemeProvider  useTheme  useFocusTrap       │   │
│  └────────────────────┬─────────────────────────┘   │
│                       │                              │
│  ┌────────────────────▼─────────────────────────┐   │
│  │                @my/tokens                     │   │
│  │   Primitive    Semantic      Component        │   │
│  │   gray-500 ──▶ text-primary ──▶ btn-color     │   │
│  │   blue-500 ──▶ primary     ──▶ input-border   │   │
│  │   light.css    dark.css                       │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### 디렉토리 구조

```
my-design-system/
├── packages/
│   ├── tokens/          # @my/tokens — 디자인 토큰 + CSS 변수
│   │   └── src/
│   │       ├── colors.ts, spacing.ts, typography.ts, radius.ts, shadow.ts
│   │       └── themes/  # light.css, dark.css
│   ├── core/            # @my/core — ThemeProvider, hooks
│   │   └── src/
│   │       ├── ThemeProvider.tsx, ThemeContext.ts
│   │       └── useTheme.ts, useFocusTrap.ts, usePrevious.ts
│   ├── react/           # @my/react — UI 컴포넌트
│   │   └── src/
│   │       ├── Button/, TextField/, Modal/, Tabs/, Toast/, Spinner/
│   │       └── docs/    # Storybook MDX 가이드 + Recipes
│   └── example/         # 소비자 데모 앱
├── .storybook/          # Storybook 설정
├── .changeset/          # Changesets 버저닝
├── turbo.json           # Turborepo 빌드 파이프라인
└── pnpm-workspace.yaml
```

## 로컬 실행

```bash
# 의존성 설치
pnpm install

# Storybook 실행 (개발 서버)
pnpm dev

# 모든 패키지 빌드 (Turborepo)
pnpm build

# 린트 + 타입 체크
pnpm lint
pnpm type-check
```

## Example App

`packages/example/` 디렉토리에 `@my/react`를 실제로 import하여 사용하는 데모 앱이 포함되어 있습니다.

- **Login 페이지** — TextField 유효성 검사 + Button 로딩 + Toast 피드백
- **Dashboard 페이지** — Tabs, Modal 확인 다이얼로그, Spinner, Toast
- **다크 모드** — ThemeProvider + useTheme 훅으로 라이트/다크 전환

```bash
# 패키지 빌드 후 Example App 실행
pnpm build
cd packages/example && pnpm dev
```

## 사용법

```tsx
import { Button, TextField, toast, ToastContainer } from '@my/react';
import '@my/react/styles';

function App() {
  return (
    <>
      <Button onClick={() => toast.success('완료!')}>클릭</Button>
      <TextField label="이름" placeholder="홍길동" />
      <ToastContainer />
    </>
  );
}
```

### 테마 적용

```tsx
import { ThemeProvider, useTheme, Button } from '@my/react';

function App() {
  return (
    <ThemeProvider defaultMode="light">
      <Content />
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  return <Button onClick={toggleMode}>{mode}</Button>;
}
```
