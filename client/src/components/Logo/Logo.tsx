import React from 'react';
import NextLink from 'next/link';
import { Image } from '@chakra-ui/image';
import { useLogoQuery } from '../../generated/graphql';
import { Stack, Text } from '@chakra-ui/layout';
import style from './Logo.module.css';
import { Spinner } from '@chakra-ui/spinner';

interface LogoProps {}

export const Logo: React.FC<LogoProps> = ({}) => {
  const [{ data: logo }] = useLogoQuery();

  return (
    <NextLink href={'/'} passHref>
      <Stack direction="row" userSelect="none">
        {/* {!fetching ? ( */}
        <Image src={`data:image/png;base64,${logo?.logo}`} boxSize="10" />
        {/* ) : ( */}
        {/* <Spinner color="red.500" /> */}
        {/* )} */}
        <Text color="#1A202C" fontSize="27" className={style['logo-font']}>
          HOGGOBLIN
        </Text>
      </Stack>
    </NextLink>
  );
};
