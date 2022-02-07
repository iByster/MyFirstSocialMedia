import { Button, Heading, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField/InputField';
import { Layout } from '../components/Layout/Layout';
import { useForgotPasswordMutation } from '../generated/graphql';
import { useIsAuth } from '../hooks/userIsAuth';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  useIsAuth();
  const [email, setEmail] = useState('');
  const [forgotPassword] = useForgotPasswordMutation();
  const [successMsg, setSuccessMsg] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  const handleForgotPassword = async (
    _values: { email: string },
    { setErrors }: any
  ) => {
    const response = await forgotPassword({variables: { email }});
    if (response.data?.forgotPassword.errors) {
      setErrors(toErrorMap(response.data.forgotPassword.errors));
      setSuccessMsg(false);
    } else if (response.data?.forgotPassword.ok) {
      // worked
      setSuccessMsg(true);
    }
  };

  return (
    <Layout variant="small">
      <Heading mb="2">Reset Password</Heading>
      <Text mb="10">
        Please enter your email so we can send you a change-password link.
      </Text>
      {successMsg && (
        <Text fontWeight="bold" color="green">
          Link send successfully.
        </Text>
      )}
      <Formik initialValues={{ email: '' }} onSubmit={handleForgotPassword}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="email"
              placeholder="email"
              label="Email"
              value={email}
              onChange={handleInputChange}
              type="email"
            />
            <Button
              mt={8}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

// export default withUrqlClient(createUrqlClient)(ForgotPassword);
export default ForgotPassword;