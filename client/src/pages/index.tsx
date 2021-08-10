import { Box } from '@chakra-ui/react';
import { usePostsQuery } from '../generated/graphql';

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <>
      <Box height="500px" fontSize="60" fontWeight="40">
        {!data ? (
          <Box>Loading...</Box>
        ) : (
          data.posts.map((post) => <Box key={post.id}>{post.title}</Box>)
        )}
      </Box>
      ;
    </>
  );
};

export default Index;
