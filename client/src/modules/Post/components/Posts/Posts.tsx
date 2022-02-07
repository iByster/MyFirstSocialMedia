import { Box, Stack } from '@chakra-ui/layout';
import React from 'react';
import { Waypoint } from 'react-waypoint';
import { usePostsQuery } from '../../../../generated/graphql';
import Post from '../Post/Post';
import { LoadingPosts } from './LoadingPosts';

interface PostsProps {}

const Posts: React.FC<PostsProps> = () => {
  const { data, fetchMore, networkStatus } = usePostsQuery({
    variables: { metadata: { limit: 3 } },
    notifyOnNetworkStatusChange: true,
  });

  if (!data || !data.posts) {
    return <LoadingPosts />;
  }
  if (data.posts.posts.length <= 0) {
    return <Box>No content</Box>;
  }

  return (
    <>
      <Stack mt="8" spacing={8} id="list">
        {data.posts.posts.map((post, i) => (
          <>
            <Post key={post.id} post={post}></Post>
            {i === data.posts.posts.length - 1 && (
              <Waypoint
                onEnter={() => {
                  if (data.posts.hasMore) {
                    return fetchMore({
                      variables: {
                        metadata: {
                          limit: 3,
                          cursor:
                            data.posts.posts[data.posts.posts.length - 1]
                              .createdAt,
                        },
                      },
                      updateQuery: (pv: any, { fetchMoreResult }: any) => {
                        if (!fetchMoreResult) {
                          return pv;
                        }

                        return {
                          posts: {
                            __typename: 'PaginatedPosts',
                            posts: [
                              ...pv.posts.posts,
                              ...fetchMoreResult.posts.posts,
                            ],
                            hasMore: fetchMoreResult.posts.hasMore,
                          },
                        };
                      },
                    });
                  }
                }}
              />
            )}
          </>
        ))}
        {networkStatus === 3 ? <LoadingPosts /> : null}
      </Stack>
    </>
  );
};

export default Posts;
