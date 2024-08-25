import React from 'react';

import { Button, Text } from '@chakra-ui/react';
import { AuthContent, AuthHeader, AuthLayout, AuthTitle } from '@layouts/auth/components/auth';

interface AuthConfirmationProps {
  title: string;
  message: string;
  actionLabel: string;
  action: () => void;
}

export const AuthConfirmation = (props: AuthConfirmationProps) => {
  const { title, actionLabel, action, message } = props;

  return (
    <AuthLayout>
      <AuthHeader>
        <AuthTitle>{title}</AuthTitle>
      </AuthHeader>
      <AuthContent>
        <Text>{message}</Text>
        <Button onClick={action}>{actionLabel}</Button>
      </AuthContent>
    </AuthLayout>
  );
};
