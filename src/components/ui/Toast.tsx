import React from 'react';
import { useToastContext } from '@/context/ToastContext';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastType } from '@/types';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastContext();

  if (toasts.length === 0) return null;

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-brand-500 shrink-0" />;
    }
  };

  const getBorderColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'border-emerald-200 bg-emerald-50/50';
      case 'error':
        return 'border-rose-200 bg-rose-50/50';
      case 'warning':
        return 'border-amber-200 bg-amber-50/50';
      case 'info':
      default:
        return 'border-blue-200 bg-blue-50/50';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border bg-white shadow-lg transition-all duration-200 animate-in slide-in-from-bottom-5',
            getBorderColor(toast.type)
          )}
        >
          {getIcon(toast.type)}
          <div className="flex-1 pt-0.5">
            <h4 className="text-xs font-semibold text-slate-900">{toast.title}</h4>
            {toast.message && (
              <p className="text-xs text-slate-600 mt-0.5">{toast.message}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
