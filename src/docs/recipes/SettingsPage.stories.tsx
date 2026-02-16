import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { Tabs } from '../../components/Tabs';
import { Modal } from '../../components/Modal';
import { toast } from '../../components/Toast/toastStore';
import { ToastContainer } from '../../components/Toast/Toast';

const meta: Meta = {
  title: 'Recipes/Settings Page',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

function SettingsPageDemo() {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ margin: '0 0 24px', fontSize: '1.5rem', fontWeight: 600 }}>
        설정
      </h2>

      <Tabs defaultValue="profile">
        <Tabs.List>
          <Tabs.Trigger value="profile">프로필</Tabs.Trigger>
          <Tabs.Trigger value="account">계정</Tabs.Trigger>
          <Tabs.Trigger value="notifications">알림</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="profile">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              paddingTop: 24,
            }}
          >
            <TextField
              label="이름"
              defaultValue="홍길동"
              fullWidth
            />
            <TextField
              label="소개"
              placeholder="자기소개를 입력하세요"
              fullWidth
            />
            <div>
              <Button onClick={() => toast.success('프로필이 저장되었습니다')}>
                저장
              </Button>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="account">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              paddingTop: 24,
            }}
          >
            <TextField
              label="이메일"
              defaultValue="hong@example.com"
              fullWidth
              readOnly
              helperText="이메일은 변경할 수 없습니다"
            />
            <TextField
              label="현재 비밀번호"
              type="password"
              fullWidth
            />
            <TextField
              label="새 비밀번호"
              type="password"
              fullWidth
              helperText="8자 이상, 영문/숫자/특수문자 조합"
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <Button onClick={() => toast.success('비밀번호가 변경되었습니다')}>
                비밀번호 변경
              </Button>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '8px 0' }} />
            <div>
              <Button
                variant="outline"
                colorScheme="danger"
                onClick={() => setDeleteOpen(true)}
              >
                계정 삭제
              </Button>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="notifications">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              paddingTop: 24,
            }}
          >
            <p style={{ margin: 0, color: '#6b7280' }}>
              알림 설정은 추후 지원 예정입니다.
            </p>
            <Button
              variant="ghost"
              onClick={() => toast.info('알림 설정은 곧 추가됩니다')}
            >
              알림 받기
            </Button>
          </div>
        </Tabs.Content>
      </Tabs>

      <Modal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="계정 삭제"
        size="sm"
        closeOnOverlayClick={false}
      >
        <p>정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <Button
            variant="outline"
            onClick={() => setDeleteOpen(false)}
          >
            취소
          </Button>
          <Button
            colorScheme="danger"
            onClick={() => {
              setDeleteOpen(false);
              toast.error('계정이 삭제되었습니다');
            }}
          >
            삭제
          </Button>
        </div>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export const Default: Story = {
  render: () => <SettingsPageDemo />,
};
