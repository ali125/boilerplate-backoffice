import React, { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import Dropdown from '@/components/base/Dropdown';
import Image from '@/components/base/Image';
import AvatarImage from "@/assets/images/avatar.svg";
import { useLogoutMutation } from '@/redux/apiSlice/authSlice';
import { browserRoutes } from '@/constants/routes';
import { useDispatch } from 'react-redux';
import apiSlice from '@/redux/apiSlice';
import { logOut } from '@/redux/authSlice';

const UserHeader: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef(null);

    const dispatch = useDispatch();
    const navigation = useNavigate();
    const { t } = useTranslation();
    const [logout] = useLogoutMutation();
  
    const handleLogout = useCallback(async () => {
        try {
            await logout();
            dispatch(logOut());
            dispatch(apiSlice.util.resetApiState());
            navigation(browserRoutes.signIn, { replace: true });
        } catch (err) {
            console.log(err);
        }
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
                menuClassName="!w-auto min-w-[8rem] capitalize"
                onClose={handleClose}
                anchorRef={ref.current}
                placement='bottom-start'
                closeable={false}
                menuList={[
                    { id: "profile", label: t('account.profile'), url: browserRoutes.settings, icon: <ManageAccounts /> },
                    { id: "logout", label: t('account.logout'), onClick: handleLogout, icon: <Logout /> }
                ]}
            />
       </>
    );
}

export default UserHeader;
