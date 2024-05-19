import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordRequest } from '@/@types/auth.type';
import Button from '@/components/base/Button';
import InputController from '@/components/base/Form/InputController';
import AuthLayout from '@/components/layouts/AuthLayout';
import { createLocale } from '@/config/translation/i18n';
import { browserRoutes } from '@/constants/routes';
import { useForgotPasswordMutation } from '@/redux/apiSlice/authSlice';
import { showMessage } from '@/utils/helpers/showMessage';

const Forgot: React.FC = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordRequest>();
  const { t } = useTranslation();
  const navigation = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = handleSubmit(async (data) => {
    const response = await forgotPassword({ body: data }).unwrap();
    if (response?.message) {
      showMessage(response.message, "success");
      navigation(browserRoutes.signIn);
    }
  });

  return (
    <AuthLayout title={t('auth.forgot')} description={t('auth.forgotDescription')}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <InputController
          control={control}
          name="email"
          label={t("user.email")}
          placeholder={t("user.enterEmail")}
          rules={{
            required: createLocale(t("errors.required"), { field: t("user.email") }),
            pattern: {
              message: t("errors.emailPattern"),
              value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
            },
          }}
        />
        <Button type="submit" disabled={isLoading}>{t("auth.reset")}</Button>
      </form>
    </AuthLayout>
  )
}

export default Forgot;
