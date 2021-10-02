import React from 'react';
import { NavBarV2 } from '../NavBar/NavBarV2';
import { ResponsiveWrapper } from '../Wrapper/ResponsiveWrapper';

interface LayoutProps {
  variant?: 'small' | 'regular';
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBarV2 />
      <ResponsiveWrapper variant={variant}>{children}</ResponsiveWrapper>
    </>
  );
};
