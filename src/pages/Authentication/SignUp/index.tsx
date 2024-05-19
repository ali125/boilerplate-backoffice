import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { SignUpFormValues, SignUpRequest } from '@/@types/auth.type';
import Button from '@/components/base/Button';
import InputController from '@/components/base/Form/InputController';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Storage_Keys } from '@/config/app.config';
import { createLocale } from '@/config/translation/i18n';
import { browserRoutes } from '@/constants/routes';
import { useRegisterMutation } from '@/redux/apiSlice/authSlice';
import { setAuthToken } from '@/redux/authSlice';
import { useAppDispatch } from '@/redux/hooks';


const SignUp: React.FC = () => {
  const { control, handleSubmit } = useForm<SignUpFormValues>();
  const { t } = useTranslation();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [register, {isLoading }] = useRegisterMutation();

  const onSubmit = handleSubmit(async (data) => {
    const body: SignUpRequest = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    }
    const response = await register({ body }).unwrap();
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
          name="firstName"
          label={t("user.firstName")}
          placeholder={t("user.enterFirstName")}
          rules={{
            required: createLocale(t("errors.required"), { field: t("user.firstName") }),
            minLength: {
              message: createLocale(t("errors.minLength"), { value: 5 }),
              value: 5
            },
            maxLength: {
              message: createLocale(t("errors.maxLength"), { value: 50 }),
              value: 50
            },
          }}
        />

        <InputController
          control={control}
          name="lastName"
          label={t("user.lastName")}
          placeholder={t("user.enterLastName")}
          rules={{
            required: createLocale(t("errors.required"), { field: t("user.lastName") }),
            minLength: {
              message: createLocale(t("errors.minLength"), { value: 5 }),
              value: 5
            },
            maxLength: {
              message: createLocale(t("errors.maxLength"), { value: 50 }),
              value: 50
            },
          }}
        />

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
        
        <InputController
          control={control}
          name="password"
          type="password"
          label={t("user.password")}
          placeholder={t("user.enterPassword")}
          rules={{
            required: createLocale(t("errors.required"), { field: t("user.password") }),
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
              if (e.password !== value) {
                return t("user.errorMatchConfirmPassword");
              }
              return true;
            }
          }}
        />
        
        <div className="flex items-end">
          <NavLink to={browserRoutes.signIn} className="text-sky-700 font-medium mr-auto first-letter:uppercase">
            {t('auth.signIn')}
          </NavLink>
        </div>

        <Button type="submit" disabled={isLoading}>{t("auth.signUp")}</Button>
      </form>
    </AuthLayout>
  )
}

export default SignUp;
