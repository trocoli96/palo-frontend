import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Text } from '@chakra-ui/react';
import { useAppContext } from '@utils/context/context';
import { PROTECTED_ROUTES } from '@types/routes';

export const Home = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      direction="column"
      gap="8px"
    >
      <Text>This is the dashboard from a logged user</Text>
      <Button onClick={() => navigate(PROTECTED_ROUTES.ADMIN)}>Go to Admin</Button>
      <Button onClick={logout}>Logout</Button>
    </Flex>
  );
};
