import {useNetInfo} from '@react-native-community/netinfo';
import {RouteProp, useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  deleteMessageDB,
  getAllMessagesByUsers as getAllMessagesByUsersRealm,
  getUserById as getUserByIdRealm,
  insertMessage,
  updateMessage as updateMessageRealm,
} from '../../databases/allSchemas';
import {Message} from '../../databases/MessageSchema';
import {User} from '../../databases/UserSchema';
import {
  GetAllMessagesByUsersDocument,
  useDeleteFriendShipMutation,
  useDeleteMessageMutation,
  useGetAllMessagesByUsersLazyQuery,
  useGetAllMessagesByUsersQuery,
  useGetUserByIdLazyQuery,
  useGetUserByIdQuery,
  useSendMessageMutation,
  useUpdateMessageMutation,
} from '../../generated/graphql';
import {RootStackParamList} from '../../screens/RootStackParams';
import showToast from '../../utils/showToast';
import {HeaderComponent} from '../Header/Header';
import {EditMessageModal} from '../Message/EditMessageModal';
import {MessageComponent} from '../Message/Message';
import {MessageModal} from '../Message/MessageModal';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

interface ChatProps {}

export const Chat: React.FC<ChatProps> = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const [input, setInput] = useState('');
  const {senderId, receiverId} = route.params;
  // console.log('SENDER RECEIVER', senderId, receiverId);
  const [receiver, setReceiver] = useState<User>();
  const [sender, setSender] = useState<User>();
  const [messagesState, setMessagesState] = useState<Message[]>([]);
  const [mainModalOpen, setMainModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentMessageSelected, setCurrentMessageSelected] =
    useState<Message>();
  const netInfo = useNetInfo();
  const [sendMessageServ] = useSendMessageMutation();
  const {
    data,
    loading,
    refetch: refetchMessages,
  } = useGetAllMessagesByUsersQuery({
    variables: {
      userId1: senderId,
      userId2: receiverId,
    },
  });

  // const {data: sender, loading} = useGetUserByIdQuery({
  //   variables: {
  //     userId: senderId
  //   }
  // });

  const [getUserById] = useGetUserByIdLazyQuery();
  const [deleteMessageServ] = useDeleteMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();

  useEffect(() => {
    const init = async () => {
      const currentMessages = (await getAllMessagesByUsersRealm(
        senderId,
        receiverId,
      )) as Message[];
      setMessagesState(currentMessages);
    };

    init();
  }, [senderId, receiverId]);

  useEffect(() => {
    const init = async () => {
      if (netInfo.isConnected) {
        const receiverRes = await getUserById({
          variables: {userId: receiverId},
        });
        if (receiverRes.data?.getUserById) {
          const {email, username, id, goblinMask} =
            receiverRes.data.getUserById;
          const receiverBuild = new User(
            id,
            username,
            '',
            goblinMask.photo,
            email,
          );
          setReceiver(receiverBuild);
          console.log('RECEIVER BUILT: ', receiverBuild);
        }

        const senderRes = await getUserById({
          variables: {userId: senderId},
        });
        if (senderRes.data?.getUserById) {
          const {email, username, id, goblinMask} = senderRes.data.getUserById;
          const senderBuild = new User(
            id,
            username,
            '',
            goblinMask.photo,
            email,
          );
          setSender(senderBuild);
          console.log('SENDER BUILT: ', senderBuild);
        }
      } else {
        const receiverRes = (await getUserByIdRealm(receiverId)) as User;
        setReceiver(receiverRes);

        const senderRes = (await getUserByIdRealm(senderId)) as User;
        setSender(senderRes);
      }
    };

    init();
  }, [senderId, receiverId, getUserById, netInfo.isConnected]);

  useEffect(() => {
    const init = async () => {
      if (netInfo.isConnected) {
        if (!loading) {
          console.log('online');
          console.log(data);

          if (data?.getAllMessagesByUsers) {
            console.log('DATA FROM SERVER: ', data.getAllMessagesByUsers);
            const builtMessages = data.getAllMessagesByUsers.map(
              m =>
                new Message(
                  m.uuid,
                  m.senderId,
                  m.receiverId,
                  m.message,
                  m.edited,
                  new Date(+m.createdAt),
                  m.seen,
                ),
            );

            // * check for offline send message
            const offlineFriendshipList = await getAllMessagesByUsersRealm(
              senderId,
              receiverId,
            );

            // console.log('OFFLINE', offlineFriendshipList);
            // console.log('ONLINE', builtMessages);

            const added = onlyInLeft(
              offlineFriendshipList,
              builtMessages,
              isSameMessage,
            );

            // TODO aici
            // console.log('ADDED', added);
            // console.log(offlineFriendshipList);
            const sendMsgPromises: Promise<any>[] = [];

            added.forEach(async (a: Message) => {
              const {senderId: sId, recevierId: rId, message, id} = a;
              sendMsgPromises.push(
                sendMessageServ({
                  variables: {
                    uuid: id,
                    message,
                    receiverId: rId,
                    senderId: sId,
                  },
                  // refetchQueries: [
                  //   {
                  //     query: GetAllMessagesByUsersDocument,
                  //     variables: {userId1: senderId, userId2: receiverId},
                  //   },
                  // ],
                }),
              );
            });

            //* check for offline deletes
            const difference = onlyInLeft(
              builtMessages,
              offlineFriendshipList,
              isSameMessage,
            );

            const deleteMsgPromises: Promise<any>[] = [];

            difference.forEach((d: Message) => {
              deleteMsgPromises.push(
                deleteMessageServ({variables: {messageId: d.id}}),
              );
            });

            // * check for offline update
            const offUpdates = onlyInLeft(
              offlineFriendshipList,
              builtMessages,
              isSameMessageAndContext,
            );

            console.log('OFFFUPDATES: ', offUpdates);

            offUpdates.forEach((u: Message) => {
              offUpdates.push(
                updateMessage({
                  variables: {messageId: u.id, message: u.message},
                }),
              );
            });

            // console.log(builtMessages);
            if (
              added.length > 0 ||
              difference.length > 0 ||
              offUpdates.length > 0
            ) {
              setMessagesState(offlineFriendshipList);
              await Promise.all([
                ...sendMsgPromises,
                ...deleteMsgPromises,
                ...offUpdates,
              ]);
              refetchMessages();
              // console.log('REEEEEEEFETCH: ', whay);
            }
          }
        }
      } else {
        console.log('offline');

        const currentMessages = (await getAllMessagesByUsersRealm(
          senderId,
          receiverId,
        )) as Message[];
        setMessagesState(currentMessages);

        console.log(currentMessages);
      }
    };

    init();
  }, [
    loading,
    netInfo.isConnected,
    receiverId,
    senderId,
    deleteMessageServ,
    sendMessageServ,
    updateMessage,
    refetchMessages,
    data,
  ]);

  // const isSameMessage = (a: any, b: any) => {
  //   if (a?.uuid) {
  //     return a.uuid === b.id;
  //   } else {
  //     return a.id === b.uuid;
  //   }
  // };
  const isSameMessage = (a: Message, b: Message) => a.id === b.id;
  const isSameMessageAndContext = (a: Message, b: Message) =>
    a.id === b.id && a.message === b.message;

  const onlyInLeft = (left: any, right: any, compareFunction: any) =>
    left.filter(
      (leftValue: any) =>
        !right.some((rightValue: any) =>
          compareFunction(leftValue, rightValue),
        ),
    );

  const deleteMessage = () => {
    Alert.alert('Warning', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          if (currentMessageSelected) {
            await deleteMessageDB(currentMessageSelected);

            setMessagesState(
              messagesState.filter(
                message => message.id !== currentMessageSelected.id,
              ),
            );

            if (netInfo.isConnected) {
              const rawServRes = await deleteMessageServ({
                variables: {
                  messageId: currentMessageSelected.id,
                },
              });

              if (rawServRes.data?.deleteMessage.errors) {
                showToast('something went wrong!');
                console.log(rawServRes.data?.deleteMessage.errors[0].message);
              } else if (rawServRes.data?.deleteMessage.ok) {
                showToast('delete successful');
                refetchMessages();
              }
            }
          }
          setMainModalOpen(!mainModalOpen);
        },
      },
    ]);
  };

  const editMessage = async (newMessage: string) => {
    let auxMessages = [...messagesState];
    if (currentMessageSelected) {
      await updateMessageRealm(currentMessageSelected, newMessage);
      currentMessageSelected.message = newMessage;
      setCurrentMessageSelected(currentMessageSelected);
      const updatedMsgPos = messagesState.indexOf(currentMessageSelected);

      auxMessages[updatedMsgPos] = currentMessageSelected;
      setMessagesState(auxMessages);

      if (netInfo.isConnected) {
        const updateResRaw = await updateMessage({
          variables: {
            messageId: currentMessageSelected.id,
            message: newMessage,
          },
        });

        if (updateResRaw.data?.updateMessage.ok) {
          showToast('Message updated');
          refetchMessages();
        } else {
          showToast('something went wrong!');
          console.log(updateResRaw.data?.updateMessage.errors![0].message);
        }
      }
    }
    setEditModalOpen(!editModalOpen);
  };

  const openEditMessageModal = () => {
    setEditModalOpen(!editModalOpen);
    setMainModalOpen(!mainModalOpen);
  };

  const openMessageModal = (messageId: string) => {
    const message = messagesState.find(el => el.id === messageId);
    setCurrentMessageSelected(message);
    setMainModalOpen(!mainModalOpen);
  };

  const renderMessage: ListRenderItem<Message> = ({item}) => {
    const isSender = item.senderId === sender.id;

    return (
      <MessageComponent
        message={item}
        isSender={isSender}
        user={isSender ? sender : receiver}
        openMessageModal={openMessageModal}
      />
    );
  };

  const sendMessage = async () => {
    const newMessage = new Message(uuidv4(), senderId, receiverId, input);

    await insertMessage(newMessage);
    // currentMessages.concat(newMessage);
    setInput('');
    setMessagesState([...messagesState, newMessage]);
    // Keyboard.dismiss();
    if (netInfo.isConnected) {
      const newMessageRaw = await sendMessageServ({
        variables: {uuid: newMessage.id, senderId, receiverId, message: input},
        // refetchQueries: [
        //   {
        //     query: GetAllMessagesByUsersDocument,
        //     variables: {userId1: senderId, userId2: receiverId},
        //   },
        // ],
      });

      refetchMessages();

      if (newMessageRaw.data?.sendMessage.message) {
        console.log('message sent successfully');
      }
    }
  };

  return (
    <>
      <MessageModal
        visible={mainModalOpen}
        setMainModalOpen={setMainModalOpen}
        deleteMessage={deleteMessage}
        editMessage={openEditMessageModal}
      />
      <EditMessageModal
        visible={editModalOpen}
        editMessage={editMessage}
        setMainModalOpen={setEditModalOpen}
        actualMessage={currentMessageSelected?.message}
      />
      {/* <Navbar mainText={receiver && receiver.username} /> */}
      {receiver && <HeaderComponent user={receiver} />}

      <View style={styles.chatContainer}>
        {sender && receiver ? (
          <SafeAreaView style={styles.mesaggesContainer}>
            <FlatList
              data={messagesState}
              renderItem={renderMessage}
              keyExtractor={item => item.id}
              keyboardShouldPersistTaps="handled"
            />
          </SafeAreaView>
        ) : (
          <Text>Loading...</Text>
        )}
        <View style={styles.footer}>
          <TextInput
            //   style={styles.input}
            placeholder="Send messsage"
            selectionColor={'tomato'}
            defaultValue={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Icon name="send" size={45} color="tomato" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mesaggesContainer: {
    flex: 1,
    backgroundColor: '#494E65',
    padding: 7,
  },
  chatContainer: {
    flex: 3,
    padding: 15,
    backgroundColor: '#000a17',
  },
  footer: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 14,
  },
});
