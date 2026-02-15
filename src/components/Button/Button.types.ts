import type { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 스타일 변형 */
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  /** 버튼 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 색상 테마 */
  colorScheme?: 'primary' | 'danger' | 'neutral';
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 왼쪽 아이콘 */
  leftIcon?: ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: ReactNode;
  /** 전체 너비 */
  fullWidth?: boolean;
  /** 렌더링할 HTML 요소 (다형성) */
  as?: ElementType;
}
