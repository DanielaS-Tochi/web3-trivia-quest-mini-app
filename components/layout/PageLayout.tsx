import React from 'react';
import { AuthButton } from '@/components/ui/AuthButton';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <header className="fixed top-0 left-0 right-0 p-4 flex justify-end">
        <AuthButton />
      </header>
      <main className="min-h-screen flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}