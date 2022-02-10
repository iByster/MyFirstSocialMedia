import {useNetInfo} from '@react-native-community/netinfo';
import {ObjectId} from 'bson';
import {isUnionType} from 'graphql';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  getUser,
  getUserById as getUserByIdRealm,
} from '../../databases/allSchemas';
import {FriendShip} from '../../databases/FriendShipSchema';
import {User} from '../../databases/UserSchema';
import {useGetUserByIdLazyQuery} from '../../generated/graphql';
import {trashIcon} from '../../images';
import {getImage} from '../../utils/getImage';
import showToast from '../../utils/showToast';

interface UserListItemProps {
  friend: FriendShip;
  currentUser: User;
  deleteUser(userId: number): void;
  goToChat(receiver: User): void;
  handleFriendship(friend: FriendShip, status: UserCardType): void;
}

export type UserCardType = 'pending' | 'request' | 'accepted' | 'declined';

const rightSwipeActions = () => {
  return (
    <View style={styles.swipeGestureContainer}>
      <TouchableOpacity>
        <Image style={styles.trashIcon} source={trashIcon} />
      </TouchableOpacity>
    </View>
  );
};

export const UserListItem: React.FC<UserListItemProps> = ({
  friend,
  deleteUser,
  goToChat,
  currentUser,
  handleFriendship,
}) => {
  const [user, setUser] = useState<User>();
  const [type, setType] = useState<UserCardType>('pending');
  const [getUserById] = useGetUserByIdLazyQuery();
  const netInfo = useNetInfo();

  useEffect(() => {
    // TODO CEVA NU MERGE
    const init = async () => {
      const isCurrentUserSender = currentUser.id === friend.senderId;
      const isRequest = friend.status === 'pending';
      let userFoundRealm = null;
      let userFoundServer = null;

      if (isRequest) {
        if (isCurrentUserSender) {
          setType('pending');
          if (netInfo.isConnected) {
            userFoundServer = await getUserById({
              variables: {userId: friend.receiverId},
            });
          } else {
            userFoundRealm = (await getUserByIdRealm(
              friend.receiverId,
            )) as User;
          }
        } else {
          setType('request');
          if (netInfo.isConnected) {
            userFoundServer = await getUserById({
              variables: {userId: friend.senderId},
            });
          } else {
            userFoundRealm = (await getUserByIdRealm(friend.senderId)) as User;
          }
        }
      } else {
        if (friend.status === 'accepted') {
          setType('accepted');
        } else {
          setType('declined');
        }
        if (isCurrentUserSender) {
          if (netInfo.isConnected) {
            userFoundServer = await getUserById({
              variables: {userId: friend.receiverId},
            });
          } else {
            userFoundRealm = (await getUserByIdRealm(
              friend.receiverId,
            )) as User;
          }
        } else {
          if (netInfo.isConnected) {
            userFoundServer = await getUserById({
              variables: {userId: friend.senderId},
            });
          } else {
            userFoundRealm = (await getUserByIdRealm(friend.senderId)) as User;
          }
        }
      }

      if (userFoundServer) {

        if (userFoundServer.data?.getUserById) {
          const {id, username, email, goblinMask} =
            userFoundServer.data.getUserById;
          const newUser = new User(id, username, '', goblinMask.photo, email);
          setUser(newUser);
        }
      }

      if (userFoundRealm) {
        setUser(userFoundRealm);
      }

      // console.log('USERFOUND: ', userFound);
    };

    init();
  }, [currentUser, friend, type, getUserById, netInfo]);

  const swipeFromRightOpen = () => {
    if (user) {
      deleteUser(friend.id);
    }
  };

  const redirectToChat = () => {
    if (user) {
      goToChat(user);
    }
  };

  const renderCard = () => {
    if (user) {
      if (type === 'pending') {
        return (
          <Swipeable
            renderRightActions={rightSwipeActions}
            onSwipeableRightOpen={swipeFromRightOpen}>
            <TouchableOpacity>
              <View style={styles.container}>
                <Avatar
                  containerStyle={styles.avatar}
                  size="large"
                  rounded
                  source={getImage(user.profilePic)}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.username}>{user.username}</Text>
                </View>
                <Text style={styles.pending}>Pending</Text>
              </View>
            </TouchableOpacity>
          </Swipeable>
        );
      }
      if (type === 'request') {
        return (
          <View style={styles.container}>
            <Avatar
              containerStyle={styles.avatar}
              size="large"
              rounded
              source={getImage(user.profilePic)}
            />
            <View style={styles.textContainer}>
              <Text style={styles.newFriendRequest}>New friend request</Text>
              <Text style={styles.username}>{user.username}</Text>
            </View>
            <View style={styles.requestContainer}>
              <TouchableOpacity
                onPress={() => handleFriendship(friend, 'accepted')}>
                <Icon name="check-circle" size={40} color="green" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="cancel" size={40} color="tomato" />
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      return (
        <Swipeable
          renderRightActions={rightSwipeActions}
          onSwipeableRightOpen={swipeFromRightOpen}>
          <TouchableOpacity onPress={redirectToChat}>
            <View style={styles.container}>
              <Avatar
                containerStyle={styles.avatar}
                size="large"
                rounded
                source={getImage(user.profilePic)}
              />
              <View style={styles.textContainer}>
                <Text style={styles.username}>{user.username}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Swipeable>
      );
    }
  };

  return <>{renderCard()}</>;
};

const styles = StyleSheet.create({
  trashIcon: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    backgroundColor: '#494E65',
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  swipeGestureContainer: {
    backgroundColor: '#ff8303',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 15,
  },
  avatar: {
    backgroundColor: '#000a17',
    padding: 10,
    marginRight: 20,
  },
  username: {
    fontSize: 35,
    marginBottom: 10,
    color: 'black',
  },
  textContainer: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  pending: {
    fontSize: 17,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  requestContainer: {
    flex: 0,
  },
  newFriendRequest: {
    fontSize: 13,
    color: '#8c92ac',
  },
});
