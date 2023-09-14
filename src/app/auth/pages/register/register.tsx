import React from 'react';

import { AuthHeader, AuthLayout, AuthTitle } from '@layouts/auth/components/auth';

import { useFormFields } from '../../../../hooks/useFormFields';
import { api } from '../../../../utils/api/api';
import styles from './../../styles/auth.module.css';
import { AUTH_ENDPOINTS } from '@types/endpoints';

export const Register = () => {
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
        <div>
          <input type="text" {...fields.firstName} placeholder="First name" />
          {fields.firstName.error && <span>{fields.firstName.error.message}</span>}
        </div>
        <div>
          <input type="text" {...fields.lastName} placeholder="Last name" />
          {fields.lastName.error && <span>{fields.lastName.error.message}</span>}
        </div>
        <div>
          <input type="email" {...fields.email} placeholder="Email address" />
          {fields.email.error && <span>{fields.email.error.message}</span>}
        </div>
        <div>
          <input type="password" {...fields.password} placeholder="Password" />
          {fields.password.error && <span>{fields.password.error.message}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </AuthLayout>
  );
};
