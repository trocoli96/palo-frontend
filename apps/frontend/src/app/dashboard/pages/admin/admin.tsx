import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Text } from 'ui';
import { PROTECTED_ROUTES } from 'types';
import { useAppContext } from 'utils';

export const Admin = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Flex
      className="justify-center items-center w-screen h-screen flex-col gap-4"
    >
      <Text>{t('message.dashboardloggedAdmin')}</Text>
      <Button onClick={() => navigate(PROTECTED_ROUTES.HOME)}>{t('buttons.gotohome')}</Button>
      <Button onClick={logout}>{t('header.logout')}</Button>
    </Flex>
  );
};
