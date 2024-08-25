import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Input, Spinner, Text } from 'ui';
import { SessionResponse } from 'types';
import { AUTH_ENDPOINTS } from 'types';
import { UNPROTECTED_ROUTES } from 'types';
import { AxiosResponse } from 'axios';
import { api, useFormFields } from 'utils';
import { AuthConfirmation } from '../../../../layouts/auth/components/authConfirmation';
import { AuthFormContent, AuthHeader, AuthLayout, AuthTitle } from '../../../../layouts/auth/components/auth';


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
              <AuthTitle>{tAuth('forgotpassword')}</AuthTitle>
            </AuthHeader>
            <AuthFormContent onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input label={`${tAuth('email')}:`} {...fields.email} />
                {fields.email.error && <span>{fields.email.error.message}</span>}
              </div>
              {isSubmitting ? <Spinner /> : <Button type="submit">{tAuth('recover')}</Button>}
              <Flex className="justify-center gap-2">
                <Text
                  className="underline text-xs cursor-pointer"
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
