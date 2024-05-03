import Button from '@/components/base/Button';
import InputController from '@/components/base/Form/InputController';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Storage_Keys } from '@/config/app.config';
import { createLocale } from '@/config/translation/i18n';
import { browserRoutes } from '@/constants/routes';
import { useLoginMutation } from '@/redux/apiSlice/authSlice';
import { setAuthToken } from '@/redux/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

type FormValues = {
  email: string,
  password: string
}

const SignIn: React.FC = () => {
  const { control, handleSubmit } = useForm<FormValues>();
  const { t } = useTranslation();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [login, {isLoading }] = useLoginMutation();

  const onSubmit = handleSubmit(async (data) => {
      console.log(data)
      console.log("submit")
      const response = await login(data).unwrap();
      console.log('response', response);
      if (response.accessToken) {
        localStorage.setItem(Storage_Keys.loggedIn, "true");
        dispatch(setAuthToken({ accessToken: response.accessToken }));
        navigation(browserRoutes.dashboard);
      }
  });

  return (
    <AuthLayout title={t('auth.signIn')} description={t('auth.signInDescription')}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <InputController
          control={control}
          name="email"
          label={t("user.email")}
          defaultValue="ali.mortazavi121@gmail.com"
          placeholder={t("user.enterEmail")}
          rules={{
            required: createLocale(t("errors.required"), { field: t("user.email") }),
            pattern: {
              message: t("errors.emailPattern"),
              value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
            },
          }}
        />
        
        <InputController
          control={control}
          name="password"
          type="password"
          defaultValue="password"
          label={t("user.password")}
          placeholder={t("user.enterPassword")}
          rules={{
            required: createLocale(t("errors.required"), { field: t("user.password") }),
          }}
        />
        
        <div className="flex items-end">
          <NavLink to={browserRoutes.forgotPassword} className="text-sky-700 font-medium ml-auto first-letter:uppercase">
            {t('auth.forgot')}
          </NavLink>
        </div>

        <Button type="submit" disabled={isLoading}>{t("auth.signIn")}</Button>
      </form>
    </AuthLayout>
  )
}

export default SignIn;
