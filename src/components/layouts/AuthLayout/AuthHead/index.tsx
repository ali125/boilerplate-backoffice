import React from 'react';

export interface AuthHeadProps {
  title: string;
  description: string;
}

const AuthHead: React.FC<AuthHeadProps> = ({ title, description }) => (
  <header className='mb-8'>
    <h1 className='font-medium text-5xl capitalize mb-4'>{title}</h1>
    <p className="font-medium text-lg first-letter:uppercase">{description}</p>
  </header>
)

export default AuthHead