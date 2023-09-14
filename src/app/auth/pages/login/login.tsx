import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '@chakra-ui/react';
import BaseInput from '@components/storybook/BaseInput/BaseInput';
import { AuthHeader, AuthLayout, AuthTitle } from '@layouts/auth/components/auth';
import { api } from '@utils/api/api';
import { AUTH_ENDPOINTS } from '@types/endpoints';
import { useAppContext } from '@utils/context/context';
import { PROTECTED_ROUTES } from '@types/routes';
import { SessionResponse } from '../../../../types/auth';
import { AxiosResponse } from 'axios';

import { useFormFields } from '../../../../hooks/useFormFields';
import styles from './../../styles/auth.module.css';

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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
        <div>
          <BaseInput label="Email:" {...fields.email} />
          {fields.email.error && <span>{fields.email.error.message}</span>}
        </div>
        <div>
          <BaseInput label="Password: " type="password" {...fields.password} />
          {fields.password.error && <span>{fields.password.error.message}</span>}
        </div>
        {isSubmitting ? <Spinner /> : <button type="submit">Login</button>}
      </form>
    </AuthLayout>
  );
};
