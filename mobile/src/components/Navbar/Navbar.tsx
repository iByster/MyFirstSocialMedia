import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {LogoSrc} from '../../images';

let width = Dimensions.get('window').width; //full width

interface NavbarProps {
  mainText: string | undefined;
}

export const Navbar: React.FC<NavbarProps> = ({mainText}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.username}>{mainText}</Text>
        <Image style={styles.image} source={LogoSrc} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    marginRight: 10,
    marginLeft: 10,
    width: 65,
    height: 65,
  },
  username: {
    marginTop: 10,
    fontSize: 30,
    color: 'black',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'tomato',
    justifyContent: 'flex-end',
    // height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    width: width,
  },
});
