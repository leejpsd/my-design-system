# @my/design-system

[![CI](https://github.com/leejpsd/my-design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/leejpsd/my-design-system/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/Storybook-deployed-ff4785?logo=storybook)](https://leejpsd.github.io/my-design-system)

React + TypeScript 기반의 디자인 시스템 라이브러리.
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
| 문서화 | Storybook 10 |
| 테스트 | Storybook Interaction Test |
| 접근성 | @storybook/addon-a11y |

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
src/
├── tokens/           # 디자인 토큰 (3계층: primitive → semantic → component)
│   ├── colors.ts     # gray/blue/red/green/amber 팔레트
│   ├── spacing.ts    # 4px 기반 스케일
│   ├── typography.ts # 폰트, 크기, 행간 프리셋
│   ├── radius.ts     # 모서리 라운딩
│   ├── shadow.ts     # 그림자
│   └── themes/       # CSS 변수 (light.css, dark.css)
├── providers/        # ThemeProvider (다크모드 + 커스텀 토큰 오버라이드)
├── hooks/            # useTheme, useFocusTrap
├── components/       # UI 컴포넌트
│   ├── Button/
│   ├── TextField/
│   ├── Modal/
│   ├── Tabs/
│   ├── Toast/
│   └── Spinner/
└── docs/             # Storybook MDX 가이드 + Recipes
```

## 로컬 실행

```bash
# 의존성 설치
pnpm install

# Storybook 실행 (개발 서버)
pnpm storybook

# 라이브러리 빌드
pnpm build

# 린트 + 타입 체크
pnpm lint
pnpm type-check
```

## 사용법

```tsx
import { Button, TextField, toast, ToastContainer } from '@my/design-system';
import '@my/design-system/styles';

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
import { ThemeProvider, useTheme } from '@my/design-system';

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
