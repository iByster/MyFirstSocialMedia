import React from 'react';
import { Box } from '@chakra-ui/react';
import { Divide as Hamburger } from 'hamburger-react';

interface MenuToggleIProps {
  toggle: any;
  isOpen: boolean;
}

const MenuToggle: React.FC<MenuToggleIProps> = ({ toggle, isOpen }) => {
  return (
    <Box
      display={{ base: 'block', md: 'none' }}
      onClick={toggle}
      color="#1A202C"
    >
      <Hamburger size={20} toggled={isOpen} toggle={toggle} />
    </Box>
  );
};

export default MenuToggle;
