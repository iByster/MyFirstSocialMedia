import { Box, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import PostModel from '../../model/PostModel';

interface PostProps {
  post: PostModel;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" rounded="md">
      <Heading fontSize="xl">{post.title}</Heading>
      <Text mt={4}>{post.text}</Text>
    </Box>
  );
};

export default Post;
