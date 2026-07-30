import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokenSrcDir = resolve(rootDir, 'packages/tokens/src');

// 토큰 TS 소스(단일 소스)에서 테마 CSS를 재생성한다.
// preview.ts가 생성된 CSS를 import하므로 재생성되면 HMR로 즉시 반영된다.
function runTokenCodegen() {
  execFileSync('pnpm', ['--filter', '@my/tokens', 'generate'], {
    cwd: rootDir,
    stdio: 'inherit',
  });
}

const config: StorybookConfig = {
  stories: [
    '../packages/*/src/**/*.mdx',
    '../packages/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (viteConfig) => {
    viteConfig.plugins ??= [];
    viteConfig.plugins.push({
      name: 'token-codegen',
      // dev 서버 시작·정적 빌드 모두 최신 토큰 CSS를 보장
      buildStart() {
        runTokenCodegen();
      },
      configureServer(server) {
        server.watcher.on('change', (file) => {
          if (file.startsWith(tokenSrcDir) && file.endsWith('.ts')) {
            runTokenCodegen();
          }
        });
      },
    });
    return viteConfig;
  },
};
export default config;
