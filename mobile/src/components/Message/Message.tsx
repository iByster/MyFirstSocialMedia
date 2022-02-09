import {useNetInfo} from '@react-native-community/netinfo';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Message} from '../../databases/MessageSchema';
import {User} from '../../databases/UserSchema';
import {getImage} from '../../utils/getImage';

interface MessageProps {
  message: Message;
  isSender: boolean;
  user: User;
  openMessageModal(messageId: string): void;
}

export const MessageComponent: React.FC<MessageProps> = ({
  message,
  isSender,
  user,
  openMessageModal,
}) => {
  // TODO TREBUIE REFACUT
  // TODO sender si receiver fara featch, doar cand intra in chat
  // const [profilePicState, setProfilePicState] = useState<string>('');
  // const {data, loading} = useGetUserByIdQuery({
  //   variables: {
  //     userId: message.senderId,
  //   },
  // });
  const netInfo = useNetInfo();

  // useEffect(() => {
  //   const init = async () => {
  //     if (netInfo.isConnected) {
  //       if (!loading) {
  //         if (data?.getUserById) {
  //           const {goblinMask} = data?.getUserById;
  //           setProfilePicState(goblinMask.photo);
  //         }
  //       }
  //     } else {
  //       const {profilePic} = await getUserByIdRealm(message.senderId)!;
  //       setProfilePicState(profilePic);
  //     }
  //   };
  //   init();
  // }, [message, data, netInfo, loading]);

  console.log(message);

  const renderMessage = () => {
    if (isSender) {
      return (
        <>
          <View
            style={[styles.messageContainer, styles.messageContainerSender]}>
            <Text style={styles.message}>{message.message}</Text>
            <Text style={styles.date}>
              {message.createdAt.toLocaleString('en-US')}
            </Text>
          </View>
          <Avatar
            containerStyle={[styles.avatar, styles.avatarSender]}
            size="medium"
            rounded
            source={getImage(user.profilePic)}
          />
        </>
      );
    } else {
      return (
        <>
          <Avatar
            containerStyle={[styles.avatar, styles.avatarReceiver]}
            size="medium"
            rounded
            source={getImage(user.profilePic)}
          />
          <View style={[styles.messageContainer]}>
            <Text style={styles.message}>{message.message}</Text>
            <Text style={styles.date}>
              {message.createdAt.toLocaleString('en-US')}
            </Text>
          </View>
        </>
      );
    }
  };

  return (
    <TouchableOpacity onLongPress={() => openMessageModal(message.id)}>
      <View
        style={[
          styles.container,
          isSender ? styles.containerSender : styles.containerReceiver,
        ]}>
        {renderMessage()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: 10,
  },
  container: {
    backgroundColor: '#000a17',
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 10,
  },
  containerSender: {
    marginStart: 70,
    // alignItems: 'flex-end',
  },
  containerReceiver: {
    marginEnd: 70,
  },
  avatar: {
    backgroundColor: '#494E65',
    padding: 10,
  },
  avatarSender: {
    marginLeft: 20,
  },
  avatarReceiver: {
    marginRight: 20,
  },
  message: {
    fontSize: 15,
    marginBottom: 5,
    color: 'gray',
  },
  messageContainer: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  messageContainerSender: {
    alignItems: 'flex-end',
  },
});
