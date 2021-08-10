import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, useToast } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper/Wrapper';
import { InputField } from '../components/InputField/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/dist/client/router';
import { UserRegisterPayload } from '../utils/auth/auth-types';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useState } from 'react';

// export default Register;
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
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
      console.log(values);
      const response = await register(values);
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
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt="8">
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
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
