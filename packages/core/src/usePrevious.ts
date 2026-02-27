import { useState } from 'react';

/** 이전 렌더링의 값을 추적하는 훅 */
export function usePrevious<T>(value: T): T | undefined {
  const [prev, setPrev] = useState<{ value: T; current: T }>({
    value,
    current: value,
  });

  if (prev.current !== value) {
    setPrev({ value: prev.current, current: value });
  }

  return prev.value;
}
