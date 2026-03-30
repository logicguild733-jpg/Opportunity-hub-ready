import React, { ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold">Opportunity Hub</h1>
      </header>
      <main className="p-4">{children}</main>
      <footer className="bg-white shadow p-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Opportunity Hub
      </footer>
    </div>
  );
};

export default AppLayout;
