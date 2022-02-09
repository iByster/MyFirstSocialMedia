import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {Login} from '../Login/Login';
import {Register} from '../Register/Register';
import {DrawerContent} from './DrawerContent';

interface DrawerProps {}

export const MyDrawer: React.FC<DrawerProps> = ({}) => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Feed" component={Login} />
      <Drawer.Screen name="Notifications" component={Register} />
    </Drawer.Navigator>
  );
};
