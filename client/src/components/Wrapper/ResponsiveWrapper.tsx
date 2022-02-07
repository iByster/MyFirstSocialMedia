import { Box } from '@chakra-ui/layout';
import React from 'react';

interface ResponsiveWrapperProps {
  variant?: 'small' | 'regular';
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  children,
  variant = 'regular',
  ...props
}) => {
  return (
    <Box
      w={
        variant === 'regular'
          ? [
              '80%', // 0-30em
              '50%', // 30em-48em
              '50%', // 48em-62em
              '30%',
            ]
          : [
              '80%', // 0-30em
              '50%', // 30em-48em
              '40%', // 48em-62em
              '25%',
            ]
      }
      {...props}
      margin="0 auto"
      mt="10"
      marginBottom="20"
      minHeight="500"
    >
      {children}
    </Box>
  );
};
