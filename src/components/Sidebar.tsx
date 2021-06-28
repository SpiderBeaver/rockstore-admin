import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
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

interface NavigationLinkProps {
  isActive?: boolean;
}
const NavigationLink = styled(Link)<NavigationLinkProps>`
  text-decoration: none;
  color: #ffffff;
  font-weight: ${(props) => (props.isActive ? 500 : 400)};
`;

export default function Sidebar() {
  const isProducts = useRouteMatch('/products');
  const isHome = useRouteMatch('/');

  return (
    <SidebarStyled>
      <Logo>ROCKSTORE</Logo>
      <Navigation>
        <NavigationItem>
          <NavigationLink to="/" isActive={isHome !== null && isHome.isExact}>
            Home
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to="/products" isActive={isProducts !== null}>
            Products
          </NavigationLink>
        </NavigationItem>
      </Navigation>
    </SidebarStyled>
  );
}
