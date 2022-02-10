import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Header, Text} from 'react-native-elements';
import {User} from '../../databases/UserSchema';
import {RootStackParamList} from '../../screens/RootStackParams';
import {getImage} from '../../utils/getImage';
import HamburgerMenu from '../Drawer/Hamburger';

interface HeaderProps {
  user: User;
}

type editProfileScreenProp = StackNavigationProp<
  RootStackParamList,
  'EditProfile'
>;

export const HeaderComponent: React.FC<HeaderProps> = ({user}) => {
  const navigation = useNavigation<editProfileScreenProp>();
  // const netInfo = useNetInfo();

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile', {
      user: user,
    });
  };

  const renderRightComponent = () => {
    return (
      <View style={styles.profileSnip}>
        <Text style={styles.username}>{user.username}</Text>
        {/* <Image style={styles.image} source={getImage(user.profilePic)} /> */}
        <Avatar
          size="medium"
          containerStyle={styles.avatar}
          rounded
          source={getImage(user.profilePic)}
        />
      </View>
    );
  };

  const renderLeftContainer = () => {
    // return <Icon name="sc-telegram" type="evilicon" color="#517fa4" />;
    // return <MyDrawer />;
    return <HamburgerMenu navigateToEditProfile={navigateToEditProfile} />;
  };

  return (
    <Header
      containerStyle={styles.container}
      backgroundColor={'tomato'}
      placement="left"
      // leftComponent={{icon: 'menu', color: '#alefff'}}
      leftComponent={renderLeftContainer()}
      rightComponent={renderRightComponent()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
  },
  image: {
    marginRight: 10,
    marginLeft: 10,
    width: 65,
    height: 65,
  },
  username: {
    fontSize: 20,
    color: 'black',
  },
  profileSnip: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    top: -12,
    backgroundColor: '#000a17',
    padding: 10,
    marginRight: 6,
    marginLeft: 10,
  },
});
