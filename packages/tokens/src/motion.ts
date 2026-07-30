/**
 * Motion Tokens
 *
 * duration은 CSS 변수로도 노출되며, prefers-reduced-motion 환경에서는
 * 생성된 CSS가 duration을 0ms로 재정의해 모든 전환을 비활성화한다.
 * (Spinner처럼 상태 전달에 필수적인 모션은 예외)
 */
export const duration = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
} as const;

export const easing = {
  default: 'ease',
  enter: 'cubic-bezier(0.21, 1.02, 0.73, 1)',
} as const;
