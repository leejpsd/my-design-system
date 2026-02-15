import type { Meta, StoryObj } from '@storybook/react-vite';
import { typography } from './typography';

const labels: Record<string, string> = {
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',
  bodyLg: 'Body Large',
  bodyMd: 'Body Medium',
  caption: 'Caption',
};

function TypographyScale() {
  return (
    <div
      style={{
        fontFamily: 'var(--font-family-sans, sans-serif)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        maxWidth: 700,
      }}
    >
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>
        Typography Scale
      </h2>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24, lineHeight: 1.5 }}>
        6단계 타이포그래피 프리셋. 제목 3단계 + 본문 2단계 + 캡션.
      </p>
      {Object.entries(typography).map(([name, style]) => (
        <div
          key={name}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 20,
            padding: '20px 0',
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <div style={{ width: 100, flexShrink: 0 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#334155',
                marginBottom: 2,
              }}
            >
              {labels[name] || name}
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>
              {style.fontSize}
            </div>
          </div>
          <span
            style={{
              fontSize: style.fontSize,
              fontWeight: Number(style.fontWeight),
              lineHeight: style.lineHeight,
              color: '#0f172a',
            }}
          >
            디자인 시스템 Typography
          </span>
        </div>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Tokens/Typography',
  component: TypographyScale,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

export const Scale: Story = {};
