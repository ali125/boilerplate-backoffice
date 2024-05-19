import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import InputController from '@/components/base/Form/InputController';
import { createLocale } from '@/config/translation/i18n';
import { ChangePasswordFormValues, ChangePasswordFormBody } from '@/@types/auth.type';
import { useChangePasswordMutation } from '@/redux/apiSlice/authSlice';
import { showMessage } from '@/utils/helpers/showMessage';
import Button from '@/components/base/Button';

const ChangePasswordForm: React.FC = () => {
    const { control, handleSubmit } = useForm<ChangePasswordFormValues>();
    const { t } = useTranslation();

    const [changePassword, { error, isLoading: isSubmitting }] = useChangePasswordMutation();

    const onSubmit = handleSubmit(async (data) => {
        const body: ChangePasswordFormBody = { 
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        };

        try {
            const response: any = await changePassword({ body });
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
                autoComplete='off'
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
                autoComplete='off'
                label={t("user.newPassword")}
                placeholder={t("user.enterNewPassword")}
                errorMessage={errors?.newPassword?.[0]}
                rules={{
                    required: createLocale(t("errors.required"), { field: t("user.newPassword") }),
                    minLength: {
                      value: 6,
                      message: createLocale(t("errors.minLength"), { value: 6 })
                    },
                  }}
            />
            <InputController
                control={control}
                name="confirmPassword"
                type="password"
                autoComplete='off'
                label={t("user.confirmPassword")}
                placeholder={t("user.enterConfirmPassword")}
                rules={{
                    required: createLocale(t("errors.required"), { field: t("user.confirmPassword") }),
                    validate: (value: string, e) => {
                        if (e.newPassword !== value) {
                            return t("user.errorMatchConfirmPassword");
                        }
                        return true;
                    }
                }}
            />

            <div className='flex items-center gap-3 pt-3 mt-auto border-t'>
                <Button type='submit' isLoading={isSubmitting}>{t("general.change")}</Button>
            </div>
        </form>
    );
}

export default ChangePasswordForm;
