import React from 'react';
import styled from 'styled-components/macro';

const SidebarStyled = styled.div`
  background-color: #000c59;
  color: #ffffff;
  height: 100%;
  padding: 1em;
`;

const Logo = styled.h1`
  font-size: 1.4em;
  font-weight: 500;
  margin: 0 0 2em 0;
`;

const Navigation = styled.ul``;

const NavigationItem = styled.li`
  margin-bottom: 1.5em;
`;

export default function Sidebar() {
  return (
    <SidebarStyled>
      <Logo>ROCKSTORE</Logo>
      <Navigation>
        <NavigationItem>Home</NavigationItem>
        <NavigationItem>Products</NavigationItem>
      </Navigation>
    </SidebarStyled>
  );
}
