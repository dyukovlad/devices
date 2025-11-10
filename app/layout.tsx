import type { Metadata } from 'next';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastProvider } from '../src/shared/ui/ToastProvider';

export const metadata: Metadata = {
  title: 'Devices UI',
  description: 'Device management interface',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
