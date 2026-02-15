import type { Meta, StoryObj } from '@storybook/react-vite';
import { spacing } from './spacing';

function SpacingScale() {
  return (
    <div
      style={{
        fontFamily: 'var(--font-family-sans, sans-serif)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 600,
      }}
    >
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>
        Spacing Scale
      </h2>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 20, lineHeight: 1.5 }}>
        4px 기반 스케일. 일관된 여백 체계를 유지합니다.
      </p>
      {Object.entries(spacing).map(([key, value]) => (
        <div
          key={key}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '8px 0',
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <code
            style={{
              width: 100,
              fontSize: 13,
              fontWeight: 500,
              color: '#334155',
              fontFamily: 'monospace',
            }}
          >
            --spacing-{key}
          </code>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: value,
                minWidth: 2,
                height: 24,
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                borderRadius: 4,
                transition: 'transform 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scaleY(1.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
              }}
            />
          </div>
          <span
            style={{
              width: 48,
              textAlign: 'right',
              fontSize: 12,
              color: '#94a3b8',
              fontFamily: 'monospace',
            }}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Tokens/Spacing',
  component: SpacingScale,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

export const Scale: Story = {};
