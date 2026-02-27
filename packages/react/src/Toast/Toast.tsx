import { useEffect, useState, useSyncExternalStore, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { toastStore, type ToastItem } from './toastStore';
import styles from './Toast.module.css';

/* ===== 개별 Toast 아이템 ===== */
function ToastItemComponent({ item }: { item: ToastItem }) {
  const [visible, setVisible] = useState(false);

  // 진입 애니메이션
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }, []);

  // 자동 dismiss
  useEffect(() => {
    const dismissTimer = setTimeout(() => {
      setVisible(false);
    }, item.duration);

    const removeTimer = setTimeout(() => {
      toastStore.remove(item.id);
    }, item.duration + 200); // 퇴장 애니메이션 시간

    return () => {
      clearTimeout(dismissTimer);
      clearTimeout(removeTimer);
    };
  }, [item.id, item.duration]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => toastStore.remove(item.id), 200);
  }, [item.id]);

  return (
    <div
      className={clsx(styles.toast, styles[item.type], visible && styles.visible)}
      role="status"
      aria-live="polite"
    >
      <span className={styles.icon}>{typeIcons[item.type]}</span>
      <p className={styles.message}>{item.message}</p>
      <button
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="닫기"
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </button>
    </div>
  );
}

/* ===== 타입별 아이콘 ===== */
const typeIcons: Record<ToastItem['type'], string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

/* ===== Toast 컨테이너 ===== */
export function ToastContainer() {
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getToasts,
    toastStore.getToasts,
  );

  if (toasts.length === 0) return null;

  return createPortal(
    <div className={styles.container} aria-label="알림">
      {toasts.map((item) => (
        <ToastItemComponent key={item.id} item={item} />
      ))}
    </div>,
    document.body,
  );
}
