import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Modal>;

function ModalDemo({
  size,
  title = '모달 제목',
}: {
  size?: 'sm' | 'md' | 'lg';
  title?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        size={size}
      >
        <p>모달 본문 내용입니다. ESC 키 또는 배경 클릭으로 닫을 수 있습니다.</p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            취소
          </Button>
          <Button onClick={() => setIsOpen(false)}>확인</Button>
        </div>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const SmallSize: Story = {
  render: () => <ModalDemo size="sm" title="작은 모달" />,
};

export const LargeSize: Story = {
  render: () => <ModalDemo size="lg" title="큰 모달" />,
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>긴 내용 모달</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="스크롤 가능한 모달"
        >
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>내용 {i + 1}. 이 모달은 스크롤이 가능합니다.</p>
          ))}
        </Modal>
      </>
    );
  },
};

// ===== Interaction Tests =====

export const OpenCloseTest: Story = {
  render: () => <ModalDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole('button', { name: '모달 열기' });

    // 모달 열기
    await userEvent.click(openButton);

    // 모달이 열렸는지 확인 (body에서 dialog 검색)
    const dialog = await within(document.body).findByRole('dialog');
    await expect(dialog).toBeInTheDocument();

    // 닫기 버튼 클릭
    const closeButton = within(dialog).getByLabelText('닫기');
    await userEvent.click(closeButton);
  },
};

export const EscKeyClose: Story = {
  render: () => <ModalDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole('button', { name: '모달 열기' });

    await userEvent.click(openButton);
    const dialog = await within(document.body).findByRole('dialog');
    await expect(dialog).toBeInTheDocument();

    // ESC 키로 닫기
    await userEvent.keyboard('{Escape}');
  },
};
