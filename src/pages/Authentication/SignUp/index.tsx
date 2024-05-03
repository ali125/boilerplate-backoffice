import AuthLayout from '@/components/layouts/AuthLayout';
import React from 'react'
import { useTranslation } from 'react-i18next';

const SignUp: React.FC = () => {
  const { t }= useTranslation();
  return (
    <AuthLayout title={t('auth.signUp')} description={t('auth.signUpDescription')}>
      <div>SignUp</div>
    </AuthLayout>
  )
}

export default SignUp;
