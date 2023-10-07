import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Flex, Spinner, Text } from '@chakra-ui/react';
import BaseInput from '@components/storybook/BaseInput/BaseInput';
import { AuthFormContent, AuthHeader, AuthLayout, AuthTitle } from '@layouts/auth/components/auth';
import { AuthConfirmation } from '@layouts/auth/components/authConfirmation';
import { SessionResponse } from '@types';
import { AUTH_ENDPOINTS } from '@types';
import { UNPROTECTED_ROUTES } from '@types';
import { api } from '@utils/api/api';
import { AxiosResponse } from 'axios';

import { useFormFields } from '../../../../hooks/useFormFields';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const { handleSubmit, fields, formState } = useFormFields([
    {
      name: 'email',
      rules: { required: 'Email is required' },
    },
  ]);
  const isSubmitting = formState.isSubmitting;

  const onSubmit = async (data: any) => {
    try {
      const result: AxiosResponse<SessionResponse> = await api.post(
        AUTH_ENDPOINTS.FORGOT_PASSWORD,
        {
          ...data,
        },
      );
      if (result) {
        setIsConfirmed(true);
      }
    } catch {
      toast.error('There was an error recovering password');
    }
  };

  return (
    <>
      {isConfirmed ? (
        <AuthConfirmation
          title="Recovered"
          message="You've received an email with the recover link"
          actionLabel="Go to Login"
          action={() => navigate(UNPROTECTED_ROUTES.LOGIN)}
        />
      ) : (
        <>
          <AuthLayout>
            <AuthHeader>
              <AuthTitle>Forgot password?</AuthTitle>
            </AuthHeader>
            <AuthFormContent onSubmit={handleSubmit(onSubmit)}>
              <div>
                <BaseInput label="Email:" {...fields.email} />
                {fields.email.error && <span>{fields.email.error.message}</span>}
              </div>
              {isSubmitting ? <Spinner /> : <button type="submit">Recover</button>}
              <Flex justifyContent="center" gap="2px">
                <Text
                  decoration="underline"
                  fontSize="xs"
                  cursor="pointer"
                  onClick={() => navigate(`../${UNPROTECTED_ROUTES.LOGIN}`)}
                >
                  Back to login
                </Text>
              </Flex>
            </AuthFormContent>
          </AuthLayout>
        </>
      )}
    </>
  );
};
