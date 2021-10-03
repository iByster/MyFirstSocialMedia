import { Box, Stack } from '@chakra-ui/layout';
import { Button, Flex } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import {
    Exact,
  PostMetaData,
  usePostsQuery,
} from '../../../../generated/graphql';
import Post from '../Post/Post';
import { LoadingPosts } from './LoadingPosts';

interface PostsProps {
  variables?: Exact<{ metadata: PostMetaData }>;
  isLastPage?: any;
  onLoadMore?: any;
}

const Posts: React.FC<PostsProps> = ({ variables, isLastPage, onLoadMore }) => {
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        const ceva = entry.target as HTMLElement;
        ceva.click();
      }
    });
  }, []);

  useEffect(() => {
    if (buttonRef) {
      if (observerRef.current) {
        observerRef.current.observe(
          document.querySelector('#buttonLoadMore') as Element
        );
      }
    }
  }, [buttonRef]);

  let renderContent = null;

  if (fetching) {
    renderContent = <LoadingPosts />;
  } else if (!data) {
    renderContent = <Box>No content</Box>;
  } else {
    renderContent = data.posts.posts.map((post) => (
      <Post key={post.id} post={post}></Post>
    ));
  }

  return (
    <>
      <Stack mt="8" spacing={8} id="list">
        {renderContent}
        {(isLastPage && fetching) || (isLastPage && data?.posts.hasMore) ? (
          <Flex>
            <Button
              id="buttonLoadMore"
              onClick={() => {
                if (data?.posts) {
                  onLoadMore(
                    data.posts.posts[data.posts.posts.length - 1].createdAt
                  );
                }
              }}
              isLoading={fetching}
              m="auto"
              my={8}
              ref={setButtonRef}
            >
              load more
            </Button>
          </Flex>
        ) : null}
      </Stack>
    </>
  );
};

export default Posts;
