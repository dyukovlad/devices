import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

type ToastMsg = { id: number; text: string; bg?: 'success' | 'danger' | 'warning' | 'info' };

type ToastCtx = {
  notifySuccess: (text: string) => void;
  notifyError: (text: string) => void;
  notifyInfo: (text: string) => void;
};

const Ctx = createContext<ToastCtx | null>(null);

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('ToastProvider is missing');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastMsg[]>([]);
  const push = useCallback((text: string, bg: ToastMsg['bg']) => {
    setItems((prev) => [...prev, { id: Date.now() + Math.random(), text, bg }]);
  }, []);
  const remove = useCallback(
    (id: number) => setItems((prev) => prev.filter((t) => t.id !== id)),
    []
  );

  const value = useMemo<ToastCtx>(
    () => ({
      notifySuccess: (t) => push(t, 'success'),
      notifyError: (t) => push(t, 'danger'),
      notifyInfo: (t) => push(t, 'info'),
    }),
    [push]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <ToastContainer position="top-end" className="p-3">
        {items.map((t) => (
          <Toast key={t.id} bg={t.bg} onClose={() => remove(t.id)} delay={3500} autohide>
            <Toast.Body>{t.text}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </Ctx.Provider>
  );
}
