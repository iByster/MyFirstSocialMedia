import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {LogoSrc} from '../../images';
import {RootStackParamList} from '../../screens/RootStackParams';
import showToast from '../../utils/showToast';
import {User} from '../../databases/UserSchema';
import {getUser, insertUser} from '../../databases/allSchemas';
import {getRandomImage} from '../../utils/getImage';
import {useRegisterMutation} from '../../generated/graphql';
import {useNetInfo} from '@react-native-community/netinfo';
import MiniOfflineSign from '../OfflineNotice/OfflineNotice';

interface RegisterProps {
  // users: User[];
}

type registerScreenProp = StackNavigationProp<RootStackParamList, 'Register'>;

export const Register: React.FC<RegisterProps> = () => {
  const navigation = useNavigation<registerScreenProp>();
  const [register] = useRegisterMutation();
  const netInfo = useNetInfo();

  const [loginInput, setLoginInput] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: '',
  });

  const onInputChange = (name: string) => (value: string) => {
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  // TODO if no internet connection
  const onSubmit = async () => {
    if (netInfo.isConnected) {
      const {email, username, password, rePassword} = loginInput;

      if (!email || !username || !password || !rePassword) {
        showToast('Please fill all inputs!');
        return;
      }

      if (password !== rePassword) {
        showToast('Passwords do not match!');
        return;
      }

      // ! Only if internet connection -> register server + local_db
      const newUser = await register({
        variables: {username, password, email},
      });

      if (newUser.data?.register.errors) {
        showToast(newUser.data?.register.errors[0].message);
      } else if (newUser.data?.register.user) {
        const {goblinMask, id} = newUser.data.register.user;

        const user = new User(id, username, password, goblinMask.photo, email);
        await insertUser(user);
        showToast('Sign in successfull!');
        navigation.navigate('Login');
      }
    } else {
      showToast('No internet connection. Try again later');
    }
  };
  return (
    <View style={styles.container}>
      {netInfo.isConnected ? null : <MiniOfflineSign />}
      <Text style={styles.header}>REGISTER</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        defaultValue={loginInput.email}
        onChangeText={onInputChange('email')}
      />
      <TextInput
        style={styles.input}
        placeholder="username"
        defaultValue={loginInput.username}
        onChangeText={onInputChange('username')}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        defaultValue={loginInput.password}
        onChangeText={onInputChange('password')}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="re-password"
        defaultValue={loginInput.rePassword}
        onChangeText={onInputChange('rePassword')}
        secureTextEntry={true}
      />
      <Pressable
        style={{...styles.button, ...styles.button1}}
        onPress={onSubmit}>
        <Text style={{...styles.text, ...styles.text1}}>Sign up</Text>
      </Pressable>
      {/* <Pressable style={{...styles.button, ...styles.button2}}>
        <Text style={{...styles.text}}>Sign up</Text>
      </Pressable> */}
      <Image style={styles.image} source={LogoSrc} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginLeft: 20,
    width: 230,
    height: 230,
    transform: [{rotate: '-45deg'}],
  },
  container: {
    display: 'flex',
    backgroundColor: '#000a17',
  },
  button: {
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  text1: {
    color: 'black',
  },
  button1: {
    backgroundColor: 'tomato',
  },
  button2: {},
  header: {
    fontSize: 65,
    alignSelf: 'flex-end',
    paddingTop: 30,
    paddingRight: 10,
  },
  input: {
    borderRadius: 5,
    padding: 10,
    margin: 15,
    height: 50,
    backgroundColor: '#8e8e8e',
  },
});
