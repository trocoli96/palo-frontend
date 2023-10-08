import React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Flex, Spinner, Text } from '@chakra-ui/react';
import BaseInput from '@components/storybook/BaseInput/BaseInput';
import { AuthFormContent, AuthHeader, AuthLayout, AuthTitle } from '@layouts/auth/components/auth';
import { SessionResponse } from '@types';
import { AUTH_ENDPOINTS } from '@types';
import { PROTECTED_ROUTES, UNPROTECTED_ROUTES } from '@types';
import { api } from '@utils/api/api';
import { useAppContext } from '@utils/context/context';
import { AxiosResponse } from 'axios';

import { useFormFields } from '../../../../hooks/useFormFields';

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
    } catch {
      toast.error(t('errors.authenticatinguser'));
    }
  };

  return (
    <AuthLayout>
      <AuthHeader>
        <AuthTitle>{tAuth('loginLink')}</AuthTitle>
      </AuthHeader>
      <AuthFormContent onSubmit={handleSubmit(onSubmit)}>
        <div>
          <BaseInput label={`${t('word.email')}:`} {...fields.email} />
          {fields.email.error && <span>{fields.email.error.message}</span>}
        </div>
        <div>
          <BaseInput label={`${t('word.password')}:`} type="password" {...fields.password} />
          {fields.password.error && <span>{fields.password.error.message}</span>}
        </div>
        {isSubmitting ? <Spinner /> : <button type="submit">{t('buttons.login')}</button>}
        <Flex justifyContent="center" gap="2px">
          <Text fontSize="xs">{t('message.forgetpassword')}</Text>
          <Text
            decoration="underline"
            fontSize="xs"
            cursor="pointer"
            onClick={() => navigate(`../${UNPROTECTED_ROUTES.FORGOT_PASSWORD}`)}
          >
            {t('buttons.clickhere')}
          </Text>
        </Flex>
        <Flex justifyContent="center" gap="2px">
          <Text fontSize="xs">{tAuth('areyounew')}</Text>
          <Text
            decoration="underline"
            fontSize="xs"
            cursor="pointer"
            onClick={() => navigate(`../${UNPROTECTED_ROUTES.REGISTER}`)}
          >
            {tAuth('registerButton')}
          </Text>
        </Flex>
      </AuthFormContent>
    </AuthLayout>
  );
};
