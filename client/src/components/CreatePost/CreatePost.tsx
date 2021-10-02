import { Button } from '@chakra-ui/button';
import { useDisclosure, useOutsideClick } from '@chakra-ui/hooks';
import { Box } from '@chakra-ui/layout';
import {
  Divider,
  Flex,
  Input,
  Spacer,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Collapse } from '@chakra-ui/transition';
import { useRouter } from 'next/dist/client/router';
import React, { useRef, useState } from 'react';
import { useCreatePostMutation } from '../../generated/graphql';
import style from './CreatePost.module.css';

interface CreatePostProps {}

export const CreatePost: React.FC<CreatePostProps> = ({ ...props }) => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [inputValues, setInputValues] = useState({
    title: '',
    text: '',
  });
  const [placeholderValues, setPlaceholderValues] = useState({
    title: 'Write a post...',
    text: 'Title...',
  });
  const [, createPost] = useCreatePostMutation();
  const toast = useToast();

  useOutsideClick({
    ref: ref,
    handler: () => handleCancel(),
  });

  const clearInputs = () => {
    setInputValues({
      title: '',
      text: '',
    });
  };

  const switchPlaceholders = () => {
    const newPlaceholders = {
      title: placeholderValues.text,
      text: placeholderValues.title,
    };

    setPlaceholderValues(newPlaceholders);
  };

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    setInputValues({
      ...inputValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const expandContainer = () => {
    if (!isOpen) {
      onToggle();
      switchPlaceholders();
    }
  };

  const handleCancel = () => {
    if (isOpen) {
      onToggle();
      switchPlaceholders();
    }
  };

  const handleCreatePost = async () => {
    const response = await createPost({ input: inputValues });
    if (response?.error) {
      toast({
        title: 'Something went wrong...',
        description: response.error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      router.push('/login');
    } else {
      toast({
        title: 'Post created!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      handleCancel();
      clearInputs();
    }
  };

  return (
    <>
      <Box
        border="1px solid #DCDEE6"
        padding="10px 15px"
        shadow="md"
        rounded="md"
        ref={ref}
        mb="2"
      >
        <Box onClick={expandContainer}>
          <Input
            value={inputValues.title}
            onChange={handleInputChange}
            placeholder={placeholderValues.title}
            variant="unstyled"
            name="title"
            fontSize="20"
            autoComplete="off"
          />
        </Box>
        <Collapse in={isOpen} animateOpacity>
          <Divider mt="2" />
          <Textarea
            _focus={{ outline: 'none' }}
            value={inputValues.text}
            onChange={handleInputChange}
            placeholder={placeholderValues.text}
            height="100"
            mt="4"
            variant="unstyled"
            name="text"
            resize="none"
          />
          <Flex>
            <Spacer />
            <Button onClick={handleCreatePost}>Post</Button>
            <Button
              variant="solid"
              className={style['cancel-button']}
              onClick={handleCancel}
              ml="4"
            >
              Cancel
            </Button>
          </Flex>
        </Collapse>
      </Box>
    </>
  );
};
