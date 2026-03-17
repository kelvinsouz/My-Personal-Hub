import { useState, useCallback } from "react";

// tipo de cada toast
type ToastItem = {
    id: string;
    title?: string;
    description?: string;
    action?: React.ReactNode;
};

// hook que mantém os toasts
export function useToast() {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = useCallback((toast: Omit<ToastItem, "id">) => {
        const id = crypto.randomUUID();
        setToasts((prev) => [...prev, { ...toast, id }]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return {
        toasts,
        addToast,
        removeToast,
    };
}