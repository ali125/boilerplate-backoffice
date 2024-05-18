import React from 'react';
import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import PageHead from '@/components/common/PageHead';
import ChangePasswordForm from './ChangePasswordForm';
import ProfileForm from './ProfileForm';

const Settings: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <PageHead title={t("setting.settings")} />
            <div className="flex gap-10 items-stretch">
                <Paper elevation={3} className='rounded-lg p-5 flex-1 flex flex-col min-h-[60vh]'>
                    <h3 className='text-xl font-medium capitalize border-b pb-3 mb-5'>{t("account.profile")}</h3>
                    <ProfileForm />
                </Paper>
                <Paper elevation={3} className='rounded-lg p-5 flex-1 flex flex-col'>
                    <h3 className='text-xl font-medium capitalize border-b pb-3 mb-5'>{t("account.changePassword")}</h3>
                    <ChangePasswordForm />
                </Paper>
            </div>
        </>
    );
}

export default Settings