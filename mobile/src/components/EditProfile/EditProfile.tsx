import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-elements';
import {User} from '../../databases/UserSchema';
import {RootStackParamList} from '../../screens/RootStackParams';
import {getImage, getImageDBRef} from '../../utils/getImage';
import {Input} from 'react-native-elements/dist/input/Input';
import RNPickerSelect from 'react-native-picker-select';
import {updateUser as updateUserRealm} from '../../databases/allSchemas';
import {StackNavigationProp} from '@react-navigation/stack';
import {useUpdateUserProfileMutation} from '../../generated/graphql';
import showToast from '../../utils/showToast';
import {useNetInfo} from '@react-native-community/netinfo';

interface EditProfileProps {}

type editProfileScreenProp = StackNavigationProp<
  RootStackParamList,
  'EditProfile'
>;

// TODO VALIDATIONS
export const EditProfile: React.FC<EditProfileProps> = ({}) => {
  const navigation = useNavigation<editProfileScreenProp>();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const route = useRoute<RouteProp<RootStackParamList, 'EditProfile'>>();
  const [user, setUser] = useState<User>(route.params.user);
  const netInfo = useNetInfo();
  // const user: User = route.params.user;
  const [inputs, setInputs] = useState({
    username: user.username,
    profilePic: user.profilePic,
  });

  const editProfile = async () => {
    if (netInfo.isConnected) {
      const {username, profilePic} = inputs;
      // TODO check internet connection
      const res = await updateUserProfile({
        variables: {
          goblinMaskId: getImageDBRef(profilePic) || 1,
          userId: user.id,
          username,
        },
      });
      if (res.data?.updateUserProfile.ok) {
        showToast('Update successful');
      } else {
        showToast('Something went wrong');
        if (res.data?.updateUserProfile.errors) {
          console.log(res.data?.updateUserProfile.errors[0].message);
        }
      }

      const resRealm = (await updateUserRealm(
        user,
        username,
        profilePic,
      )) as User;

      // console.log(resRealm);

      navigation.navigate('Main', {
        user: resRealm,
      });
    } else {
      showToast('No internet connection. Try again later');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <Avatar
        size="xlarge"
        containerStyle={styles.avatar}
        rounded
        source={getImage(inputs.profilePic)}
      />
      <RNPickerSelect
        onValueChange={value => setInputs({...inputs, profilePic: value})}
        items={[
          {label: 'Goof', value: 'goof.png'},
          {label: 'Fox', value: 'fox.png'},
          {label: 'War', value: 'war.png'},
          {label: 'Lady', value: 'lady.png'},
        ]}
      />
      <Input
        label="Username:"
        placeholder="BASIC INPUT"
        value={inputs.username}
        onChangeText={value => setInputs({...inputs, username: value})}
      />
      <Pressable>
        <Button
          title="EDIT"
          raised
          buttonStyle={styles.button}
          onPress={() => editProfile()}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#000a17',
  },
  title: {
    fontSize: 40,
    color: 'tomato',
    fontWeight: 'bold',
    marginBottom: 35,
  },
  avatar: {
    borderWidth: 5,
    borderColor: 'tomato',
    padding: 10,
  },
  button: {
    width: 120,
    backgroundColor: 'tomato',
  },
});
