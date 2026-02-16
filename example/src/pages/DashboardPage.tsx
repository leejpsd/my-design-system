import { useState } from 'react';
import { Button, TextField, Tabs, Modal, Spinner, toast } from '@my/design-system';

export function DashboardPage() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('프로필이 저장되었습니다');
    }, 1000);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text-primary)',
          }}
        >
          대시보드
        </h2>
        <p
          style={{
            margin: '8px 0 0',
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          계정 설정과 환경설정을 관리하세요.
        </p>
      </div>

      <Tabs defaultValue="profile">
        <Tabs.List>
          <Tabs.Trigger value="profile">프로필</Tabs.Trigger>
          <Tabs.Trigger value="account">계정</Tabs.Trigger>
          <Tabs.Trigger value="notifications" disabled>
            알림
          </Tabs.Trigger>
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
            <TextField label="이름" defaultValue="홍길동" fullWidth />
            <TextField
              label="소개"
              placeholder="자기소개를 입력하세요"
              fullWidth
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Button onClick={handleSave} isLoading={saving}>
                저장
              </Button>
              {saving && <Spinner size="sm" />}
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
            <TextField label="현재 비밀번호" type="password" fullWidth />
            <TextField
              label="새 비밀번호"
              type="password"
              fullWidth
              helperText="영문, 숫자, 특수문자 포함 8자 이상"
            />
            <div>
              <Button
                onClick={() => toast.info('비밀번호 변경은 데모입니다')}
              >
                비밀번호 변경
              </Button>
            </div>

            <hr
              style={{
                border: 'none',
                borderTop: '1px solid var(--color-border)',
                margin: '8px 0',
              }}
            />

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
      </Tabs>

      <Modal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="계정 삭제"
        size="sm"
        closeOnOverlayClick={false}
      >
        <p>정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <Button variant="outline" onClick={() => setDeleteOpen(false)}>
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
    </div>
  );
}
