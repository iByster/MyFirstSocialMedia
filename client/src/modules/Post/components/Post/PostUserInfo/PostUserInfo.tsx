import { Center, Flex } from '@chakra-ui/react';
import React from 'react';
import { useMaskQuery } from '../../../../../generated/graphql';
import UserModel from '../../../../User/model/UserModel';
import { Avatar } from '@chakra-ui/avatar';
import { Spinner } from '@chakra-ui/spinner';
import { Text, Box } from '@chakra-ui/layout';

interface PostUserInfoProps {
  user: UserModel;
}

export const PostUserInfo: React.FC<PostUserInfoProps> = ({ user }) => {
  const [{ data: mask, fetching }] = useMaskQuery({
    variables: {
      goblinMask: user.goblinMask.id,
    },
  });

  let avatarContent = null;

  if (fetching) {
    avatarContent = <Spinner color="red.500" />;
  } else if (!mask) {
    avatarContent = (
      <Avatar size="md" name={user.username} boxSize="10" alt="mask" />
    );
  } else {
    avatarContent = (
      <Avatar
        size="lg"
        name={user.username}
        src={`data:image/png;base64,${mask.mask}`}
        boxSize="10"
      />
    );
  }

  return (
    <Flex padding={'10px 5px'}>
      <Box mr={'2'}>{avatarContent}</Box>
      <Center>
        <Text>{user.username}</Text>
      </Center>
    </Flex>
  );
};
