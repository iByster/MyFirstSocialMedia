import { Button } from '@chakra-ui/button';
import { Box, Stack } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useLogoutMutation, useMeQuery } from '../../../generated/graphql';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { isServer } from '../../../utils/isServer';
import { MenuItem } from '../MenuItem/MenuItem';

interface MenuLinksProps {
  isOpen: boolean;
}

export const MenuLinks: React.FC<MenuLinksProps> = ({ isOpen }) => {
  const router = useRouter();
  const handleLogOut = async () => {
    const result = await logout();
    router.replace('/login');
    console.log(result);
    return result;
  };

  const breakpoint = useMediaQuery(832);

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;

  if (fetching) {
    // not logged in
    body = (
      <>
        <MenuItem to="/login" name="Login" />
        <MenuItem to="/register" name="Register" />
      </>
    );
  } else if (fetching || !data?.me) {
    body = (
      <>
        <MenuItem to="/login" name="Login" />
        <MenuItem to="/register" name="Register" />
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
    <Box display={{ md: 'block' }} flexBasis={{ base: '100%', md: 'auto' }}>
      {!breakpoint ? (
        <Stack
          spacing={8}
          align="center"
          justify={['center', 'flex-end', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
          ml="2"
          color="#1A202C"
        >
          {body}
        </Stack>
      ) : (
        <Collapse in={isOpen} animateOpacity>
          <Stack
            spacing={8}
            align="center"
            justify={['center', 'flex-start', 'flex-end', 'flex-end']}
            direction={['column', 'row', 'row', 'row']}
            pt={[4, 4, 0, 0]}
            ml="2"
            color="#1A202C"
          >
            {body}
          </Stack>
        </Collapse>
      )}
    </Box>
  );
};
