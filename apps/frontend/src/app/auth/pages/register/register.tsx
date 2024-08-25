import React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Flex, Text } from '@chakra-ui/react';
import BaseInput from '@components/storybook/BaseInput/BaseInput';
import { AuthFormContent, AuthHeader, AuthLayout, AuthTitle } from '@layouts/auth/components/auth';
import { AUTH_ENDPOINTS, UNPROTECTED_ROUTES } from '@types';
import { api } from '@utils/api/api';

import { useFormFields } from '../../../../hooks/useFormFields';

export const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const { handleSubmit, fields } = useFormFields([
    {
      name: 'firstName',
      rules: { required: t('firstNameRequired') },
    },
    {
      name: 'lastName',
      rules: { required: t('lastNameRequired') },
    },
    {
      name: 'email',
      rules: { required: t('emailRequired') },
    },
    {
      name: 'password',
      rules: { required: t('passwordRequired') },
    },
  ]);

  const onSubmit = async (data: any) => {
    const result = await api.post(AUTH_ENDPOINTS.REGISTER, { ...data });

    if (result.status < 300) {
      toast.success(t('successRegisteredMessage'));
      navigate(UNPROTECTED_ROUTES.LOGIN);
    } else {
      toast.error(t('errorRegisteringMessage'));
    }
  };

  return (
    <AuthLayout>
      <AuthHeader>
        <AuthTitle>{t('register')}</AuthTitle>
      </AuthHeader>
      <AuthFormContent onSubmit={handleSubmit(onSubmit)}>
        <div>
          <BaseInput type="text" {...fields.firstName} label={t('firstName')} />
          {fields.firstName.error && <span>{fields.firstName.error.message}</span>}
        </div>
        <div>
          <BaseInput type="text" {...fields.lastName} label={t('lastName')} />
          {fields.lastName.error && <span>{fields.lastName.error.message}</span>}
        </div>
        <div>
          <BaseInput type="email" {...fields.email} label={t('email')} />
          {fields.email.error && <span>{fields.email.error.message}</span>}
        </div>
        <div>
          <BaseInput type="password" {...fields.password} label={t('password')} />
          {fields.password.error && <span>{fields.password.error.message}</span>}
        </div>
        <button type="submit">{t('registerButton')}</button>
        <Flex justifyContent="center" gap="2px">
          <Text fontSize="xs">{t('loginLinkText')}</Text>
          <Text
            decoration="underline"
            fontSize="xs"
            cursor="pointer"
            onClick={() => navigate(`../${UNPROTECTED_ROUTES.LOGIN}`)}
          >
            {t('loginLink')}
          </Text>
        </Flex>
      </AuthFormContent>
    </AuthLayout>
  );
};
