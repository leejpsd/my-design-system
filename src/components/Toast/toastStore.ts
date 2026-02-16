export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

type Listener = () => void;

let toasts: ToastItem[] = [];
const listeners = new Set<Listener>();
let idCounter = 0;

function emit() {
  listeners.forEach((l) => l());
}

function addToast(type: ToastType, message: string, duration = 3000) {
  const id = String(++idCounter);
  toasts = [...toasts, { id, type, message, duration }];
  emit();
  return id;
}

function removeToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

export const toastStore = {
  getToasts: () => toasts,
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  remove: removeToast,
};

export const toast = {
  success: (message: string, duration?: number) =>
    addToast('success', message, duration),
  error: (message: string, duration?: number) =>
    addToast('error', message, duration),
  warning: (message: string, duration?: number) =>
    addToast('warning', message, duration),
  info: (message: string, duration?: number) =>
    addToast('info', message, duration),
};
