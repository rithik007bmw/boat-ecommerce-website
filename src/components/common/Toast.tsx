import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl shadow-xl bg-white border border-[#E6E1D8] transition-all transform animate-in slide-in-from-bottom duration-200"
          role="alert"
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-[#C62828] shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-[#A94F55] shrink-0" />
            )}
            <p className="text-sm font-medium text-[#292929]">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#706B65] hover:text-[#292929] p-1 rounded-lg transition-colors ml-2"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
