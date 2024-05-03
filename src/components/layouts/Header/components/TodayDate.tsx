import React, { useMemo } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { format } from 'date-fns';

const TodayDate: React.FC = () => {
    const today = useMemo(() => format(new Date(), "MMMM dd, YYY"), []);
    return (
        <span className='flex items-center justify-center gap-2'>
            <CalendarTodayIcon fontSize='small' className='text-secondary' />
            <span className='font-medium text-slate-600'>{today}</span>
        </span>
    )
}

export default TodayDate