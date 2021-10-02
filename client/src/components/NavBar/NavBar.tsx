import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import styles from './NavBar.module.css';
import { isServer } from '../../utils/isServer';
import { Logo } from '../Logo/Logo';
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const handleLogOut = async () => {
    const result = await logout();
    return result;
  };
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;

  // data is loading
  if (fetching) {
    // not logged in
  } else if (fetching || !data?.me) {
    body = (
      <>
        <NextLink href={'/login'} passHref>
          <Link>Login</Link>
        </NextLink>
        <NextLink href={'/register'} passHref>
          <Link marginLeft={'8'}>Register</Link>
        </NextLink>
      </>
    );
    // logged in
  } else {
    body = (
      <>
        <Box>{data.me.username}</Box>
        <Button
          marginLeft="auto"
          onClick={handleLogOut}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <Flex
      bg="tomato"
      padding="6"
      className={`${styles.navbar} ${styles['text-align-vertical']}`}
      mb="18"
    >
      <Logo />
      {body}
    </Flex>
  );
};
