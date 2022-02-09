import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
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
import {getUser} from '../../databases/allSchemas';
import {User} from '../../databases/UserSchema';
import {useLoginMutation} from '../../generated/graphql';
import {LogoSrc} from '../../images';
import {RootStackParamList} from '../../screens/RootStackParams';
import showToast from '../../utils/showToast';

interface LoginProps {
  // users: User[];
}

type loginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const Login: React.FC<LoginProps> = () => {
  const navigation = useNavigation<loginScreenProp>();
  const [login] = useLoginMutation();
  const netInfo = useNetInfo();

  const [loginInput, setLoginInput] = useState({
    username: '',
    password: '',
  });

  const onInputChange = (name: string) => (value: string) => {
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    const {username, password} = loginInput;

    if (!username || !password) {
      showToast('Please fill both inputs!');
    }

    // TODO: if no internet connection get from local_db
    // ! Register saves user in local_db
    let found = null;
    let user = null;
    if (netInfo.isConnected) {
      found = await login({
        variables: {usernameOrEmail: username, password},
      });

      if (found.data?.login.errors) {
        showToast('Incorrect username or password!');
      } else if (found.data?.login.user) {
        const {
          goblinMask,
          email,
          id,
          username: serverUsername,
        } = found.data.login.user;

        user = new User(id, serverUsername, password, goblinMask.photo, email);

        navigation.navigate('Main', {
          user,
        });
      }
    } else {
      found = (await getUser(username, password)) as User;

      if (found) {
        user = found;
        navigation.navigate('Main', {
          user,
        });
      } else {
        showToast('Incorrect username or password!');
      }
    }
    // const found: User = (await getUser(username)) as User;

    // if (found && found.password === password) {
    //   // login
    //   navigation.navigate('Main', {
    //     user: found,
    //   });
    // } else {
    //   showToast('Incorrect username or password!');
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LOGIN</Text>
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
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#ff3814' : 'tomato',
          },
          styles.button,
        ]}
        onPress={onSubmit}>
        <Text style={{...styles.text, ...styles.text1}}>Login</Text>
      </Pressable>
      <Pressable
        style={{...styles.button, ...styles.button2}}
        onPress={() => navigation.navigate('Register')}>
        <Text style={{...styles.text}}>Sign up</Text>
      </Pressable>
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
