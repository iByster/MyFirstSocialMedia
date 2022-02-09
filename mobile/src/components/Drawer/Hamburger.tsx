import React from 'react';
import {Icon} from 'react-native-elements';

interface IProps {
  navigateToEditProfile(): void;
}

const HamburgerMenu: React.FC<IProps> = ({navigateToEditProfile}) => {
  return (
    <Icon
      tvParallaxProperties
      color="#000a17"
      name="menu"
      onPress={() => navigateToEditProfile()}
    />
  );
};

export default HamburgerMenu;
