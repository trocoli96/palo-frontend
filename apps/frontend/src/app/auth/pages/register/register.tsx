import React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AUTH_ENDPOINTS, UNPROTECTED_ROUTES } from 'types';
import { api, useFormFields } from 'utils';
import { AuthFormContent, AuthHeader, AuthLayout, AuthTitle } from '../../../../layouts/auth/components/auth';
import { Input, Flex, Text, Button } from 'ui';


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
          <Input type="text" {...fields.firstName} label={t('firstName')} />
          {fields.firstName.error && <span>{fields.firstName.error.message}</span>}
        </div>
        <div>
          <Input type="text" {...fields.lastName} label={t('lastName')} />
          {fields.lastName.error && <span>{fields.lastName.error.message}</span>}
        </div>
        <div>
          <Input type="email" {...fields.email} label={t('email')} />
          {fields.email.error && <span>{fields.email.error.message}</span>}
        </div>
        <div>
          <Input type="password" {...fields.password} label={t('password')} />
          {fields.password.error && <span>{fields.password.error.message}</span>}
        </div>
        <Button type="submit">{t('registerButton')}</Button>
        <Flex className="justify-center gap-2">
          <Text className="text-xs">{t('loginLinkText')}</Text>
          <Text
            className="underline text-xs cursor-pointer"
            onClick={() => navigate(`../${UNPROTECTED_ROUTES.LOGIN}`)}
          >
            {t('loginLink')}
          </Text>
        </Flex>
      </AuthFormContent>
    </AuthLayout>
  );
};
