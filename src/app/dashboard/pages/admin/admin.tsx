import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Text } from '@chakra-ui/react';
import { PROTECTED_ROUTES } from '@types';
import { useAppContext } from '@utils/context/context';

export const Admin = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      direction="column"
      gap="8px"
    >
      <Text>{t('message.dashboardloggedAdmin')}</Text>
      <Button onClick={() => navigate(PROTECTED_ROUTES.HOME)}>{t('buttons.gotohome')}</Button>
      <Button onClick={logout}>{t('header.logout')}</Button>
    </Flex>
  );
};
