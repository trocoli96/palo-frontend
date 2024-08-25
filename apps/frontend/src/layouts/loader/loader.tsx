import React from 'react';

import { Flex, Spinner } from 'ui';

export const LoaderScreen = () => {
  return (
    <Flex className="justify-center items-center w-screen h-screen">
      <Spinner className="w-12" />
    </Flex>
  );
};
