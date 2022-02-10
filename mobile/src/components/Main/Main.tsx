import {useNetInfo} from '@react-native-community/netinfo';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, TextInput, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {
  deleteFriendship as deleteFriendshipRealm,
  getAllFriendShipsByUser as getAllFriendShipsByUserRealm,
  getAllUsersDTOs,
  getUserById as getUserByIdRealm,
  insertFriendShip,
  insertUser,
  updateFriendShip as updateFriendShipStatusRealm,
} from '../../databases/allSchemas';
import {FriendShip, StatusType} from '../../databases/FriendShipSchema';
import {User} from '../../databases/UserSchema';
import {
  GetAllFriendshipsByUserDocument,
  useAddFriendMutation,
  useDeleteFriendShipMutation,
  useGetAllFriendshipsByUserQuery,
  useGetUserByIdLazyQuery,
  useUpdateFriendShipStatusMutation,
} from '../../generated/graphql';
import {RootStackParamList} from '../../screens/RootStackParams';
import showToast from '../../utils/showToast';
import {HeaderComponent} from '../Header/Header';
// import {Navbar} from '../Navbar/Navbar';
import {UserCardType} from '../UsersList/UserListItem';
import {UsersList} from '../UsersList/UsersList';
interface MainProps {}

type mainScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;

// TODO se fac mai multe fetch-uri decat trebuie
export const Main: React.FC<MainProps> = () => {
  const navigation = useNavigation<mainScreenProp>();
  const [input, setInput] = useState('');
  const route = useRoute<RouteProp<RootStackParamList, 'Main'>>();
  const [addFriend] = useAddFriendMutation();
  const currentUser = route.params.user;
  const {loading, data} = useGetAllFriendshipsByUserQuery({
    variables: {userId: currentUser.id},
  });
  const [deleteFriendship] = useDeleteFriendShipMutation();
  const [updateFriendShipStatus] = useUpdateFriendShipStatusMutation();
  const [getUserById] = useGetUserByIdLazyQuery();
  const netInfo = useNetInfo();

  // const [friendList, setFriendList] = useState(currentUser.friends);
  const [friendRequestList, setFriendRequestList] = useState<FriendShip[]>([]);

  // useEffect(() => {
  //   const init = async () => {
  //     if (!netInfo.isConnected) {
  //       const friendShips = await getAllFriendShipsByUserRealm(currentUser.id);
  //       setFriendRequestList(friendShips);
  //     }
  //   };

  //   init();
  // });

  useEffect(() => {
    const init = async () => {
      const friendShips = await getAllFriendShipsByUserRealm(currentUser.id);
      console.log(friendShips);
      console.log(await getAllUsersDTOs());
      setFriendRequestList(friendShips);
    };

    init();
  }, [currentUser.id]);

  useEffect(() => {
    async function fetchFriendList() {
      if (netInfo.isConnected) {
        if (!loading) {
          if (data?.getAllFriendShipsByUser) {
            const friendships = data?.getAllFriendShipsByUser.map(
              d =>
                new FriendShip(
                  d.id,
                  d.senderId,
                  d.receiverId,
                  d.status as StatusType,
                ),
            );
            // console.log('whaaat', friendships);

            // * check for offline deletes
            const offlineFriendshipList = await getAllFriendShipsByUserRealm(
              currentUser.id,
            );

            const difference = onlyInLeft(
              friendships,
              offlineFriendshipList,
              isSameFriendship,
            );

            if (difference.length > 0) {
              setFriendRequestList(offlineFriendshipList);
            } else {
              setFriendRequestList(friendships);
            }

            difference.forEach(async (d: FriendShip) => {
              await deleteFriendship({variables: {friendshipId: d.id}});
            });

            // * check for offline updates
            const updateDifference = onlyInLeft(
              offlineFriendshipList,
              friendships,
              isSameStatusAndId,
            );

            if (updateDifference) {
              setFriendRequestList(offlineFriendshipList);
            } else {
              setFriendRequestList(friendships);
            }

            // console.log('OOOOFLINEEEE: ', offlineFriendshipList);
            // console.log('UPDATED DIFFERENCE: ', updateDifference);

            updateDifference.forEach(async (d: FriendShip) => {
              await updateFriendShipStatus({
                variables: {friendshipId: d.id, status: d.status},
              });
            });
          }
        } else {
          // console.log('HEEERE');
          const friendShips = await getAllFriendShipsByUserRealm(
            currentUser.id,
          );
          setFriendRequestList(friendShips);
        }
      }
    }

    fetchFriendList();
  }, [
    currentUser,
    data,
    loading,
    netInfo.isConnected,
    deleteFriendship,
    updateFriendShipStatus,
  ]);

  const isSameFriendship = (a: FriendShip, b: FriendShip) => a.id === b.id;
  const isSameStatusAndId = (a: FriendShip, b: FriendShip) =>
    a.id === b.id && a.status === b.status;

  const onlyInLeft = (left: any, right: any, compareFunction: any) =>
    left.filter(
      (leftValue: any) =>
        !right.some((rightValue: any) =>
          compareFunction(leftValue, rightValue),
        ),
    );

  // ! Can't add friend if no internet connection
  const addUser = async () => {
    if (netInfo.isConnected) {
      const res = await addFriend({
        variables: {
          senderId: currentUser.id,
          receiverUsername: input,
        },
        refetchQueries: [
          {
            query: GetAllFriendshipsByUserDocument,
            variables: {userId: currentUser.id},
          },
        ],
      });

      if (res.data?.addFriend.errors) {
        showToast(res.data?.addFriend.errors[0].message);
      } else if (res.data?.addFriend.friendship) {
        const newFriendShip = new FriendShip(
          res.data.addFriend.friendship.id,
          currentUser.id,
          res.data?.addFriend.friendship.receiverId,
        );
        await insertFriendShip(newFriendShip);
        // ? Save user DTO from friendship for offline list
        const userRaw = await getUserById({
          variables: {userId: res.data?.addFriend.friendship.receiverId},
        });
        if (userRaw.data?.getUserById) {
          const {email, id, username, goblinMask} = userRaw.data.getUserById;
          const checkUserIfExist = await getUserByIdRealm(id);
          if (!checkUserIfExist?.id) {
            const userDTO = new User(id, username, '', goblinMask.photo, email);
            console.log('user saved: ', userDTO);
            await insertUser(userDTO);
          }
        }
        setFriendRequestList([newFriendShip, ...friendRequestList]);
        showToast('Friend request sent');
      } else {
        showToast('Something went wrong..');
      }
    } else {
      showToast('No internet connection. Try again later');
    }
  };

  const handleFriendship = async (friend: FriendShip, status: UserCardType) => {
    const updatedFriendship = (await updateFriendShipStatusRealm(
      friend,
      status,
    )) as FriendShip;
    let newArr = [...friendRequestList];
    const updatedValPos = friendRequestList.indexOf(friend);
    newArr[updatedValPos] = updatedFriendship;
    setFriendRequestList(newArr);
    // if (status === 'accepted') {
    //   showToast('Friendship accepted');
    // } else if (status === 'declined') {
    //   showToast('Friendship declined');
    // }
    if (netInfo.isConnected) {
      const res = await updateFriendShipStatus({
        variables: {friendshipId: friend.id, status},
        refetchQueries: [
          {
            query: GetAllFriendshipsByUserDocument,
            variables: {userId: currentUser.id},
          },
        ],
      });

      if (res.data?.updateFriendShipStatus.ok) {
        if (res.data.updateFriendShipStatus.friendship?.status === 'accepted') {
          showToast('Friendship accepted');
        } else {
          showToast('Friendship declined');
        }
      }
    }
  };

  // ? Delete FriendShip
  const deleteUser = (userId: number) => {
    Alert.alert('Warning', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          // const friendshipFound = (await alreadyFriends(
          //   userId,
          //   currentUser._id,
          // )) as FriendShip;

          setFriendRequestList(
            friendRequestList.filter(friend => friend.id !== userId),
          );

          if (netInfo.isConnected) {
            const res = await deleteFriendship({
              variables: {friendshipId: userId},
              refetchQueries: [
                {
                  query: GetAllFriendshipsByUserDocument,
                  variables: {userId: currentUser.id},
                },
              ],
            });
            if (res.data?.deleteFriendShip.errors) {
              showToast('something went wrong!');
              console.log(res.data?.deleteFriendShip.errors[0].message);
            } else if (res.data?.deleteFriendShip.ok) {
              showToast('delete successful');
            }
          }
          // TODO probleme cand stergi user-ul
          // solved
          await deleteFriendshipRealm(userId);
          showToast('delete successful');
        },
      },
    ]);
  };

  const goToChat = (receiver: User) => {
    navigation.navigate('Chat', {
      sender: currentUser,
      receiver,
    });
  };

  return (
    <View style={styles.container}>
      {/* <Navbar mainText={currentUser.username} /> */}
      <HeaderComponent user={currentUser} />
      {loading ? (
        <Text>Loadin...</Text>
      ) : (
        <UsersList
          currentUser={currentUser}
          friends={friendRequestList}
          deleteUser={deleteUser}
          handleFriendship={handleFriendship}
          gotToChat={goToChat}
        />
      )}
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Search for friends"
          selectionColor={'tomato'}
          defaultValue={input}
          onChangeText={setInput}
        />
        {!!input && (
          <Button
            onPress={addUser}
            title="ADD"
            type="clear"
            titleStyle={styles.addButton}
          />
        )}
      </View>
      {/* {friendList.map(f => (
        <Text>{f.friendId}</Text>
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#000a17',
    // justifyContent: 'space-between',
    // height: windowHeight,
  },
  input: {
    // zIndex: 3, // works on androi
    // position: 'absolute',
    fontSize: 18,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  addButton: {
    color: 'tomato',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
