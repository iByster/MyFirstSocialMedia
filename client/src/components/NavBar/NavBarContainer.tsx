import { Flex } from '@chakra-ui/layout';
import React from 'react';

interface NavBarContainerProps {}

export const NavBarContainer: React.FC<NavBarContainerProps> = ({
  children,
}) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={6}
      bg="tomato"
      //   color={['white', 'white', 'primary.700', 'primary.700']}
    >
      {children}
    </Flex>
  );
};
