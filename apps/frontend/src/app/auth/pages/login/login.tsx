import React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Spinner, Text } from 'ui';
import { Input } from 'ui';
import { SessionResponse } from 'types';
import { AUTH_ENDPOINTS } from 'types';
import { PROTECTED_ROUTES, UNPROTECTED_ROUTES } from 'types';
import { api } from 'utils';
import { useAppContext } from 'utils';
import { AxiosResponse } from 'axios';

import { useFormFields } from 'utils';
import {
  AuthFormContent,
  AuthHeader,
  AuthLayout,
  AuthSubtitle,
  AuthTitle,
} from '../../../../layouts/auth/components/auth';

export const Login = () => {
  const { authUser } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('auth');
  const { handleSubmit, fields, formState } = useFormFields([
    {
      name: 'email',
      rules: { required: tAuth('emailRequired') },
    },
    {
      name: 'password',
      rules: { required: tAuth('passwordRequired') },
    },
  ]);
  const isSubmitting = formState.isSubmitting;

  const onSubmit = async (data: any) => {
    try {
      const result: AxiosResponse<SessionResponse> = await api.post(AUTH_ENDPOINTS.LOGIN, {
        ...data,
      });
      if (result) {
        authUser(result?.data);
        navigate(PROTECTED_ROUTES.HOME);
      }
    } catch (e) {
      console.error(e);
      toast.error(t('errors.authenticatinguser'));
    }
  };

  return (
    <AuthLayout>
      <AuthHeader>
        <AuthTitle>{tAuth('welcomeback')}</AuthTitle>
        <AuthSubtitle>{tAuth('pleaseenterdetails')}</AuthSubtitle>
      </AuthHeader>
      <AuthFormContent onSubmit={handleSubmit(onSubmit)}>
        <Flex className="flex-col w-full">
          <Input label={`${t('word.email')}`} placeholder={t('word.email')} {...fields.email} />
          {fields.email.error && <span>{fields.email.error.message}</span>}
        </Flex>
        <Flex className="flex-col w-full">
          <Input label={`${t('word.password')}`} placeholder={t('word.password')} type="password" {...fields.password} />
          {fields.password.error && <span>{fields.password.error.message}</span>}
        </Flex>
        <Text
          className="text-xs cursor-pointer font-bold"
          onClick={() => navigate(`../${UNPROTECTED_ROUTES.FORGOT_PASSWORD}`)}
        >
          {tAuth('forgotpassword')}
        </Text>
        {isSubmitting ? <Spinner /> : <Button type="submit">{t('buttons.login')}</Button>}
        <Flex className="justify-center space-x-0.5">
          <Text className="text-xs font-light">{tAuth('areyounew')}</Text>
          <Text
            className="text-xs font-bold cursor-pointer"
            onClick={() => navigate(`../${UNPROTECTED_ROUTES.REGISTER}`)}
          >
            {tAuth('registerButton')}
          </Text>
        </Flex>
      </AuthFormContent>
    </AuthLayout>
  );
};
