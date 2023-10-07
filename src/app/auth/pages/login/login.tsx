import React from 'react';
import toast from 'react-hot-toast';
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
  const { handleSubmit, fields, formState } = useFormFields([
    {
      name: 'email',
      rules: { required: 'Email is required' },
    },
    {
      name: 'password',
      rules: { required: 'Password is required' },
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
      toast.error('There was an error login in.');
    }
  };

  return (
    <AuthLayout>
      <AuthHeader>
        <AuthTitle>Login</AuthTitle>
      </AuthHeader>
      <AuthFormContent onSubmit={handleSubmit(onSubmit)}>
        <div>
          <BaseInput label="Email:" {...fields.email} />
          {fields.email.error && <span>{fields.email.error.message}</span>}
        </div>
        <div>
          <BaseInput label="Password: " type="password" {...fields.password} />
          {fields.password.error && <span>{fields.password.error.message}</span>}
        </div>
        {isSubmitting ? <Spinner /> : <button type="submit">Login</button>}
        <Flex justifyContent="center" gap="2px">
          <Text fontSize="xs">Did you forget your password?</Text>
          <Text
            decoration="underline"
            fontSize="xs"
            cursor="pointer"
            onClick={() => navigate(`../${UNPROTECTED_ROUTES.FORGOT_PASSWORD}`)}
          >
            Click here
          </Text>
        </Flex>
        <Flex justifyContent="center" gap="2px">
          <Text fontSize="xs">Are you new?</Text>
          <Text
            decoration="underline"
            fontSize="xs"
            cursor="pointer"
            onClick={() => navigate(`../${UNPROTECTED_ROUTES.REGISTER}`)}
          >
            Register
          </Text>
        </Flex>
      </AuthFormContent>
    </AuthLayout>
  );
};
