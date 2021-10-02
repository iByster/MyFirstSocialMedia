import React from 'react';
import { Logo } from '../Logo/Logo';
import { MenuLinks } from './MenuLinks/MenuLinks';
import MenuToggle from './MenuToggle/MenuToggle';
import { NavBarContainer } from './NavBarContainer';

interface NavBarV2Props {}

export const NavBarV2: React.FC<NavBarV2Props> = ({}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <NavBarContainer>
      <Logo />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};
