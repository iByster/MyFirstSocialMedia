import { Box } from '@chakra-ui/layout';
import { SkeletonCircle, SkeletonText } from '@chakra-ui/skeleton';
import React from 'react';

interface LoadingPostsProps {}

export const LoadingPosts: React.FC<LoadingPostsProps> = ({}) => {
  return (
    <>
      <Box p={5} shadow="md" borderWidth="1px" rounded="md">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
      <Box p={5} shadow="md" borderWidth="1px" rounded="md">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
      <Box p={5} shadow="md" borderWidth="1px" rounded="md">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    </>
  );
};
