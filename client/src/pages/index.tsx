import { withUrqlClient } from 'next-urql';
import { useState } from 'react';
import { CreatePost } from '../components/CreatePost/CreatePost';
import { Layout } from '../components/Layout/Layout';
import { useIsAuth } from '../hooks/userIsAuth';
import Posts from '../modules/Post/components/Posts/Posts';
import { createUrqlClient } from '../utils/createUrqlClient';

const limit = 3;

const Index = () => {
  useIsAuth();

  const [pageVariables, setPageVariables] = useState([
    {
      metadata: {
        limit,
        cursor: null as null | string,
      },
    },
  ]);

  const mockMetaData = {
    metadata: {
      limit: 5,
    },
  };

  return (
    <>
      <Layout>
        <CreatePost />
        {pageVariables.map((variables, i) => {
          return (
            <Posts
              key={'' + variables.metadata.cursor}
              variables={variables}
              isLastPage={i === pageVariables.length - 1}
              onLoadMore={(cursor: string) =>
                setPageVariables([
                  ...pageVariables,
                  { metadata: { cursor, limit } },
                ])
              }
            />
          );
        })}
      </Layout>
    </>
  );
};

export default Index;
