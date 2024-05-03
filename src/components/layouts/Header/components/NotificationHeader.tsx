import React, { useCallback, useRef, useState } from 'react'
import { IconButton } from '@mui/material';
import Dropdown from '@/components/base/Dropdown';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const NotificationHeader: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef(null);
  
    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
    }, []);
      

    return (
       <>
            <IconButton ref={ref} onClick={handleOpen} className='bg-white h-10 w-10 p-0'>
                <NotificationsNoneIcon />
            </IconButton>
            <Dropdown
                isOpen={isOpen}
                menuClassName="!w-auto min-w-[8rem]"
                onClose={handleClose}
                anchorRef={ref.current}
                placement='bottom-start'
                closeable={false}
                menuList={[
                    { id: "profile", label: "Profile", url: "/profile", icon: <NotificationsNoneIcon /> }
                ]}
            />
       </>
    );
}

export default NotificationHeader;
