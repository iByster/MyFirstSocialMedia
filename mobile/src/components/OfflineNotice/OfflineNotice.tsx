import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const {width} = Dimensions.get('window');

const MiniOfflineSign: React.FC = () => {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0,
  },
  offlineText: {color: '#fff'},
});

export default MiniOfflineSign;
