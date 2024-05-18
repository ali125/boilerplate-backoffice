import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import InputController from '@/components/base/Form/InputController';
import { createLocale } from '@/config/translation/i18n';
import { ProfileFormValues } from '@/@types/auth.type';
import { useUpdateProfileMutation } from '@/redux/apiSlice/authSlice';
import { convertToFormData } from '@/utils/helpers/form';
import { showMessage } from '@/utils/helpers/showMessage';
import Button from '@/components/base/Button';

const ChangePasswordForm: React.FC = () => {
    const { control, handleSubmit } = useForm<ProfileFormValues>();
    const { t } = useTranslation();

    const [updateProfile, { error, isLoading: isSubmitting }] = useUpdateProfileMutation();

    const onSubmit = handleSubmit(async (data) => {
        let body: any = { ...data };

        if (data.avatar) {
            body = convertToFormData({ ...body, avatar: data.avatar[0] });
        }

        try {
            const response: any = await updateProfile({ body });
            if (response?.data) {
                showMessage('success', 'success')
            }
        } catch (err) {
            console.log(err);
        }
    });

    const errors = useMemo(() => (error as any)?.data, [error]);

    return (
        <form className='flex flex-col gap-3 w-full flex-1' onSubmit={onSubmit}>
            <InputController
                control={control}
                name="currentPassword"
                type="password"
                label={t("user.currentPassword")}
                placeholder={t("user.enterCurrentPassword")}
                errorMessage={errors?.currentPassword?.[0]}
                rules={{
                    required: createLocale(t("errors.required"), { field: t("user.currentPassword") }),
                }}
            />
            <InputController
                control={control}
                name="newPassword"
                type="password"
                label={t("user.newPassword")}
                placeholder={t("user.enterNewPassword")}
                errorMessage={errors?.newPassword?.[0]}
                rules={{
                    required: createLocale(t("errors.required"), { field: t("user.newPassword") }),
                }}
            />
            <InputController
                control={control}
                name="confirmPassword"
                type="password"
                label={t("user.confirmPassword")}
                placeholder={t("user.enterConfirmPassword")}
                rules={{
                    required: createLocale(t("errors.required"), { field: t("user.confirmPassword") }),
                }}
            />

            <div className='flex items-center gap-3 pt-3 mt-auto border-t'>
                <Button type='submit' isLoading={isSubmitting}>{t("general.change")}</Button>
            </div>
        </form>
    );
}

export default ChangePasswordForm