import React from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';

export const Home = () => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Text>This is the dashboard from a logged user</Text>
      <Button>Logout</Button>
    </Flex>
  );
};
