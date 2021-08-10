import { Box, Button, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { InputField } from '../components/InputField/InputField';
import { Wrapper } from '../components/Wrapper/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { UserLoginPayload } from '../utils/auth/auth-types';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';
import NextLink from 'next/link';

// export default login;
interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
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
      router.push('/');
    }
  };
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
              value={loginValues.usernameOrEmail}
              onChange={handleInputChange}
            />
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
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
