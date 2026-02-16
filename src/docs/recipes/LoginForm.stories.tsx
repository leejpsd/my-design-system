import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { toast } from '../../components/Toast/toastStore';
import { ToastContainer } from '../../components/Toast/Toast';

const meta: Meta = {
  title: 'Recipes/Login Form',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

function LoginFormDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);

  function validate() {
    const newErrors: typeof errors = {};
    if (!email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }
    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (password.length < 8) {
      newErrors.password = '8자 이상 입력해주세요';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('로그인 성공!');
    }, 1500);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
        로그인
      </h2>
      <TextField
        label="이메일"
        type="email"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={errors.email}
        fullWidth
        leftSlot={
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2-.5a.5.5 0 0 0-.5.5v.217l4.5 3a.5.5 0 0 0 .5 0l4.5-3V4a.5.5 0 0 0-.5-.5H4zm9.5 2.09l-4.13 2.756a1.5 1.5 0 0 1-1.74 0L3.5 5.59V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V5.59z" />
          </svg>
        }
      />
      <TextField
        label="비밀번호"
        type="password"
        placeholder="8자 이상"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorMessage={errors.password}
        helperText="영문, 숫자, 특수문자 조합 권장"
        fullWidth
        leftSlot={
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-.5V4.5A3.5 3.5 0 0 0 8 1zm2 6H6V4.5a2 2 0 1 1 4 0V7z" />
          </svg>
        }
      />
      <Button type="submit" fullWidth isLoading={isLoading}>
        로그인
      </Button>
      <Button variant="ghost" fullWidth>
        비밀번호를 잊으셨나요?
      </Button>
      <ToastContainer />
    </form>
  );
}

export const Default: Story = {
  render: () => <LoginFormDemo />,
};
