import React, { PropsWithChildren } from 'react';
import AuthSidebar from './AuthSidebar';
import AuthHead, { AuthHeadProps } from './AuthHead';

type Props = AuthHeadProps & PropsWithChildren & {}

const AuthLayout: React.FC<Props> = ({ title, description, children }) => {
  return (
    <main className="flex items-start h-screen">
      <section className='w-1/2 flex-1 h-full flex items-center justify-center'>
        <div className='w-1/2 h-1/2'>
          <AuthHead title={title} description={description} />
          {children}
        </div>
      </section>
      <AuthSidebar />
    </main>
  )
}

export default AuthLayout