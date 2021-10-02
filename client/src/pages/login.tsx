import { Box, Button, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { InputField } from '../components/InputField/InputField';
import { Layout } from '../components/Layout/Layout';
import { useLoginMutation } from '../generated/graphql';
import { useIsAuth } from '../hooks/userIsAuth';
import { UserLoginPayload } from '../utils/auth/auth-types';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [loginValues, setLoginValues] = useState({
    usernameOrEmail: '',
    password: '',
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginValues({
      ...loginValues,
      [e.target.name]: e.target.value,
    });
  }

  const handleLogin = async (values: UserLoginPayload, { setErrors }: any) => {
    values = loginValues;
    const response = await login(values);
    if (response.data?.login.errors) {
      setErrors(toErrorMap(response.data.login.errors));
    } else if (response.data?.login.user) {
      // worked
      // loginContext();
      router.push('/');
    }
  };
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                name="usernameOrEmail"
                placeholder="username or email"
                label="Username or Email"
                value={loginValues.usernameOrEmail}
                onChange={handleInputChange}
              />
            </Box>

            <Box mt="8">
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
                value={loginValues.password}
                onChange={handleInputChange}
              />
            </Box>

            <Button
              mt={8}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              Login
            </Button>

            <NextLink href={'/forgot-password'} passHref>
              <Link marginTop={'8'} fontSize={'10px'} float="right">
                Forgot Password?
              </Link>
            </NextLink>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
