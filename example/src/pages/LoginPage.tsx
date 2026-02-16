import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button, TextField, toast } from '@my/design-system';

export function LoginPage() {
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
      newErrors.password = '비밀번호는 8자 이상이어야 합니다';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('로그인에 성공했습니다');
    }, 1500);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: 'var(--font-size-2xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-text-primary)',
        }}
      >
        로그인
      </h2>
      <p
        style={{
          margin: 0,
          color: 'var(--color-text-secondary)',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        계정에 로그인하여 서비스를 이용하세요.
      </p>

      <TextField
        label="이메일"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={errors.email}
        isError={!!errors.email}
        fullWidth
        leftSlot={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2-.5a.5.5 0 0 0-.5.5v.217l4.5 3a.5.5 0 0 0 .5 0l4.5-3V4a.5.5 0 0 0-.5-.5H4zm9.5 2.09-4.13 2.756a1.5 1.5 0 0 1-1.74 0L3.5 5.59V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V5.59z" />
          </svg>
        }
      />

      <TextField
        label="비밀번호"
        type="password"
        placeholder="8자 이상 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorMessage={errors.password}
        isError={!!errors.password}
        helperText="영문, 숫자, 특수문자를 조합하세요"
        fullWidth
        leftSlot={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-.5V4.5A3.5 3.5 0 0 0 8 1zm2 6H6V4.5a2 2 0 1 1 4 0V7z" />
          </svg>
        }
      />

      <Button type="submit" fullWidth isLoading={isLoading}>
        로그인
      </Button>

      <Button variant="link" fullWidth onClick={() => toast.info('데모 앱입니다')}>
        비밀번호를 잊으셨나요?
      </Button>
    </form>
  );
}
