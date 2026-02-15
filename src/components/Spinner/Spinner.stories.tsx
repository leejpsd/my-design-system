import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from '@storybook/test';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { size: 'md' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div
          key={size}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Spinner size={size} />
          <span
            style={{
              fontSize: 12,
              color: 'var(--color-text-tertiary)',
              fontFamily: 'monospace',
            }}
          >
            {size}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Spinner size="sm" />
      <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
        로딩 중...
      </span>
    </div>
  ),
};

// ===== Interaction Tests =====

export const AccessibilityTest: Story = {
  args: { size: 'md' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const svg = canvas.getByRole('img', { hidden: true });

    // Spinner는 장식 요소이므로 aria-hidden="true"
    await expect(svg).toHaveAttribute('aria-hidden', 'true');
  },
};

export const SizeRenderTest: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Spinner size="sm" data-testid="spinner-sm" />
      <Spinner size="md" data-testid="spinner-md" />
      <Spinner size="lg" data-testid="spinner-lg" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const spinners = canvas.getAllByRole('img', { hidden: true });

    // 3개 사이즈 모두 렌더링 확인
    await expect(spinners).toHaveLength(3);
  },
};
