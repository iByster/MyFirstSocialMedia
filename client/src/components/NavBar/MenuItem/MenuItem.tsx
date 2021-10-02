import React from 'react';
import NextLink from 'next/link';
import { Link, Text } from '@chakra-ui/layout';

interface MenuItemProps {
  name: string;
  to: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ name, to = '/' }) => {
  return (
    <NextLink href={to} passHref>
      <Link>
        <Text display="block">{name}</Text>
      </Link>
    </NextLink>
  );
};
