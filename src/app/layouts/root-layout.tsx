import { Outlet } from 'react-router';

import { Header } from '@/features/header';
import { SideBar } from '@/features/side-bar';

export default function RootLayout() {
  return (
    <>
      <Header />
      <div className="flex gap-4 px-4">
        <div className="h-full min-w-[200px]">
          <SideBar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}
