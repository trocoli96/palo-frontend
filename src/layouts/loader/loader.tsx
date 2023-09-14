import React from 'react';

import { Flex, Spinner } from '@chakra-ui/react';

export const LoaderScreen = () => {
  return (
    <Flex justifyContent="center" alignItems="center" width="100vw" height="100vh">
      <Spinner width="1vw" />
    </Flex>
  );
};
