import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
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
  const { t: tAuth } = useTranslation('auth');
  const { handleSubmit, fields, formState } = useFormFields([
    {
      name: 'email',
      rules: { required: tAuth('emailRequired') },
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
      toast.error(tAuth('errorRecoveringPassword'));
    }
  };

  return (
    <>
      {isConfirmed ? (
        <AuthConfirmation
          title="Recovered"
          message={tAuth('successRecovered')}
          actionLabel={tAuth('gotologin')}
          action={() => navigate(UNPROTECTED_ROUTES.LOGIN)}
        />
      ) : (
        <>
          <AuthLayout>
            <AuthHeader>
              <AuthTitle>{tAuth('forgotpassowrd')}</AuthTitle>
            </AuthHeader>
            <AuthFormContent onSubmit={handleSubmit(onSubmit)}>
              <div>
                <BaseInput label={`${tAuth('email')}:`} {...fields.email} />
                {fields.email.error && <span>{fields.email.error.message}</span>}
              </div>
              {isSubmitting ? <Spinner /> : <button type="submit">{tAuth('recover')}</button>}
              <Flex justifyContent="center" gap="2px">
                <Text
                  decoration="underline"
                  fontSize="xs"
                  cursor="pointer"
                  onClick={() => navigate(`../${UNPROTECTED_ROUTES.LOGIN}`)}
                >
                  {tAuth('backToLogin')}
                </Text>
              </Flex>
            </AuthFormContent>
          </AuthLayout>
        </>
      )}
    </>
  );
};
