import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof TextField>;

// ===== Basic Stories =====

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
    helperText: '업무용 이메일을 입력해주세요',
  },
};

export const ErrorState: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
    errorMessage: '올바른 이메일 형식이 아닙니다',
    isError: true,
    defaultValue: 'invalid-email',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
      <TextField size="sm" label="Small" placeholder="Small input" />
      <TextField size="md" label="Medium" placeholder="Medium input" />
      <TextField size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

export const DisabledState: Story = {
  args: {
    label: '이름',
    disabled: true,
    defaultValue: '홍길동',
  },
};

export const ReadOnlyState: Story = {
  args: {
    label: '이름',
    readOnly: true,
    defaultValue: '홍길동',
  },
};

export const WithSlots: Story = {
  render: () => {
    const SearchIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.442.156a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
      </svg>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
        <TextField
          label="검색"
          placeholder="검색어를 입력하세요"
          leftSlot={<SearchIcon />}
        />
        <TextField
          label="가격"
          placeholder="0"
          rightSlot={<span style={{ fontSize: '14px' }}>원</span>}
        />
        <TextField
          label="URL"
          placeholder="example.com"
          leftSlot={<span style={{ fontSize: '14px' }}>https://</span>}
        />
      </div>
    );
  },
};

export const FullWidth: Story = {
  args: {
    label: '전체 너비',
    placeholder: 'Full width input',
    fullWidth: true,
  },
};

// ===== Interaction Tests =====

export const TypingTest: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('이름');

    await userEvent.type(input, '홍길동');
    await expect(input).toHaveValue('홍길동');
  },
};

export const LabelInputConnection: Story = {
  args: {
    label: '이메일',
    placeholder: 'test@test.com',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // label 클릭 시 input에 포커스가 가는지 검증 (htmlFor-id 연결)
    const label = canvas.getByText('이메일');
    await userEvent.click(label);

    const input = canvas.getByLabelText('이메일');
    await expect(input).toHaveFocus();
  },
};

export const ErrorAccessibility: Story = {
  args: {
    label: '이메일',
    errorMessage: '필수 입력 항목입니다',
    isError: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('이메일');

    await expect(input).toHaveAttribute('aria-invalid', 'true');
    // aria-describedby가 에러 메시지를 가리키는지 검증
    const describedBy = input.getAttribute('aria-describedby');
    await expect(describedBy).toBeTruthy();

    const errorEl = canvas.getByRole('alert');
    await expect(errorEl).toHaveTextContent('필수 입력 항목입니다');
  },
};

export const DisabledInteraction: Story = {
  args: {
    label: '비활성',
    disabled: true,
    defaultValue: '수정 불가',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('비활성');

    await expect(input).toBeDisabled();
  },
};
