/**
 * 토큰 CSS 생성기
 *
 * TS 토큰(단일 소스)에서 themes/light.css, themes/dark.css를 생성한다.
 * - `pnpm generate`        : CSS 파일 재생성
 * - `pnpm generate:check`  : 커밋된 CSS가 TS 소스와 일치하는지 검증 (CI용)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spacing } from '../src/spacing';
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from '../src/typography';
import { radius } from '../src/radius';
import { duration, easing } from '../src/motion';
import { darkTheme, lightTheme } from '../src/themes';

const OUT_DIR = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../src/themes',
);

const HEADER = `/*
 * AUTO-GENERATED — 직접 수정 금지.
 * 소스: src/themes.ts (모드별 값), src/{spacing,typography,radius,motion}.ts (모드 불변 값)
 * 재생성: pnpm --filter @my/tokens generate
 */`;

const kebab = (key: string) =>
  key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

function declarations(entries: Record<string, string>, prefix = ''): string {
  return Object.entries(entries)
    .map(
      ([key, value]) =>
        `  --${prefix ? `${prefix}-` : ''}${kebab(key)}: ${value};`,
    )
    .join('\n');
}

function section(comment: string, body: string): string {
  return `  /* ${comment} */\n${body}`;
}

const staticSections = [
  section('Spacing', declarations(spacing, 'spacing')),
  section('Typography', declarations(fontFamily, 'font-family')),
  declarations(fontSize, 'font-size'),
  declarations(fontWeight, 'font-weight'),
  declarations(lineHeight, 'line-height'),
  section('Radius', declarations(radius, 'radius')),
  section('Motion', declarations(duration, 'duration')),
  declarations(easing, 'easing'),
].join('\n\n');

const lightCss = `${HEADER}
:root,
[data-theme='light'] {
${section('Theme (light)', declarations(lightTheme))}

${staticSections}
}

/* 모션 최소화 환경 — duration 토큰을 0으로 재정의해 장식적 전환을 비활성화 */
@media (prefers-reduced-motion: reduce) {
  :root {
${declarations(Object.fromEntries(Object.keys(duration).map((key) => [key, '0ms'])), 'duration')}
  }
}
`;

const darkCss = `${HEADER}
[data-theme='dark'] {
${section('Theme (dark) — light에 정의된 키만 재정의', declarations(darkTheme))}
}
`;

const outputs = [
  { file: resolve(OUT_DIR, 'light.css'), content: lightCss },
  { file: resolve(OUT_DIR, 'dark.css'), content: darkCss },
];

const isCheck = process.argv.includes('--check');
let failed = false;

for (const { file, content } of outputs) {
  if (isCheck) {
    let current = '';
    try {
      current = readFileSync(file, 'utf8');
    } catch {
      // 파일 없음 → 불일치로 처리
    }
    if (current !== content) {
      console.error(
        `✗ ${file} — TS 토큰 소스와 불일치. 'pnpm generate'로 재생성하세요.`,
      );
      failed = true;
    } else {
      console.log(`✓ ${file}`);
    }
  } else {
    writeFileSync(file, content);
    console.log(`generated: ${file}`);
  }
}

if (failed) process.exit(1);
