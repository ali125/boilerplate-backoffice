import React from 'react';
import SidebarBG from "@/assets/images/Auth/sidebar-bg.png";
import Image from '@/components/base/Image';

const AuthSidebar: React.FC = () => {
  return (
    <section className='flex items-center justify-center h-full w-1/2 bg-sky-200'>
      <div className="w-3/5 h-3/5">
        <Image src={SidebarBG} className='w-full h-full object-contain' />
      </div>
    </section>
  )
}

export default AuthSidebar