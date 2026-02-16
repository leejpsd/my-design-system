import { create } from 'storybook/theming';

export default create({
  base: 'light',

  // Brand
  brandTitle: '@my/design-system',
  brandUrl: '#',

  // Typography
  fontBase:
    "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  fontCode: "'JetBrains Mono', 'Fira Code', Consolas, monospace",

  // Colors
  colorPrimary: '#2563eb',
  colorSecondary: '#3b82f6',

  // UI
  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 8,

  // Text
  textColor: '#0f172a',
  textInverseColor: '#f8fafc',
  textMutedColor: '#64748b',

  // Toolbar
  barTextColor: '#64748b',
  barHoverColor: '#2563eb',
  barSelectedColor: '#2563eb',
  barBg: '#ffffff',

  // Forms
  inputBg: '#ffffff',
  inputBorder: '#e2e8f0',
  inputTextColor: '#0f172a',
  inputBorderRadius: 6,
});
