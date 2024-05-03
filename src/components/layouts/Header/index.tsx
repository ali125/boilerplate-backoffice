import React from 'react';
import TodayDate from './components/TodayDate';
import UserHeader from './components/UserHeader';
import NotificationHeader from './components/NotificationHeader';
import SearchHeader from './components/SearchHeader';

const Header: React.FC = () => {
  return (
    <header className='flex py-4 h-24 w-full items-end justify-between'>
      <TodayDate />

      <div className='flex items-center gap-3'>
        <SearchHeader />
        <NotificationHeader />
        <UserHeader />
      </div>
    </header>
  )
}

export default Header