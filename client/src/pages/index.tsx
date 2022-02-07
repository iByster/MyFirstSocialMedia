import { useState } from 'react';
import { CreatePost } from '../components/CreatePost/CreatePost';
import { Layout } from '../components/Layout/Layout';
import { useIsAuth } from '../hooks/userIsAuth';
import Posts from '../modules/Post/components/Posts/Posts';

const Index = () => {
  useIsAuth();
  return (
    <>
      <Layout>
        <CreatePost />
        <Posts />
      </Layout>
    </>
  );
};

export default Index;
