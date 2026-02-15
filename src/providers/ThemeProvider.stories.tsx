import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from '../hooks/useTheme';

function ThemeDemo() {
  const { mode, toggleMode } = useTheme();

  return (
    <div
      style={{
        padding: '32px',
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        borderRadius: '12px',
        fontFamily: 'var(--font-family-sans, sans-serif)',
        transition: 'background-color 0.2s, color 0.2s',
      }}
    >
      <h2 style={{ marginTop: 0 }}>ThemeProvider Demo</h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        Current mode: <strong>{mode}</strong>
      </p>
      <button
        onClick={toggleMode}
        style={{
          padding: '8px 16px',
          backgroundColor: 'var(--color-primary-500)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Toggle to {mode === 'light' ? 'Dark' : 'Light'}
      </button>
      <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
        {['primary', 'success', 'error', 'warning'].map((color) => (
          <div
            key={color}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: `var(--color-${color === 'primary' ? 'primary-500' : color})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ThemeStory() {
  return (
    <ThemeProvider>
      <ThemeDemo />
    </ThemeProvider>
  );
}

function CustomThemeStory() {
  return (
    <ThemeProvider
      theme={{
        '--color-primary-500': '#8b5cf6',
        '--color-primary-600': '#7c3aed',
      }}
    >
      <ThemeDemo />
    </ThemeProvider>
  );
}

const meta: Meta = {
  title: 'Providers/ThemeProvider',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => <ThemeStory />,
};

export const CustomTheme: Story = {
  render: () => <CustomThemeStory />,
};
