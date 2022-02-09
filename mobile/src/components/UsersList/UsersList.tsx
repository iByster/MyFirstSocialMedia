import {ObjectId} from 'bson';
import React from 'react';
import {FlatList, ListRenderItem, SafeAreaView, StyleSheet} from 'react-native';
import {FriendShip} from '../../databases/FriendShipSchema';
import {User} from '../../databases/UserSchema';
import {UserCardType, UserListItem} from './UserListItem';

interface UsersListProps {
  friends: FriendShip[];
  currentUser: User;
  deleteUser(userId: number): void;
  gotToChat(receiverId: number): void;
  handleFriendship(friend: FriendShip, status: UserCardType): void;
}

export const UsersList: React.FC<UsersListProps> = ({
  friends,
  deleteUser,
  gotToChat,
  currentUser,
  handleFriendship,
}) => {
  console.log(friends);
  const renderItem: ListRenderItem<FriendShip> = ({item}) => {
    return (
      <UserListItem
        friend={item}
        currentUser={currentUser}
        handleFriendship={handleFriendship}
        // type={getListItemType(item)}
        deleteUser={deleteUser}
        goToChat={gotToChat}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  trashIcon: {
    width: 30,
    height: 30,
  },
  rowBack: {
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    paddingLeft: 5,
  },
});
