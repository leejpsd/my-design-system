import type { Meta, StoryObj } from '@storybook/react-vite';
import { gray, blue, red, green, amber } from './colors';

const colorScales = { gray, blue, red, green, amber };

const semanticColors = [
  { token: '--color-primary-500', label: 'Primary', light: '#3b82f6', dark: '#60a5fa' },
  { token: '--color-success', label: 'Success', light: '#22c55e', dark: '#4ade80' },
  { token: '--color-error', label: 'Error', light: '#ef4444', dark: '#f87171' },
  { token: '--color-warning', label: 'Warning', light: '#f59e0b', dark: '#fbbf24' },
  { token: '--color-info', label: 'Info', light: '#3b82f6', dark: '#60a5fa' },
];

const swatch: React.CSSProperties = {
  width: 72,
  height: 56,
  borderRadius: 10,
  border: '1px solid rgba(0,0,0,0.06)',
  transition: 'transform 0.15s, box-shadow 0.15s',
  cursor: 'default',
};

function ColorPalette() {
  return (
    <div style={{ fontFamily: 'var(--font-family-sans, sans-serif)', maxWidth: 800 }}>
      {/* Semantic Colors */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16, color: '#0f172a' }}>
        Semantic Colors
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 48 }}>
        {semanticColors.map(({ token, label, light }) => (
          <div
            key={token}
            style={{
              padding: 16,
              borderRadius: 12,
              border: '1px solid #e2e8f0',
              background: '#fff',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                height: 48,
                borderRadius: 8,
                backgroundColor: light,
                marginBottom: 10,
              }}
            />
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{label}</div>
            <div style={{ fontSize: 11, color: '#64748b', fontFamily: 'monospace', marginTop: 2 }}>
              {token}
            </div>
          </div>
        ))}
      </div>

      {/* Primitive Palettes */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16, color: '#0f172a' }}>
        Primitive Palettes
      </h2>
      {Object.entries(colorScales).map(([name, scale]) => (
        <div key={name} style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: 10,
              textTransform: 'capitalize',
              color: '#334155',
              letterSpacing: '0.02em',
            }}
          >
            {name}
          </h3>
          <div style={{ display: 'flex', gap: 6 }}>
            {Object.entries(scale).map(([step, color]) => (
              <div key={step} style={{ textAlign: 'center' }}>
                <div
                  style={{ ...swatch, backgroundColor: color }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                  title={`${name}-${step}: ${color}`}
                />
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    marginTop: 6,
                    color: '#334155',
                  }}
                >
                  {step}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: '#94a3b8',
                    fontFamily: 'monospace',
                  }}
                >
                  {color}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Tokens/Colors',
  component: ColorPalette,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

export const Palette: Story = {};
