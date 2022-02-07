import { Box, Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { InputField } from '../components/InputField/InputField';
import { Layout } from '../components/Layout/Layout';
import { useRegisterMutation } from '../generated/graphql';
import { UserRegisterPayload } from '../utils/auth/auth-types';
import { toErrorMap } from '../utils/toErrorMap';

// export default Register;
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  // useIsAuth();
  const router = useRouter();
  const [register] = useRegisterMutation();
  const [registerValues, setRegisterValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const toast = useToast();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRegisterValues({
      ...registerValues,
      [e.target.name]: e.target.value,
    });
  }

  const handleRegister = async (
    values: UserRegisterPayload,
    { setErrors }: any
  ) => {
    {
      values = registerValues;
      const response = await register({variables: values});
      if (response.data?.register.errors) {
        setErrors(toErrorMap(response.data.register.errors));
      } else if (response.data?.register.user) {
        // worked
        toast({
          title: 'Registration complete.',
          description: 'You are now in the system',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        router.push('/');
      }
    }
  };

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
                value={registerValues.email}
                onChange={handleInputChange}
              />
            </Box>
            <Box mt="8">
              <InputField
                name="username"
                placeholder="username"
                label="Username"
                value={registerValues.username}
                onChange={handleInputChange}
              />
            </Box>
            <Box mt="8">
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
                value={registerValues.password}
                onChange={handleInputChange}
              />
            </Box>

            <Button
              mt={8}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

// export default withUrqlClient(createUrqlClient)(Register);
export default Register;
