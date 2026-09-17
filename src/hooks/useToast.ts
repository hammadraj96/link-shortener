import { useToastContext } from '@/context/ToastContext';

export function useToast() {
  const { showToast, removeToast, toasts } = useToastContext();

  return {
    toasts,
    toast: showToast,
    success: (title: string, message?: string) => showToast(title, { message, type: 'success' }),
    error: (title: string, message?: string) => showToast(title, { message, type: 'error' }),
    info: (title: string, message?: string) => showToast(title, { message, type: 'info' }),
    warning: (title: string, message?: string) => showToast(title, { message, type: 'warning' }),
    removeToast,
  };
}
