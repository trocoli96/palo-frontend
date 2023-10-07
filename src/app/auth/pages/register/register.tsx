import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex, Text } from '@chakra-ui/react';
import BaseInput from '@components/storybook/BaseInput/BaseInput';
import { AuthFormContent, AuthHeader, AuthLayout, AuthTitle } from '@layouts/auth/components/auth';
import { AUTH_ENDPOINTS, UNPROTECTED_ROUTES } from '@types';
import { api } from '@utils/api/api';

import { useFormFields } from '../../../../hooks/useFormFields';

export const Register = () => {
  const navigate = useNavigate();
  const { handleSubmit, fields } = useFormFields([
    {
      name: 'firstName',
      rules: { required: 'First Name is required' },
    },
    {
      name: 'lastName',
      rules: { required: 'Last Name is required' },
    },
    {
      name: 'email',
      rules: { required: 'Email is required' },
    },
    {
      name: 'password',
      rules: { required: 'Password is required' },
    },
  ]);

  const onSubmit = async (data: any) => {
    const result = await api.post(AUTH_ENDPOINTS.REGISTER, { ...data });
    console.log(result);
    // Here you can perform further actions like sending data to a server.
  };

  return (
    <AuthLayout>
      <AuthHeader>
        <AuthTitle>Register</AuthTitle>
      </AuthHeader>
      <AuthFormContent onSubmit={handleSubmit(onSubmit)}>
        <div>
          <BaseInput type="text" {...fields.firstName} label="First name" />
          {fields.firstName.error && <span>{fields.firstName.error.message}</span>}
        </div>
        <div>
          <BaseInput type="text" {...fields.lastName} label="Last name" />
          {fields.lastName.error && <span>{fields.lastName.error.message}</span>}
        </div>
        <div>
          <BaseInput type="email" {...fields.email} label="Email address" />
          {fields.email.error && <span>{fields.email.error.message}</span>}
        </div>
        <div>
          <BaseInput type="password" {...fields.password} label="Password" />
          {fields.password.error && <span>{fields.password.error.message}</span>}
        </div>
        <button type="submit">Register</button>
        <Flex justifyContent="center" gap="2px">
          <Text fontSize="xs">Do you have an account already?</Text>
          <Text
            decoration="underline"
            fontSize="xs"
            cursor="pointer"
            onClick={() => navigate(`../${UNPROTECTED_ROUTES.LOGIN}`)}
          >
            Login
          </Text>
        </Flex>
      </AuthFormContent>
    </AuthLayout>
  );
};
