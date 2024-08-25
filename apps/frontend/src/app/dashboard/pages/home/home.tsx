import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PROTECTED_ROUTES } from 'types';
import { useAppContext } from 'utils';
import { Button, Flex, Text } from 'ui';

export const Home = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Flex
      className="justify-center items-center w-screen h-screen flex-col gap-4"
    >
      <Text>{t('message.dashboardloggeduser')}</Text>
      <Button onClick={() => navigate(PROTECTED_ROUTES.ADMIN)}>{t('buttons.gotoadmin')}</Button>
      <Button onClick={logout}>{t('header.logout')}</Button>
    </Flex>
  );
};
