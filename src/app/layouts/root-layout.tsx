import { useState } from 'react';
import { Outlet } from 'react-router';

import { Header } from '@/features/header';
import { SideBar } from '@/features/side-bar';
import { cn } from '@/shared/lib/cn';

export default function RootLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'ml-64 relative transition-all duration-300 h-screen flex flex-col',
        {
          ['ml-16']: collapsed,
        },
      )}
    >
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4 flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
