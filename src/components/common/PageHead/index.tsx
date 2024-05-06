import React from 'react';
import Chip from '@mui/material/Chip';

type PageHeadProps = {
    title: string,
    sub?: string,
    component?: React.ReactNode,
}

const PageHead: React.FC<PageHeadProps> = ({ title, sub, component }) => {
  return (
    <section className='py-3 flex items-center gap-3'>
        <h1 className='text-3xl capitalize'>{title}</h1>
        {sub && <Chip label={sub} color="default" className='bg-white capitalize font-semibold text-sm tracking-wide' />}
        {component}
    </section>
  )
}

export default PageHead