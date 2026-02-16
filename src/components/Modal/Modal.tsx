import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { usePrevious } from '../../hooks/usePrevious';
import styles from './Modal.module.css';

export interface ModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 닫기 핸들러 */
  onClose: () => void;
  /** 모달 제목 */
  title?: string;
  /** 모달 내용 */
  children: ReactNode;
  /** 모달 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 오버레이 클릭 시 닫기 여부 */
  closeOnOverlayClick?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
}: ModalProps) {
  // closing: 퇴장 애니메이션 진행 중
  const [closing, setClosing] = useState(false);
  const focusRef = useFocusTrap(isOpen);

  // isOpen false 전환 시 퇴장 애니메이션 시작
  const prevOpen = usePrevious(isOpen);
  if (prevOpen && !isOpen && !closing) {
    setClosing(true);
  }

  const handleTransitionEnd = useCallback(() => {
    if (!isOpen) {
      setClosing(false);
    }
  }, [isOpen]);

  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return;

    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // 배경 스크롤 잠금
  useEffect(() => {
    if (!isOpen && !closing) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, closing]);

  // 열리지 않았고, 퇴장 애니메이션도 아니면 렌더링하지 않음
  if (!isOpen && !closing) return null;

  return createPortal(
    <div
      className={clsx(styles.overlay)}
      data-state={isOpen ? 'open' : 'closed'}
      onClick={closeOnOverlayClick ? onClose : undefined}
      onTransitionEnd={handleTransitionEnd}
      aria-hidden="true"
    >
      <div
        ref={focusRef}
        className={clsx(styles.modal, styles[size])}
        data-state={isOpen ? 'open' : 'closed'}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="닫기"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

