import { Box, Button, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { InputField } from '../../components/InputField/InputField';
import { Layout } from '../../components/Layout/Layout';
import { useChangePasswordMutation } from '../../generated/graphql';
import { UserChangePasswordPayload } from '../../utils/auth/auth-types';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';

const ChangePassword: NextPage = ({}) => {
  const [newPasswordValues, setNewPasswordValues] = useState({
    newPassword: '',
    confNewPassword: '',
  });
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const toast = useToast();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPasswordValues({
      ...newPasswordValues,
      [e.target.name]: e.target.value,
    });
  }

  const handleForgotPassword = async (
    _values: UserChangePasswordPayload,
    { setErrors }: any
  ) => {
    const token = router.query.token as string;
    const response = await changePassword({
      newPassword: newPasswordValues.newPassword,
      confNewPassword: newPasswordValues.confNewPassword,
      token,
    });
    if (response.data?.changePassword.errors) {
      const errorMap = toErrorMap(response.data.changePassword.errors);
      if ('token' in errorMap) {
        toast({
          title: 'Token expired.',
          description: "You can't change the password",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
      setErrors(errorMap);
    } else if (response.data?.changePassword.user) {
      toast({
        title: 'Password changed.',
        description: 'You can now log in',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      router.push('/login');
    }
  };

  return (
    <Layout variant="small">
      <Heading mb="10">Change Password</Heading>

      <Formik
        initialValues={{ newPassword: '', confNewPassword: '' }}
        onSubmit={handleForgotPassword}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb="8">
              <InputField
                name="newPassword"
                placeholder="password"
                label="Password"
                value={newPasswordValues.newPassword}
                onChange={handleInputChange}
                type="password"
              />
            </Box>
            <Box>
              <InputField
                name="confNewPassword"
                placeholder="confirm password"
                label="Confirm Password"
                value={newPasswordValues.confNewPassword}
                onChange={handleInputChange}
                type="password"
              />
            </Box>
            <Button
              mt={8}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              Change
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword as any);
