import React from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';

export const Admin = () => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Text>This is a page protected under the admin role</Text>
      <Button>Logout</Button>
      <Button>Go to User route</Button>
    </Flex>
  );
};
