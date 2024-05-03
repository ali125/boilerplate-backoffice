import Button from '@/components/base/Button';
import InputController from '@/components/base/Form/InputController';
import AuthLayout from '@/components/layouts/AuthLayout';
import { createLocale } from '@/config/translation/i18n';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const Forgot: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const { t } = useTranslation();

  const onSubmit = handleSubmit(() => {
      console.log("submit")
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
        <Button>{t("auth.forgot")}</Button>
      </form>
    </AuthLayout>
  )
}

export default Forgot;
