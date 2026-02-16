import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ToastContainer } from './Toast';
import { toast } from './toastStore';
import { Button } from '../Button';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <ToastContainer />
      </>
    ),
  ],
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button onClick={() => toast.success('저장 완료!')}>Success</Button>
      <Button onClick={() => toast.error('오류가 발생했습니다')}>Error</Button>
      <Button onClick={() => toast.warning('주의가 필요합니다')}>
        Warning
      </Button>
      <Button onClick={() => toast.info('참고 정보입니다')}>Info</Button>
    </div>
  ),
};

export const StackedToasts: Story = {
  render: () => (
    <Button
      onClick={() => {
        toast.success('첫 번째 알림');
        setTimeout(() => toast.info('두 번째 알림'), 200);
        setTimeout(() => toast.warning('세 번째 알림'), 400);
      }}
    >
      3개 동시 표시
    </Button>
  ),
};

export const CustomDuration: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button onClick={() => toast.info('1초 후 사라짐', 1000)}>1초</Button>
      <Button onClick={() => toast.info('5초 후 사라짐', 5000)}>5초</Button>
      <Button onClick={() => toast.info('10초 후 사라짐', 10000)}>10초</Button>
    </div>
  ),
};

// ===== Interaction Tests =====

export const ShowToastTest: Story = {
  render: () => (
    <Button onClick={() => toast.success('테스트 성공!')}>토스트 표시</Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: '토스트 표시' });

    // 버튼 클릭하여 토스트 표시
    await userEvent.click(button);

    // body에서 토스트 메시지 확인
    const toastEl = await within(document.body).findByText('테스트 성공!');
    await expect(toastEl).toBeInTheDocument();
  },
};

export const CloseToastTest: Story = {
  render: () => (
    <Button onClick={() => toast.info('닫기 테스트', 30000)}>
      토스트 표시
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: '토스트 표시' });

    await userEvent.click(button);

    // 토스트가 나타날 때까지 대기
    const toastEl = await within(document.body).findByText('닫기 테스트');
    await expect(toastEl).toBeInTheDocument();

    // 닫기 버튼 클릭
    const closeButton = within(
      toastEl.closest('[role="status"]')!,
    ).getByLabelText('닫기');
    await userEvent.click(closeButton);
  },
};

export const MultipleTypesTest: Story = {
  render: () => (
    <Button
      onClick={() => {
        toast.success('성공');
        toast.error('에러');
      }}
    >
      다중 타입
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '다중 타입' }));

    const body = within(document.body);
    await expect(await body.findByText('성공')).toBeInTheDocument();
    await expect(await body.findByText('에러')).toBeInTheDocument();
  },
};
