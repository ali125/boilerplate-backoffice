import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';

const MainLayout: React.FC = () => {
  return (
    <main className="flex items-start gap-10 bg-gray-100 min-h-[100vh]">
      <Sidebar />
      <section className='flex-1 pr-10'>
        <Header />
        <Outlet />
      </section>
    </main>
  );
}

export default MainLayout