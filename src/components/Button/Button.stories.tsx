import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'danger', 'neutral'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

// ===== Basic Stories =====

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['solid', 'outline', 'ghost', 'link'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ width: '64px', fontSize: '13px', color: '#6b7280' }}>
            {variant}
          </span>
          {(['primary', 'danger', 'neutral'] as const).map((colorScheme) => (
            <Button key={colorScheme} variant={variant} colorScheme={colorScheme}>
              {colorScheme}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Saving...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithIcon: Story = {
  render: () => {
    const PlusIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2Z" />
      </svg>
    );
    const ArrowIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" />
      </svg>
    );

    return (
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button leftIcon={<PlusIcon />}>Create</Button>
        <Button rightIcon={<ArrowIcon />}>Next</Button>
        <Button leftIcon={<PlusIcon />} rightIcon={<ArrowIcon />}>
          Both
        </Button>
      </div>
    );
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link Button',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    href: 'https://example.com' as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: '_blank' as any,
  },
};

// ===== Interaction Tests =====

export const ClickTest: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Click me' });

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const LoadingDisablesClick: Story = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Loading...' });

    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-busy', 'true');
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Disabled' });

    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const KeyboardFocus: Story = {
  args: {
    children: 'Focus me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Focus me' });

    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};
