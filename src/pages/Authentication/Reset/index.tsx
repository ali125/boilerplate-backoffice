import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ResetPasswordFormValues, ResetPasswordRequest } from '@/@types/auth.type';
import Button from '@/components/base/Button';
import InputController from '@/components/base/Form/InputController';
import AuthLayout from '@/components/layouts/AuthLayout';
import { createLocale } from '@/config/translation/i18n';
import { browserRoutes } from '@/constants/routes';
import { useResetPasswordMutation } from '@/redux/apiSlice/authSlice';
import { showMessage } from '@/utils/helpers/showMessage';

const ResetPassword: React.FC = () => {
  const { control, handleSubmit } = useForm<ResetPasswordFormValues>();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = handleSubmit(async (data) => {
    const body: ResetPasswordRequest = {
      newPassword: data.newPassword,
      token: searchParams.get("token") || ""
    }
    try {
      const response = await resetPassword({ body }).unwrap();
      if (response?.message) {
        showMessage(response.message, "success");
        navigation(browserRoutes.dashboard);
      }
    } catch (err: any) {
      if (err?.data?.token) {
        showMessage(err?.data?.token[0], "error");
      }
      console.log(err);
    }
  });

  return (
    <AuthLayout title={t('auth.reset')} description={t('auth.resetDescription')}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <InputController
          control={control}
          name="newPassword"
          type="password"
          label={t("user.newPassword")}
          placeholder={t("user.enterNewPassword")}
          rules={{
            required: createLocale(t("errors.required"), { field: t("user.newPassword") }),
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
        <Button type="submit" disabled={isLoading}>{t("auth.reset")}</Button>
      </form>
    </AuthLayout>
  )
}

export default ResetPassword;
