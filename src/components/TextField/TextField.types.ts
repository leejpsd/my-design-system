import type { InputHTMLAttributes, ReactNode } from 'react';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 라벨 텍스트 */
  label?: string;
  /** 도움 텍스트 */
  helperText?: string;
  /** 에러 메시지 (표시 시 isError 자동 활성화) */
  errorMessage?: string;
  /** 에러 상태 */
  isError?: boolean;
  /** 입력 필드 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 왼쪽 슬롯 (아이콘 등) */
  leftSlot?: ReactNode;
  /** 오른쪽 슬롯 (아이콘, 단위 텍스트 등) */
  rightSlot?: ReactNode;
  /** 전체 너비 */
  fullWidth?: boolean;
}
