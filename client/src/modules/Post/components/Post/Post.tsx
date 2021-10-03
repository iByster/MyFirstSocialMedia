import { Box, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import PostModel from '../../model/PostModel';
import { PostUserInfo } from './PostUserInfo/PostUserInfo';

interface PostProps {
  post: PostModel;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Box shadow="md" borderWidth="1px" rounded="md">
      <PostUserInfo user={post.creator} />
      <Box p={5} borderTopWidth={'1px'}>
        <Heading fontSize="xl">{post.title}</Heading>
        <Text mt={4}>{post.text}</Text>
      </Box>
    </Box>
  );
};

export default Post;
