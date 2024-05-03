import React, { useCallback, useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Dropdown from '@/components/base/Dropdown';
import { Groups } from '@mui/icons-material';
import Image from '@/components/base/Image';
import AvatarImage from "@/assets/images/avatar.svg";

const UserHeader: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef(null);
  
    const handleLogout = useCallback(() => {

    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
    }, []);
      

    return (
       <>
            <IconButton ref={ref} onClick={handleOpen} className='h-10 bg-white w-10 p-0'>
                <Image src={AvatarImage} className='h-full w-full' />
            </IconButton>
            <Dropdown
                isOpen={isOpen}
                menuClassName="!w-auto min-w-[8rem]"
                onClose={handleClose}
                anchorRef={ref.current}
                placement='bottom-start'
                closeable={false}
                menuList={[
                    { id: "profile", label: "Profile", url: "/profile", icon: <Groups /> }
                ]}
            />
       </>
    );
}

export default UserHeader;
